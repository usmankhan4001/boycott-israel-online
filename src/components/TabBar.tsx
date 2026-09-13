import React from 'react';
import { 
  Search, 
  ShoppingCart, 
  ScanLine, 
  PlusCircle, 
  Info 
} from 'lucide-react';

interface Props {
  activeTab: 'explore' | 'grocery' | 'about';
  setActiveTab: (tab: 'explore' | 'grocery' | 'about') => void;
  groceryCount: number;
  onOpenScanner: () => void;
  onOpenSuggest: () => void;
}

export const TabBar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  groceryCount,
  onOpenScanner,
  onOpenSuggest
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#121214]/90 backdrop-blur-2xl border-t border-white/[0.08] px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-5 items-center justify-around text-[10px] font-medium">
        
        {/* Explore / Search */}
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'explore' ? 'text-emerald-400 font-bold' : 'text-gray-400'
          }`}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span>Search</span>
        </button>

        {/* 729 Scanner */}
        <button
          onClick={onOpenScanner}
          className="flex flex-col items-center justify-center py-1 text-gray-400 hover:text-white transition-colors"
        >
          <ScanLine className="w-5 h-5 mb-0.5 text-blue-400" />
          <span>729 Scan</span>
        </button>

        {/* Grocery List (Centered & Prominent) */}
        <button
          onClick={() => setActiveTab('grocery')}
          className={`relative flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'grocery' ? 'text-emerald-400 font-bold' : 'text-gray-400'
          }`}
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 mb-0.5" />
            {groceryCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-black h-4 min-w-4 px-1 rounded-full flex items-center justify-center">
                {groceryCount}
              </span>
            )}
          </div>
          <span>Grocery</span>
        </button>

        {/* Suggest */}
        <button
          onClick={onOpenSuggest}
          className="flex flex-col items-center justify-center py-1 text-gray-400 hover:text-white transition-colors"
        >
          <PlusCircle className="w-5 h-5 mb-0.5 text-amber-400" />
          <span>Suggest</span>
        </button>

        {/* Info & FAQs */}
        <button
          onClick={() => setActiveTab('about')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'about' ? 'text-emerald-400 font-bold' : 'text-gray-400'
          }`}
        >
          <Info className="w-5 h-5 mb-0.5" />
          <span>Intel</span>
        </button>

      </div>
    </div>
  );
};
