import { create } from 'zustand';
import { MarketGap } from '../types';
import { MARKET_GAPS } from '../data/complicityData';
import { api } from '../lib/api';

const BOUNTY_STORAGE_KEY = 'takweyat_bounty_registry_v1';
const VOTED_GAPS_KEY = 'takweyat_user_voted_gaps_v1';

interface BountyState {
  gaps: MarketGap[];
  userVotedGapIds: string[];
  searchQuery: string;
  selectedCategory: string;
  selectedUrgency: string;
  isLoading: boolean;

  // Actions
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedUrgency: (urgency: string) => void;
  upvoteGap: (gapId: string) => Promise<boolean>;
  pledgeSpend: (gapId: string, amountPkr: number) => Promise<boolean>;
  createGap: (gap: Omit<MarketGap, 'id' | 'votesCount' | 'unmetDemandCount'>) => Promise<boolean>;
  refreshGaps: () => Promise<void>;
  
  // Computed helpers
  getTotalUnmetDemand: () => number;
  getTotalPledgedSpendPkr: () => number;
}

const loadInitialGaps = (): MarketGap[] => {
  try {
    const raw = localStorage.getItem(BOUNTY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return MARKET_GAPS;
};

const loadUserVotes = (): string[] => {
  try {
    const raw = localStorage.getItem(VOTED_GAPS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
};

export const useBountyStore = create<BountyState>((set, get) => ({
  gaps: loadInitialGaps(),
  userVotedGapIds: loadUserVotes(),
  searchQuery: '',
  selectedCategory: 'All',
  selectedUrgency: 'All',
  isLoading: false,

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSelectedUrgency: (selectedUrgency) => set({ selectedUrgency }),

  upvoteGap: async (gapId: string) => {
    const { userVotedGapIds, gaps } = get();
    if (userVotedGapIds.includes(gapId)) {
      // Toggle off / downvote
      const updatedVotes = userVotedGapIds.filter(id => id !== gapId);
      const updatedGaps = gaps.map(g => g.id === gapId ? { ...g, votesCount: Math.max(0, g.votesCount - 1) } : g);
      set({ userVotedGapIds: updatedVotes, gaps: updatedGaps });
      try {
        localStorage.setItem(VOTED_GAPS_KEY, JSON.stringify(updatedVotes));
        localStorage.setItem(BOUNTY_STORAGE_KEY, JSON.stringify(updatedGaps));
        if (api.marketGaps?.upvote) {
          await api.marketGaps.upvote(gapId);
        }
      } catch {}
      return false;
    } else {
      // Upvote
      const updatedVotes = [...userVotedGapIds, gapId];
      const updatedGaps = gaps.map(g => g.id === gapId ? { ...g, votesCount: g.votesCount + 1, unmetDemandCount: g.unmetDemandCount + 1 } : g);
      set({ userVotedGapIds: updatedVotes, gaps: updatedGaps });
      try {
        localStorage.setItem(VOTED_GAPS_KEY, JSON.stringify(updatedVotes));
        localStorage.setItem(BOUNTY_STORAGE_KEY, JSON.stringify(updatedGaps));
        if (api.marketGaps?.upvote) {
          await api.marketGaps.upvote(gapId);
        }
      } catch {}
      return true;
    }
  },

  pledgeSpend: async (gapId: string, amountPkr: number) => {
    if (amountPkr <= 0) return false;
    const { gaps } = get();
    const updatedGaps = gaps.map(g => {
      if (g.id === gapId) {
        return {
          ...g,
          pledgedMonthlySpendPkr: g.pledgedMonthlySpendPkr + amountPkr,
          unmetDemandCount: g.unmetDemandCount + 1
        };
      }
      return g;
    });

    set({ gaps: updatedGaps });
    try {
      localStorage.setItem(BOUNTY_STORAGE_KEY, JSON.stringify(updatedGaps));
      if (api.marketGaps?.pledge) {
        await api.marketGaps.pledge(gapId, amountPkr);
      }
    } catch {}
    return true;
  },

  createGap: async (gapPayload) => {
    const newGap: MarketGap = {
      ...gapPayload,
      id: `gap_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      votesCount: 1,
      unmetDemandCount: 1,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newGap, ...get().gaps];
    set({ gaps: updated });
    try {
      localStorage.setItem(BOUNTY_STORAGE_KEY, JSON.stringify(updated));
      if (api.marketGaps?.create) {
        await api.marketGaps.create(newGap);
      }
    } catch {}
    return true;
  },

  refreshGaps: async () => {
    try {
      set({ isLoading: true });
      if (api.marketGaps?.list) {
        const res = await api.marketGaps.list();
        if (res?.gaps && res.gaps.length > 0) {
          set({ gaps: res.gaps, isLoading: false });
          localStorage.setItem(BOUNTY_STORAGE_KEY, JSON.stringify(res.gaps));
          return;
        }
      }
      set({ gaps: loadInitialGaps(), isLoading: false });
    } catch {
      set({ gaps: loadInitialGaps(), isLoading: false });
    }
  },

  getTotalUnmetDemand: () => {
    return get().gaps.reduce((acc, g) => acc + (g.unmetDemandCount || 0), 0);
  },

  getTotalPledgedSpendPkr: () => {
    return get().gaps.reduce((acc, g) => acc + (g.pledgedMonthlySpendPkr || 0), 0);
  }
}));
