import React from 'react';
import { 
  Search, 
  ScanLine, 
  X, 
  Sparkles,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';
import { POPULAR_CATEGORIES } from '../data/laymanCategories';
import { CategoryIcon } from './CategoryIcon';

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  totalProductsCount: number;
  totalAlternativesCount: number;
  onOpenScanner: () => void;
  onOpenGrocery: () => void;
}

export const HeroSection: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  totalProductsCount,
  totalAlternativesCount,
  onOpenScanner,
  onOpenGrocery
}) => {
  const quickKeywords = ['Oreo', 'Lays', 'Surf Excel', 'Ariel', 'Dove', 'Lipton', 'KitKat', 'Pampers', 'KFC', 'McDonald\'s'];

  const handleCategoryClick = (cat: typeof POPULAR_CATEGORIES[0]) => {
    if (selectedCategory === cat.categoryName && searchQuery === (cat.query || '')) {
      setSelectedCategory('All');
      setSearchQuery('');
    } else {
      setSelectedCategory(cat.categoryName || 'All');
      if (cat.query) {
        setSearchQuery(cat.query);
      } else {
        setSearchQuery('');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-6 space-y-6">
      
      {/* App Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-red-600 flex items-center justify-center text-lg shadow-md">
            🇵🇸
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight leading-none">
              Is It Boycotted?
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Check in 1 second & find safe Pakistani alternatives
            </p>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{totalProductsCount} Brands Tracked</span>
        </div>
      </div>

      {/* Prominent Search & Barcode Scan Bar */}
      <div className="space-y-2">
        <div className="relative flex items-center bg-[#1C1C1E] border-2 border-emerald-500/30 focus-within:border-emerald-500 rounded-2xl p-1.5 shadow-xl transition-all">
          <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type any brand (e.g. Oreo, Lays, Surf, Ariel, Dove)..."
            className="w-full px-3 py-3 bg-transparent text-white placeholder-gray-500 text-sm sm:text-base font-medium focus:outline-none"
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-2 rounded-full hover:bg-white/[0.08] text-gray-400 hover:text-white mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* 1-Tap Barcode Camera Button */}
          <button
            onClick={onOpenScanner}
            className="ios-btn px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-md"
          >
            <ScanLine className="w-4 h-4" />
            <span>Scan 729</span>
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs text-gray-400">
          <span className="text-gray-500 text-[11px] shrink-0 font-medium">Quick search:</span>
          {quickKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setSearchQuery(kw)}
              className="px-2.5 py-1 rounded-full bg-[#1C1C1E] hover:bg-white/[0.1] text-gray-300 hover:text-white border border-white/[0.08] text-[11px] font-medium shrink-0"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Category Grid for Non-Tech Users */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="font-bold text-white uppercase tracking-wider">
            Explore Everyday Categories
          </span>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-emerald-400 font-bold hover:underline"
            >
              Show All Products
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {POPULAR_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.categoryName && (searchQuery === (cat.query || '') || !cat.query);
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className={`ios-card p-3 text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-950/30 shadow-md'
                    : 'hover:border-white/[0.2] bg-[#1C1C1E]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <CategoryIcon name={cat.iconName} className="w-5 h-5 text-emerald-400" />
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight line-clamp-1">
                    {cat.name}
                  </div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">
                    {cat.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
