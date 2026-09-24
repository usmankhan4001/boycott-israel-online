import React, { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useSearch } from '../hooks/useSearch';
import { ProductCard } from '../components/product/ProductCard';
import { ProductDetailSheet } from '../components/product/ProductDetailSheet';
import { ProductItem } from '../types';
import { useTranslation } from '../i18n/useTranslation';
import { WebOfComplicityGraph } from '../components/complicity/WebOfComplicityGraph';
import { ToxicSwapWarning } from '../components/tayyib/ToxicSwapWarning';
import { BountyBoardView } from '../components/bounty/BountyBoardView';
import { SwipeableDiscoveryFeed } from '../components/home/SwipeableDiscoveryFeed';
import { POPULAR_CATEGORIES } from '../data/laymanCategories';
import { 
  Search, 
  X, 
  Sparkles, 
  ShieldAlert, 
  Globe2, 
  Flame, 
  Filter,
  CheckCircle2,
  ScanLine
} from 'lucide-react';
import { Link } from 'react-router-dom';

type AppTab = 'catalog' | 'complicity' | 'tayyib' | 'bounties' | 'swipe';

export const HomePage: React.FC = () => {
  const { products, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useProducts();
  const { filteredProducts } = useSearch();
  const { t, isUrdu } = useTranslation();
  
  const [activeTab, setActiveTab] = useState<AppTab>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [severityFilter, setSeverityFilter] = useState<'All' | 'Critical'>('All');

  const categories = useMemo(() => {
    return ['All', 'Food & Beverages', 'Personal Care', 'Technology', 'Clothing', 'Restaurants & Places', 'Celebrities & Endorsers'];
  }, []);

  const displayedList = useMemo(() => {
    let list = filteredProducts;
    if (severityFilter === 'Critical') {
      list = list.filter(p => p.severity === 'Critical');
    }
    return list;
  }, [filteredProducts, severityFilter]);

  return (
    <div className="space-y-4 max-w-4xl mx-auto min-w-0 pb-12">
      {/* Search Bar (Spotlight) */}
      <div className="relative sticky top-16 z-30 pt-1 pb-1">
        <div className="relative flex items-center bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl sm:rounded-3xl shadow-xs transition-all focus-within:border-zinc-400 dark:focus-within:border-zinc-700 focus-within:shadow-md">
          <Search className="w-4 h-4 text-zinc-400 ml-4 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isUrdu ? 'برانڈ، پیرنٹ کمپنی، یا بارکوڈ تلاش کریں...' : 'Search brand, parent company, or barcode...'}
            className="w-full px-3.5 py-3 rounded-2xl bg-transparent text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
            dir={isUrdu ? 'rtl' : 'ltr'}
          />
          {searchQuery ? (
            <button 
              onClick={() => setSearchQuery('')}
              className="p-1.5 mr-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/scan"
              className="mr-3 p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-rose-500 transition-colors"
              title="Barcode Scanner"
            >
              <ScanLine className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Segmented Mode Switcher (Clean Pills) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs font-bold shrink-0">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-3.5 py-2 rounded-2xl whitespace-nowrap transition-all ${
            activeTab === 'catalog'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
              : 'bg-zinc-100 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
          }`}
        >
          {isUrdu ? '🇵🇰 برانڈز اور متبادل' : '🇵🇰 Brands & Swaps'}
        </button>

        <button
          onClick={() => setActiveTab('complicity')}
          className={`px-3.5 py-2 rounded-2xl whitespace-nowrap transition-all ${
            activeTab === 'complicity'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
              : 'bg-zinc-100 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
          }`}
        >
          {isUrdu ? '🌐 کمپلیسیٹی گراف' : '🌐 Complicity Web'}
        </button>

        <button
          onClick={() => setActiveTab('tayyib')}
          className={`px-3.5 py-2 rounded-2xl whitespace-nowrap transition-all ${
            activeTab === 'tayyib'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
              : 'bg-zinc-100 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
          }`}
        >
          {isUrdu ? '🛡️ طیب و صحت' : '🛡️ Tayyib vs Toxic'}
        </button>

        <button
          onClick={() => setActiveTab('bounties')}
          className={`px-3.5 py-2 rounded-2xl whitespace-nowrap transition-all ${
            activeTab === 'bounties'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
              : 'bg-zinc-100 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
          }`}
        >
          {isUrdu ? '💡 مارکیٹ باؤنٹیز' : '💡 Market Bounties'}
        </button>

        <button
          onClick={() => setActiveTab('swipe')}
          className={`px-3.5 py-2 rounded-2xl whitespace-nowrap transition-all ${
            activeTab === 'swipe'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
              : 'bg-zinc-100 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
          }`}
        >
          {isUrdu ? '⚡ ریلز فیڈ' : '⚡ 3D Reel Cards'}
        </button>
      </div>

      {/* Tab Content 1: Catalog & Swaps */}
      {activeTab === 'catalog' && (
        <div className="space-y-3.5">
          {/* Category Filter Chips */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? 'All' : cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Severity Toggle */}
            <button
              onClick={() => setSeverityFilter(severityFilter === 'All' ? 'Critical' : 'All')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors border ${
                severityFilter === 'Critical'
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-800'
              }`}
            >
              {severityFilter === 'Critical' ? '🔴 Critical Only' : 'All Severity'}
            </button>
          </div>

          {/* Results Count Summary */}
          <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 px-1">
            <span>
              {displayedList.length} {isUrdu ? 'ہدف برانڈز' : 'targets found'}
              {searchQuery && ` for "${searchQuery}"`}
            </span>
            <span>{isUrdu ? 'تفصیل کے لیے کلک کریں' : 'Tap any card for details'}</span>
          </div>

          {/* Product Feed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
            {displayedList.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => setSelectedProduct(product)} 
              />
            ))}
          </div>

          {displayedList.length === 0 && (
            <div className="p-12 text-center rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 space-y-2">
              <ShieldAlert className="w-8 h-8 text-zinc-400 mx-auto" />
              <h3 className="font-bold text-sm text-zinc-700 dark:text-zinc-300">
                {isUrdu ? 'کوئی برانڈ نہیں ملا' : 'No matching brand found'}
              </h3>
              <p className="text-xs text-zinc-400">
                {isUrdu ? 'آپ نیا ہدف یا متبادل تجویز کر سکتے ہیں' : 'Search with another term or suggest a new entry'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab Content 2: Web of Complicity */}
      {activeTab === 'complicity' && <WebOfComplicityGraph />}

      {/* Tab Content 3: Tayyib vs Toxic Matrix */}
      {activeTab === 'tayyib' && <ToxicSwapWarning />}

      {/* Tab Content 4: Market Gap Bounty Board */}
      {activeTab === 'bounties' && <BountyBoardView />}

      {/* Tab Content 5: Swipeable 3D Card Feed */}
      {activeTab === 'swipe' && <SwipeableDiscoveryFeed />}

      {/* Native Bottom Sheet for Product Detail */}
      <ProductDetailSheet
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
