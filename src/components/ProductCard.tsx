import React from 'react';
import { ProductItem } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  XCircle, 
  CheckCircle2, 
  Plus, 
  Info, 
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

interface Props {
  product: ProductItem;
  onViewDetails: (product: ProductItem) => void;
  onAddToGrocery: (product: ProductItem) => void;
  dataSaver: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  onViewDetails,
  onAddToGrocery,
  dataSaver
}) => {
  const topAlternative = product.alternatives[0];

  const getCountryFlag = (country: string) => {
    if (country.includes('Pakistan')) return '🇵🇰 Pakistan';
    if (country.includes('Turkey')) return '🇹🇷 Turkey';
    if (country.includes('Palestine')) return '🇵🇸 Palestine';
    if (country.includes('Saudi') || country.includes('KSA')) return '🇸🇦 Saudi';
    if (country.includes('UAE')) return '🇦🇪 UAE';
    if (country.includes('Indonesia')) return '🇮🇩 Indonesia';
    if (country.includes('Egypt')) return '🇪🇬 Egypt';
    if (country.includes('Japan')) return '🇯🇵 Japan';
    return `🌐 ${country}`;
  };

  return (
    <div className="bg-[#1C1C1E] border border-white/[0.08] hover:border-emerald-500/40 rounded-3xl p-4 sm:p-5 transition-all shadow-lg flex flex-col justify-between group">
      
      {/* Top Simple Tag */}
      <div className="flex items-center justify-between gap-2 mb-3.5">
        <span className="text-[11px] font-bold text-gray-400 bg-white/[0.06] px-3 py-1 rounded-full">
          {product.subcategory || product.category}
        </span>
        <button
          onClick={() => onViewDetails(product)}
          className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-medium transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Why boycott?</span>
        </button>
      </div>

      {/* Main Side-by-Side Comparison: ❌ Don't Buy vs ✅ Buy Instead */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        
        {/* Left: ❌ Boycotted Product */}
        <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-3.5 flex items-center gap-3">
          <BrandLogo
            name={product.name}
            domain={product.domain}
            logo={product.logo}
            size="lg"
            isBoycott={true}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-[10px] font-black text-red-400 uppercase tracking-wider mb-0.5">
              <XCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Don't Buy</span>
            </div>
            <div className="font-extrabold text-base text-white truncate">
              {product.name}
            </div>
            <div className="text-[11px] text-gray-400 truncate">
              {product.parentCompany}
            </div>
          </div>
        </div>

        {/* Right: ✅ Safe Local Alternative */}
        <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-3.5 flex items-center gap-3">
          {topAlternative ? (
            <>
              <BrandLogo
                name={topAlternative.name}
                domain={topAlternative.domain}
                logo={topAlternative.logo}
                size="lg"
                isBoycott={false}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-[10px] font-black text-emerald-400 uppercase tracking-wider mb-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Buy Instead</span>
                </div>
                <div className="font-extrabold text-base text-white truncate">
                  {topAlternative.name}
                </div>
                <div className="text-[11px] text-emerald-300 font-semibold truncate">
                  {getCountryFlag(topAlternative.country)}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-center text-xs text-gray-400 italic py-2">
              Use local / unbranded options
            </div>
          )}
        </div>

      </div>

      {/* Alternative Options Chips & 1-Tap Add Button */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] text-gray-400">
          {product.alternatives.length > 1 ? (
            <>
              <span className="text-gray-500 shrink-0">Other:</span>
              {product.alternatives.slice(1, 3).map((alt, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-white/[0.04] text-gray-300 font-medium shrink-0"
                >
                  {alt.name}
                </span>
              ))}
              {product.alternatives.length > 3 && (
                <button
                  onClick={() => onViewDetails(product)}
                  className="text-emerald-400 font-bold hover:underline shrink-0"
                >
                  +{product.alternatives.length - 3}
                </button>
              )}
            </>
          ) : (
            <span className="text-gray-500">100% Verified Safe Replacement</span>
          )}
        </div>

        {/* 1-Tap Add to Grocery Basket */}
        <button
          onClick={() => onAddToGrocery(product)}
          className="ios-btn px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add to Grocery</span>
        </button>
      </div>

    </div>
  );
};
