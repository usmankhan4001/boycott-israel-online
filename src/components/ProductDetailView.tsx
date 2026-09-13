import React from 'react';
import { ProductItem } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  ArrowLeft, 
  Share2, 
  ShoppingCart, 
  AlertOctagon, 
  CheckCircle2, 
  Building2, 
  Barcode, 
  Plus, 
  ShieldAlert,
  Flame,
  HeartHandshake
} from 'lucide-react';

interface Props {
  product: ProductItem;
  onBack: () => void;
  onAddToGrocery: (product: ProductItem) => void;
}

export const ProductDetailView: React.FC<Props> = ({
  product,
  onBack,
  onAddToGrocery
}) => {
  const topAlternative = product.alternatives[0];

  const handleShare = () => {
    const text = `🚨 BOYCOTT TARGET: ${product.name} (${product.parentCompany})\n\nWhy We Must Boycott: ${product.boycottReason}\n\n✅ Buy Safe Pakistani Alternative: ${product.alternatives.map(a => `${a.name} (${a.country})`).join(', ')}\n\nBoycott to end the oppression — BoycottIsrael by Takweyat Foundation.`;
    if (navigator.share) {
      navigator.share({
        title: `Boycott: ${product.name}`,
        text: text,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Boycott evidence copied to clipboard!');
    }
  };

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

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-200 pb-24">
      
      {/* Top Floating Action Bar */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 shadow-2xs hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-bold transition-all active:scale-95"
          title="Back to search"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 shadow-2xs hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-bold transition-all active:scale-95"
            title="Share proof"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Card with Minimal Clean Corners */}
      <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 text-center space-y-3.5 shadow-xs relative overflow-hidden">
        
        {/* Top Status Tag */}
        <div className="flex items-center justify-center gap-2">
          <span className="px-3 py-1 rounded-md bg-rose-600 text-white text-[11px] font-black tracking-wide uppercase shadow-2xs">
            🚨 DO NOT BUY • TARGETED FOR BOYCOTT
          </span>
          {product.israelBarcode && (
            <span className="px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800 text-[11px] font-bold flex items-center gap-1">
              <Barcode className="w-3.5 h-3.5" /> 729 Barcode
            </span>
          )}
        </div>

        {/* Brand Logo Display */}
        <div className="flex justify-center py-2">
          <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <BrandLogo
              name={product.name}
              domain={product.domain}
              logo={product.logo}
              size="xl"
              isBoycott={true}
              className="w-20 h-20 rounded-xl"
            />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
            {product.name}
          </h1>
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">
            Owned & Operated by: <strong className="text-zinc-800 dark:text-zinc-200">{product.parentCompany}</strong>
          </p>
        </div>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            Category: {product.category}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
            Action: 100% Total Boycott
          </span>
        </div>
      </div>

      {/* WHY TO BOYCOTT: Documented Complicity & Evidence */}
      <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-3">
        <div className="flex items-center gap-2 text-rose-800 dark:text-rose-400 font-black text-sm uppercase tracking-wide">
          <AlertOctagon className="w-5 h-5" />
          <span>Why You Must Boycott This Brand</span>
        </div>

        <p className="text-sm text-zinc-900 dark:text-zinc-100 leading-relaxed font-semibold">
          {product.boycottReason}
        </p>

        <div className="p-3.5 rounded-xl bg-white/90 dark:bg-zinc-900/90 border border-rose-200 dark:border-rose-900/60 text-xs text-zinc-700 dark:text-zinc-300 space-y-1.5">
          <p className="font-bold text-rose-700 dark:text-rose-400">
            Direct Financial Impact on Oppression:
          </p>
          <p className="leading-relaxed">
            Every dollar generated by this conglomerate provides direct investment, research facilities, or corporate tax revenues to the Israeli occupation state. Refusing to purchase cuts their cashflow and enforces international accountability.
          </p>
        </div>
      </div>

      {/* HOW TO BOYCOTT: Action Steps */}
      <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-black text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          <span>How to Boycott & Spread the Message</span>
        </div>

        <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-black flex items-center justify-center shrink-0 text-[10px]">1</span>
            <span><strong>Never buy {product.name} again:</strong> Remove it entirely from your monthly grocery basket.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-black flex items-center justify-center shrink-0 text-[10px]">2</span>
            <span><strong>Switch to Pakistani Brands:</strong> Strengthen our local economy by buying authentic local alternatives.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-black flex items-center justify-center shrink-0 text-[10px]">3</span>
            <span><strong>Educate your family & store owners:</strong> Tell shopkeepers why you refuse to purchase boycotted products.</span>
          </li>
        </ul>
      </div>

      {/* VERIFIED PAKISTANI ALTERNATIVES */}
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3.5 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-black text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Verified Safe Pakistani Alternatives ({product.alternatives.length})</span>
          </div>
        </div>

        <div className="space-y-2">
          {product.alternatives.map((alt, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 shadow-2xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <BrandLogo
                  name={alt.name}
                  domain={alt.domain}
                  logo={alt.logo}
                  size="md"
                  isBoycott={false}
                  className="rounded-lg"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                    {alt.name}
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                    {getCountryFlag(alt.country)} • 100% Ethical Local Brand
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs shrink-0 border border-emerald-200 dark:border-emerald-800">
                ✓ Safe
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 p-3">
        <div className="max-w-xl mx-auto flex items-center gap-2.5">
          <button
            onClick={handleShare}
            className="flex-1 py-3 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-bold transition-all text-center"
          >
            Share Evidence
          </button>

          <button
            onClick={() => onAddToGrocery(product)}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-sm transition-all text-center flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Safe Alternative</span>
          </button>
        </div>
      </div>

    </div>
  );
};
