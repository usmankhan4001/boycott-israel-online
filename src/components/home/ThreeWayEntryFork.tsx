import React from 'react';
import { useDemographicStore } from '../../stores/demographicStore';
import { MentalState } from '../../types';
import { useTranslation } from '../../i18n/useTranslation';
import { 
  Zap, 
  HelpCircle, 
  GraduationCap, 
  ScanLine, 
  ShoppingCart, 
  TrendingUp, 
  CheckCircle2, 
  FileText, 
  Globe2, 
  ArrowRight,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ThreeWayEntryFork: React.FC = () => {
  const { mentalState, setMentalState } = useDemographicStore();
  const { isUrdu } = useTranslation();

  const handleHaptic = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(8);
      } catch {}
    }
  };

  const setFork = (mode: MentalState) => {
    handleHaptic();
    setMentalState(mode);
  };

  return (
    <section className="space-y-3.5">
      {/* Fork Selector Tabs */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          {isUrdu ? 'آپ کا موڈ اور ترجیح منتخب کریں' : 'Choose Your Mental State / Lens'}
        </span>
        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
          {isUrdu ? 'محفوظ کردہ ترجیح' : 'Saved Preference'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 shadow-inner">
        {/* Fork 1: Action Mode */}
        <button
          onClick={() => setFork('action')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-black transition-all active:scale-95 ${
            mentalState === 'action'
              ? 'bg-white dark:bg-zinc-900 text-rose-600 dark:text-rose-400 shadow-sm ring-1 ring-black/5 dark:ring-white/10'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Zap className={`w-4 h-4 ${mentalState === 'action' ? 'text-rose-600 fill-rose-600' : ''}`} />
          <span className="truncate">{isUrdu ? 'فوری ایکشن موڈ' : 'Action Mode'}</span>
        </button>

        {/* Fork 2: Skeptical / Just Starting */}
        <button
          onClick={() => setFork('skeptical')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-black transition-all active:scale-95 ${
            mentalState === 'skeptical'
              ? 'bg-white dark:bg-zinc-900 text-amber-600 dark:text-amber-400 shadow-sm ring-1 ring-black/5 dark:ring-white/10'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <HelpCircle className={`w-4 h-4 ${mentalState === 'skeptical' ? 'text-amber-600' : ''}`} />
          <span className="truncate">{isUrdu ? 'شکی / نیا آغاز' : 'Skeptical / Start'}</span>
        </button>

        {/* Fork 3: Scholar Mode */}
        <button
          onClick={() => setFork('scholar')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-black transition-all active:scale-95 ${
            mentalState === 'scholar'
              ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-black/5 dark:ring-white/10'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <GraduationCap className={`w-4 h-4 ${mentalState === 'scholar' ? 'text-indigo-600' : ''}`} />
          <span className="truncate">{isUrdu ? 'تحقیقی موڈ' : 'Scholar Mode'}</span>
        </button>
      </div>

      {/* Dynamic Fork Content Display */}
      {mentalState === 'action' && (
        <div className="p-4 rounded-3xl bg-gradient-to-br from-rose-500/10 via-orange-500/5 to-transparent border border-rose-500/30 dark:border-rose-500/20 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider">
                  {isUrdu ? 'تیز رفتار' : 'Fast-Track'}
                </span>
                <h3 className="text-sm font-black text-zinc-900 dark:text-white">
                  {isUrdu ? 'فوری ایکشن اور اسکیننگ مرکز' : 'Instant Action & Quick-Swap Desk'}
                </h3>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                {isUrdu 
                  ? 'بارکوڈ 729 اسکینر کا استعمال کریں، تصدیق شدہ متبادل فہرست میں شامل کریں اور مارکیٹ میں فوری بائیکاٹ نافذ کریں۔'
                  : 'Zero friction. Instantly verify barcodes (729 Prefix), swap groceries with one tap, and log your economic diversion.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            <Link
              to="/scan"
              className="p-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-between shadow-sm active:scale-95 transition-all group"
            >
              <div className="flex items-center gap-2">
                <ScanLine className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{isUrdu ? '729 اسکینر' : 'Launch 729 Scanner'}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 rtl-mirror" />
            </Link>

            <Link
              to="/grocery"
              className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-400 text-zinc-900 dark:text-white font-bold text-xs flex items-center justify-between shadow-2xs active:scale-95 transition-all"
            >
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <ShoppingCart className="w-4 h-4" />
                <span className="text-zinc-900 dark:text-white">{isUrdu ? 'طیب شاپنگ لسٹ' : 'Tayyib Grocery'}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 rtl-mirror" />
            </Link>

            <Link
              to="/categories"
              className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-400 text-zinc-900 dark:text-white font-bold text-xs flex items-center justify-between shadow-2xs active:scale-95 transition-all"
            >
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <Zap className="w-4 h-4" />
                <span className="text-zinc-900 dark:text-white">{isUrdu ? 'فوری متبادل لسٹ' : 'Top Swaps'}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 rtl-mirror" />
            </Link>
          </div>
        </div>
      )}

      {mentalState === 'skeptical' && (
        <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/30 dark:border-amber-500/20 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider">
                {isUrdu ? 'حقائق و شواہد' : 'Empirical Proof'}
              </span>
              <h3 className="text-sm font-black text-zinc-900 dark:text-white">
                {isUrdu ? 'کیا بائیکاٹ واقعی اثر انداز ہوتا ہے؟' : 'Economic Impact & Historic Precedents'}
              </h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              {isUrdu
                ? 'تاریخی شواہد اور معاشی نقصانات کا دستاویزی ریکارڈ: کس طرح عوامی بائیکاٹ نے ملٹی نیشنل کمپنیوں کو پالیسیاں تبدیل کرنے پر مجبور کیا۔'
                : 'Historical corporate policy reversals driven by targeted boycotts, verified financial losses, and direct market divestments.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {isUrdu ? 'PUMA کی دستبرداری' : 'Puma Ends Sponsorship'}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                  {isUrdu ? 'کامیاب فتح' : 'Victory'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-normal">
                {isUrdu
                  ? 'عالمی بائیکاٹ کے دباؤ کے بعد پوما نے اسرائیلی فٹ بال ایسوسی ایشن کے ساتھ اپنا معاہدہ منسوخ کر دیا۔'
                  : 'PUMA officially terminated its sponsorship deal with the Israeli Football Association following international campaigns.'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" />
                  {isUrdu ? 'G4S اور ویولیا کا انخلاء' : 'Veolia & G4S Total Exit'}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                  {isUrdu ? '$20B نقصان' : '$20B+ Lost'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-normal">
                {isUrdu
                  ? 'فرانسیسی کمپنی ویولیا اور سیکورٹی کمپنی G4S کو اربوں ڈالر کے نقصانات کے بعد غیر قانونی بستیوں سے انخلاء کرنا پڑا۔'
                  : 'Veolia lost major transit contracts worldwide, forcing a full exit from West Bank infrastructure projects.'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link
              to="/about"
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>{isUrdu ? 'مکمل ریسرچ اور معاشی اعدادوشمار پڑھیں' : 'Explore Economic Impact Studies'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl-mirror" />
            </Link>
          </div>
        </div>
      )}

      {mentalState === 'scholar' && (
        <div className="p-4 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/30 dark:border-indigo-500/20 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider">
                {isUrdu ? 'تحقیق و سپلائی چین' : 'Supply Chain Dossiers'}
              </span>
              <h3 className="text-sm font-black text-zinc-900 dark:text-white">
                {isUrdu ? 'کارپوریٹ نیٹ ورکس اور جغرافیائی سیاسی تجزیہ' : 'Geopolitical Nodes & Corporate Complicity'}
              </h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              {isUrdu
                ? 'کنگلومریٹس، شیئر ہولڈنگ اسٹرکچرز (BlackRock, Vanguard)، ملٹری معاہدوں اور خام مال کے استحصالی روٹس کی مکمل نقشہ کشی۔'
                : 'Deep structural analysis: institutional ownership, defense R&D subsidies, raw mineral extraction routes, and corporate lobbying.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <Link
              to="/complicity"
              className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center justify-between shadow-sm active:scale-95 transition-all"
            >
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4" />
                <span>{isUrdu ? 'کمپلیسیٹی نیٹ ورک دیکھیں' : 'Interactive Complicity Web'}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 rtl-mirror" />
            </Link>

            <Link
              to="/about"
              className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 text-zinc-900 dark:text-white font-bold text-xs flex items-center justify-between shadow-2xs active:scale-95 transition-all"
            >
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <FileText className="w-4 h-4" />
                <span className="text-zinc-900 dark:text-white">{isUrdu ? 'تحقیقی دستاویزات' : 'Research Whitepapers'}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 rtl-mirror" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};
