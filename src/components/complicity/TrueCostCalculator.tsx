import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Baby, 
  Flame, 
  DollarSign, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Layers, 
  AlertTriangle, 
  HeartHandshake,
  Smartphone,
  Laptop,
  Car,
  Gem,
  Coffee,
  ShoppingBag
} from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';

interface PresetItem {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  defaultPriceUsd: number;
  cobaltGrams: number;
  coltanGrams: number;
  goldGrams: number;
  militaryFractionScore: number; // 0-1 multiplier
  description: string;
}

const PRESET_ITEMS: PresetItem[] = [
  {
    id: 'smartphone',
    name: 'Flagship Smartphone (iPhone / Galaxy)',
    category: 'Consumer Electronics',
    icon: <Smartphone className="w-5 h-5 text-sky-400" />,
    defaultPriceUsd: 1200,
    cobaltGrams: 14,
    coltanGrams: 3.5,
    goldGrams: 0.034,
    militaryFractionScore: 0.12, // Tech R&D + Nimbus Cloud taxes
    description: 'Contains lithium-ion battery cobalt mined in Katanga DRC and microchip tantalum capacitors.'
  },
  {
    id: 'laptop',
    name: 'High-End Laptop / MacBook',
    category: 'Consumer Electronics',
    icon: <Laptop className="w-5 h-5 text-indigo-400" />,
    defaultPriceUsd: 2200,
    cobaltGrams: 45,
    coltanGrams: 8.2,
    goldGrams: 0.22,
    militaryFractionScore: 0.15,
    description: 'Requires large capacity multi-cell lithium batteries and high-frequency tantalum processors.'
  },
  {
    id: 'ev-car',
    name: 'Electric Vehicle (EV Battery Pack)',
    category: 'Automotive',
    icon: <Car className="w-5 h-5 text-emerald-400" />,
    defaultPriceUsd: 42000,
    cobaltGrams: 14000, // 14 kg
    coltanGrams: 120,
    goldGrams: 2.5,
    militaryFractionScore: 0.08,
    description: 'A 75kWh EV battery pack requires approximately 14 kilograms of refined cobalt.'
  },
  {
    id: 'diamond-gold',
    name: 'Luxury Gold & Diamond Jewelry',
    category: 'Luxury Goods',
    icon: <Gem className="w-5 h-5 text-amber-400" />,
    defaultPriceUsd: 3500,
    cobaltGrams: 0,
    coltanGrams: 0,
    goldGrams: 18,
    militaryFractionScore: 0.28,
    description: 'Israeli diamond polishing hub accounts for 8% of global cut diamonds; gold traded via Dubai RSF pipelines.'
  },
  {
    id: 'soda-habit',
    name: 'Daily Multinational Soda / Fast Food (1 Year)',
    category: 'Food Habit',
    icon: <Coffee className="w-5 h-5 text-rose-400" />,
    defaultPriceUsd: 730, // $2/day
    cobaltGrams: 0,
    coltanGrams: 0,
    goldGrams: 0,
    militaryFractionScore: 0.35, // High corporate dividend repatriations & settlement factory profits
    description: 'Continuous annual revenue drain to multinational conglomerates with factories in illegal settlements.'
  },
  {
    id: 'fast-fashion',
    name: 'Fast Fashion Haul (Zara / H&M / Shein)',
    category: 'Apparel',
    icon: <ShoppingBag className="w-5 h-5 text-fuchsia-400" />,
    defaultPriceUsd: 450,
    cobaltGrams: 0,
    coltanGrams: 0,
    goldGrams: 0,
    militaryFractionScore: 0.20,
    description: 'Synthetic microfibers and cotton harvested under forced labor, marketed by complicit retail syndicates.'
  }
];

