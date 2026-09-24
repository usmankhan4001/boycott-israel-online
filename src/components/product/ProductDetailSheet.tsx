import React from 'react';
import { ProductItem } from '../../types';
import { BrandLogo } from '../BrandLogo';
import { 
  X, 
  Plus, 
  CheckCircle2, 
  ShieldAlert, 
  Share2, 
  ExternalLink, 
  Sparkles,
  Building2,
  Barcode,
  Globe,
  AlertTriangle
} from 'lucide-react';
import { useGroceryStore } from '../../stores/groceryStore';
import { useUIStore } from '../../stores/uiStore';
import { useTranslation } from '../../i18n/useTranslation';
import { getLocalizedProductName, getLocalizedParentCompany, getLocalizedBoycottReason } from '../../utils/urduProductTranslator';

interface Props {
  product: ProductItem | null;
  onClose: () => void;
}

export const ProductDetailSheet: React.FC<Props> = ({ product, onClose }) => {
  const addItem = useGroceryStore(state => state.addItem);
  const showToast = useUIStore(state => state.showToast);
  const { t, isUrdu } = useTranslation();

  if (!product) return null;

  const isCelebrity = 
    product.category === 'Celebrities & Endorsers' || 
    product.categoryType === 'celebrity' ||
    (product.id && product.id.startsWith('celeb-'));

  const localizedName = getLocalizedProductName({ name: product.name }, isUrdu ? 'ur' : 'en');
  const localizedParent = getLocalizedParentCompany(product.parentCompany, isUrdu ? 'ur' : 'en');
  const localizedReason = getLocalizedBoycottReason(product.boycottReason, isUrdu ? 'ur' : 'en');

  const handleAddAlternative = (altName: string, altCountry: string) => {
    addItem({
      id: `g-${Date.now()}-${Math.random()}`,
      name: product.name,
      category: product.category,
      isBoycott: true,
      parentCompany: product.parentCompany,
      boycottReason: product.boycottReason,
      chosenAlternative: altName,
      alternativeCountry: altCountry,
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

    showToast(isUrdu ? `${altName} لسٹ میں شامل ہو گیا` : `Added ${altName} to your grocery swap list`);
  };

  const handleShare = () => {
    const text = isCelebrity
      ? `🚨 ${isUrdu ? 'بائیکاٹ ہدف' : 'BOYCOTT CALLOUT'}: ${product.name}\n${product.boycottReason}\nhttps://boycottisraelonline.com/product/${product.id}`
      : `🚨 ${isUrdu ? 'بائیکاٹ ہدف' : 'BOYCOTT TARGET'}: ${product.name} (${product.parentCompany || product.category})\n${isUrdu ? 'محفوظ پاکستانی متبادل' : 'Safe Pakistani Alternative'}: ${product.alternatives.map(a => a.name).join(', ') || 'Local Pakistani Brand'}\nhttps://boycottisraelonline.com/product/${product.id}`;

    if (navigator.share) {
      navigator.share({
        title: `Boycott: ${product.name}`,
        text: text,
        url: `https://boycottisraelonline.com/product/${product.id}`
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      showToast(isUrdu ? 'معلومات کاپی کر لی گئی ہیں' : 'Evidence dossier copied to clipboard!');
    }
  };

  const severityStyles = {
    Critical: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    High: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Caution: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white dark:bg-zinc-950 border-t sm:border border-zinc-200 dark:border-zinc-800/80 rounded-t-[32px] sm:rounded-[32px] shadow-2xl max-h-[88vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-250"
        dir={isUrdu ? 'rtl' : 'ltr'}
      >
        {/* Top Drag Handle (Mobile) */}
        <div className="pt-3 pb-1 flex justify-center sm:hidden shrink-0">
          <div className="w-12 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-800" />
        </div>

        {/* Sheet Header */}
        <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-black border uppercase tracking-wider flex items-center gap-1.5 ${severityStyles[product.severity || 'High']}`}>
              <ShieldAlert className="w-3.5 h-3.5" />
              {product.severity || 'High Complicity'}
            </span>
            {product.israelBarcode && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 flex items-center gap-1">
                <Barcode className="w-3.5 h-3.5" />
                729 Barcode
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              title="Share Dossier"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sheet Body (Scrollable) */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          {/* Brand Identity Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60">
            <div className="p-1 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shrink-0 shadow-xs">
              <BrandLogo 
                name={product.name} 
                domain={product.domain} 
                logo={product.logo} 
                size="lg" 
                isBoycott={true} 
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white truncate">
                {localizedName}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="truncate">{product.category}</span>
                {product.parentCompany && (
                  <>
                    <span>•</span>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300 truncate">
                      {localizedParent}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Boycott Reason & Evidence Dossier */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              {isUrdu ? 'بائیکاٹ کی مستند وجہ اور شواہد' : 'Verified Evidence & Complicity Dossier'}
            </h4>
            <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15 text-zinc-800 dark:text-zinc-200 text-sm leading-relaxed font-medium">
              {localizedReason}
            </div>
          </div>

          {/* Verified Safe Alternatives (Swaps) */}
          {!isCelebrity && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isUrdu ? 'تصدیق شدہ پاک / مقامی متبادل' : 'Verified Safe & Local Swaps'}
                </h4>
                <span className="text-[11px] font-bold text-zinc-400">
                  {product.alternatives?.length || 0} {isUrdu ? 'متبادل دستیاب' : 'options'}
                </span>
              </div>

              {product.alternatives && product.alternatives.length > 0 ? (
                <div className="space-y-2.5">
                  {product.alternatives.map((alt, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between gap-3 hover:border-emerald-500/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-950 p-1 border border-zinc-200 dark:border-zinc-800 shrink-0 flex items-center justify-center">
                          <BrandLogo 
                            name={alt.name} 
                            domain={alt.domain} 
                            logo={alt.logo} 
                            size="sm" 
                            isBoycott={false} 
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-sm text-zinc-900 dark:text-white truncate">
                              {alt.name}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                              {alt.country === 'Pakistan' ? '🇵🇰 Pakistan' : `🌍 ${alt.country}`}
                            </span>
                          </div>
                          <span className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5 font-medium">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            {isUrdu ? 'طیب و محفوظ برانڈ' : 'Boycott-Free & Verified'}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddAlternative(alt.name, alt.country)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isUrdu ? 'لسٹ میں شامل کریں' : 'Add Swap'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 text-center text-xs text-zinc-500 font-semibold border border-dashed border-zinc-200 dark:border-zinc-800">
                  {isUrdu ? 'ابھی کوئی مقامی متبادل درج نہیں ہے۔ آپ تجویز کر سکتے ہیں!' : 'No verified local alternative logged yet. You can suggest one!'}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sheet Footer Action */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/50 flex gap-3 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 font-black text-xs transition-colors shadow-sm"
          >
            {isUrdu ? 'بند کریں' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
