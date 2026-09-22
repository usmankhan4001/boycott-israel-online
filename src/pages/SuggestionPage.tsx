import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SuggestionModal } from '../components/SuggestionModal';
import { useUIStore } from '../stores/uiStore';

export const SuggestionPage: React.FC = () => {
  const navigate = useNavigate();
  const showToast = useUIStore(state => state.showToast);

  const handleClose = () => {
    navigate(-1);
  };

  const handleSubmitted = (newProduct?: any) => {
    if (newProduct) {
      showToast(`Product "${newProduct.name}" added to database!`);
    } else {
      showToast('Thank you! Your suggestion was submitted.');
    }
    navigate('/');
  };

  return (
    <SuggestionModal 
      isOpen={true}
      onClose={handleClose}
      onProductAdded={handleSubmitted}
    />
  );
};
