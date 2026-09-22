import React from 'react';
import { CategoriesView } from '../components/CategoriesView';
import { useProducts } from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';

export const CategoriesPage: React.FC = () => {
  const { products, setSelectedCategory, setSearchQuery } = useProducts();
  const navigate = useNavigate();

  const handleSelectCategory = (categoryName: string, query?: string) => {
    setSelectedCategory(categoryName);
    setSearchQuery(query || '');
    navigate('/');
  };

  return (
    <div className="animate-in fade-in duration-200">
      <CategoriesView 
        products={products}
        onSelectCategory={handleSelectCategory}
      />
    </div>
  );
};
