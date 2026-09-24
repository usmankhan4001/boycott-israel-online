import React, { useState, useEffect } from 'react';
import { 
  INITIAL_BOUNTIES, 
  MarketBounty 
} from '../../data/bountyData';
import { 
  Flame, 
  Sparkles, 
  ThumbsUp, 
  Coins, 
  Users, 
  Building2, 
  CheckCircle2, 
  PlusCircle, 
  Search, 
  X, 
  ShieldAlert, 
  Layers, 
  ArrowUpRight,
  Beaker
} from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';

const STORAGE_BOUNTY_KEY = 'bio_bounty_data_v1';
const STORAGE_UPVOTES_KEY = 'bio_bounty_user_upvotes';

export const BountyBoardView: React.FC = () => {
  const { isUrdu } = useTranslation();
  const [bounties, setBounties] = useState<MarketBounty[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BOUNTY_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_BOUNTIES;
  });

  const [userUpvotes, setUserUpvotes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_UPVOTES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals state
  const [pledgeTargetBounty, setPledgeTargetBounty] = useState<MarketBounty | null>(null);
  const [pledgeAmountInput, setPledgeAmountInput] = useState<number>(3000);
  const [pledgeSuccess, setPledgeSuccess] = useState(false);

  const [makerTargetBounty, setMakerTargetBounty] = useState<MarketBounty | null>(null);
  const [makerName, setMakerName] = useState('');
  const [makerCity, setMakerCity] = useState('');
  const [makerSummary, setMakerSummary] = useState('');
  const [makerEmail, setMakerEmail] = useState('');
  const [makerSuccess, setMakerSuccess] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOUNTY_KEY, JSON.stringify(bounties));
    } catch {}
  }, [bounties]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_UPVOTES_KEY, JSON.stringify(userUpvotes));
    } catch {}
  }, [userUpvotes]);

  // Categories
  const categories = [
    'All',
    'Baby Care',
    'Electronics & Hardware',
    'Personal Care & Cosmetics',
    'Food & Beverages',
    'Cleaning & Household'
  ];

  // Upvote toggle
  const handleToggleUpvote = (id: string) => {
    const isUpvoted = userUpvotes.includes(id);
    if (isUpvoted) {
      setUserUpvotes(prev => prev.filter(bId => bId !== id));
      setBounties(prev =>
        prev.map(b => (b.id === id ? { ...b, upvotesCount: Math.max(0, b.upvotesCount - 1) } : b))
      );
    } else {
      setUserUpvotes(prev => [...prev, id]);
      setBounties(prev =>
        prev.map(b => (b.id === id ? { ...b, upvotesCount: b.upvotesCount + 1 } : b))
      );
    }
  };

  // Submit Pledge
  const handleConfirmPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeTargetBounty || pledgeAmountInput <= 0) return;

    setBounties(prev =>
      prev.map(b => {
        if (b.id === pledgeTargetBounty.id) {
          return {
            ...b,
            pledgedMonthlySpendPkr: b.pledgedMonthlySpendPkr + pledgeAmountInput,
            totalPledgersCount: b.totalPledgersCount + 1
          };
        }
        return b;
      })
    );
    setPledgeSuccess(true);
    setTimeout(() => {
      setPledgeSuccess(false);
      setPledgeTargetBounty(null);
    }, 1800);
  };

  // Submit Maker Proposal
  const handleConfirmProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!makerTargetBounty || !makerName.trim() || !makerSummary.trim()) return;

    const newProposal = {
      id: `prop-${Date.now()}`,
      makerName: makerName.trim(),
      city: makerCity.trim() || 'Pakistan',
      status: 'Prototyping' as const,
      summary: makerSummary.trim(),
      contactEmail: makerEmail.trim()
    };

    setBounties(prev =>
      prev.map(b => {
        if (b.id === makerTargetBounty.id) {
          return {
            ...b,
            activeProposalsCount: b.activeProposalsCount + 1,
            proposals: [newProposal, ...b.proposals]
          };
        }
        return b;
      })
    );

    setMakerSuccess(true);
    setTimeout(() => {
      setMakerSuccess(false);
      setMakerTargetBounty(null);
      setMakerName('');
      setMakerCity('');
      setMakerSummary('');
      setMakerEmail('');
    }, 1800);
  };

  const filteredBounties = bounties.filter(b => {
    if (selectedCategory !== 'All' && b.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.boycottedTargetToReplace.toLowerCase().includes(q) ||
        b.suggestedDomesticMakers.some(m => m.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const totalDemandPledgedPkr = bounties.reduce((acc, b) => acc + b.pledgedMonthlySpendPkr, 0);

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-indigo-950 via-zinc-900 to-zinc-950 text-white border border-indigo-800/60 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Consumer Demand Aggregator</span>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-white text-xs font-black border border-white/10">
              Total Backed Demand:{' '}
              <span className="text-emerald-400 font-mono">
                ₨ {(totalDemandPledgedPkr / 1000000).toFixed(1)}M / month
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              The "Bounty Board" for Unmade Products
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed mt-1">
              Crowd-aggregating verified monthly demand for unmade domestic alternatives. When 10,000 families pledge their monthly spending, local manufacturers and food scientists gain the guaranteed market needed to produce clean, Tayyib Pakistani products.
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
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
            placeholder="Search product gaps or target to replace..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Bounties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredBounties.map(bounty => {
          const isUpvoted = userUpvotes.includes(bounty.id);
          return (
            <div
              key={bounty.id}
              className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      {bounty.category} • Urgency: <span className="text-rose-500 font-black">{bounty.urgency}</span>
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-50 leading-snug">
                      {bounty.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleToggleUpvote(bounty.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 border transition-all active:scale-95 ${
                      isUpvoted
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{bounty.upvotesCount}</span>
                  </button>
                </div>

                {/* Target to replace */}
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-xs flex items-center justify-between">
                  <span className="text-rose-700 dark:text-rose-300 font-bold text-[10px] uppercase">
                    Target to Replace:
                  </span>
                  <span className="font-black text-rose-950 dark:text-rose-200 truncate max-w-[200px]">
                    ✖ {bounty.boycottedTargetToReplace}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {bounty.description}
                </p>

                {/* Scientific Requirements */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    Key Scientific / Tayyib Standards:
                  </span>
                  <ul className="text-[11px] text-zinc-600 dark:text-zinc-400 space-y-0.5">
                    {bounty.scientificRequirements.slice(0, 3).map((req, rIdx) => (
                      <li key={rIdx} className="flex items-center gap-1.5">
                        <span className="text-indigo-500 font-bold">✔</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Demand Metrics & Action Bar */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase block">
                      Pledged Monthly Demand
                    </span>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      ₨ {(bounty.pledgedMonthlySpendPkr / 1000000).toFixed(2)}M / mo
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase block">
                      Backers
                    </span>
                    <span className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                      {bounty.totalPledgersCount.toLocaleString()} families
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPledgeTargetBounty(bounty)}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>Pledge Spend</span>
                  </button>

                  <button
                    onClick={() => setMakerTargetBounty(bounty)}
                    className="py-2.5 px-3 rounded-xl bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 text-white font-black text-xs flex items-center justify-center gap-1.5 border border-zinc-700 active:scale-95 transition-all"
                  >
                    <Beaker className="w-3.5 h-3.5 text-indigo-400" />
                    <span>I Can Make This</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pledge Modal */}
      {pledgeTargetBounty && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div 
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-md shadow-2xl p-5 sm:p-6 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-black text-zinc-900 dark:text-zinc-50">
                  Pledge Monthly Household Spend
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5 truncate max-w-xs">
                  {pledgeTargetBounty.title}
                </p>
              </div>
              <button onClick={() => setPledgeTargetBounty(null)} className="text-zinc-400 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {pledgeSuccess ? (
              <div className="p-6 text-center space-y-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-12 h-12 mx-auto animate-bounce" />
                <p className="text-sm font-black">Pledge Registered Successfully!</p>
                <p className="text-xs text-zinc-500">Thank you for guaranteeing domestic demand.</p>
              </div>
            ) : (
              <form onSubmit={handleConfirmPledge} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Monthly Spending Amount (PKR)
                  </label>
                  <input
                    type="number"
                    min="500"
                    step="500"
                    value={pledgeAmountInput}
                    onChange={e => setPledgeAmountInput(parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2 text-sm font-bold bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-[10px] text-zinc-400 mt-1">
                    No immediate charge. This commits your intent to buy when certified local product launches.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all active:scale-95"
                >
                  Confirm PKR {pledgeAmountInput.toLocaleString()} / mo Pledge
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Maker / Producer Pitch Modal */}
      {makerTargetBounty && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div 
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-lg shadow-2xl p-5 sm:p-6 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-black text-zinc-900 dark:text-zinc-50">
                  Domestic Maker Proposal Callout
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5 truncate max-w-xs">
                  {makerTargetBounty.title}
                </p>
              </div>
              <button onClick={() => setMakerTargetBounty(null)} className="text-zinc-400 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {makerSuccess ? (
              <div className="p-6 text-center space-y-2 text-indigo-600 dark:text-indigo-400">
                <CheckCircle2 className="w-12 h-12 mx-auto animate-bounce" />
                <p className="text-sm font-black">Producer Proposal Submitted!</p>
                <p className="text-xs text-zinc-500">Your lab/maker profile is now visible on the bounty board.</p>
              </div>
            ) : (
              <form onSubmit={handleConfirmProposal} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Company / Lab / Maker Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sufi Agro-Bio Labs / PakPure Tech"
                    value={makerName}
                    onChange={e => setMakerName(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">City & Facility Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Lahore / Karachi / Faisalabad"
                    value={makerCity}
                    onChange={e => setMakerCity(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Prototype & Manufacturing Roadmap</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your raw material sourcing, lab testing progress, and expected production timeline..."
                    value={makerSummary}
                    onChange={e => setMakerSummary(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 font-semibold resize-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Contact Email / WhatsApp for Backers</label>
                  <input
                    type="text"
                    placeholder="contact@yourmakerlab.pk"
                    value={makerEmail}
                    onChange={e => setMakerEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md transition-all active:scale-95"
                >
                  Submit Proposal to Bounty Board
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
