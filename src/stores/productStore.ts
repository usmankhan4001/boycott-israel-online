import { create } from 'zustand';
import { ProductItem } from '../types';
import { getAllProducts } from '../utils/storage';
import { api } from '../lib/api';

interface ProductState {
  products: ProductItem[];
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  refreshProducts: () => Promise<void>;
  addProduct: (product: Partial<ProductItem>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: getAllProducts(),
  isLoading: false,
  searchQuery: '',
  selectedCategory: 'All',
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  refreshProducts: async () => {
    try {
      set({ isLoading: true });
      const res = await api.products.list();
      if (res?.products && res.products.length > 0) {
        set({ products: res.products, isLoading: false });
        // Cache to local storage for offline use
        try {
          localStorage.setItem('bio_custom_products', JSON.stringify(res.products));
        } catch {}
      } else {
        // Fallback to bundled data
        set({ products: getAllProducts(), isLoading: false });
      }
    } catch (err) {
      set({ products: getAllProducts(), isLoading: false });
    }
  },
  addProduct: async (product) => {
    try {
      await api.products.create(product);
      await get().refreshProducts();
      return true;
    } catch {
      return false;
    }
  },
  deleteProduct: async (id) => {
    try {
      await api.products.delete(id);
      await get().refreshProducts();
      return true;
    } catch {
      return false;
    }
  }
}));
