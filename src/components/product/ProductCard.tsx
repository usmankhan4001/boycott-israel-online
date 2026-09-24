import React from 'react';
import { ProductItem } from '../../types';
import { BrandLogo } from '../BrandLogo';
import { Plus, CheckCircle2, ShieldAlert, ChevronRight } from 'lucide-react';
import { useGroceryStore } from '../../stores/groceryStore';
import { useUIStore } from '../../stores/uiStore';
import { useTranslation } from '../../i18n/useTranslation';
import { getLocalizedProductName, getLocalizedParentCompany } from '../../utils/urduProductTranslator';

interface Props {
  product: ProductItem;
  onClick?: () => void;
}

export const ProductCard: React.FC<Props> = ({ product, onClick }) => {
  const addItem = useGroceryStore(state => state.addItem);
  const showToast = useUIStore(state => state.showToast);
  const { isUrdu } = useTranslation();

  const isCelebrity = 
    product.category === 'Celebrities & Endorsers' || 
    product.categoryType === 'celebrity' ||
    (product.id && product.id.startsWith('celeb-'));

  const localizedName = getLocalizedProductName({ name: product.name }, isUrdu ? 'ur' : 'en');
  const localizedParent = getLocalizedParentCompany(product.parentCompany, isUrdu ? 'ur' : 'en');

  const topAlternative = isCelebrity ? null : product.alternatives?.[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCelebrity || !topAlternative) return;

    addItem({
      id: `g-${Date.now()}-${Math.random()}`,
      name: product.name,
      category: product.category,
      isBoycott: true,
      parentCompany: product.parentCompany,
      boycottReason: product.boycottReason,
      chosenAlternative: topAlternative.name,
      alternativeCountry: topAlternative.country || 'Pakistan',
      suggestedAlternatives: product.alternatives,
      checked: false,
      quantity: 1,
      unit: 'item',
      logo: product.logo
    });

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(12);
      } catch {}
    }

    showToast(isUrdu ? `${topAlternative.name} شامل ہو گیا` : `Added ${topAlternative.name} to swap list`);
  };

  return (
    <div 
      onClick={onClick}
      className="p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70 hover:border-zinc-400 dark:hover:border-zinc-700 shadow-xs hover:shadow-md transition-all active:scale-[0.99] flex items-center justify-between gap-3 cursor-pointer group select-none"
    >
      {/* Brand Identity & Swap Info */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        {/* Logo with status ring */}
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-950 p-1.5 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-center shadow-xs">
            <BrandLogo 
              name={product.name} 
              domain={product.domain} 
              logo={product.logo} 
              size="sm" 
              isBoycott={true} 
            />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-900" />
        </div>

        {/* Brand Text Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-black text-sm text-zinc-900 dark:text-zinc-100 truncate group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              {localizedName}
            </h4>
            <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md ${
              product.severity === 'Critical'
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
            }`}>
              {product.severity || 'Boycott'}
            </span>
          </div>

          <p className="text-[11px] text-zinc-400 truncate mt-0.5">
            {localizedParent ? `${localizedParent} • ` : ''}{product.category}
          </p>

          {/* Clean Swap Indicator */}
          {topAlternative && (
            <div className="flex items-center gap-1.5 mt-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              <span className="text-[10px] text-zinc-400 font-semibold">{isUrdu ? 'متبادل:' : 'Swap:'}</span>
              <span className="truncate bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                {topAlternative.name} {topAlternative.country === 'Pakistan' ? '🇵🇰' : '🌍'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Action Button */}
      <div className="flex items-center gap-1.5 shrink-0">
        {topAlternative && (
          <button
            onClick={handleQuickAdd}
            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-zinc-600 dark:text-zinc-300 transition-all active:scale-90"
            title={isUrdu ? 'لسٹ میں شامل کریں' : 'Add to swap list'}
            aria-label="Add alternative to list"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
        <div className="p-1 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
