import React, { useState } from 'react';
import { 
  TOXIC_SWAP_COMPARISONS, 
  ToxicSwapComparison 
} from '../../data/toxicChemicalsData';
import { ChemicalDictionaryModal } from './ChemicalDictionaryModal';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Sparkles, 
  Leaf, 
  HeartHandshake,
  ArrowRight,
  Info
} from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';

export const ToxicSwapWarning: React.FC = () => {
  const { isUrdu } = useTranslation();
  const [isDictOpen, setIsDictOpen] = useState(false);
  const [selectedChemicalId, setSelectedChemicalId] = useState<string | undefined>();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Beverages & Sodas', 'Snacks & Crisps', 'Tea & Daily Brew'];

  const filteredSwaps = TOXIC_SWAP_COMPARISONS.filter(s => 
    activeCategory === 'All' ? true : s.category === activeCategory
  );

  const handleOpenChemical = (chemId: string) => {
    setSelectedChemicalId(chemId);
    setIsDictOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-950 via-zinc-900 to-zinc-950 text-white border border-amber-800/60 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Tayyib vs. Halal Paradigm</span>
            </div>

            <button
              onClick={() => {
                setSelectedChemicalId(undefined);
                setIsDictOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-black flex items-center gap-1.5 backdrop-blur-md transition-all active:scale-95 border border-white/10"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Open Chemical Exposer Dictionary</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            "The Toxic Swap" Warning Engine
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            Boycotting multinational genocide funders is our moral duty—but don't trade corporate poison for local chemical junk. Many cheap counterfeit swaps are loaded with neurotoxic sweeteners, synthetic food dyes, and carcinogenic preservatives. Demand food that is both <strong>Halal (Lawful)</strong> and <strong>Tayyib (Pure & Wholesome)</strong>.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${
              activeCategory === cat
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3-Tier Side-by-Side Biochemical Comparison Cards */}
      <div className="space-y-6">
        {filteredSwaps.map(swap => (
          <div 
            key={swap.id}
            className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
                Category: {swap.category}
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                Verified 3-Tier Analysis
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Card 1: Boycott Target (Red) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      <span>1. Boycott Target</span>
                    </span>
                    <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">Genocide Complicit</span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-rose-950 dark:text-rose-100">
                      {swap.boycottTarget.name}
                    </h3>
                    <p className="text-[10px] font-semibold text-rose-700 dark:text-rose-300">
                      {swap.boycottTarget.parent}
                    </p>
                  </div>

                  <p className="text-xs text-rose-900 dark:text-rose-200/90 leading-relaxed">
                    {swap.boycottTarget.whyBoycott}
                  </p>
                </div>

                <div className="pt-3 border-t border-rose-200 dark:border-rose-900/60 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    Toxic Additives Flagged:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {swap.boycottTarget.toxicAdditives.map((add, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200 text-[10px] font-medium"
                      >
                        {add}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 2: Dirty Local Swap (Amber/Yellow Warning) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-zinc-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>2. The "Dirty" Swap</span>
                    </span>
                    <span className="text-[10px] font-black text-amber-700 dark:text-amber-400">
                      Clean Score: {swap.dirtyLocalSwap.cleanScore}/100
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-amber-950 dark:text-amber-100">
                      {swap.dirtyLocalSwap.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold text-emerald-600">Halal: ✔</span>
                      <span className="text-[10px] font-bold text-rose-600">Tayyib: ✖ (Harmful)</span>
                    </div>
                  </div>

                  <p className="text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed">
                    {swap.dirtyLocalSwap.warning}
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-200 dark:border-amber-900/60 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Synthetic Chemicals Flagged:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {swap.dirtyLocalSwap.toxicAdditives.map((add, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 text-[10px] font-medium"
                      >
                        {add}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3: Pure Tayyib Wholesome Alternative (Green) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 flex flex-col justify-between space-y-3 shadow-xs">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>3. Pure Tayyib Standard</span>
                    </span>
                    <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-300">
                      Clean Score: {swap.pureTayyibAlternative.cleanScore}/100
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-emerald-950 dark:text-emerald-50">
                      {swap.pureTayyibAlternative.name}
                    </h3>
                    <p className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                      {swap.pureTayyibAlternative.producer} • {swap.pureTayyibAlternative.origin}
                    </p>
                  </div>

                  <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                    {swap.pureTayyibAlternative.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-emerald-200 dark:border-emerald-900/60 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Real Wholesome Ingredients:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {swap.pureTayyibAlternative.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 text-[10px] font-bold"
                      >
                        ✔ {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chemical Dictionary Modal */}
      <ChemicalDictionaryModal
        isOpen={isDictOpen}
        onClose={() => setIsDictOpen(false)}
        initialChemicalId={selectedChemicalId}
      />
    </div>
  );
};
