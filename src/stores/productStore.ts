import { create } from 'zustand';
import { ProductItem } from '../types';
import { getAllProducts } from '../utils/storage';
import { isSanityConfigured, fetchSanityProducts } from '../lib/sanity';

interface ProductState {
  products: ProductItem[];
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  refreshProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: getAllProducts(),
  searchQuery: '',
  selectedCategory: 'All',
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  refreshProducts: async () => {
    const localProducts = getAllProducts();
    set({ products: localProducts });
    if (isSanityConfigured()) {
      try {
        const sanityData = await fetchSanityProducts();
        if (sanityData && sanityData.length > 0) {
          set({ products: sanityData });
        }
      } catch (err) {
        // Fallback to local is already done
      }
    }
  },
}));
