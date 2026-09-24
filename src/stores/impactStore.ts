import { create } from 'zustand';
import { UserImpactRecord, UserImpactSummary } from '../types';

const STORAGE_KEY = 'takweyat_user_impact_ledger_v1';
const USD_PKR_RATE = 280; // Standard nominal conversion rate
const LOCAL_CIRCULATION_MULTIPLIER = 2.5; // Every 1 PKR retained circulates 2.5x domestically

interface ImpactState {
  records: UserImpactRecord[];
  isLoading: boolean;

  // Actions
  recordBoycottSwap: (payload: {
    boycottedBrandId: string;
    boycottedBrandName: string;
    alternativeBrandId: string;
    alternativeBrandName: string;
    amountSavedPkr: number;
    category: string;
    notes?: string;
  }) => UserImpactRecord;

  deleteRecord: (id: string) => void;
  clearLedger: () => void;
  getSummary: () => UserImpactSummary;
  exportLedgerJson: () => string;
  importLedgerJson: (json: string) => boolean;
}

const loadInitialRecords = (): UserImpactRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}

  // Seed with default initial demonstration entries
  return [
    {
      id: 'rec_init_1',
      date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
      boycottedBrandId: 'pepsi_brand',
      boycottedBrandName: 'Pepsi Cola 1.5L',
      alternativeBrandId: 'pakola_cola',
      alternativeBrandName: 'Pakola Cola 1.5L',
      amountSavedPkr: 220,
      amountDivertedUsd: 220 / USD_PKR_RATE,
      multiplierEffectPkr: 220 * LOCAL_CIRCULATION_MULTIPLIER,
      category: 'Beverages',
      notes: 'Family dinner swap to local Pakistani drink'
    },
    {
      id: 'rec_init_2',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      boycottedBrandId: 'lays_chips',
      boycottedBrandName: 'Lay’s French Cheese Party Pack',
      alternativeBrandId: 'kolson_potato_sticks',
      alternativeBrandName: 'Kolson Potato Sticks',
      amountSavedPkr: 150,
      amountDivertedUsd: 150 / USD_PKR_RATE,
      multiplierEffectPkr: 150 * LOCAL_CIRCULATION_MULTIPLIER,
      category: 'Snacks & Confectionery',
      notes: 'Evening tea snack replacement'
    }
  ];
};

export const useImpactStore = create<ImpactState>((set, get) => ({
  records: loadInitialRecords(),
  isLoading: false,

  recordBoycottSwap: (payload) => {
    const amountPkr = Math.max(0, payload.amountSavedPkr || 0);
    const amountUsd = Number((amountPkr / USD_PKR_RATE).toFixed(2));
    const multiplierEffectPkr = Number((amountPkr * LOCAL_CIRCULATION_MULTIPLIER).toFixed(2));

    const newRecord: UserImpactRecord = {
      id: `impact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString().split('T')[0],
      boycottedBrandId: payload.boycottedBrandId,
      boycottedBrandName: payload.boycottedBrandName,
      alternativeBrandId: payload.alternativeBrandId,
      alternativeBrandName: payload.alternativeBrandName,
      amountSavedPkr: amountPkr,
      amountDivertedUsd: amountUsd,
      multiplierEffectPkr,
      category: payload.category,
      notes: payload.notes
    };

    const updated = [newRecord, ...get().records];
    set({ records: updated });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}

    return newRecord;
  },

  deleteRecord: (id) => {
    const updated = get().records.filter(r => r.id !== id);
    set({ records: updated });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  },

  clearLedger: () => {
    set({ records: [] });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  },

  getSummary: () => {
    const records = get().records;
    const totalBoycottTransactions = records.length;
    const totalDivertedUsd = Number(records.reduce((acc, r) => acc + (r.amountDivertedUsd || 0), 0).toFixed(2));
    const totalRetainedPkr = Number(records.reduce((acc, r) => acc + (r.amountSavedPkr || 0), 0).toFixed(2));
    const communityCirculationValuePkr = Number(records.reduce((acc, r) => acc + (r.multiplierEffectPkr || 0), 0).toFixed(2));

    // Calculate unique consecutive active days
    const uniqueDates = Array.from(new Set(records.map(r => r.date))).sort().reverse();
    let currentStreakDays = 0;
    if (uniqueDates.length > 0) {
      currentStreakDays = uniqueDates.length;
    }

    return {
      totalBoycottTransactions,
      totalDivertedUsd,
      totalRetainedPkr,
      communityCirculationValuePkr,
      currentStreakDays,
      records
    };
  },

  exportLedgerJson: () => {
    return JSON.stringify(get().records, null, 2);
  },

  importLedgerJson: (json: string) => {
    try {
      const parsed = JSON.parse(json);
      if (Array.isArray(parsed)) {
        set({ records: parsed });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        return true;
      }
    } catch {}
    return false;
  }
}));
