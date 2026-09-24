import { create } from 'zustand';
import { ToxicAdditive, RetailBrand, AlternativeProfile } from '../types';
import {
  TOXIC_ADDITIVES,
  RETAIL_BRANDS,
  ALTERNATIVE_PROFILES
} from '../data/complicityData';
import { api } from '../lib/api';

interface TayyibState {
  toxicAdditives: ToxicAdditive[];
  brands: RetailBrand[];
  profiles: AlternativeProfile[];
  
  selectedAdditiveCode: string | null;
  chemicalSearchQuery: string;
  selectedCategory: string;
  filterOnlyTayyib: boolean;
  filterOnlyOrganic: boolean;
  filterOnlyFarmToTable: boolean;
  isLoading: boolean;

  // Actions
  setSelectedAdditiveCode: (code: string | null) => void;
  setChemicalSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setFilterOnlyTayyib: (val: boolean) => void;
  setFilterOnlyOrganic: (val: boolean) => void;
  setFilterOnlyFarmToTable: (val: boolean) => void;
  
  // Data sync & analysis
  refreshData: () => Promise<void>;
  analyzeIngredients: (ingredientText: string) => {
    foundAdditives: ToxicAdditive[];
    severityScore: number;
    tayyibCleanRatio: number;
    recommendedSwaps: { boycottedOrToxic: string; cleanAlternative: RetailBrand; profile?: AlternativeProfile }[];
  };
  getProfileForBrand: (brandId: string) => AlternativeProfile | undefined;
}

export const useTayyibStore = create<TayyibState>((set, get) => ({
  toxicAdditives: TOXIC_ADDITIVES,
  brands: RETAIL_BRANDS,
  profiles: ALTERNATIVE_PROFILES,
  
  selectedAdditiveCode: null,
  chemicalSearchQuery: '',
  selectedCategory: 'All',
  filterOnlyTayyib: false,
  filterOnlyOrganic: false,
  filterOnlyFarmToTable: false,
  isLoading: false,

  setSelectedAdditiveCode: (code) => set({ selectedAdditiveCode: code }),
  setChemicalSearchQuery: (query) => set({ chemicalSearchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setFilterOnlyTayyib: (val) => set({ filterOnlyTayyib: val }),
  setFilterOnlyOrganic: (val) => set({ filterOnlyOrganic: val }),
  setFilterOnlyFarmToTable: (val) => set({ filterOnlyFarmToTable: val }),

  refreshData: async () => {
    try {
      set({ isLoading: true });
      const [additivesRes, brandsRes, profilesRes] = await Promise.allSettled([
        api.toxicAdditives?.list ? api.toxicAdditives.list() : Promise.reject('No api.toxicAdditives'),
        api.retailBrands?.list ? api.retailBrands.list() : Promise.reject('No api.retailBrands'),
        api.alternativeProfiles?.list ? api.alternativeProfiles.list() : Promise.reject('No api.alternativeProfiles')
      ]);

      set({
        toxicAdditives: additivesRes.status === 'fulfilled' && additivesRes.value?.additives?.length ? additivesRes.value.additives : TOXIC_ADDITIVES,
        brands: brandsRes.status === 'fulfilled' && brandsRes.value?.brands?.length ? brandsRes.value.brands : RETAIL_BRANDS,
        profiles: profilesRes.status === 'fulfilled' && profilesRes.value?.profiles?.length ? profilesRes.value.profiles : ALTERNATIVE_PROFILES,
        isLoading: false
      });
    } catch {
      set({
        toxicAdditives: TOXIC_ADDITIVES,
        brands: RETAIL_BRANDS,
        profiles: ALTERNATIVE_PROFILES,
        isLoading: false
      });
    }
  },

  getProfileForBrand: (brandId: string) => {
    return get().profiles.find(p => p.brandId === brandId);
  },

  analyzeIngredients: (ingredientText: string) => {
    const text = ingredientText.toLowerCase();
    const { toxicAdditives, brands, profiles } = get();
    
    const foundAdditives = toxicAdditives.filter(add => {
      const codeMatch = add.code.toLowerCase().split('/').some(part => text.includes(part.trim()));
      const nameMatch = text.includes(add.name.toLowerCase());
      return codeMatch || nameMatch;
    });

    const severityScore = foundAdditives.length * 25; // 0 to 100+
    const tayyibCleanRatio = Math.max(0, 100 - severityScore);

    // Find clean alternatives for flagged items
    const recommendedSwaps: { boycottedOrToxic: string; cleanAlternative: RetailBrand; profile?: AlternativeProfile }[] = [];
    
    brands
      .filter(b => b.brandType === 'alternative')
      .slice(0, 3)
      .forEach(altBrand => {
        const prof = profiles.find(p => p.brandId === altBrand.id);
        recommendedSwaps.push({
          boycottedOrToxic: ingredientText.slice(0, 30) + '...',
          cleanAlternative: altBrand,
          profile: prof
        });
      });

    return {
      foundAdditives,
      severityScore,
      tayyibCleanRatio,
      recommendedSwaps
    };
  }
}));
