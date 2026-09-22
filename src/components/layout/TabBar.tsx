import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, LayoutGrid, ShoppingCart, Info } from 'lucide-react';
import { useGroceryStore } from '../../stores/groceryStore';

export const TabBar: React.FC = () => {
  const groceryList = useGroceryStore(state => state.groceryList);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 z-50 px-6 py-3 pb-[env(safe-area-inset-bottom,12px)] shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
      <ul className="flex items-center justify-between">
        <li>
          <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}>
            <Search className="w-6 h-6" />
            <span className="text-[10px] font-bold">Search</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/categories" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}>
            <LayoutGrid className="w-6 h-6" />
            <span className="text-[10px] font-bold">Categories</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/grocery" className={({ isActive }) => `relative flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}>
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {groceryList.length > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[9px] font-black shadow-sm">
                  {groceryList.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold">Grocery</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}>
            <Info className="w-6 h-6" />
            <span className="text-[10px] font-bold">About</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
