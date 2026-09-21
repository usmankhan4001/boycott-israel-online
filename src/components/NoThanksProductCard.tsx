import React, { useState } from 'react';
import { ProductItem } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  XCircle, 
  CheckCircle, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  Barcode, 
  AlertOctagon,
  Share2,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  HeartHandshake
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

  const getCountryFlag = (country: string) => {
    if (country.includes('Pakistan')) return '🇵🇰 Pakistan';
    if (country.includes('Turkey')) return '🇹🇷 Turkey';
    if (country.includes('Palestine')) return '🇵🇸 Palestine';
    if (country.includes('Saudi') || country.includes('KSA')) return '🇸🇦 Saudi';
    if (country.includes('UAE')) return '🇦🇪 UAE';
    if (country.includes('Indonesia')) return '🇮🇩 Indonesia';
    if (country.includes('Egypt')) return '🇪🇬 Egypt';
    return `🌐 ${country}`;
  };

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

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/40 dark:hover:border-rose-500/40 rounded-2xl p-4 transition-all shadow-xs hover:shadow-md space-y-3 cursor-pointer group"
    >
      {/* Top Header: Brand Name + Boycott Status */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <BrandLogo
            name={product.name}
            domain={product.domain}
            logo={product.logo}
            size="md"
            isBoycott={true}
            className="rounded-xl"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-rose-600 text-white shadow-2xs">
                {product.category === 'Celebrities & Endorsers' ? 'COMPLICIT ENDORSER' : 'DO NOT BUY'}
              </span>
              {product.israelBarcode && (
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-800 flex items-center gap-0.5">
                  <Barcode className="w-3 h-3" /> 729 Code
                </span>
              )}
              {product.behaviorNotes && (
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-900/60 flex items-center gap-0.5">
                  <ShieldAlert className="w-3 h-3" /> Documented Action
                </span>
              )}
            </div>
            <h3 className="font-black text-base text-zinc-900 dark:text-zinc-100 truncate mt-0.5 group-hover:text-rose-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
              {product.category === 'Celebrities & Endorsers' ? 'Promoted Entity:' : 'Owned by:'} <strong className="text-zinc-700 dark:text-zinc-300">{product.parentCompany}</strong>
            </p>
          </div>
        </div>

        {/* View Details / Evidence Button */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs font-bold flex items-center gap-1"
            title="Toggle evidence summary"
          >
            <span>Reason</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Endorsed Brands Pill List (For Celebrities) */}
      {product.endorsedBrands && product.endorsedBrands.length > 0 && (
        <div className="p-2 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/70 dark:border-rose-900/50 text-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-400 block mb-1">
            Boycotted Brands Promoted:
          </span>
          <div className="flex flex-wrap gap-1">
            {product.endorsedBrands.map((brand, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-md bg-white dark:bg-zinc-900 text-rose-700 dark:text-rose-300 font-bold text-[11px] border border-rose-200 dark:border-rose-900/60 shadow-2xs">
                {brand}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Direct Complicity Evidence */}
      <div className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 font-medium">
        <strong className="text-rose-700 dark:text-rose-400 font-bold block mb-0.5">
          {product.category === 'Celebrities & Endorsers' ? 'Why this endorser is called out:' : 'Why this brand is boycotted:'}
        </strong>
        {product.boycottReason}
      </div>

      {/* Side-by-Side Safe Alternative Section */}
      <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800 dark:text-emerald-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            {product.category === 'Celebrities & Endorsers' ? 'ETHICAL CONSCIOUS ROLE MODELS:' : 'BUY SAFE PAKISTANI ALTERNATIVE INSTEAD:'}
          </span>
          <span className="text-zinc-500 dark:text-zinc-400 text-[10px] font-medium">
            {product.alternatives.length} safe options
          </span>
        </div>

        {topAlternative ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <BrandLogo
                name={topAlternative.name}
                domain={topAlternative.domain}
                logo={topAlternative.logo}
                size="sm"
                isBoycott={false}
                className="rounded-lg"
              />
              <div className="min-w-0">
                <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                  {topAlternative.name}
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                  {getCountryFlag(topAlternative.country)} • Local Ethical Choice
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToGrocery(product);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-2xs transition-transform active:scale-95 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Grocery</span>
            </button>
          </div>
        ) : (
          <div className="text-xs text-zinc-500 italic">
            Use independent local Pakistani alternatives.
          </div>
        )}

        {/* Other safe alternative badges */}
        {product.alternatives.length > 1 && (
          <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-emerald-200/60 dark:border-emerald-800/40 text-xs">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">Other local choices:</span>
            {product.alternatives.slice(1, 4).map((alt, idx) => (
              <span key={idx} className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white dark:bg-zinc-900 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-2xs">
                {alt.name} ({alt.country})
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Expandable In-Place Reason Accordion */}
      {isExpanded && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2.5 text-xs animate-in fade-in"
        >
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-1.5">
            <div className="flex items-center justify-between text-rose-800 dark:text-rose-400 font-bold">
              <span className="flex items-center gap-1">
                <AlertOctagon className="w-4 h-4" />
                <span>How this purchase funds oppression:</span>
              </span>
              <button
                onClick={handleShare}
                className="text-[11px] hover:underline flex items-center gap-1 font-bold text-rose-700 dark:text-rose-400"
              >
                <Share2 className="w-3 h-3" /> Share
              </button>
            </div>
            <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
              {product.boycottReason}
            </p>
          </div>

          <button
            onClick={handleCardClick}
            className="w-full py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
          >
            <span>View Full Complicity Report & Proof</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};
