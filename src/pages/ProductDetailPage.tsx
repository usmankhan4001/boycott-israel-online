import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetailView } from '../components/ProductDetailView';
import { useProducts } from '../hooks/useProducts';
import { useGroceryStore } from '../stores/groceryStore';
import { useUIStore } from '../stores/uiStore';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();
  const addItem = useGroceryStore(state => state.addItem);
  const showToast = useUIStore(state => state.showToast);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold">Product not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const handleAddProductToGrocery = (p: any) => {
    const defaultAlt = p.alternatives[0]?.name || 'Local Safe Brand';
    const defaultCountry = p.alternatives[0]?.country || 'Pakistan';
    
    addItem({
      id: `g-${Date.now()}-${Math.random()}`,
      name: p.name,
      category: p.category,
      isBoycott: true,
      parentCompany: p.parentCompany,
      boycottReason: p.boycottReason,
      chosenAlternative: defaultAlt,
      alternativeCountry: defaultCountry,
      suggestedAlternatives: p.alternatives,
      checked: false,
      quantity: 1,
      unit: 'item',
      logo: p.logo
    });
    showToast(`Added ${defaultAlt} to grocery list`);
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      <ProductDetailView 
        product={product}
        onBack={() => navigate(-1)}
        onAddToGrocery={handleAddProductToGrocery}
      />
    </div>
  );
};
