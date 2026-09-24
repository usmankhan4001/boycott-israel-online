import React, { useState, useRef } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useGroceryStore } from '../../stores/groceryStore';
import { useUIStore } from '../../stores/uiStore';
import { useTranslation } from '../../i18n/useTranslation';
import { 
  ChevronUp, 
  ChevronDown, 
  RotateCw, 
  Plus, 
  Check, 
  Share2, 
  ShieldAlert, 
  Factory, 
  Building2, 
  TrendingUp, 
  Sparkles,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { BrandLogo } from '../BrandLogo';

interface FeedExposeCard {
  id: string;
  brandName: string;
  parentConglomerate: string;
  category: string;
  severity: 'Critical' | 'High';
  exposeHeadline: string;
  exposeHeadlineUr: string;
  infractionDetails: string;
  infractionDetailsUr: string;
  supplyChainNodes: string[];
  institutionalShareholders: string[];
  topAlternative: {
    name: string;
    producer: string;
    origin: string;
    cleanRating: string;
  };
  impactStatistic: string;
}

const EXPOSES_DATA: FeedExposeCard[] = [
  {
    id: 'expose-coke',
    brandName: 'Coca-Cola / Sprite / Fanta',
    parentConglomerate: 'The Coca-Cola Company (NYSE: KO)',
    category: 'Beverages',
    severity: 'Critical',
    exposeHeadline: 'Atarot Settlement Industrial Zone Bottling Plant',
    exposeHeadlineUr: 'عطروت غیر قانونی صنعتی بستی میں بوٹلنگ پلانٹ',
    infractionDetails: 'Operates a major manufacturing and distribution facility in the illegal settlement of Atarot, built on stolen Palestinian lands in East Jerusalem.',
    infractionDetailsUr: 'مشرقی یروشلم میں فلسطینیوں کی ضبط شدہ زمینوں پر قائم غیر قانونی اسرائیلی بستی عطروت میں بڑا کارخانہ چلاتی ہے۔',
    supplyChainNodes: ['Atarot Industrial Park', 'Central Bottling Company (CBC)', 'Frigodan Cold Storage'],
    institutionalShareholders: ['Berkshire Hathaway (9.2%)', 'Vanguard Group (8.4%)', 'BlackRock Inc. (7.1%)'],
    topAlternative: {
      name: 'Pakola Cola & Lychee',
      producer: 'Mehran Bottlers (Pvt) Ltd',
      origin: 'Karachi, Pakistan',
      cleanRating: '100% Domestic Revenue'
    },
    impactStatistic: 'Global sales dropped by up to 23% in Muslim-majority regions in 2024.'
  },
  {
    id: 'expose-nestle',
    brandName: 'Nestlé / KitKat / Cerelac / Nescafé',
    parentConglomerate: 'Nestlé S.A. (SIX: NESN)',
    category: 'Food & Nutrition',
    severity: 'Critical',
    exposeHeadline: '100% Ownership of Osem Investments in Sderot',
    exposeHeadlineUr: 'اسرائیلی اوسیم کمپنی کی مکمل ملکیت اور شڈیروٹ فیکٹریاں',
    infractionDetails: 'Acquired controlling stake in Osem, operating 9 major manufacturing facilities across Israel, including R&D centers built on historically depopulated villages.',
    infractionDetailsUr: 'اسرائیلی کمپنی اوسیم کی 100 فیصد ملکیت، غزہ سرحد کے قریب فیکٹریاں اور اسرائیلی حکومت سے خصوصی ایوارڈز حاصل کیے۔',
    supplyChainNodes: ['Sderot Snacks Plant', 'Yokneam R&D Hub', 'Kiryat Malachi Logistics'],
    institutionalShareholders: ['Norges Bank Investment (3.2%)', 'BlackRock (4.1%)', 'Vanguard (3.8%)'],
    topAlternative: {
      name: 'Gourmet / Candyland / Mitchell’s',
      producer: 'Local Pakistani Confectioners',
      origin: 'Lahore & Karachi, Pakistan',
      cleanRating: 'Pure Local Tayyib'
    },
    impactStatistic: 'Sustained local brand substitution diverted over $180M domestically.'
  },
  {
    id: 'expose-hp',
    brandName: 'HP (Hewlett Packard)',
    parentConglomerate: 'HP Inc. & Hewlett Packard Enterprise',
    category: 'Technology & Hardware',
    severity: 'Critical',
    exposeHeadline: 'Basel Biometric Checkpoint Surveillance',
    exposeHeadlineUr: 'فلسطینیوں کی نگرانی کے لیے باسل بائیو میٹرک چیک پوسٹ سسٹم',
    infractionDetails: 'Provided the Basel automated biometric access control system used at military checkpoints across the occupied West Bank and Gaza strip perimeter.',
    infractionDetailsUr: 'مغربی کنارے اور غزہ کی ناکہ بندی کے لیے بائیو میٹرک شناختی اور کنٹرول سسٹم فراہم کیا۔',
    supplyChainNodes: ['Avnet Israel Distribution', 'Ministry of Defense Datacenter', 'Navy Server Fleet'],
    institutionalShareholders: ['Dodge & Cox (11.4%)', 'Vanguard (9.1%)', 'BlackRock (8.0%)'],
    topAlternative: {
      name: 'Lenovo / ASUS / Local IT Assemblies',
      producer: 'Verified Non-Complicit Tech',
      origin: 'Neutral International / Local',
      cleanRating: 'No Settlement Contracts'
    },
    impactStatistic: 'Over 30 municipal city councils canceled HP enterprise server contracts.'
  },
  {
    id: 'expose-puma',
    brandName: 'PUMA Sportswear',
    parentConglomerate: 'Puma SE (FWB: PUM)',
    category: 'Apparel & Footwear',
    severity: 'High',
    exposeHeadline: 'Sponsorship of Israeli Football Association in Settlements',
    exposeHeadlineUr: 'غیر قانونی بستیوں کے کلبوں پر مشتمل اسرائیلی فٹ بال ایسوسی ایشن کا معاہدہ',
    infractionDetails: 'Main sponsor of the IFA, which operates football clubs in illegal Israeli settlements in the West Bank. Ended sponsorship in 2024 following campaign pressure.',
    infractionDetailsUr: 'عوامی دباؤ اور وسیع بائیکاٹ مہم کے نتیجے میں پوما نے اپنا 6 سالہ معاہدہ باضابطہ ختم کرنے کا اعلان کیا۔',
    supplyChainNodes: ['Delta Galil Distribution', 'Al-Khader Settlement Pitches', 'Tel Aviv Flagship'],
    institutionalShareholders: ['Kering Group (28.8%)', 'Artémis Holding (29.0%)'],
    topAlternative: {
      name: 'Forward Sports / Servis / Cheetah',
      producer: 'Forward Sports (FIFA Official Maker)',
      origin: 'Sialkot, Pakistan',
      cleanRating: 'World Class Quality'
    },
    impactStatistic: 'Demonstrates empirical proof that boycott campaigns win tangible corporate reversals.'
  },
  {
    id: 'expose-caterpillar',
    brandName: 'Caterpillar (CAT)',
    parentConglomerate: 'Caterpillar Inc. (NYSE: CAT)',
    category: 'Machinery & Equipment',
    severity: 'Critical',
    exposeHeadline: 'Weaponized D9 Armored Demolition Bulldozers',
    exposeHeadlineUr: 'فلسطینی گھروں کو مسمار کرنے والے مسلح ڈی 9 بلڈوزرز',
    infractionDetails: 'Supplies specially armored D9 bulldozers used directly by military forces for the systematic demolition of Palestinian homes, water wells, and olive groves.',
    infractionDetailsUr: 'فلسطینیوں کے مکانات، زیتون کے باغات اور ہسپتالوں کی تباہی میں استعمال ہونے والے بکتر بند بلڈوزرز کی مسلسل فراہمی۔',
    supplyChainNodes: ['Zoko Enterprises (Sole Dealer)', 'Israel Aerospace Industries Armoring', 'MoD Armored Depot'],
    institutionalShareholders: ['Vanguard Group (9.6%)', 'State Street (7.2%)', 'BlackRock (6.8%)'],
    topAlternative: {
      name: 'Komatsu / SANY / Millat Tractors',
      producer: 'Millat Tractors & Neutral Heavy Makers',
      origin: 'Pakistan & Asia',
      cleanRating: 'Civilian Infrastructure Only'
    },
    impactStatistic: 'Church of England and Dutch pension funds fully divested their equity holdings.'
  }
];

export const SwipeableDiscoveryFeed: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [addedCards, setAddedCards] = useState<Record<string, boolean>>({});
  const { addItem } = useGroceryStore();
  const { showToast } = useUIStore();
  const { isUrdu } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCard = EXPOSES_DATA[currentIndex];

  const handleHaptic = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch {}
    }
  };

  const handleNext = () => {
    handleHaptic();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % EXPOSES_DATA.length);
  };

  const handlePrev = () => {
    handleHaptic();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + EXPOSES_DATA.length) % EXPOSES_DATA.length);
  };

  const handleFlipCard = () => {
    handleHaptic();
    setIsFlipped((prev) => !prev);
  };

  const handleAddAlternativeToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleHaptic();
    const alt = activeCard.topAlternative;

    addItem({
      id: `swipe-alt-${activeCard.id}-${Date.now()}`,
      name: activeCard.brandName,
      category: activeCard.category,
      isBoycott: true,
      parentCompany: activeCard.parentConglomerate,
      boycottReason: activeCard.exposeHeadline,
      chosenAlternative: alt.name,
      alternativeCountry: alt.origin,
      suggestedAlternatives: [
        { name: alt.name, country: alt.origin, verified: true }
      ],
      checked: false,
      quantity: 1,
      unit: 'item',
    });

    setAddedCards(prev => ({ ...prev, [activeCard.id]: true }));
    showToast(isUrdu ? `✓ ${alt.name} طیب لسٹ میں شامل کر دیا گیا!` : `✓ Added ${alt.name} to Tayyib Swap List!`);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleHaptic();
    const text = `🚨 ${activeCard.brandName} Boycott Dossier:\n${activeCard.exposeHeadline}\n\n✓ Clean Pakistani Swap: ${activeCard.topAlternative.name}\n\nLearn more on Takweyat Boycott App.`;
    if (navigator.share) {
      navigator.share({ title: activeCard.brandName, text });
    } else {
      navigator.clipboard?.writeText(text);
      showToast(isUrdu ? 'شواہد کاپی ہو گئے!' : 'Dossier copied to clipboard!');
    }
  };

  return (
    <section className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-rose-600 text-white shadow-xs">
            <Layers className="w-4 h-4" />
          </span>
          <div>
            <h2 className="text-base font-black text-zinc-900 dark:text-white flex items-center gap-2">
              {isUrdu ? 'ایجوکیشنل ڈسکوری فیڈ (سوائپ کارڈز)' : 'Discovery Feed & Exposes'}
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                Reels Mode
              </span>
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {isUrdu ? 'کارڈ کو ٹیپ کر کے کارپوریٹ سپلائی چین دیکھیں یا دائیں بٹن سے متبادل شامل کریں۔' : 'Tap card to flip for corporate structure • Swipe or use arrows'}
            </p>
          </div>
        </div>

        {/* Counter Badge & Prev/Next Quick Controls */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono font-black text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-xl">
            {currentIndex + 1} / {EXPOSES_DATA.length}
          </span>
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
            title="Previous Card"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
            title="Next Card"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 3D Flip Card Container */}
      <div 
        ref={containerRef}
        onClick={handleFlipCard}
        className="perspective-1000 cursor-pointer select-none"
      >
        <div 
          className={`relative w-full min-h-[360px] rounded-3xl transition-transform duration-500 transform-style-3d shadow-xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          
          {/* =========================================
              CARD FRONT: The Expose & Pakistani Swap
              ========================================= */}
          <div className="w-full h-full rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 text-white border border-zinc-700/80 flex flex-col justify-between backface-hidden">
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-xl bg-rose-600 text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {activeCard.severity} Target
                  </span>
                  <span className="text-[11px] font-bold text-zinc-400 bg-white/10 px-2 py-0.8 rounded-lg">
                    {activeCard.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold">
                  <RotateCw className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="text-[10px] text-amber-300">{isUrdu ? 'پلٹنے کے لیے ٹیپ کریں' : 'Tap to Flip'}</span>
                </div>
              </div>

              {/* Brand Title & Conglomerate */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {activeCard.brandName}
                </h3>
                <p className="text-xs font-semibold text-zinc-400 mt-0.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span className="truncate">{activeCard.parentConglomerate}</span>
                </p>
              </div>

              {/* Expose Reason Headline */}
              <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-200">
                <h4 className="text-xs sm:text-sm font-black text-rose-300 leading-snug">
                  {isUrdu ? activeCard.exposeHeadlineUr : activeCard.exposeHeadline}
                </h4>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                  {isUrdu ? activeCard.infractionDetailsUr : activeCard.infractionDetails}
                </p>
              </div>
            </div>

            {/* Bottom: Verified Pakistani Tayyib Swap & Action Buttons */}
            <div className="space-y-3 pt-3 mt-3 border-t border-zinc-800">
              <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {isUrdu ? 'مصدقہ پاکستانی طیب متبادل' : 'Recommended Clean Swap'}
                  </span>
                  <p className="text-sm font-black text-white truncate mt-0.5">
                    {activeCard.topAlternative.name}
                  </p>
                  <p className="text-[10px] text-emerald-200/80 truncate">
                    {activeCard.topAlternative.producer} • {activeCard.topAlternative.origin}
                  </p>
                </div>

                <button
                  onClick={handleAddAlternativeToCart}
                  className={`px-3.5 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all shrink-0 ${
                    addedCards[activeCard.id]
                      ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/50'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {addedCards[activeCard.id] ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{isUrdu ? 'شامل شدہ' : 'Added'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isUrdu ? 'لسٹ میں شامل کریں' : 'Add Swap'}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="text-[11px] text-amber-300/90 font-semibold truncate flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-amber-400 shrink-0" />
                  {activeCard.impactStatistic}
                </span>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors shrink-0 ml-2"
                  title="Share Expose"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* =========================================
              CARD BACK: Supply Chain Dossier & Institutional Ties
              ========================================= */}
          <div className="absolute inset-0 w-full h-full rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white border border-indigo-500/50 flex flex-col justify-between backface-hidden rotate-y-180 shadow-2xl">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider">
                    {isUrdu ? 'سپلائی چین ثبوت' : 'Supply Chain Dossier'}
                  </span>
                  <span className="text-xs font-bold text-zinc-300">
                    {activeCard.brandName}
                  </span>
                </div>
                <button
                  onClick={handleFlipCard}
                  className="text-xs text-amber-400 hover:underline font-bold flex items-center gap-1"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>{isUrdu ? 'سامنے کا رخ' : 'Flip Front'}</span>
                </button>
              </div>

              {/* Verified Manufacturing Nodes */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-black text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5" />
                  {isUrdu ? 'مصدقہ صنعتی مراکز و پلانٹس' : 'Complicit Facilities & Nodes'}
                </span>
                <div className="space-y-1">
                  {activeCard.supplyChainNodes.map((node, i) => (
                    <div key={i} className="px-3 py-1.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-xs font-semibold text-zinc-200 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>{node}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Institutional Major Shareholders */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-black text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  {isUrdu ? 'بڑے ادارہ جاتی سرمایہ کار' : 'Major Institutional Equity'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCard.institutionalShareholders.map((sh, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/40 text-[11px] font-mono text-indigo-200">
                      {sh}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Flip Back Action Footer */}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">
                {isUrdu ? 'تحقیق بمطابق اقوام متحدہ ڈیٹا بیس' : 'Verified UN Resolution 31/36 Database'}
              </span>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-white text-zinc-900 font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <span>{isUrdu ? 'اگلا ایکسپوز' : 'Next Expose'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl-mirror" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
