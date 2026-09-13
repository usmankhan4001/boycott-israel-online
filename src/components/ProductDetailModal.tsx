import React from 'react';
import { ProductItem } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  X, 
  ShieldAlert, 
  CheckCircle2, 
  Building2, 
  Plus, 
  Share2, 
  Barcode, 
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

interface Props {
  product: ProductItem | null;
  onClose: () => void;
  onAddToGrocery: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<Props> = ({
  product,
  onClose,
  onAddToGrocery
}) => {
  if (!product) return null;

  const handleShare = () => {
    const text = `🇵🇸 Boycott Intel: ${product.name} (${product.parentCompany})\nComplicity: ${product.boycottReason}\n\nSafe Alternatives: ${product.alternatives.map(a => `${a.name} (${a.country})`).join(', ')}\n\nChecked on Free Palestine PWA`;
    if (navigator.share) {
      navigator.share({
        title: `Boycott: ${product.name}`,
        text: text,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Intel copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#1C1C1E] rounded-3xl border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo
              name={product.name}
              domain={product.domain}
              logo={product.logo}
              size="lg"
              isBoycott={true}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-gray-400">
                  {product.category}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
                  {product.severity} Target
                </span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-gray-500" />
                <span>Parent: <strong className="text-gray-200">{product.parentCompany}</strong></span>
                {product.israelBarcode && (
                  <span className="ml-1 text-[10px] text-red-400 font-bold bg-red-500/10 px-1.5 py-0.5 rounded">
                    Prefix 729
                  </span>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/[0.08] text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 space-y-5 overflow-y-auto">
          
          {/* Reason Box */}
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-2">
            <div className="text-xs font-bold text-red-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Why This Brand is Boycotted</span>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed">
              {product.boycottReason}
            </p>
          </div>

          {/* Gaza Conscience Principle */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-1.5">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <span>🇵🇸 The Gaza Conscience Standard</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              "Do not buy the blood of your brothers and sisters in Gaza. Convenience cannot justify financing corporations with documented complicity in the occupation."
            </p>
          </div>

          {/* Safe Alternatives Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Verified Ethical Alternatives ({product.alternatives.length})
              </span>
            </div>

            {product.alternatives.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.alternatives.map((alt, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between gap-3 hover:border-white/[0.15] transition-colors"
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
                        <div className="text-xs font-bold text-white truncate">{alt.name}</div>
                        <div className="text-[10px] text-emerald-400">{alt.country}</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 shrink-0">
                      ✓ Safe
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-gray-400 italic p-3 bg-black/30 rounded-xl">
                Look for local, unbranded, or independent producers.
              </div>
            )}
          </div>

        </div>

        {/* Action Footer */}
        <div className="p-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
          <button
            onClick={handleShare}
            className="ios-btn px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs font-semibold text-white flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Intel
          </button>

          <button
            onClick={() => { onAddToGrocery(product); onClose(); }}
            className="ios-btn px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add Safe Alternative to Grocery
          </button>
        </div>

      </div>
    </div>
  );
};
