import React, { useMemo, useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useSearch } from '../hooks/useSearch';
import { ProductCard } from '../components/product/ProductCard';
import { BrandLogo } from '../components/BrandLogo';
import { Link } from 'react-router-dom';
import { POPULAR_CATEGORIES } from '../data/laymanCategories';
import { CategoryIcon } from '../components/CategoryIcon';
import { GAZA_CONSCIENCE_MESSAGES } from '../data/gazaQuotes';
import { useTranslation } from '../i18n/useTranslation';
import { 
  ScanLine, 
  ShoppingCart, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  UtensilsCrossed, 
  Users, 
  Flame, 
  Search,
  Filter,
  RefreshCw,
  HeartHandshake
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, searchQuery, selectedCategory, setSelectedCategory, setSearchQuery, isLoading } = useProducts();
  const { filteredProducts } = useSearch();
  const { t, isUrdu, translateCategory } = useTranslation();
  const [itemsToShow, setItemsToShow] = useState(24);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [severityFilter, setSeverityFilter] = useState<'All' | 'Critical'>('All');

  // Rotate quotes periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % GAZA_CONSCIENCE_MESSAGES.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const activeQuote = GAZA_CONSCIENCE_MESSAGES[quoteIndex];

  // Featured Priority Boycott Targets
  const featuredTargets = useMemo(() => {
    const priorityIds = ['coca-cola', 'pepsi', 'mcdonalds', 'kfc', 'starbucks', 'nestle', 'hp', 'caterpillar', 'puma', 'sabra', 'disney', 'zara'];
    return products
      .filter(p => priorityIds.some(target => p.id.includes(target) || p.name.toLowerCase().includes(target)))
      .slice(0, 6);
  }, [products]);

  // Calculations for stats
  const totalBoycotts = products.length;
  const totalAlternatives = products.reduce((acc, p) => acc + (p.alternatives?.length || 0), 0);

  const handleCategoryClick = (catName: string, query?: string) => {
    if (selectedCategory === catName && searchQuery === (query || '')) {
      setSelectedCategory('All');
      setSearchQuery('');
    } else {
      setSelectedCategory(catName || 'All');
      setSearchQuery(query || '');
    }
  };

  const displayedProducts = useMemo(() => {
    let list = filteredProducts;
    if (severityFilter === 'Critical') {
      list = list.filter(p => p.severity === 'Critical');
    }
    return list;
  }, [filteredProducts, severityFilter]);

  return (
    <div className="space-y-6">
      
      {/* 🇵🇸 Gaza Conscience Banner */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white border border-zinc-700/60 shadow-xs relative overflow-hidden flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0">
            <HeartHandshake className="w-4 h-4 text-red-400" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-red-400 flex items-center gap-1.5">
              <span>{isUrdu ? 'فلسطین کے ساتھ یکجہتی' : 'Solidarity with Gaza'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            </span>
            <p className="text-xs font-semibold text-zinc-200 truncate mt-0.5">
              "{isUrdu ? (activeQuote?.quoteUrdu || activeQuote?.quote) : activeQuote?.quote}"
            </p>
          </div>
        </div>
        <button 
          onClick={() => setQuoteIndex(prev => (prev + 1) % GAZA_CONSCIENCE_MESSAGES.length)}
          className="text-zinc-400 hover:text-white shrink-0 p-1.5 transition-colors"
          title="Next"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 📊 High-Impact Hero Stats Cards */}
      {!searchQuery && selectedCategory === 'All' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xs">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase">{isUrdu ? 'بائیکاٹ اہداف' : 'Boycott Targets'}</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">{totalBoycotts || '3,400'}+</p>
            <span className="text-[10px] text-zinc-500">{isUrdu ? 'مصدقہ بائیکاٹ شدہ برانڈز' : 'Verified complicit entities'}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase">{isUrdu ? 'پاکستانی متبادل' : 'Safe Swaps'}</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">{totalAlternatives || '1,800'}+</p>
            <span className="text-[10px] text-zinc-500">{isUrdu ? 'محفوظ اور معیاری متبادل' : 'Pakistani & ethical brands'}</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-100">{isUrdu ? 'فوری اقدامات' : 'Quick Actions'}</span>
              <ScanLine className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Link 
                to="/scan" 
                className="flex-1 text-center py-1.5 px-2 bg-white text-emerald-900 rounded-xl font-bold text-xs shadow-2xs hover:bg-emerald-50 active:scale-95 transition-all"
              >
                {t.scanner}
              </Link>
              <Link 
                to="/grocery" 
                className="flex-1 text-center py-1.5 px-2 bg-emerald-900/40 border border-white/20 text-white rounded-xl font-bold text-xs hover:bg-emerald-900/60 active:scale-95 transition-all"
              >
                {t.grocery}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 🏷️ Interactive Category Filter Pills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> {isUrdu ? 'کیٹیگریز منتخب کریں' : 'Filter by Category'}
          </span>
          {selectedCategory !== 'All' && (
            <button 
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
            >
              {isUrdu ? 'تمام دکھائیں' : 'Reset Filters'}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 shadow-2xs active:scale-95 ${
              selectedCategory === 'All' && !searchQuery
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
            }`}
          >
            {t.catAll}
          </button>

          {POPULAR_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === (cat.categoryName || 'All') && (cat.query ? searchQuery === cat.query : true);
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.categoryName || 'All', cat.query)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 shadow-2xs active:scale-95 ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                }`}
              >
                <CategoryIcon name={cat.iconName} className="w-3.5 h-3.5" />
                <span>{translateCategory(cat.name)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🎯 Main Content Area */}
      {(!searchQuery && selectedCategory === 'All') ? (
        <>
          {/* Featured Primary Targets Section */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
                {isUrdu ? 'بڑے بائیکاٹ اہداف' : 'Primary Boycott Targets'}
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              </h2>
              <span className="text-xs text-zinc-400 font-semibold">{isUrdu ? 'اہم ترین اہداف' : 'High Priority'}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {featuredTargets.map(item => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500 shadow-2xs hover:shadow-sm transition-all flex flex-col items-center gap-2 text-center group active:scale-95"
                >
                  <BrandLogo name={item.name} domain={item.domain} logo={item.logo} size="md" isBoycott={true} />
                  <div className="min-w-0 w-full">
                    <h3 className="font-bold text-xs text-zinc-900 dark:text-white group-hover:text-rose-600 transition-colors truncate">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-zinc-500 truncate mt-0.5">{item.parentCompany || translateCategory(item.category)}</p>
                    {item.alternatives && item.alternatives[0] && (
                      <span className="mt-1.5 inline-block text-[9px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-md truncate max-w-full">
                        ✓ {item.alternatives[0].name}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 🍔 Spotlight Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div 
              onClick={() => handleCategoryClick('Restaurants & Places')} 
              className="p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/40 dark:to-orange-950/20 border border-rose-200/80 dark:border-rose-900/60 cursor-pointer group hover:border-rose-500 transition-all shadow-2xs active:scale-[0.99]"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-3 shadow-sm">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-zinc-900 dark:text-white group-hover:text-rose-600 transition-colors">
                {isUrdu ? 'ریسٹورنٹس اور فاسٹ فوڈ' : 'Restaurants & Fast Food Chains'}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                {isUrdu ? 'میکڈونلڈز، کے ایف سی، پیزا ہٹ، سب وے وغیرہ کے بائیکاٹ شواہد اور محفوظ پاکستانی ریسٹورنٹس۔' : "Complicity logs for McDonald's, KFC, Pizza Hut, Subway, Starbucks & safe local eateries."}
              </p>
            </div>

            <div 
              onClick={() => handleCategoryClick('Celebrities & Endorsers')} 
              className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/20 border border-purple-200/80 dark:border-purple-900/60 cursor-pointer group hover:border-purple-500 transition-all shadow-2xs active:scale-[0.99]"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-3 shadow-sm">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-zinc-900 dark:text-white group-hover:text-purple-600 transition-colors">
                {isUrdu ? 'مشہور شخصیات اور سفیر' : 'Celebrity Endorsers & Personalities'}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                {isUrdu ? 'بائیکاٹ شدہ برانڈز کو پروموٹ کرنے والی شخصیات اور ان کے معاہدوں کی تفصیلات۔' : 'Track ambassadors promoting complicit brands and demand severance of brand contracts.'}
              </p>
            </div>
          </div>

          {/* Full Explore Catalog Header */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-black text-zinc-900 dark:text-white">
                {isUrdu ? 'تمام بائیکاٹ اہداف' : 'All Boycott Targets'} ({displayedProducts.length})
              </h2>
              <button
                onClick={() => setSeverityFilter(prev => prev === 'All' ? 'Critical' : 'All')}
                className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-colors ${
                  severityFilter === 'Critical' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                }`}
              >
                {severityFilter === 'Critical' ? (isUrdu ? '✓ صرف شدید اہداف' : '✓ Showing Critical Only') : (isUrdu ? 'صرف شدید اہداف' : 'Filter Critical Only')}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {displayedProducts.slice(0, itemsToShow).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {itemsToShow < displayedProducts.length && (
              <div className="text-center pt-6 pb-4">
                <button 
                  onClick={() => setItemsToShow(prev => prev + 24)}
                  className="px-6 py-2.5 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-black shadow-xs active:scale-95 transition-all"
                >
                  {isUrdu ? `مزید دکھائیں (${displayedProducts.length - itemsToShow})` : `Load More (${displayedProducts.length - itemsToShow} remaining)`}
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Search / Category Results View */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-500">
            <span>
              {searchQuery 
                ? (isUrdu ? `"${searchQuery}" کے لیے ${displayedProducts.length} نتائج ملے` : `Found ${displayedProducts.length} results for "${searchQuery}"`)
                : (isUrdu ? `${translateCategory(selectedCategory)} میں ${displayedProducts.length} برانڈز` : `${displayedProducts.length} Brands in ${selectedCategory}`)}
            </span>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-rose-600 dark:text-rose-400 hover:underline"
            >
              {isUrdu ? 'سرچ صاف کریں' : 'Clear Search'}
            </button>
          </div>

          {displayedProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
              <Search className="w-8 h-8 text-zinc-400 mx-auto" />
              <h3 className="font-black text-sm text-zinc-700 dark:text-zinc-300">
                {isUrdu ? 'کوئی برانڈ نہیں ملا' : 'No matching boycott targets found'}
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                {isUrdu ? 'اگر یہ برانڈ بائیکاٹ لسٹ کا حصہ ہونا چاہیے تو آپ ہمیں تجویز بھیج سکتے ہیں۔' : 'If this brand is complicit, you can submit it to our team for verification.'}
              </p>
              <Link 
                to="/suggest"
                className="inline-block mt-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-500"
              >
                + {t.suggest}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {displayedProducts.slice(0, itemsToShow).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {itemsToShow < displayedProducts.length && (
            <div className="text-center pt-6 pb-4">
              <button 
                onClick={() => setItemsToShow(prev => prev + 24)}
                className="px-6 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-xs font-black shadow-xs active:scale-95 transition-all"
              >
                {isUrdu ? 'مزید لوڈ کریں' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
