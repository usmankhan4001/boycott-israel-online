import React, { useState } from 'react';
import { ProductItem } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  XCircle, 
  CheckCircle, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  Barcode, 
  AlertOctagon,
  Share2,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface Props {
  product: ProductItem;
  onAddToGrocery: (product: ProductItem) => void;
  onSelect?: (product: ProductItem) => void;
}

export const NoThanksProductCard: React.FC<Props> = ({
  product,
  onAddToGrocery,
  onSelect
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const topAlternative = product.alternatives[0];

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `🚨 STOP BUYING: ${product.name} (${product.parentCompany})\n\nWhy to Boycott: ${product.boycottReason}\n\n✅ Safe Alternative: ${product.alternatives.map(a => `${a.name} (${a.country})`).join(', ')}\n\nBoycott to end oppression — BoycottIsrael by Takweyat Foundation.`;
    if (navigator.share) {
      navigator.share({
        title: `Boycott: ${product.name}`,
        text: text,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Evidence and alternatives copied to clipboard!');
    }
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(product);
    }
  };

  const isCelebrity = product.category === 'Celebrities & Endorsers';

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/50 dark:hover:border-rose-500/50 rounded-3xl p-3.5 sm:p-4 transition-all shadow-xs hover:shadow-lg flex flex-col justify-between cursor-pointer group space-y-3"
    >
      {/* Visual Media Showcase Box with Floating Boycott Tag */}
      <div className="w-full h-40 sm:h-44 bg-zinc-50 dark:bg-zinc-850 rounded-2xl flex flex-col items-center justify-center relative p-3 border border-zinc-100 dark:border-zinc-800/80 group-hover:bg-zinc-100/70 dark:group-hover:bg-zinc-800 transition-colors">
        
        {/* Floating Top-Right DO NOT BUY Tag */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1">
          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-rose-600 text-white shadow-2xs tracking-wider">
            {isCelebrity ? 'COMPLICIT' : 'DO NOT BUY'}
          </span>
          {product.israelBarcode && (
            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-white/90 dark:bg-zinc-900/90 px-1.5 py-0.5 rounded-md border border-rose-200 dark:border-rose-800 shadow-2xs flex items-center gap-0.5">
              <Barcode className="w-2.5 h-2.5" /> 729
            </span>
          )}
        </div>

        {/* Centered Large Bold Logo / Celebrity Portrait Frame */}
        <div className="p-1 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200/80 dark:border-zinc-700/80 transition-transform duration-200 group-hover:scale-105">
          <BrandLogo
            name={product.name}
            domain={product.domain}
            logo={product.logo}
            size="lg"
            isBoycott={true}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl"
          />
        </div>

        {/* Documented Action Tag */}
        {product.behaviorNotes && (
          <div className="absolute bottom-2 left-2.5 z-10">
            <span className="text-[9px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50/90 dark:bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-200/80 dark:border-amber-900/60 flex items-center gap-0.5">
              <ShieldAlert className="w-2.5 h-2.5" /> Documented
            </span>
          </div>
        )}
      </div>

      {/* Target Details */}
      <div className="space-y-1">
        <h3 className="font-black text-base text-zinc-900 dark:text-zinc-100 truncate group-hover:text-rose-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
          {isCelebrity ? 'Promoted Entity: ' : ''}<strong className="text-zinc-700 dark:text-zinc-300 font-semibold">{product.parentCompany}</strong>
        </p>
      </div>

      {/* Endorsed Brands Pill List (For Celebrities) */}
      {product.endorsedBrands && product.endorsedBrands.length > 0 && (
        <div className="p-2 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 text-xs">
          <span className="text-[9px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-400 block mb-1">
            Boycotted Brands Promoted:
          </span>
          <div className="flex flex-wrap gap-1">
            {product.endorsedBrands.slice(0, 3).map((brand, idx) => (
              <span key={idx} className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-900 text-rose-700 dark:text-rose-300 font-bold text-[10px] border border-rose-200 dark:border-rose-900/60 shadow-2xs">
                {brand}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Row: Highlighted Alternative with Chevron */}
      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
        {topAlternative ? (
          <div className="flex items-center justify-between w-full group/alt">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 truncate flex items-center gap-1">
              <span>Alt:</span>
              <span className="text-zinc-900 dark:text-zinc-100 font-extrabold">{topAlternative.name}</span>
            </span>
            <ChevronRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </div>
        ) : (
          <span className="text-xs text-zinc-400 italic">Use ethical local alternative</span>
        )}
      </div>

    </div>
  );
};
