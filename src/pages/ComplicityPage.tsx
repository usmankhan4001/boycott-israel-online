import React, { useState } from 'react';
import { WebOfComplicityGraph } from '../components/complicity/WebOfComplicityGraph';
import { TrueCostCalculator } from '../components/complicity/TrueCostCalculator';
import { ToxicSwapWarning } from '../components/tayyib/ToxicSwapWarning';
import { TickCrossStudio } from '../components/viral/TickCrossStudio';
import { ReverseExtractionCalculator } from '../components/impact/ReverseExtractionCalculator';
import { BountyBoardView } from '../components/bounty/BountyBoardView';
import { 
  Network, 
  Calculator, 
  ShieldAlert, 
  Share2, 
  Coins, 
  Sparkles,
  Flame
} from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

export type ComplicityTab = 'web' | 'true-cost' | 'toxic-swap' | 'social-studio' | 'reverse-extraction' | 'bounties';

export const ComplicityPage: React.FC = () => {
  const { isUrdu } = useTranslation();
  const [activeTab, setActiveTab] = useState<ComplicityTab>('web');

  const tabs = [
    {
      id: 'web' as ComplicityTab,
      name: 'Web of Complicity',
      icon: <Network className="w-4 h-4" />,
      badge: 'Multi-Crisis'
    },
    {
      id: 'true-cost' as ComplicityTab,
      name: 'True Cost Calculator',
      icon: <Calculator className="w-4 h-4" />,
      badge: 'Lost Childhood'
    },
    {
      id: 'toxic-swap' as ComplicityTab,
      name: 'The Toxic Swap',
      icon: <ShieldAlert className="w-4 h-4 text-amber-400" />,
      badge: 'Tayyib Standard'
    },
    {
      id: 'social-studio' as ComplicityTab,
      name: 'Tick vs. Cross Studio',
      icon: <Share2 className="w-4 h-4" />,
      badge: 'Viral Canvas'
    },
    {
      id: 'reverse-extraction' as ComplicityTab,
      name: 'Reverse Extraction',
      icon: <Coins className="w-4 h-4 text-emerald-400" />,
      badge: '2.5x Multiplier'
    },
    {
      id: 'bounties' as ComplicityTab,
      name: 'Unmade Bounty Board',
      icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
      badge: 'Demand'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Feature Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-200 dark:border-zinc-800">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 shrink-0 transition-all ${
                isActive
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md ring-2 ring-zinc-900 dark:ring-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold ${
                isActive
                  ? 'bg-white/20 dark:bg-zinc-900/20 text-white dark:text-zinc-900'
                  : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Component */}
      <div className="animate-in fade-in duration-200">
        {activeTab === 'web' && <WebOfComplicityGraph />}
        {activeTab === 'true-cost' && <TrueCostCalculator />}
        {activeTab === 'toxic-swap' && <ToxicSwapWarning />}
        {activeTab === 'social-studio' && <TickCrossStudio />}
        {activeTab === 'reverse-extraction' && <ReverseExtractionCalculator />}
        {activeTab === 'bounties' && <BountyBoardView />}
      </div>
    </div>
  );
};