export const TrueCostCalculator: React.FC = () => {
  const { isUrdu } = useTranslation();
  const [selectedPresetId, setSelectedPresetId] = useState<string>('smartphone');
  const [quantity, setQuantity] = useState<number>(1);
  const [currency, setCurrency] = useState<'USD' | 'PKR'>('USD');
  const [customPriceUsd, setCustomPriceUsd] = useState<number>(1200);

  const USD_TO_PKR = 278.5;

  const selectedPreset = PRESET_ITEMS.find(p => p.id === selectedPresetId) || PRESET_ITEMS[0];

  // Handle Preset Select
  const handleSelectPreset = (preset: PresetItem) => {
    setSelectedPresetId(preset.id);
    setCustomPriceUsd(preset.defaultPriceUsd);
  };

  // Calculations
  const totalPriceUsd = customPriceUsd * quantity;
  const totalPricePkr = totalPriceUsd * USD_TO_PKR;

  // 1 Child hour in Katanga artisan pits yields approx 0.35g of raw hand-picked cobalt/coltan ore
  const childLaborHours = useMemo(() => {
    if (selectedPreset.cobaltGrams > 0 || selectedPreset.coltanGrams > 0) {
      const totalOreGrams = (selectedPreset.cobaltGrams + selectedPreset.coltanGrams) * quantity;
      return Math.round((totalOreGrams / 0.35) * 10) / 10;
    }
    // Fallback based on tech spend if custom
    return Math.round((totalPriceUsd * 0.04) * 10) / 10;
  }, [selectedPreset, quantity, totalPriceUsd]);

  // Lost School Days (approx 6 hours/day)
  const lostSchoolDays = Math.round((childLaborHours / 6) * 10) / 10;

  // Conflict Gold & Displacement Grams (Sudan / UAE pipeline)
  const conflictGoldGrams = useMemo(() => {
    if (selectedPreset.goldGrams > 0) {
      return Math.round((selectedPreset.goldGrams * quantity) * 100) / 100;
    }
    return Math.round((totalPriceUsd * 0.0004) * 100) / 100;
  }, [selectedPreset, quantity, totalPriceUsd]);

  // Military Munitions / IDF Ammunition Fraction Funding ($150 per 155mm round propellant charge)
  const militaryFractionFundingUsd = useMemo(() => {
    return Math.round(totalPriceUsd * selectedPreset.militaryFractionScore * 0.15);
  }, [totalPriceUsd, selectedPreset]);

  // Toxic Acid Slurry Tailings (litres of chemical waste dumped in Congolese waterways)
  const toxicTailingsLitres = useMemo(() => {
    return Math.round((childLaborHours * 1.8) * 10) / 10;
  }, [childLaborHours]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white border border-zinc-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-black uppercase tracking-wider w-fit">
            <Baby className="w-3.5 h-3.5" />
            <span>The "Lost Childhood" Ledger</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            The "True Cost" Calculator
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            Every dollar spent on complicit conglomerates extracts a hidden human toll. Calculate the uncompensated child labor hours in Congolese cobalt pits, Sudanese gold displacement, and military ammunition funding hidden inside consumer price tags.
          </p>
        </div>
      </div>

      {/* Preset Item Selector */}
      <div className="space-y-3">
        <span className="text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
          Select Consumer Item or Product Category:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {PRESET_ITEMS.map(item => {
            const isSelected = item.id === selectedPresetId;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectPreset(item)}
                className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-900 text-white border-rose-500 shadow-md ring-2 ring-rose-500/40'
                    : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                }`}
              >
                <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 w-fit">
                  {item.icon}
                </div>
                <div className="mt-3">
                  <p className="text-xs font-black truncate">{item.name}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">${item.defaultPriceUsd.toLocaleString()}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculator Controls & Quantity */}
      <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
            Unit Price ({currency})
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={currency === 'USD' ? customPriceUsd : Math.round(customPriceUsd * USD_TO_PKR)}
              onChange={e => {
                const val = parseFloat(e.target.value) || 0;
                setCustomPriceUsd(currency === 'USD' ? val : val / USD_TO_PKR);
              }}
              className="w-full px-3.5 py-2 text-sm font-bold bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'PKR' : 'USD')}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-[10px] font-black text-zinc-700 dark:text-zinc-200"
            >
              {currency} ⇄
            </button>
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
            Quantity / Annual Purchases
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 font-black text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full text-center py-2 text-sm font-black bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 font-black text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
            Total Capital Committed
          </label>
          <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
            <span className="text-sm font-black text-zinc-900 dark:text-zinc-100">
              ${totalPriceUsd.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              ₨ {Math.round(totalPricePkr).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Human Cost Metric Cards Output */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Child Labor Hours */}
        <div className="p-5 rounded-3xl bg-rose-500 text-white shadow-lg space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-100">
              Congo DRC Pits
            </span>
            <Baby className="w-5 h-5 text-rose-200" />
          </div>
          <p className="text-3xl sm:text-4xl font-black">
            {childLaborHours} <span className="text-base font-bold">hrs</span>
          </p>
          <p className="text-xs text-rose-100 font-medium">
            Uncompensated child labor hand-digging toxic cobalt/coltan ore in Katanga mines.
          </p>
          <div className="pt-2 text-[10px] font-bold text-rose-200 border-t border-rose-400/50">
            Equivalent to <strong>{lostSchoolDays} school days</strong> stolen.
          </div>
        </div>

        {/* Metric 2: Military Weapons Fraction */}
        <div className="p-5 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-lg space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
              Military Subsidies
            </span>
            <Flame className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-3xl sm:text-4xl font-black text-amber-400">
            ${militaryFractionFundingUsd}
          </p>
          <p className="text-xs text-zinc-300 font-medium">
            Fractional R&D, corporate taxes, and Israeli bond payouts funding artillery and surveillance.
          </p>
          <div className="pt-2 text-[10px] font-bold text-zinc-400 border-t border-zinc-800">
            Enriches aerospace contractors Boeing & Lockheed.
          </div>
        </div>

        {/* Metric 3: Toxic Slurry Tailings */}
        <div className="p-5 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-lg space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
              Ecological Toxicity
            </span>
            <ShieldAlert className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl sm:text-4xl font-black text-emerald-400">
            {toxicTailingsLitres} <span className="text-base font-bold">L</span>
          </p>
          <p className="text-xs text-zinc-300 font-medium">
            Acid leaching waste and heavy-metal slurry discharged into Congo water basins.
          </p>
          <div className="pt-2 text-[10px] font-bold text-zinc-400 border-t border-zinc-800">
            Leaches uranium, sulfur, and lead into soil.
          </div>
        </div>

        {/* Metric 4: Conflict Gold Grams */}
        <div className="p-5 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-lg space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
              Sudan Gold Pipeline
            </span>
            <Gem className="w-5 h-5 text-sky-400" />
          </div>
          <p className="text-3xl sm:text-4xl font-black text-sky-400">
            {conflictGoldGrams} <span className="text-base font-bold">g</span>
          </p>
          <p className="text-xs text-zinc-300 font-medium">
            Estimated artisanal gold mined under RSF militia territorial control in Darfur.
          </p>
          <div className="pt-2 text-[10px] font-bold text-zinc-400 border-t border-zinc-800">
            Laundered through UAE commodities refineries.
          </div>
        </div>
      </div>

      {/* Tayyib Action Blueprint */}
      <div className="p-5 sm:p-6 rounded-3xl bg-emerald-900/20 border border-emerald-500/30 text-emerald-950 dark:text-emerald-200 space-y-3">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4" />
          <span>The Tayyib Remediation Pathway</span>
        </div>
        <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
          How to Break the Extraction Cycle Today
        </h3>
        <ul className="text-xs sm:text-sm space-y-2 text-zinc-700 dark:text-zinc-300">
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 font-black">1.</span>
            <span><strong>Extend Hardware Lifespan:</strong> Refurbish and battery-swap your existing phone or laptop for 4–5 years instead of annual upgrades. Each year deferred eliminates child labor hours.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 font-black">2.</span>
            <span><strong>Boycott Multinational Fast Food:</strong> Redirect dining spend to local mom-and-pop restaurants and 100% Pakistani cold drinks (Pakola, Gourmet Cola, fresh sattu).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 font-black">3.</span>
            <span><strong>Demand Conflict-Free Electronics:</strong> Support open-source hardware, modular phones, and demand fair-trade certification for Congolese cobalt miners.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
