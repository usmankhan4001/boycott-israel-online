import React from 'react';
import { useDemographicStore } from '../../stores/demographicStore';
import { DemographicLens } from '../../types';
import { useTranslation } from '../../i18n/useTranslation';
import { 
  Users, 
  GraduationCap, 
  Baby, 
  Briefcase, 
  HeartHandshake, 
  Type, 
  Contrast,
  Sliders
} from 'lucide-react';

interface LensConfig {
  id: DemographicLens;
  labelEn: string;
  labelUr: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  descriptionEn: string;
  descriptionUr: string;
}

const LENSES: LensConfig[] = [
  {
    id: 'general',
    labelEn: 'General',
    labelUr: 'عام رہنمائی',
    icon: Users,
    accentColor: 'emerald',
    descriptionEn: 'Balanced overview of top consumer swaps, food & retail targets.',
    descriptionUr: 'تمام عام گھریلو اشیاء اور مشہور برانڈز کا مکمل جائزہ۔'
  },
  {
    id: 'students',
    labelEn: 'Students',
    labelUr: 'طلباء و نوجوان',
    icon: GraduationCap,
    accentColor: 'indigo',
    descriptionEn: 'Tech gear, stationery, campus cafes, fast food, budget-friendly swaps.',
    descriptionUr: 'کالج و یونیورسٹی طلباء، لیپ ٹاپ، اسٹیشنری اور کیفے کے بائیکاٹ متبادل۔'
  },
  {
    id: 'mothers',
    labelEn: 'Mothers & Home',
    labelUr: 'مائیں اور گھریلو سامان',
    icon: Baby,
    accentColor: 'pink',
    descriptionEn: 'Infant nutrition, diapers, home cleaning, detergents, kitchen pantry.',
    descriptionUr: 'بچوں کے دودھ، ڈائپرز، سرف، صابن اور کچن گروسری کے محفوظ متبادل۔'
  },
  {
    id: 'men',
    labelEn: 'Men & Work',
    labelUr: 'مرد حضرات و کام',
    icon: Briefcase,
    accentColor: 'blue',
    descriptionEn: 'Grooming, footwear, tech software, auto care, business tools.',
    descriptionUr: 'شیونگ، جوتے، کپڑے، گاڑیوں کے پرزہ جات اور دفتری سافٹ ویئر۔'
  },
  {
    id: 'elders',
    labelEn: 'Elders & Patients',
    labelUr: 'بزرگ و مریض (125% بڑا خط)',
    icon: HeartHandshake,
    accentColor: 'teal',
    descriptionEn: 'Large typography (125%), high contrast, pharma alternatives & supplements.',
    descriptionUr: 'بڑا فونٹ (125%)، واضح رنگ اور ادویات و ہیلتھ کیئر کے مقامی متبادل۔'
  }
];

export const DemographicLensSwitcher: React.FC = () => {
  const { 
    demographicLens, 
    setDemographicLens, 
    fontScale, 
    setFontScale, 
    highContrast, 
    toggleHighContrast 
  } = useDemographicStore();
  const { isUrdu } = useTranslation();

  const handleHaptic = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(8);
      } catch {}
    }
  };

  const handleSelectLens = (lens: DemographicLens) => {
    handleHaptic();
    setDemographicLens(lens);
  };

  const activeLensConfig = LENSES.find(l => l.id === demographicLens) || LENSES[0];

  return (
    <div className="space-y-2.5">
      {/* Header and Quick Accessibility Toggles */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Sliders className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider truncate">
            {isUrdu ? 'ڈیموگرافک لینس (آپ کی ضرورت کے مطابق)' : 'Demographic Lens'}
          </span>
        </div>

        {/* Accessibility Buttons: Font Scale & Contrast */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => {
              handleHaptic();
              setFontScale(fontScale === 'large' ? 'normal' : 'large');
            }}
            className={`px-2 py-1 rounded-xl text-[10px] font-black flex items-center gap-1 transition-all active:scale-95 border ${
              fontScale === 'large'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-2xs'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:text-zinc-900'
            }`}
            title="Toggle Large Typography (125%)"
          >
            <Type className="w-3 h-3" />
            <span>{fontScale === 'large' ? '125%' : '100%'}</span>
          </button>

          <button
            onClick={() => {
              handleHaptic();
              toggleHighContrast();
            }}
            className={`p-1.5 rounded-xl text-[10px] font-black transition-all active:scale-95 border ${
              highContrast
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-2xs'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:text-zinc-900'
            }`}
            title="Toggle High Contrast Mode"
          >
            <Contrast className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {LENSES.map((lens) => {
          const Icon = lens.icon;
          const isSelected = demographicLens === lens.id;
          return (
            <button
              key={lens.id}
              onClick={() => handleSelectLens(lens.id)}
              className={`px-3 py-1.5 rounded-2xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 shadow-2xs active:scale-95 border ${
                isSelected
                  ? 'bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-600 shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{isUrdu ? lens.labelUr : lens.labelEn}</span>
              {lens.id === 'elders' && (
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/20 text-white font-mono font-bold">
                  125%
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Micro Lens Context Note */}
      <div className="px-3 py-2 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
        <span className="truncate">
          {isUrdu ? activeLensConfig.descriptionUr : activeLensConfig.descriptionEn}
        </span>
        {demographicLens === 'elders' && (
          <span className="shrink-0 text-[10px] font-black text-teal-600 dark:text-teal-400 ml-2">
            {isUrdu ? '✓ بڑے الفاظ فعال' : '✓ Big Text Active'}
          </span>
        )}
      </div>
    </div>
  );
};
