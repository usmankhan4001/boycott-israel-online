import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Search, LayoutGrid, ShoppingCart, MessageSquare, ScanLine, Flame } from 'lucide-react';
import { useGroceryStore } from '../../stores/groceryStore';
import { useTranslation } from '../../i18n/useTranslation';

export const TabBar: React.FC = () => {
  const groceryList = useGroceryStore(state => state.groceryList);
  const { t, isUrdu } = useTranslation();
  const location = useLocation();

  // Don't show tab bar on full-screen scanner page
  if (location.pathname === '/scan') {
    return null;
  }

  const handleHaptic = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch {}
    }
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-200/80 dark:border-zinc-800/80 z-50 px-2 sm:px-4 py-2 pb-[env(safe-area-inset-bottom,12px)] shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <ul className="flex items-center justify-around relative">
        {/* Tab 1: Explore / Search */}
        <li>
          <NavLink 
            to="/" 
            onClick={handleHaptic}
            className={({ isActive }) => `flex flex-col items-center gap-1 transition-all active:scale-90 px-2 py-1 ${
              isActive 
                ? 'text-emerald-600 dark:text-emerald-400 font-black' 
                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 font-semibold'
            }`}
          >
            <Search className="w-5 h-5" />
            <span className={`text-[10px] sm:text-[11px] ${isUrdu ? 'font-bold leading-tight' : ''}`}>{t.allBrands}</span>
          </NavLink>
        </li>

        {/* Tab 2: Categories */}
        <li>
          <NavLink 
            to="/categories" 
            onClick={handleHaptic}
            className={({ isActive }) => `flex flex-col items-center gap-1 transition-all active:scale-90 px-2 py-1 ${
              isActive 
                ? 'text-emerald-600 dark:text-emerald-400 font-black' 
                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 font-semibold'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className={`text-[10px] sm:text-[11px] ${isUrdu ? 'font-bold leading-tight' : ''}`}>{t.categories}</span>
          </NavLink>
        </li>

        {/* Center Floating Action Button: Barcode Scanner */}
        <li className="-mt-6">
          <NavLink 
            to="/scan" 
            onClick={handleHaptic}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex flex-col items-center justify-center shadow-lg shadow-emerald-500/30 ring-4 ring-white dark:ring-zinc-900 active:scale-90 transition-transform"
            title={t.scanner}
          >
            <ScanLine className="w-6 h-6" />
          </NavLink>
        </li>

        {/* Tab 4: Community Stories */}
        <li>
          <NavLink 
            to="/community" 
            onClick={handleHaptic}
            className={({ isActive }) => `flex flex-col items-center gap-1 transition-all active:scale-90 px-2 py-1 ${
              isActive 
                ? 'text-emerald-600 dark:text-emerald-400 font-black' 
                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 font-semibold'
            }`}
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <span className={`text-[10px] sm:text-[11px] ${isUrdu ? 'font-bold leading-tight' : ''}`}>{t.community}</span>
          </NavLink>
        </li>

        {/* Tab 5: Grocery Conscience List */}
        <li>
          <NavLink 
            to="/grocery" 
            onClick={handleHaptic}
            className={({ isActive }) => `relative flex flex-col items-center gap-1 transition-all active:scale-90 px-2 py-1 ${
              isActive 
                ? 'text-emerald-600 dark:text-emerald-400 font-black' 
                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 font-semibold'
            }`}
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {groceryList.length > 0 && (
                <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-black shadow-xs animate-in zoom-in-50">
                  {groceryList.length}
                </span>
              )}
            </div>
            <span className={`text-[10px] sm:text-[11px] ${isUrdu ? 'font-bold leading-tight' : ''}`}>{t.grocery}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
