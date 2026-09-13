import React from 'react';
import { ProductItem } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  X, 
  AlertOctagon, 
  CheckCircle, 
  Share2, 
  Plus
} from 'lucide-react';

interface Props {
  product: ProductItem | null;
  onClose: () => void;
  onAddToGrocery: (product: ProductItem) => void;
}

export const NoThanksProofModal: React.FC<Props> = ({
  product,
  onClose,
  onAddToGrocery
}) => {
  if (!product) return null;

  const handleShare = () => {
    const text = `🇵🇸 NO THANKS! Boycott Proof for ${product.name} (${product.parentCompany}):\n\nReason: ${product.boycottReason}\n\nSafe Alternatives: ${product.alternatives.map(a => `${a.name} (${a.country})`).join(', ')}\n\nChecked on No Thanks Boycott App.`;
    if (navigator.share) {
      navigator.share({
        title: `Boycott Proof: ${product.name}`,
        text: text,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Proof copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo
              name={product.name}
              domain={product.domain}
              logo={product.logo}
              size="lg"
              isBoycott={true}
            />
            <div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-rose-600 text-white shadow-sm">
                NO THANKS TARGET
              </span>
              <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100 mt-0.5">{product.name}</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Parent: {product.parentCompany}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          
          {/* Proof Box */}
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-rose-700 dark:text-rose-400 uppercase tracking-wider">
              <AlertOctagon className="w-4 h-4" />
              <span>Documented Reason & Complicity</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
              {product.boycottReason}
            </p>
          </div>

          {/* Gaza Conscience Principle */}
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-700 dark:text-zinc-300 space-y-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400">🇵🇸 Gaza Solidarity Principle:</span>
            <p className="text-[11px] leading-relaxed">
              "Do not buy the blood of your brothers and sisters in Gaza. Shifting to local products directly denies revenue to corporations supporting the occupation."
            </p>
          </div>

          {/* Safe Alternatives */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              Verified Safe Local Alternatives ({product.alternatives.length})
            </span>

            <div className="grid grid-cols-1 gap-2">
              {product.alternatives.map((alt, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <BrandLogo
                      name={alt.name}
                      domain={alt.domain}
                      logo={alt.logo}
                      size="sm"
                      isBoycott={false}
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate">{alt.name}</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{alt.country}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    ✓ Safe
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
          <button
            onClick={handleShare}
            className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={() => { onAddToGrocery(product); onClose(); }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Grocery</span>
          </button>
        </div>

      </div>
    </div>
  );
};
