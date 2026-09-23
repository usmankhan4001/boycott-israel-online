import React from 'react';
import { Link } from 'react-router-dom';
import { ProductItem } from '../../types';
import { BrandLogo } from '../BrandLogo';
import { Plus, CheckCircle2, ShieldAlert, Share2, Users } from 'lucide-react';
import { useGroceryStore } from '../../stores/groceryStore';
import { useUIStore } from '../../stores/uiStore';
import { useTranslation } from '../../i18n/useTranslation';
import { getLocalizedProductName, getLocalizedParentCompany, getLocalizedBoycottReason } from '../../utils/urduProductTranslator';

interface Props {
  product: ProductItem;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const addItem = useGroceryStore(state => state.addItem);
  const showToast = useUIStore(state => state.showToast);
  const { t, isUrdu, language, translateCategory } = useTranslation();

  const isCelebrity = 
    product.category === 'Celebrities & Endorsers' || 
    product.categoryType === 'celebrity' ||
    (product.id && product.id.startsWith('celeb-'));

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCelebrity) return;

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

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {}
    }

    showToast(isUrdu ? `${defaultAlt} لسٹ میں شامل ہو گیا` : `Added ${defaultAlt} to grocery list`);
  };

  const handleQuickShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const text = isCelebrity
      ? `🚨 ${isUrdu ? 'بائیکاٹ ہدف' : 'BOYCOTT CALLOUT'}: ${product.name}\n${product.boycottReason}\nhttps://boycottisraelonline.com/product/${product.id}`
      : `🚨 ${isUrdu ? 'بائیکاٹ ہدف' : 'BOYCOTT TARGET'}: ${product.name} (${product.parentCompany || product.category})\n${isUrdu ? 'محفوظ متبادل' : 'Safe Alternative'}: ${product.alternatives.map(a => a.name).join(', ') || 'Local Pakistani Brand'}\nhttps://boycottisraelonline.com/product/${product.id}`;

    if (navigator.share) {
      navigator.share({
        title: `Boycott: ${product.name}`,
        text: text,
        url: `https://boycottisraelonline.com/product/${product.id}`
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      showToast(isUrdu ? 'معلومات کاپی کر لی گئی ہیں' : 'Evidence copied to clipboard!');
    }
  };

  const severityStyles = {
    Critical: 'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300 border border-red-200 dark:border-red-900',
    High: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-900',
    Caution: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/80 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-900'
  };

  const topAlternative = isCelebrity ? null : product.alternatives?.[0];

  return (
    <Link 
      to={`/product/${product.id}`}
      className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-rose-500/50 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group active:scale-[0.99] h-full relative"
    >
      <div className="space-y-3">
        {/* Header with Logo, Name, and Badges */}
        <div className="flex items-start gap-3.5">
          <BrandLogo 
            name={product.name} 
            domain={product.domain} 
            logo={product.logo} 
            size="md" 
            isBoycott={true} 
            className="rounded-2xl shrink-0 shadow-2xs" 
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                isCelebrity 
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-900'
                  : severityStyles[product.severity] || severityStyles.High
              }`}>
                {isCelebrity ? t.endorser : product.severity === 'Critical' ? `🔴 ${t.critical}` : t.doNotBuy}
              </span>
            </div>
            
            <h4 className="font-black text-sm text-zinc-900 dark:text-zinc-50 group-hover:text-rose-600 transition-colors truncate mt-1 block" dir="auto">
              {getLocalizedProductName(product, language)}
            </h4>
            
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate block" dir="auto">
              {getLocalizedParentCompany(product.parentCompany, language) || translateCategory(product.category)}
            </p>
          </div>
        </div>

        {/* Reason summary snippet */}
        <p className="text-[11px] text-zinc-600 dark:text-zinc-300 line-clamp-2 leading-relaxed bg-zinc-50 dark:bg-zinc-800/40 p-2.5 rounded-2xl border border-zinc-100 dark:border-zinc-800/60" dir="auto">
          {getLocalizedBoycottReason(product.boycottReason, language)}
        </p>

        {/* Section: Safe Alternative (for goods) OR Callout Notice (for celebrities) */}
        {isCelebrity ? (
          <div className="flex items-center gap-1.5 p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-900/60 text-purple-800 dark:text-purple-300 text-xs font-bold">
            <Users className="w-3.5 h-3.5 shrink-0 text-purple-500" />
            <span className="truncate text-[11px]" dir="auto">
              {t.demandContractCancellation}
            </span>
          </div>
        ) : topAlternative ? (
          <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <div className="flex items-center gap-1.5 min-w-0 pr-2">
              <span className="shrink-0 text-sm">🇵🇰</span>
              <span className="truncate text-[11px]" dir="auto">
                {t.safeAlt}: <strong>{topAlternative.name}</strong>
              </span>
            </div>
            {product.alternatives.length > 1 && (
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold shrink-0" dir="ltr">
                +{product.alternatives.length - 1}
              </span>
            )}
          </div>
        ) : (
          <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-400 text-[11px] font-semibold text-center">
            {isUrdu ? 'مقامی پاکستانی متبادل تلاش کریں' : 'Look for local Pakistani equivalents'}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
        <span className="text-[11px] text-zinc-400 font-bold group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors">
          {isUrdu ? 'تفصیلات دیکھیں ←' : 'View full evidence →'}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleQuickShare}
            className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors active:scale-90"
            title={t.share}
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          
          {!isCelebrity && (
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 font-bold text-xs shadow-2xs transition-colors active:scale-90"
              title={t.addAltToGrocery}
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="text-[10px]">{t.safeAlt}</span>
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};
