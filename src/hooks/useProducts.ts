import { useProductStore } from '../stores/productStore';

export const useProducts = () => {
  const products = useProductStore(state => state.products);
  const isLoading = useProductStore(state => state.isLoading);
  const searchQuery = useProductStore(state => state.searchQuery);
  const selectedCategory = useProductStore(state => state.selectedCategory);
  const setSearchQuery = useProductStore(state => state.setSearchQuery);
  const setSelectedCategory = useProductStore(state => state.setSelectedCategory);
  const refreshProducts = useProductStore(state => state.refreshProducts);

  return {
    products,
    isLoading,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    refreshProducts
  };
};
