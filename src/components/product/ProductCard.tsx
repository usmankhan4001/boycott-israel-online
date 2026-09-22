import React from 'react';
import { Link } from 'react-router-dom';
import { ProductItem } from '../../types';
import { BrandLogo } from '../BrandLogo';
import { ChevronRight, Plus } from 'lucide-react';
import { useGroceryStore } from '../../stores/groceryStore';
import { useUIStore } from '../../stores/uiStore';

interface Props {
  product: ProductItem;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const addItem = useGroceryStore(state => state.addItem);
  const showToast = useUIStore(state => state.showToast);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const defaultAlt = product.alternatives[0]?.name || 'Local Safe Brand';
    const defaultCountry = product.alternatives[0]?.country || 'Pakistan';
    
    addItem({
      id: `g-${Date.now()}-${Math.random()}`,
      name: product.name,
      category: product.category,
      isBoycott: true,
      parentCompany: product.parentCompany,
      boycottReason: product.boycottReason,
      chosenAlternative: defaultAlt,
      alternativeCountry: defaultCountry,
      suggestedAlternatives: product.alternatives,
      checked: false,
      quantity: 1,
      unit: 'item',
      logo: product.logo
    });
    showToast(`Added ${defaultAlt} to grocery list`);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/50 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group active:scale-[0.98] h-full"
    >
      <div className="flex items-start gap-3 min-w-0">
        <BrandLogo name={product.name} domain={product.domain} logo={product.logo} size="md" isBoycott={true} className="rounded-xl shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 transition-colors truncate">
              {product.name}
            </h4>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-400">
              Boycott
            </span>
          </div>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
            {product.parentCompany}
          </p>
          <div className="mt-2 text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1 truncate">
            <span>Alt: {product.alternatives[0]?.name || 'Local'}</span>
          </div>
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <span className="text-[10px] text-zinc-400 font-medium">View details</span>
        <button
          onClick={handleAdd}
          className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
          title="Add to Grocery List"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </Link>
  );
};
