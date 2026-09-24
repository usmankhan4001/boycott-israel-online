import React, { useState } from 'react';
import { TOXIC_CHEMICALS_DICTIONARY, ToxicChemical } from '../../data/toxicChemicalsData';
import { 
  ShieldAlert, 
  X, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';

interface ChemicalDictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialChemicalId?: string;
}

export const ChemicalDictionaryModal: React.FC<ChemicalDictionaryModalProps> = ({
  isOpen,
  onClose,
  initialChemicalId
}) => {
  const { isUrdu } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedChemicalId, setExpandedChemicalId] = useState<string | null>(initialChemicalId || null);

  if (!isOpen) return null;

  const categories = ['All', 'Sweetener', 'Artificial Color', 'Preservative', 'Flavor Enhancer'];

  const filteredChemicals = TOXIC_CHEMICALS_DICTIONARY.filter(item => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.cellularMechanism.toLowerCase().includes(q) ||
        item.commonProductsFoundIn.some(p => p.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-start justify-between gap-3 bg-zinc-50 dark:bg-zinc-900/50">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-50">
                The Chemical Exposer Dictionary
              </h2>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Biochemical dossiers on synthetic additives, international bans, and wholesome Tayyib replacements.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by additive name (e.g. HFCS, Red 40, Aspartame, E319)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Chemical List Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredChemicals.map(chem => {
            const isExpanded = expandedChemicalId === chem.id;
            return (
              <div
                key={chem.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isExpanded
                    ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/10 shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                {/* Collapsed Header */}
                <div 
                  className="flex items-start justify-between gap-3 cursor-pointer"
                  onClick={() => setExpandedChemicalId(isExpanded ? null : chem.id)}
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm sm:text-base font-black text-zinc-900 dark:text-zinc-50">
                        {chem.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono font-bold text-zinc-600 dark:text-zinc-400">
                        {chem.code}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                        chem.severity === 'Dangerous'
                          ? 'bg-rose-500 text-white'
                          : chem.severity === 'High Risk'
                          ? 'bg-amber-500 text-zinc-950'
                          : 'bg-yellow-500 text-zinc-950'
                      }`}>
                        {chem.severity}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500">
                      Category: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{chem.category}</span> • 
                      EU: <span className="font-semibold text-rose-600 dark:text-rose-400">{chem.euBanStatus}</span> • 
                      Japan: <span className="font-semibold text-rose-600 dark:text-rose-400">{chem.japanBanStatus}</span>
                    </p>
                  </div>

                  <button className="text-xs font-bold text-rose-600 dark:text-rose-400 shrink-0">
                    {isExpanded ? 'Less' : 'Dossier'}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3.5 text-xs animate-in fade-in duration-150">
                    {/* Biological Hazards */}
                    <div>
                      <span className="font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider block mb-1">
                        Known Biological Hazards:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-zinc-700 dark:text-zinc-300">
                        {chem.biologicalHazards.map((hazard, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-1.5">
                            <span className="text-rose-500">⚠</span>
                            <span>{hazard}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cellular Mechanism */}
                    <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60">
                      <span className="font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider block mb-0.5">
                        Cellular & Toxicological Mechanism:
                      </span>
                      <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {chem.cellularMechanism}
                      </p>
                    </div>

                    {/* Halal vs Tayyib Verdict */}
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-500/20 text-amber-950 dark:text-amber-200">
                      <span className="font-black uppercase tracking-wider block mb-0.5 text-[10px] text-amber-700 dark:text-amber-400">
                        Halal vs. Tayyib Verdict:
                      </span>
                      <p className="leading-relaxed">
                        {chem.halalVsTayyibVerdict}
                      </p>
                    </div>

                    {/* Pure Tayyib Replacement */}
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 text-emerald-950 dark:text-emerald-200">
                      <span className="font-black uppercase tracking-wider block mb-0.5 text-[10px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Pure Wholesome Tayyib Alternative:</span>
                      </span>
                      <p className="leading-relaxed font-semibold">
                        {chem.tayyibWholesomeAlternative}
                      </p>
                    </div>

                    {/* Common products */}
                    <div>
                      <span className="text-[10px] font-bold text-zinc-400 block mb-1">
                        Frequently Found Inside:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {chem.commonProductsFoundIn.map((prod, pIdx) => (
                          <span
                            key={pIdx}
                            className="px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[10px] font-medium text-zinc-600 dark:text-zinc-300"
                          >
                            {prod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-semibold">
            {filteredChemicals.length} biochemical entries documented
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-black"
          >
            Close Dictionary
          </button>
        </div>
      </div>
    </div>
  );
};
