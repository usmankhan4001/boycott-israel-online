import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Coins, 
  Users, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  PieChart, 
  RotateCcw,
  Landmark
} from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';

export const ReverseExtractionCalculator: React.FC = () => {
  const { isUrdu } = useTranslation();
  const [groceriesSpend, setGroceriesSpend] = useState<number>(35000);
  const [diningSpend, setDiningSpend] = useState<number>(18000);
  const [personalCareSpend, setPersonalCareSpend] = useState<number>(12000);
  const [techSpend, setTechSpend] = useState<number>(8000);
  const [timeHorizonYears, setTimeHorizonYears] = useState<number>(1);

  const USD_TO_PKR = 278.5;
  const KEYNESIAN_MULTIPLIER = 2.5; // Every 1 PKR circulating locally generates 2.5 PKR in domestic aggregate demand

  // Monthly Total
  const totalMonthlySpendPkr = groceriesSpend + diningSpend + personalCareSpend + techSpend;
  const totalHorizonMonths = timeHorizonYears * 12;
  const totalSpendOverHorizonPkr = totalMonthlySpendPkr * totalHorizonMonths;

  // Status Quo: Corporate Extraction Model
  // Multinational conglomerates extract ~82% of net economic value via dividend repatriation, royalty franchise fees, and foreign supply imports
  const capitalExtractedForeignPkr = useMemo(() => {
    return Math.round(totalSpendOverHorizonPkr * 0.82);
  }, [totalSpendOverHorizonPkr]);

  const capitalExtractedForeignUsd = useMemo(() => {
    return Math.round(capitalExtractedForeignPkr / USD_TO_PKR);
  }, [capitalExtractedForeignPkr, USD_TO_PKR]);

  // Sovereignty Model: 100% Domestic Retention
  const domesticRetainedPkr = totalSpendOverHorizonPkr;
  const totalCirculationValuePkr = Math.round(domesticRetainedPkr * KEYNESIAN_MULTIPLIER);

  // Community Metrics
  // Average Pakistani living wage = PKR 45,000 / month
  const domesticJobsSustainedMonths = Math.round(totalCirculationValuePkr / 45000);
  const domesticJobsSustainedAnnual = Math.round((domesticJobsSustainedMonths / 12) * 10) / 10;

  // Local Tax Revenue (approx 12% domestic sales/corporate tax retained locally vs tax havens)
  const domesticTaxesRetainedPkr = Math.round(domesticRetainedPkr * 0.12);

  const resetDefaults = () => {
    setGroceriesSpend(35000);
    setDiningSpend(18000);
    setPersonalCareSpend(12000);
    setTechSpend(8000);
    setTimeHorizonYears(1);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-emerald-950 via-zinc-900 to-zinc-950 text-white border border-emerald-800/60 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase tracking-wider w-fit">
            <Coins className="w-3.5 h-3.5" />
            <span>Economic Sovereignty & Multiplier Engine</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            The "Reverse Corporate Extraction" Calculator
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            When you purchase multinational brands, up to 82% of your money drains abroad to Western hedge funds. When you buy Pakistani Tayyib alternatives, your money circulates <strong>2.5x through the domestic economy</strong>, sustaining local farmers, packagers, and neighborhood jobs.
          </p>
        </div>
      </div>

      {/* Spend Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sliders Column (6 cols) */}
        <div className="lg:col-span-6 p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Household Monthly Budget (PKR)
            </span>
            <button
              onClick={resetDefaults}
              className="text-[11px] font-bold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Slider 1: Groceries & Food */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-zinc-700 dark:text-zinc-300">Groceries, Tea, Oil & Pantry</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black">₨ {groceriesSpend.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="2500"
                value={groceriesSpend}
                onChange={e => setGroceriesSpend(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Slider 2: Dining & Fast Food */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-zinc-700 dark:text-zinc-300">Dining Out, Sodas & Fast Food</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black">₨ {diningSpend.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="60000"
                step="2000"
                value={diningSpend}
                onChange={e => setDiningSpend(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Slider 3: Personal Care & Detergents */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-zinc-700 dark:text-zinc-300">Personal Care, Soap & Detergents</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black">₨ {personalCareSpend.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="40000"
                step="1000"
                value={personalCareSpend}
                onChange={e => setPersonalCareSpend(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Slider 4: Tech & Subscriptions */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-zinc-700 dark:text-zinc-300">Tech Gadgets & Cloud Subs</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black">₨ {techSpend.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="2000"
                value={techSpend}
                onChange={e => setTechSpend(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          {/* Time Horizon Switcher */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
              Time Horizon:
            </span>
            <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
              <button
                onClick={() => setTimeHorizonYears(1)}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  timeHorizonYears === 1
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                1 Year
              </button>
              <button
                onClick={() => setTimeHorizonYears(3)}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  timeHorizonYears === 3
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                3 Years
              </button>
              <button
                onClick={() => setTimeHorizonYears(5)}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  timeHorizonYears === 5
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                5 Years
              </button>
            </div>
          </div>
        </div>

        {/* Results & Macro Economic Metrics (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Macro Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Foreign Extraction Drained */}
            <div className="p-5 rounded-3xl bg-rose-500 text-white shadow-lg space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-100">
                  Multinational Extraction
                </span>
                <span className="text-xs font-bold text-rose-200">82% Drain</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black">
                ₨ {capitalExtractedForeignPkr.toLocaleString()}
              </p>
              <p className="text-xs text-rose-100 font-semibold">
                ${capitalExtractedForeignUsd.toLocaleString()} USD drained to foreign parent shareholders.
              </p>
            </div>

            {/* Domestic 2.5x Multiplier Generated */}
            <div className="p-5 rounded-3xl bg-emerald-600 text-white shadow-lg space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-100">
                  Domestic Sovereignty
                </span>
                <span className="text-xs font-bold text-emerald-200">2.5x Velocity</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black">
                ₨ {totalCirculationValuePkr.toLocaleString()}
              </p>
              <p className="text-xs text-emerald-100 font-semibold">
                Cumulative economic activity created within Pakistan.
              </p>
            </div>
          </div>

          {/* Tangible Community Impact Breakdown */}
          <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3.5">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 block">
              Tangible National Ripple Effects ({timeHorizonYears} Year{timeHorizonYears > 1 ? 's' : ''}):
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60">
                <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-bold uppercase mb-1">
                  <Users className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Jobs Sustained</span>
                </div>
                <p className="text-lg font-black text-zinc-900 dark:text-white">
                  {domesticJobsSustainedAnnual} <span className="text-xs text-zinc-500">annual jobs</span>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60">
                <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-bold uppercase mb-1">
                  <Landmark className="w-3.5 h-3.5 text-sky-500" />
                  <span>Local Taxes</span>
                </div>
                <p className="text-lg font-black text-zinc-900 dark:text-white">
                  ₨ {domesticTaxesRetainedPkr.toLocaleString()}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60">
                <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-bold uppercase mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>USD Flight Prevented</span>
                </div>
                <p className="text-lg font-black text-zinc-900 dark:text-white">
                  ${capitalExtractedForeignUsd.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Explanation card */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed">
              <strong>The Keynesian Velocity Principle:</strong> When you spend PKR 100 on a local farmer or Pakistani factory, they buy diesel from local pumps, pay wages to packaging staff, and shop at local markets. That same PKR 100 turns over 2.5 times before leaving the economy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
