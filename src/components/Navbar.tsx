import React from 'react';
import { 
  ShieldCheck, 
  ShoppingCart, 
  ScanLine, 
  PlusCircle, 
  Download, 
  Wifi, 
  WifiOff, 
  Zap, 
  Info 
} from 'lucide-react';

interface Props {
  activeTab: 'explore' | 'grocery' | 'about';
  setActiveTab: (tab: 'explore' | 'grocery' | 'about') => void;
  groceryCount: number;
  onOpenScanner: () => void;
  onOpenSuggest: () => void;
  dataSaver: boolean;
  setDataSaver: (val: boolean) => void;
  isInstallable: boolean;
  onInstallApp: () => void;
  isOffline: boolean;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  groceryCount,
  onOpenScanner,
  onOpenSuggest,
  dataSaver,
  setDataSaver,
  isInstallable,
  onInstallApp,
  isOffline
}) => {
  return (
    <header className="sticky top-0 z-40 ios-glass-nav px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 sm:h-16">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => { setActiveTab('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-lg shadow-sm">
            🇵🇸
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white">
                Boycott<span className="text-emerald-400">Israel</span>
              </span>
              <span className="text-[10px] font-semibold text-gray-400 bg-white/[0.06] px-1.5 py-0.5 rounded">
                PWA
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Segmented Navigation */}
        <nav className="hidden md:flex items-center p-1 rounded-2xl bg-black/40 border border-white/[0.06] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-4 py-1.5 rounded-xl transition-all ${
              activeTab === 'explore'
                ? 'bg-[#3A3A3C] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Products & Alternatives
          </button>

          <button
            onClick={() => setActiveTab('grocery')}
            className={`relative px-4 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'grocery'
                ? 'bg-[#3A3A3C] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>Grocery Planner</span>
            {groceryCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-black h-4 px-1.5 rounded-full flex items-center justify-center">
                {groceryCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-1.5 rounded-xl transition-all ${
              activeTab === 'about'
                ? 'bg-[#3A3A3C] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Intel & FAQs
          </button>
        </nav>

        {/* Right Tools & Action Buttons */}
        <div className="flex items-center gap-2">
          
          {/* 729 Scanner Button (Desktop) */}
          <button
            onClick={onOpenScanner}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-gray-300 transition-colors"
          >
            <ScanLine className="w-3.5 h-3.5 text-emerald-400" />
            <span>729 Scanner</span>
          </button>

          {/* Suggest (Desktop) */}
          <button
            onClick={onOpenSuggest}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-gray-300 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Suggest</span>
          </button>

          {/* Data Saver Mode */}
          <button
            onClick={() => setDataSaver(!dataSaver)}
            className={`p-2 rounded-xl transition-colors ${
              dataSaver ? 'bg-amber-500/20 text-amber-300' : 'bg-white/[0.06] text-gray-400 hover:text-white'
            }`}
            title={dataSaver ? 'Data Saver Active' : 'Toggle Data Saver Mode'}
          >
            <Zap className={`w-4 h-4 ${dataSaver ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>

          {/* PWA Install Button */}
          {isInstallable && (
            <button
              onClick={onInstallApp}
              className="ios-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          )}

          {/* Offline indicator */}
          <div className="flex items-center gap-1 text-[11px] text-gray-400 pl-1">
            {isOffline ? (
              <span className="flex items-center gap-1 text-amber-400">
                <WifiOff className="w-3.5 h-3.5" />
              </span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
