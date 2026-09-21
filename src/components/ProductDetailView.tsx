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
  HeartHandshake,
  Calendar,
  Clock,
  ExternalLink,
  Users,
  UtensilsCrossed
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
    const isCeleb = product.category === 'Celebrities & Endorsers';
    const text = isCeleb
      ? `🚨 BOYCOTT ENDORSER ALERT: ${product.name}\n\nPromoting: ${product.endorsedBrands?.join(', ') || product.parentCompany}\n\nWhy Called Out: ${product.boycottReason}\n\nStand with Gaza — BoycottIsrael by Takweyat Foundation.`
      : `🚨 BOYCOTT TARGET: ${product.name} (${product.parentCompany})\n\nWhy We Must Boycott: ${product.boycottReason}\n\n✅ Buy Safe Pakistani Alternative: ${product.alternatives.map(a => `${a.name} (${a.country})`).join(', ')}\n\nBoycott to end the oppression — BoycottIsrael by Takweyat Foundation.`;
    
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

  const isCelebrity = product.category === 'Celebrities & Endorsers';
  const isRestaurant = product.category === 'Restaurants & Places';

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-200 pb-28">
      
      {/* Top Floating Action Bar */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 shadow-2xs hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-bold transition-all active:scale-95"
          title="Back to search"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discovery</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 shadow-2xs hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-bold transition-all active:scale-95"
            title="Share proof"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Evidence</span>
          </button>
        </div>
      </div>

      {/* Main Responsive Grid Layout for Desktop & Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* LEFT COLUMN: Hero Brand Visual + Complicity & Behavior Layer */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Hero Visual Card with Minimal Clean Corners */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 text-center space-y-3.5 shadow-xs relative overflow-hidden">
            
            {/* Top Status Tag */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-md bg-rose-600 text-white text-[11px] font-black tracking-wide uppercase shadow-2xs">
                {isCelebrity ? '🚨 COMPLICIT ENDORSER • BOYCOTT CAMPAIGNS' : '🚨 DO NOT BUY • TARGETED FOR BOYCOTT'}
              </span>
              {product.israelBarcode && (
                <span className="px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800 text-[11px] font-bold flex items-center gap-1">
                  <Barcode className="w-3.5 h-3.5" /> 729 Barcode
                </span>
              )}
            </div>

            {/* Brand/Celebrity Avatar or Logo Display */}
            <div className="flex justify-center py-2">
              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-inner">
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
                {isCelebrity ? 'Promoted Multinational:' : 'Parent Conglomerate:'} <strong className="text-zinc-800 dark:text-zinc-200">{product.parentCompany}</strong>
              </p>
            </div>

            {/* Endorsed Brands Tags (If Celebrity) */}
            {product.endorsedBrands && product.endorsedBrands.length > 0 && (
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-[11px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider block mb-1.5">
                  Boycotted Brands Promoted by this Personality:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {product.endorsedBrands.map((brand, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold text-xs border border-rose-200 dark:border-rose-800">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-bold text-zinc-600 dark:text-zinc-400">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                Category: {product.category}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                Action: 100% Uncompromising Boycott
              </span>
            </div>
          </div>

          {/* WHY TO BOYCOTT: Documented Complicity & Evidence */}
          <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-400 font-black text-sm uppercase tracking-wide">
              <AlertOctagon className="w-5 h-5" />
              <span>{isCelebrity ? 'Complicity Record & Details' : 'Why You Must Boycott This Entity'}</span>
            </div>

            <p className="text-sm text-zinc-900 dark:text-zinc-100 leading-relaxed font-semibold">
              {product.boycottReason}
            </p>

            <div className="p-3.5 rounded-xl bg-white/90 dark:bg-zinc-900/90 border border-rose-200 dark:border-rose-900/60 text-xs text-zinc-700 dark:text-zinc-300 space-y-1.5">
              <p className="font-bold text-rose-700 dark:text-rose-400">
                Financial Impact on Oppression:
              </p>
              <p className="leading-relaxed">
                Every rupee or dollar spent here funnels direct royalties, advertising power, and corporate tax revenues to entities that fuel Palestinian dispossession and apartheid. Withholding funds breaks the economic spine of oppression.
              </p>
            </div>
          </div>

          {/* DOCUMENTED CORPORATE BEHAVIOR & TIMELINE LAYER */}
          {(product.behaviorNotes || product.behaviorTimeline) && (
            <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-black text-sm">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span>Documented Behavior & Corporate Actions</span>
              </div>

              {product.behaviorNotes && (
                <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium bg-white/80 dark:bg-zinc-900/80 p-3 rounded-xl border border-amber-200/70 dark:border-amber-900/40">
                  {product.behaviorNotes}
                </p>
              )}

              {product.behaviorTimeline && product.behaviorTimeline.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-black uppercase text-amber-800 dark:text-amber-400 tracking-wider">
                    Incident & Action Log:
                  </span>
                  <div className="space-y-2">
                    {product.behaviorTimeline.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white/90 dark:bg-zinc-900/90 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-2.5 text-xs">
                        <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 font-black text-[10px] shrink-0">
                          {item.date}
                        </span>
                        <p className="text-zinc-700 dark:text-zinc-300 font-medium leading-tight">
                          {item.action}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Action Steps & Verified Safe Alternatives */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* VERIFIED PAKISTANI ALTERNATIVES */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3.5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-black text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>{isCelebrity ? 'Conscious Pro-Palestine Voices' : `Safe Alternatives (${product.alternatives.length})`}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {product.alternatives.map((alt, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 shadow-2xs hover:border-emerald-500/40 transition-colors"
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
                        {getCountryFlag(alt.country)} • {isCelebrity ? 'Principled Voice' : '100% Ethical Local Brand'}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs shrink-0 border border-emerald-200 dark:border-emerald-800">
                    ✓ Safe
                  </span>
                </div>
              ))}
            </div>

            {!isCelebrity && (
              <button
                onClick={() => onAddToGrocery(product)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span>Add Safe Alternative to Grocery Planner</span>
              </button>
            )}
          </div>

          {/* HOW TO BOYCOTT: Action Steps */}
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-black text-sm">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <span>Action Plan: How to Enforce This Boycott</span>
            </div>

            <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-2.5 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-black flex items-center justify-center shrink-0 text-[10px]">1</span>
                <span><strong>Total Disengagement:</strong> Never buy {product.name} or patronize brands endorsed by complicit figures.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-black flex items-center justify-center shrink-0 text-[10px]">2</span>
                <span><strong>Support Pakistani Industry:</strong> Shift 100% of your household and dining spend to patriotic Pakistani enterprises.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-black flex items-center justify-center shrink-0 text-[10px]">3</span>
                <span><strong>Spread the Truth:</strong> Share this evidence page with friends, family, shopkeepers, and community groups.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom Sticky Action Bar (For Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 p-3">
        <div className="max-w-md mx-auto flex items-center gap-2.5">
          <button
            onClick={handleShare}
            className="flex-1 py-3 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-bold transition-all text-center"
          >
            Share Evidence
          </button>

          {!isCelebrity && (
            <button
              onClick={() => onAddToGrocery(product)}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-sm transition-all text-center flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Grocery</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
