import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Search, ScanLine, ShoppingCart, Download, Menu, X, PlusCircle } from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';
import { useGroceryStore } from '../../stores/groceryStore';
import { useProducts } from '../../hooks/useProducts';
import { usePWA } from '../../hooks/usePWA';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useUIStore();
  const groceryList = useGroceryStore(state => state.groceryList);
  const { searchQuery, setSearchQuery } = useProducts();
  const { isInstallable, installApp } = usePWA();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-emerald-600 dark:bg-emerald-700 text-white rounded-b-2xl p-4 sm:p-6 shadow-sm space-y-4 relative z-30 transition-all sticky top-0">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Link to="/" className="flex items-center gap-3 min-w-0" onClick={() => setSearchQuery('')}>
          <img 
            src="/app-logo.png" 
            alt="BoycottIsrael Logo" 
            className="w-11 h-11 rounded-full object-contain bg-white p-0.5 shadow-sm shrink-0" 
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white truncate">
                BoycottIsrael
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] text-emerald-100 font-semibold">by</span>
              <div className="bg-white/95 px-1.5 py-0.5 rounded flex items-center shadow-2xs">
                <img 
                  src="/takweyat-logo.png" 
                  alt="Takweyat Foundation" 
                  className="h-3.5 object-contain" 
                />
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-black/15 p-1 rounded-xl text-xs font-bold text-emerald-50">
          <Link to="/" className={`px-3 py-1.5 rounded-lg transition-all ${location.pathname === '/' ? 'bg-white text-emerald-900 shadow-xs font-black' : 'hover:bg-white/10 text-white'}`}>All Brands</Link>
          <Link to="/categories" className={`px-3 py-1.5 rounded-lg transition-all ${location.pathname === '/categories' ? 'bg-white text-emerald-900 shadow-xs font-black' : 'hover:bg-white/10 text-white'}`}>Categories</Link>
          <Link to="/grocery" className={`px-3 py-1.5 rounded-lg transition-all ${location.pathname === '/grocery' ? 'bg-white text-emerald-900 shadow-xs font-black' : 'hover:bg-white/10 text-white'}`}>Grocery ({groceryList.length})</Link>
          <Link to="/about" className={`px-3 py-1.5 rounded-lg transition-all ${location.pathname === '/about' ? 'bg-white text-emerald-900 shadow-xs font-black' : 'hover:bg-white/10 text-white'}`}>Why Boycott</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-colors">
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
          </button>

          <Link to="/suggest" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Suggest</span>
          </Link>

          {isInstallable && (
            <button onClick={installApp} className="px-3 py-1.5 rounded-xl bg-white text-emerald-800 text-xs font-black flex items-center gap-1 shadow-xs active:scale-95 transition-all">
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
          )}

          <button className="md:hidden p-2 bg-white/15 rounded-xl text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden flex flex-col gap-2 mt-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="px-3 py-2 bg-white/10 rounded-lg text-white font-semibold">All Brands</Link>
          <Link to="/categories" onClick={() => setIsMenuOpen(false)} className="px-3 py-2 bg-white/10 rounded-lg text-white font-semibold">Categories</Link>
          <Link to="/grocery" onClick={() => setIsMenuOpen(false)} className="px-3 py-2 bg-white/10 rounded-lg text-white font-semibold">Grocery</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="px-3 py-2 bg-white/10 rounded-lg text-white font-semibold">Why Boycott</Link>
        </nav>
      )}

      {location.pathname === '/' && (
        <div className="pt-2">
          <div className="relative flex items-center bg-white dark:bg-zinc-900 rounded-xl p-1.5 shadow-md border border-white/20 dark:border-zinc-700 transition-all">
            <Search className="w-4 h-4 text-zinc-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brand, restaurant, celebrity or barcode..."
              className="w-full px-3 py-2 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs sm:text-sm font-semibold focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 mr-1">
                <X className="w-4 h-4" />
              </button>
            )}
            <Link to="/scan" className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-black flex items-center gap-1.5 shrink-0 shadow-xs">
              <ScanLine className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Scan / 729</span>
              <span className="sm:hidden">Scan</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
