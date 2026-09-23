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
  Users
} from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { 
  getLocalizedProductName, 
  getLocalizedParentCompany, 
  getLocalizedBoycottReason,
  getLocalizedBehaviorNotes 
} from '../utils/urduProductTranslator';

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
  const { t, isUrdu, language, translateCategory } = useTranslation();
  const topAlternative = product.alternatives[0];

  const handleShare = () => {
    const isCeleb = product.category === 'Celebrities & Endorsers';
    const text = isCeleb
      ? `🚨 ${isUrdu ? 'بائیکاٹ ہدف' : 'BOYCOTT CALLOUT'}: ${product.name}\n\n${t.promotedBrands} ${product.endorsedBrands?.join(', ') || product.parentCompany}\n\n${product.boycottReason}\n\nhttps://boycottisraelonline.com/product/${product.id}`
      : `🚨 ${t.doNotBuy}: ${product.name} (${product.parentCompany})\n\n${product.boycottReason}\n\n✅ ${t.safeAlt}: ${product.alternatives.map(a => `${a.name} (${a.country})`).join(', ')}\n\nhttps://boycottisraelonline.com/product/${product.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Boycott: ${product.name}`,
        text: text,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert(isUrdu ? 'معلومات کاپی کر لی گئی ہیں' : 'Boycott evidence copied to clipboard!');
    }
  };

  const getCountryFlag = (country: string) => {
    if (country.includes('Pakistan')) return isUrdu ? '🇵🇰 پاکستان' : '🇵🇰 Pakistan';
    if (country.includes('Turkey')) return isUrdu ? '🇹🇷 ترکی' : '🇹🇷 Turkey';
    if (country.includes('Palestine')) return isUrdu ? '🇵🇸 فلسطین' : '🇵🇸 Palestine';
    if (country.includes('Saudi') || country.includes('KSA')) return isUrdu ? '🇸🇦 سعودی عرب' : '🇸🇦 Saudi';
    if (country.includes('UAE')) return isUrdu ? '🇦🇪 امارات' : '🇦🇪 UAE';
    if (country.includes('Indonesia')) return isUrdu ? '🇮🇩 انڈونیشیا' : '🇮🇩 Indonesia';
    if (country.includes('Egypt')) return isUrdu ? '🇪🇬 مصر' : '🇪🇬 Egypt';
    return `🌐 ${country}`;
  };

  const isCelebrity = 
    product.category === 'Celebrities & Endorsers' || 
    product.categoryType === 'celebrity' || 
    (product.id && product.id.startsWith('celeb-'));

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-200 pb-28">
      
      {/* Top Floating Action Bar */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 shadow-2xs hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-bold transition-all active:scale-95"
          title={t.back}
        >
          <ArrowLeft className="w-4 h-4 rtl-mirror" />
          <span>{t.back}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 shadow-2xs hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-bold transition-all active:scale-95"
            title={t.shareEvidence}
          >
            <Share2 className="w-4 h-4" />
            <span>{t.shareEvidence}</span>
          </button>
        </div>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* LEFT COLUMN: Hero Brand Visual + Complicity & Behavior Layer */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Hero Visual Card */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 text-center space-y-3.5 shadow-xs relative overflow-hidden">
            
            {/* Top Status Tag */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className={`px-3.5 py-1.5 rounded-lg text-white text-xs sm:text-sm font-black tracking-wide uppercase shadow-2xs ${
                isCelebrity ? 'bg-purple-700' : 'bg-rose-600'
              }`}>
                {isCelebrity ? `👤 ${t.complicitEndorser}` : `🚨 ${t.doNotBuy}`}
              </span>
              {product.israelBarcode && (
                <span className="px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800 text-xs sm:text-sm font-bold flex items-center gap-1">
                  <Barcode className="w-3.5 h-3.5" /> {t.barcode729}
                </span>
              )}
            </div>

            {/* Brand / Avatar Display */}
            <div className="flex justify-center py-2">
              <div className="p-2 rounded-3xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-700 shadow-inner">
                <BrandLogo
                  name={product.name}
                  domain={product.domain}
                  logo={product.logo}
                  size="xl"
                  isBoycott={true}
                  className="shadow-sm"
                />
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight" dir="auto">
                {getLocalizedProductName(product, language)}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-zinc-500 dark:text-zinc-400 mt-1" dir="auto">
                {isCelebrity ? (isUrdu ? 'پروموٹڈ برانڈ:' : 'Promoted Brand:') : t.parentCompany} <strong className="text-zinc-800 dark:text-zinc-200">{getLocalizedParentCompany(product.parentCompany, language)}</strong>
              </p>
            </div>

            {/* Endorsed Brands Tags (If Celebrity) */}
            {product.endorsedBrands && product.endorsedBrands.length > 0 && (
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-xs sm:text-sm font-black text-purple-700 dark:text-purple-400 uppercase tracking-wider block mb-1.5">
                  {t.promotedBrands}
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {product.endorsedBrands.map((brand, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 font-bold text-xs sm:text-sm border border-purple-200 dark:border-purple-800" dir="auto">
                      {getLocalizedProductName({ name: brand }, language)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400">
              <span className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                {isUrdu ? 'کیٹیگری:' : 'Category:'} {translateCategory(product.category)}
              </span>
              <span className={`px-3 py-1.5 rounded-lg border ${
                isCelebrity
                  ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
              }`}>
                {isCelebrity ? t.demandContractCancellation : t.doNotBuy}
              </span>
            </div>
          </div>

          {/* WHY TO BOYCOTT */}
          <div className={`p-5 sm:p-6 rounded-2xl border space-y-3.5 ${
            isCelebrity 
              ? 'bg-purple-50/70 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900/60'
              : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60'
          }`}>
            <div className={`flex items-center gap-2 font-black text-base sm:text-lg uppercase tracking-wide ${
              isCelebrity ? 'text-purple-800 dark:text-purple-400' : 'text-rose-800 dark:text-rose-400'
            }`}>
              <AlertOctagon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>{t.whyBoycottTitle}</span>
            </div>

            <p className="text-sm sm:text-base text-zinc-900 dark:text-zinc-100 leading-relaxed font-bold" dir="auto">
              {getLocalizedBoycottReason(product.boycottReason, language)}
            </p>

            <div className="p-4 rounded-xl bg-white/90 dark:bg-zinc-900/90 border border-purple-200 dark:border-purple-900/60 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 space-y-1.5">
              <p className={`font-bold text-xs sm:text-sm ${isCelebrity ? 'text-purple-700 dark:text-purple-400' : 'text-rose-700 dark:text-rose-400'}`}>
                {isCelebrity ? (isUrdu ? 'اخلاقی ذمہ داری:' : 'Ethical Responsibility:') : t.financialImpact}
              </p>
              <p className="leading-relaxed">
                {isCelebrity 
                  ? (isUrdu ? 'مشہور شخصیات کے اشتہارات ان کمپنیوں کو عوام میں قبولیت بخشتے ہیں جو ظلم میں شریک ہیں۔ بائیکاٹ کے ذریعے ان پر اخلاقی دباؤ ڈالا جاتا ہے۔' : 'Celebrity endorsements grant consumer trust to corporations financing apartheid and genocide.')
                  : (isUrdu ? 'ان کمپنیوں پر خرچ ہونے والا پیسہ نسل کشی اور غیر قانونی قبضے کو تقویت دیتا ہے۔ بائیکاٹ سے ظلم کا معاشی پہیہ رکتا ہے۔' : 'Every rupee spent here funnels direct profits and tax revenues to entities that fuel Palestinian dispossession.')}
              </p>
            </div>
          </div>

          {/* DOCUMENTED ACTIONS */}
          {(product.behaviorNotes || product.behaviorTimeline) && (
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-black text-base sm:text-lg">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span>{isUrdu ? 'مصدقہ شواہد اور اقدامات' : 'Documented Corporate Actions'}</span>
              </div>

              {product.behaviorNotes && (
                <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium bg-white/80 dark:bg-zinc-900/80 p-3.5 rounded-xl border border-amber-200/70 dark:border-amber-900/40" dir="auto">
                  {getLocalizedBehaviorNotes(product.behaviorNotes, language)}
                </p>
              )}

              {product.behaviorTimeline && product.behaviorTimeline.length > 0 && (
                <div className="space-y-2 pt-1">
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

        {/* RIGHT COLUMN: Action Steps (or Celebrity Accountability Card) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* If NOT a celebrity: render Verified Safe Alternatives */}
          {!isCelebrity ? (
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3.5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-black text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{t.safeAlternatives} ({product.alternatives.length})</span>
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
                          {getCountryFlag(alt.country)} • {isUrdu ? 'محفوظ مقامی برانڈ' : '100% Ethical Local Brand'}
                        </p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs shrink-0 border border-emerald-200 dark:border-emerald-800">
                      ✓ {t.safe}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onAddToGrocery(product)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addAltToGrocery}</span>
              </button>
            </div>
          ) : (
            /* If CELEBRITY: render Dedicated Ethical Accountability Demands Card */
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3.5 shadow-xs">
              <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-black text-sm">
                <Users className="w-5 h-5 text-purple-600" />
                <span>{t.ethicalDemands}</span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-900/50 space-y-1 text-xs">
                  <span className="font-black text-purple-800 dark:text-purple-300 block text-[11px] uppercase tracking-wider">
                    {isUrdu ? '۱. اشتہاری معاہدے ختم کریں' : '1. Terminate Complicit Contracts'}
                  </span>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-tight">
                    {isUrdu ? 'بائیکاٹ شدہ ملٹی نیشنل کمپنیوں کے ساتھ ہر قسم کے اشتہارات فوری بند کریں۔' : 'Immediately cease commercial sponsorships with boycotted multinationals.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-900/50 space-y-1 text-xs">
                  <span className="font-black text-purple-800 dark:text-purple-300 block text-[11px] uppercase tracking-wider">
                    {isUrdu ? '۲. مہمات کا بائیکاٹ' : '2. Digital Disengagement'}
                  </span>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-tight">
                    {isUrdu ? 'اس شخصیت کے ذریعے پروموٹ کیے جانے والے برانڈز اور مہمات کا مکمل بائیکاٹ کریں۔' : 'Refuse engagement on paid promotional posts until ties are severed.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ACTION PLAN */}
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-black text-sm">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <span>{t.actionPlan}</span>
            </div>

            {isCelebrity ? (
              <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 font-black flex items-center justify-center shrink-0 text-[10px]">1</span>
                  <span><strong>{isUrdu ? 'پروموٹڈ برانڈز کا بائیکاٹ:' : 'Boycott Endorsed Brands:'}</strong> {isUrdu ? `${product.name} کے پروموٹ کردہ برانڈز نہ خریدیں۔` : `Never buy products promoted by ${product.name}.`}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 font-black flex items-center justify-center shrink-0 text-[10px]">2</span>
                  <span><strong>{isUrdu ? 'اخلاقی مؤقف:' : 'Public Accountability:'}</strong> {isUrdu ? 'سوشل میڈیا پر معاہدے ختم کرنے کا باوقار مطالبہ کریں۔' : 'Call on public figures to terminate complicit brand deals.'}</span>
                </li>
              </ul>
            ) : (
              <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-black flex items-center justify-center shrink-0 text-[10px]">1</span>
                  <span><strong>{isUrdu ? 'مکمل بائیکاٹ:' : 'Total Disengagement:'}</strong> {isUrdu ? `${product.name} اور اس کی مالک کمپنی کی کوئی چیز نہ خریدیں۔` : `Never buy ${product.name} or boycotted parent products.`}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-black flex items-center justify-center shrink-0 text-[10px]">2</span>
                  <span><strong>{isUrdu ? 'پاکستانی انڈسٹری کو سپورٹ:' : 'Support Local:'}</strong> {isUrdu ? '۱۰۰٪ خریداری محب وطن پاکستانی اور مقامی برانڈز سے کریں۔' : 'Shift 100% of spending to ethical local Pakistani enterprises.'}</span>
                </li>
              </ul>
            )}
          </div>

        </div>

      </div>

      {/* Bottom Sticky Action Bar (For Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 p-3">
        <div className="max-w-md mx-auto flex items-center gap-2.5">
          <button
            onClick={handleShare}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all text-center ${
              isCelebrity
                ? 'w-full bg-purple-600 hover:bg-purple-500 text-white font-black'
                : 'flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100'
            }`}
          >
            {t.shareEvidence}
          </button>

          {!isCelebrity && (
            <button
              onClick={() => onAddToGrocery(product)}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-sm transition-all text-center flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{t.safeAlt}</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
