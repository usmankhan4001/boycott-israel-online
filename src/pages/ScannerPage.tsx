import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NoThanksScanner } from '../components/NoThanksScanner';
import { useProducts } from '../hooks/useProducts';
import { useGroceryStore } from '../stores/groceryStore';
import { useUIStore } from '../stores/uiStore';
import { ArrowLeft } from 'lucide-react';

export const ScannerPage: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const addItem = useGroceryStore(state => state.addItem);
  const showToast = useUIStore(state => state.showToast);

  const handleViewProof = (product: any) => {
    navigate(`/product/${product.id}`);
  };

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
    <NoThanksScanner 
      isOpen={true} 
      onClose={() => navigate(-1)} 
      products={products} 
      onAddToGrocery={handleAddProductToGrocery}
      onViewProof={handleViewProof}
    />
  );
};
