import { useMemo } from 'react';
import { useProducts } from './useProducts';

export const useSearch = () => {
  const { products, searchQuery, selectedCategory } = useProducts();

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    
    return products.filter(product => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      if (!q) return true;

      const matchName = product.name.toLowerCase().includes(q);
      const matchCompany = product.parentCompany.toLowerCase().includes(q);
      const matchReason = product.boycottReason.toLowerCase().includes(q);
      const matchTags = product.tags && product.tags.some(t => t.toLowerCase().includes(q));
      const matchBarcode = product.israelBarcode && product.israelBarcode.includes(q);
      const matchAlt = product.alternatives.some(a => a.name.toLowerCase().includes(q) || a.country.toLowerCase().includes(q));
      const matchEndorsed = product.endorsedBrands && product.endorsedBrands.some(b => b.toLowerCase().includes(q));

      return matchName || matchCompany || matchReason || matchTags || matchBarcode || matchAlt || matchEndorsed;
    });
  }, [products, searchQuery, selectedCategory]);

  return { filteredProducts };
};
