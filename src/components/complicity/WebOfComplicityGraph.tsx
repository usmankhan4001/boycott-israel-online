import React, { useState, useMemo } from 'react';
import { 
  CRISIS_ZONES, 
  COMPLICIT_ENTITIES, 
  COMPLICITY_CONNECTIONS, 
  CrisisZone, 
  ComplicitEntity, 
  ComplicityConnection 
} from '../../data/complicityData';
import { 
  Network, 
  ShieldAlert, 
  Sliders, 
  Sparkles, 
  FileText, 
  ExternalLink, 
  Layers, 
  X, 
  CheckCircle2, 
  Globe, 
  DollarSign, 
  Building, 
  Flame, 
  Cpu, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';

export type ComplexityTier = 'beginner' | 'undergrad' | 'scholar';
export type CrisisId = 'palestine' | 'congo' | 'sudan' | 'kashmir';

export const WebOfComplicityGraph: React.FC = () => {
  const { isUrdu } = useTranslation();
  const [selectedCrises, setSelectedCrises] = useState<CrisisId[]>(['palestine', 'congo']);
  const [complexity, setComplexity] = useState<ComplexityTier>('undergrad');
  const [selectedEntity, setSelectedEntity] = useState<ComplicitEntity | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Toggle crisis filter
  const toggleCrisis = (id: CrisisId) => {
    setSelectedCrises(prev => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(c => c !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectAllCrises = () => {
    setSelectedCrises(['palestine', 'congo', 'sudan', 'kashmir']);
  };

  // Filter entities based on selected crises
  const filteredEntities = useMemo(() => {
    return COMPLICIT_ENTITIES.filter(entity => {
      // Must match at least one selected crisis
      const matchesCrisis = entity.connectedCrises.some(c => selectedCrises.includes(c));
      if (!matchesCrisis) return false;

      // Category filter
      if (selectedCategory !== 'All' && entity.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          entity.name.toLowerCase().includes(q) ||
          entity.keyCrimesSummary.toLowerCase().includes(q) ||
          entity.directBoycottTargets.some(t => t.toLowerCase().includes(q))
        );
      }

      return true;
    });
  }, [selectedCrises, selectedCategory, searchFilter]);

  // Active connections
  const activeConnections = useMemo(() => {
    const visibleIds = new Set(filteredEntities.map(e => e.id));
    return COMPLICITY_CONNECTIONS.filter(conn => {
      const touchesVisible = visibleIds.has(conn.sourceId) && visibleIds.has(conn.targetId);
      const touchesCrisis = conn.crises.some(c => selectedCrises.includes(c));
      return touchesVisible && touchesCrisis;
    });
  }, [filteredEntities, selectedCrises]);

  // Count overlap entities (connected to 2 or more currently selected crises)
  const multiCrisisActors = useMemo(() => {
    return filteredEntities.filter(e => {
      const matchCount = e.connectedCrises.filter(c => selectedCrises.includes(c)).length;
      return matchCount >= 2;
    });
  }, [filteredEntities, selectedCrises]);

  // Categories list
  const categories = ['All', 'Asset Manager', 'Defense Contractor', 'Big Tech', 'Resource Extraction', 'Conglomerate'];

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white border border-zinc-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-black uppercase tracking-wider">
              <Network className="w-3.5 h-3.5" />
              <span>Multi-Crisis Systems Architecture</span>
            </div>
            
            {/* Complexity Slider Switcher */}
            <div className="flex items-center bg-zinc-800/80 p-1 rounded-2xl border border-zinc-700/60 backdrop-blur-md">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-2 hidden sm:inline">
                Depth:
              </span>
              <button
                onClick={() => setComplexity('beginner')}
                className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-black transition-all ${
                  complexity === 'beginner'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Beginner
              </button>
              <button
                onClick={() => setComplexity('undergrad')}
                className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-black transition-all ${
                  complexity === 'undergrad'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Undergrad
              </button>
              <button
                onClick={() => setComplexity('scholar')}
                className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-black transition-all ${
                  complexity === 'scholar'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                PhD / Scholar
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              The Web of Complicity
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 leading-relaxed max-w-3xl">
              {complexity === 'beginner' &&
                'Discover how the same big funds, weapon makers, and tech companies profit from wars and child labor across Palestine, Congo, Sudan, and Kashmir.'}
              {complexity === 'undergrad' &&
                'Mapping the institutional shareholding, defense contracting, and mineral supply chains linking Wall Street asset managers to civilian slaughter and forced resource extraction.'}
              {complexity === 'scholar' &&
                'A decolonial structural analysis of global racial capitalism: Illuminating how universal asset managers and transatlantic defense conglomerates enforce extractivist sacrifice zones across the Global South.'}
            </p>
          </div>

          {/* Crisis Filter Chips */}
          <div className="pt-2">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Select Crisis Zones (Multi-Select for Overlap Analysis):
              </span>
              <button
                onClick={selectAllCrises}
                className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 underline"
              >
                Select All 4 Zones
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CRISIS_ZONES.map(zone => {
                const isSelected = selectedCrises.includes(zone.id as CrisisId);
                return (
                  <button
                    key={zone.id}
                    onClick={() => toggleCrisis(zone.id as CrisisId)}
                    className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-zinc-800/90 border-emerald-500/80 shadow-md ring-1 ring-emerald-500/40'
                        : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 opacity-60 hover:opacity-100 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{zone.flag}</span>
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'}`} />
                    </div>
                    <div className="mt-2">
                      <p className="text-xs font-black text-white">{zone.name}</p>
                      <p className="text-[10px] text-zinc-400 truncate mt-0.5">{zone.extractionResources[0]}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Overlap Indicator Pill */}
          {selectedCrises.length >= 2 && (
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-amber-200 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Multi-Crisis Convergence:</strong> Found{' '}
                  <span className="font-black text-white">{multiCrisisActors.length} corporate actors</span> profiting
                  simultaneously from your selected crisis zones.
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black shrink-0">
                Shared Complicity
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Network / Entity Explorer */}
      <div className="space-y-4">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                    : 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search complicit entity or target..."
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Nodes Grid / Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEntities.map(entity => {
            const isMultiTarget = entity.connectedCrises.filter(c => selectedCrises.includes(c)).length >= 2;
            return (
              <div
                key={entity.id}
                onClick={() => setSelectedEntity(entity)}
                className={`group p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900 border transition-all cursor-pointer hover:-translate-y-1 relative flex flex-col justify-between ${
                  isMultiTarget
                    ? 'border-amber-500/60 shadow-md hover:shadow-amber-500/10'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 shadow-xs hover:shadow-md'
                }`}
              >
                {isMultiTarget && (
                  <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-amber-500 text-zinc-950 font-black text-[9px] uppercase tracking-wider shadow-xs flex items-center gap-1">
                    <Flame className="w-2.5 h-2.5" />
                    <span>Cross-Crisis Actor</span>
                  </div>
                )}

                <div className="space-y-3">
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-zinc-900 dark:bg-zinc-800 text-white font-black text-xs flex items-center justify-center border border-zinc-700/50 shrink-0">
                        {entity.logoText.slice(0, 4)}
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {entity.name}
                        </h3>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                          {entity.category} • {entity.headquarters}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Connected Crisis Flags */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold text-zinc-400">Crises:</span>
                    {entity.connectedCrises.map(cId => {
                      const zone = CRISIS_ZONES.find(z => z.id === cId);
                      const isHighlighted = selectedCrises.includes(cId);
                      return (
                        <span
                          key={cId}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${
                            isHighlighted
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          <span>{zone?.flag}</span>
                          <span className="capitalize">{cId}</span>
                        </span>
                      );
                    })}
                  </div>

                  {/* Evidence summary based on complexity */}
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
                    {entity.evidenceDossier[complexity]}
                  </p>

                  {/* Financial Magnitude Metric */}
                  <div className="p-2.5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/40 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Financial Metric</span>
                    </div>
                    <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 truncate max-w-[160px]">
                      {entity.financialComplicityMetric}
                    </span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold text-zinc-400">
                    {entity.directBoycottTargets.length} boycott brand{entity.directBoycottTargets.length > 1 ? 's' : ''}
                  </span>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:underline">
                    <span>View Dossier</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Bottom Sheet / Modal Dossier */}
      {selectedEntity && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div 
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-7 space-y-5"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white font-black text-sm flex items-center justify-center border border-zinc-700 shadow-md">
                  {selectedEntity.logoText}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-50">
                      {selectedEntity.name}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-[10px] font-black">
                      {selectedEntity.category}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 font-semibold mt-0.5">
                    {selectedEntity.headquarters} • AUM/Cap: {selectedEntity.marketCapOrAumUsd}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEntity(null)}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Crises Connected Badges */}
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                Connected Geopolitical Sacrifice Zones:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedEntity.connectedCrises.map(cId => {
                  const zone = CRISIS_ZONES.find(z => z.id === cId);
                  return (
                    <div
                      key={cId}
                      className="px-2.5 py-1 rounded-xl bg-zinc-900 text-white text-xs font-black flex items-center gap-1.5 border border-zinc-700"
                    >
                      <span>{zone?.flag}</span>
                      <span>{zone?.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Evidence Dossier Depth */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span>Evidence Dossier ({complexity.toUpperCase()} Tier)</span>
                </span>
                <span className="text-[10px] font-bold text-zinc-400">
                  Switch tier on top to change depth
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                {selectedEntity.evidenceDossier[complexity]}
              </div>
            </div>

            {/* UN & SEC Citations */}
            <div className="space-y-2">
              <span className="text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <span>Verified Legal & UN Citations</span>
              </span>
              <div className="space-y-1.5">
                {selectedEntity.unSecCitations.map((cite, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-zinc-100">{cite.title}</p>
                      <p className="text-[10px] font-mono text-zinc-500">{cite.filingOrDocNumber} ({cite.year})</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-700 text-[10px] font-black text-zinc-700 dark:text-zinc-300">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Consumer Targets & Local Tayyib Alternative Action */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-1.5">
                <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  Direct Boycott Brands:
                </span>
                <ul className="text-xs font-semibold text-rose-950 dark:text-rose-200 space-y-1">
                  {selectedEntity.directBoycottTargets.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-rose-500">✖</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-1.5">
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Local Tayyib Action:
                </span>
                <p className="text-xs font-semibold text-emerald-950 dark:text-emerald-200 leading-relaxed">
                  {selectedEntity.localTayyibAction}
                </p>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setSelectedEntity(null)}
              className="w-full py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-black hover:opacity-90 transition-opacity"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
