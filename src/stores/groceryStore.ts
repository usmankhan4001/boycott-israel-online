import { create } from 'zustand';
import { GroceryItem } from '../types';
import { getStoredGroceryList, saveStoredGroceryList } from '../utils/storage';

interface GroceryState {
  groceryList: GroceryItem[];
  addItem: (item: GroceryItem) => void;
  removeItem: (id: string) => void;
  toggleCheck: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearList: () => void;
}

export const useGroceryStore = create<GroceryState>((set) => ({
  groceryList: getStoredGroceryList(),
  addItem: (item) => set((state) => {
    const updated = [item, ...state.groceryList];
    saveStoredGroceryList(updated);
    return { groceryList: updated };
  }),
  removeItem: (id) => set((state) => {
    const updated = state.groceryList.filter(i => i.id !== id);
    saveStoredGroceryList(updated);
    return { groceryList: updated };
  }),
  toggleCheck: (id) => set((state) => {
    const updated = state.groceryList.map(i => i.id === id ? { ...i, checked: !i.checked } : i);
    saveStoredGroceryList(updated);
    return { groceryList: updated };
  }),
  updateQuantity: (id, quantity) => set((state) => {
    const updated = state.groceryList.map(i => i.id === id ? { ...i, quantity } : i);
    saveStoredGroceryList(updated);
    return { groceryList: updated };
  }),
  clearList: () => set(() => {
    saveStoredGroceryList([]);
    return { groceryList: [] };
  }),
}));
