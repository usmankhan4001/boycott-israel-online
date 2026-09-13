import React from 'react';
import { 
  Search, 
  LayoutGrid, 
  ShoppingCart, 
  PlusCircle, 
  Info 
} from 'lucide-react';

interface Props {
  activeTab: 'search' | 'categories' | 'grocery' | 'about';
  setActiveTab: (tab: 'search' | 'categories' | 'grocery' | 'about') => void;
  groceryCount: number;
  onOpenSuggest: () => void;
}

export const NoThanksTabBar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  groceryCount,
  onOpenSuggest
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 px-2 py-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg transition-colors">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-around text-center text-[10px] font-bold">
        
        {/* 1. Search */}
        <button
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            activeTab === 'search' 
              ? 'text-rose-600 dark:text-rose-500 font-black scale-105' 
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span>Search</span>
        </button>

        {/* 2. Categories (Dedicated Page) */}
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            activeTab === 'categories' 
              ? 'text-rose-600 dark:text-rose-500 font-black scale-105' 
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <LayoutGrid className="w-5 h-5 mb-0.5" />
          <span>Categories</span>
        </button>

        {/* 3. Grocery List */}
        <button
          onClick={() => setActiveTab('grocery')}
          className={`relative flex flex-col items-center justify-center py-1 transition-all ${
            activeTab === 'grocery' 
              ? 'text-emerald-600 dark:text-emerald-400 font-black scale-105' 
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 mb-0.5" />
            {groceryCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-rose-600 text-white text-[9px] font-black h-4 min-w-4 px-1 rounded-full flex items-center justify-center shadow-sm">
                {groceryCount}
              </span>
            )}
          </div>
          <span>Grocery</span>
        </button>

        {/* 4. Suggest Proposal */}
        <button
          onClick={onOpenSuggest}
          className="flex flex-col items-center justify-center py-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mb-0.5" />
          <span>Suggest</span>
        </button>

        {/* 5. Intel / About */}
        <button
          onClick={() => setActiveTab('about')}
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            activeTab === 'about' 
              ? 'text-emerald-600 dark:text-emerald-400 font-black scale-105' 
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <Info className="w-5 h-5 mb-0.5" />
          <span>Intel</span>
        </button>

      </div>
    </div>
  );
};
