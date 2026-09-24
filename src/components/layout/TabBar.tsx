import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  ScanLine, 
  Globe2, 
  ShoppingCart, 
  MessageSquareQuote,
  Sparkles
} from 'lucide-react';
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
        navigator.vibrate(12);
      } catch {}
    }
  };

  const tabs = [
    {
      to: '/',
      labelEn: 'Explore',
      labelUr: 'ایکسپلور',
      icon: Home,
      exact: true
    },
    {
      to: '/scan',
      labelEn: 'Scan 729',
      labelUr: 'اسکینر',
      icon: ScanLine,
      isCenterAction: true
    },
    {
      to: '/complicity',
      labelEn: 'Complicity',
      labelUr: 'کمپلیسیٹی',
      icon: Globe2
    },
    {
      to: '/grocery',
      labelEn: 'Tayyib Swaps',
      labelUr: 'طیب متبادل',
      icon: ShoppingCart,
      badge: groceryList.length > 0 ? groceryList.length : undefined
    },
    {
      to: '/community',
      labelEn: 'Community',
      labelUr: 'کمیونٹی',
      icon: MessageSquareQuote,
      hasDot: true
    }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-t border-zinc-200/80 dark:border-zinc-800/80 z-50 px-2 sm:px-4 py-1.5 pb-[calc(env(safe-area-inset-bottom,12px)+6px)] shadow-[0_-10px_35px_rgba(0,0,0,0.08)]">
      <ul className="flex items-center justify-around relative max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          if (tab.isCenterAction) {
            return (
              <li key={tab.to} className="-mt-6">
                <NavLink
                  to={tab.to}
                  onClick={handleHaptic}
                  className="w-13 h-13 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 text-white flex flex-col items-center justify-center shadow-lg shadow-rose-500/35 ring-4 ring-white dark:ring-zinc-950 active:scale-90 transition-transform relative group"
                  title={isUrdu ? tab.labelUr : tab.labelEn}
                >
                  <Icon className="w-6 h-6 animate-pulse" />
                  <span className="sr-only">{tab.labelEn}</span>
                </NavLink>
              </li>
            );
          }

          return (
            <li key={tab.to}>
              <NavLink
                to={tab.to}
                end={tab.exact}
                onClick={handleHaptic}
                className={({ isActive }) => `flex flex-col items-center gap-1 transition-all active:scale-90 px-2.5 py-1 rounded-2xl relative ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 font-black'
                    : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 font-semibold'
                }`}
              >
                {({ isActive }) => (
                  <>
                    <div className="relative">
                      <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : ''}`} />
                      
                      {/* Badge counter */}
                      {tab.badge && (
                        <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-black shadow-xs animate-in zoom-in-50">
                          {tab.badge}
                        </span>
                      )}

                      {/* Live pulse indicator dot */}
                      {tab.hasDot && !tab.badge && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      )}
                    </div>
                    
                    <span className={`text-[10px] sm:text-[11px] tracking-tight ${isUrdu ? 'font-bold leading-tight' : ''}`}>
                      {isUrdu ? tab.labelUr : tab.labelEn}
                    </span>

                    {/* Active Bottom Glow Pill */}
                    {isActive && (
                      <span className="absolute bottom-0 w-4 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-in fade-in" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
