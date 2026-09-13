import React, { useState, useEffect, useMemo } from 'react';
import { ProductItem, GroceryItem, NotificationSettings } from './types';
import { 
  getAllProducts, 
  getStoredGroceryList, 
  saveStoredGroceryList,
  getStoredNotificationSettings,
  saveStoredNotificationSettings,
  getDataSaverMode,
  setDataSaverMode
} from './utils/storage';
import { checkAndScheduleMonthlyReminder } from './utils/notifications';

// No Thanks Components
import { NoThanksScanner } from './components/NoThanksScanner';
import { NoThanksProductCard } from './components/NoThanksProductCard';
import { ProductDetailView } from './components/ProductDetailView';
import { NoThanksTabBar } from './components/NoThanksTabBar';
import { GroceryPlanner } from './components/GroceryPlanner';
import { SuggestionModal } from './components/SuggestionModal';
import { AboutFaqSection } from './components/AboutFaqSection';
import { CategoriesView } from './components/CategoriesView';
import { CategoryIcon } from './components/CategoryIcon';
import { BrandLogo } from './components/BrandLogo';
import { POPULAR_CATEGORIES } from './data/laymanCategories';

// Icons
import { 
  Search, 
  ScanLine, 
  X, 
  CheckCircle2, 
  AlertOctagon, 
  Plus, 
  Download, 
  Sun, 
  Moon, 
  WifiOff,
  Sparkles,
  ShieldCheck,
  Bell,
  ShoppingCart,
  ChevronRight,
  Flame,
  ArrowRight,
  HeartHandshake
} from 'lucide-react';

export function App() {
  // Theme State: 'light' | 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('no_thanks_theme') as 'light' | 'dark') || 'light';
  });

  // Apply theme to document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('no_thanks_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Navigation & Tabs: 'search' | 'categories' | 'grocery' | 'about'
  const [activeTab, setActiveTab] = useState<'search' | 'categories' | 'grocery' | 'about'>('search');

  // Database
  const [products, setProducts] = useState<ProductItem[]>(() => getAllProducts());

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [itemsToShow, setItemsToShow] = useState(25);

  // Selected Product for Full-Screen Detail View
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Modals
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);

  // Grocery State
  const [groceryList, setGroceryList] = useState<GroceryItem[]>(() => getStoredGroceryList());
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(() => getStoredNotificationSettings());
  
  // Data Saver & Network State
  const [dataSaver, setDataSaver] = useState<boolean>(() => getDataSaverMode());
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // PWA Install Prompt
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<{ text: string } | null>(null);

  // Sync Grocery List to LocalStorage
  useEffect(() => {
    saveStoredGroceryList(groceryList);
  }, [groceryList]);

  // Sync Data Saver
  useEffect(() => {
    setDataSaverMode(dataSaver);
  }, [dataSaver]);

  // Network Status Listeners
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // PWA Install Prompt Listener
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  // Check scheduled monthly reminders
  useEffect(() => {
    checkAndScheduleMonthlyReminder(notificationSettings);
  }, [notificationSettings]);

  // Trigger PWA Installation
  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  // Show Toast
  const showToast = (text: string) => {
    setToastMessage({ text });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add Alternative from Product to Grocery List
  const handleAddProductToGrocery = (product: ProductItem) => {
    const defaultAlt = product.alternatives[0]?.name || 'Safe Local Alternative';
    const altCountry = product.alternatives[0]?.country || 'Local';
    const altLogo = product.alternatives[0]?.logo;

    const newItem: GroceryItem = {
      id: `g-${Date.now()}-${Math.random()}`,
      name: `${defaultAlt} (alt for ${product.name})`,
      category: product.category,
      isBoycott: false,
      chosenAlternative: `${defaultAlt} (${altCountry})`,
      suggestedAlternatives: product.alternatives,
      checked: false,
      quantity: 1,
      unit: 'item',
      logo: altLogo
    };

    setGroceryList(prev => [newItem, ...prev]);
    showToast(`✓ Added ${defaultAlt} to Grocery Checklist`);
  };

  // Reload products after custom suggestion
  const handleProductAdded = () => {
    setProducts(getAllProducts());
    showToast('✓ Proposal submitted to research team');
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return products.filter(p => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;

      const nameMatch = p.name.toLowerCase().includes(q);
      const parentMatch = p.parentCompany.toLowerCase().includes(q);
      const subcatMatch = p.subcategory.toLowerCase().includes(q);
      const reasonMatch = p.boycottReason.toLowerCase().includes(q);
      const altMatch = p.alternatives.some(a => a.name.toLowerCase().includes(q) || a.country.toLowerCase().includes(q));

      return nameMatch || parentMatch || subcatMatch || reasonMatch || altMatch;
    });
  }, [products, searchQuery, selectedCategory]);

  // Featured Critical BDS Targets (for Discovery Carousel)
  const featuredTargets = useMemo(() => {
    const targetNames = ['coca-cola', 'pepsi', 'nestle', 'unilever', 'mcdonalds', 'kfc', 'starbucks', 'loreal', 'puma', 'hp', 'zara', 'carrefour'];
    return products.filter(p => targetNames.some(t => p.name.toLowerCase().includes(t) || p.parentCompany.toLowerCase().includes(t))).slice(0, 8);
  }, [products]);

  // Featured Pakistani Safe Swaps
  const featuredPakistaniSwaps = useMemo(() => {
    return products.filter(p => p.alternatives.some(a => a.country.toLowerCase().includes('pakistan'))).slice(0, 6);
  }, [products]);

  // Reset pagination when filter changes
  useEffect(() => {
    setItemsToShow(25);
  }, [searchQuery, selectedCategory]);

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
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col items-center justify-start selection:bg-rose-600 selection:text-white pb-20 transition-colors duration-200">
      
      {/* Centered Native Mobile App Shell */}
      <div className="w-full max-w-xl min-h-screen bg-white dark:bg-zinc-900 border-x border-zinc-200 dark:border-zinc-800 flex flex-col shadow-xs">
        
        {/* APP HEADER HERO with Minimal Clean Rounded Bottom */}
        <header className="bg-emerald-600 dark:bg-emerald-700 text-white rounded-b-2xl p-5 shadow-sm space-y-3.5 relative z-30 transition-all">
          
          {/* Top Bar: Brand, Byline, & Actions */}
          <div className="flex items-center justify-between gap-2">
            <div 
              onClick={() => { setActiveTab('search'); setSelectedProduct(null); setSelectedCategory('All'); setSearchQuery(''); }}
              className="cursor-pointer select-none flex items-center gap-2.5 min-w-0"
            >
              {/* App Logo */}
              <img 
                src="/app-logo.png" 
                alt="BoycottIsrael Logo" 
                className="w-10 h-10 rounded-full object-contain bg-white p-0.5 shadow-sm shrink-0" 
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-black tracking-tight text-white truncate">
                    BoycottIsrael
                  </span>
                </div>
                {/* Takweyat Foundation Badge */}
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] text-emerald-100 font-semibold">by</span>
                  <div className="bg-white/95 px-1.5 py-0.5 rounded flex items-center">
                    <img 
                      src="/takweyat-logo.png" 
                      alt="Takweyat Foundation" 
                      className="h-3.5 object-contain" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Header Icons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-colors"
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
              </button>

              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setActiveTab('grocery');
                }}
                className="relative p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-colors"
                title="Grocery Checklist"
              >
                <ShoppingCart className="w-4 h-4" />
                {groceryList.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                    {groceryList.length}
                  </span>
                )}
              </button>

              {isInstallable && (
                <button
                  onClick={handleInstallApp}
                  className="px-3 py-1.5 rounded-xl bg-white text-emerald-800 text-xs font-black flex items-center gap-1 shadow-xs active:scale-95 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Install</span>
                </button>
              )}
            </div>
          </div>

          {/* Bold Uncompromising Headline */}
          <div className="pt-0.5">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
              Boycott Now to Save Your Future.
            </h1>
            <p className="text-xs text-emerald-100 mt-1 font-medium leading-relaxed">
              Every rupee withheld cuts revenue to apartheid and genocide. Purge complicit brands and empower local Pakistani manufacturers.
            </p>
          </div>

          {/* Integrated Search Bar inside Header */}
          <div className="pt-0.5">
            <div className="relative flex items-center bg-white dark:bg-zinc-900 rounded-xl p-1.5 shadow-md border border-white/20 dark:border-zinc-700 transition-all">
              <Search className="w-4 h-4 text-zinc-400 ml-3 shrink-0" />
              
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedProduct(null);
                  if (activeTab !== 'search') setActiveTab('search');
                }}
                placeholder="Search brand (e.g. Oreo, Lays, Dove, Surf, KFC)..."
                className="w-full px-3 py-2 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm font-semibold focus:outline-none"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* 1-Tap Barcode Camera Scan Button */}
              <button
                onClick={() => setIsScannerOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-black flex items-center gap-1.5 shrink-0 shadow-xs active:scale-95 transition-all"
                title="Scan barcode or Israeli 729 prefix"
              >
                <ScanLine className="w-3.5 h-3.5" />
                <span>Scan</span>
              </button>
            </div>
          </div>

        </header>

        {/* MAIN APP CONTENT */}
        <main className="flex-1 px-4 py-4 space-y-4">
          
          {/* PRODUCT DETAIL FULL-SCREEN VIEW */}
          {selectedProduct ? (
            <ProductDetailView
              product={selectedProduct}
              onBack={() => setSelectedProduct(null)}
              onAddToGrocery={(p) => handleAddProductToGrocery(p)}
            />
          ) : (
            <>
              {/* SEARCH & DISCOVERY TAB */}
              {activeTab === 'search' && (
                <div className="space-y-4">
                  
                  {/* Category Horizontal Filter Bar */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
                    <button
                      onClick={() => { setSelectedCategory('All'); }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                        selectedCategory === 'All'
                          ? 'bg-rose-600 text-white shadow-2xs'
                          : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
                      }`}
                    >
                      <span>All Brands ({products.length})</span>
                    </button>

                    {POPULAR_CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.categoryName;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryClick(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-rose-600 text-white shadow-2xs'
                              : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
                          }`}
                        >
                          <CategoryIcon name={cat.iconName} className="w-3.5 h-3.5" />
                          <span>{cat.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* If user is NOT searching: Show Clean App Home Sections */}
                  {!searchQuery && selectedCategory === 'All' ? (
                    <div className="space-y-5">
                      
                      {/* SECTION 1: Critical Targeted Brands */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                          <div>
                            <h2 className="text-sm sm:text-base font-black text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-1.5">
                              <span>Primary Boycott Targets</span>
                              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                            </h2>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                              Multinational corporations heavily invested in Israeli apartheid
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedCategory('All')}
                            className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-0.5"
                          >
                            <span>See All</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1.5 pt-0.5">
                          {featuredTargets.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => setSelectedProduct(item)}
                              className="w-40 shrink-0 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/50 shadow-2xs hover:shadow-xs transition-all cursor-pointer space-y-2 group active:scale-[0.98]"
                            >
                              <div className="relative aspect-square w-full rounded-xl bg-zinc-50 dark:bg-zinc-800 p-2.5 flex items-center justify-center overflow-hidden">
                                <BrandLogo name={item.name} domain={item.domain} logo={item.logo} size="lg" isBoycott={true} className="rounded-lg" />
                                <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-rose-600 text-white text-[8px] font-black uppercase shadow-2xs">
                                  DO NOT BUY
                                </span>
                              </div>

                              <div className="space-y-0.5">
                                <h3 className="font-black text-xs text-zinc-900 dark:text-zinc-100 truncate group-hover:text-rose-600 transition-colors">
                                  {item.name}
                                </h3>
                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                                  {item.parentCompany}
                                </p>
                              </div>

                              <div className="pt-1 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[10px]">
                                <span className="text-emerald-700 dark:text-emerald-400 font-bold truncate">
                                  Alt: {item.alternatives[0]?.name || 'Pakistani'}
                                </span>
                                <ChevronRight className="w-3 h-3 text-zinc-400" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* SECTION 2: Takweyat Foundation Mandate Card */}
                      <div className="p-5 rounded-2xl bg-emerald-950/90 text-white border border-emerald-800/80 shadow-2xs space-y-3 relative overflow-hidden">
                        <div className="flex items-center justify-between gap-2">
                          <div className="bg-white/95 px-2 py-1 rounded-md flex items-center shadow-xs">
                            <img 
                              src="/takweyat-logo.png" 
                              alt="Takweyat Foundation" 
                              className="h-4 object-contain" 
                            />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300">
                            Conscience Mandate
                          </span>
                        </div>
                        <h3 className="text-base font-black tracking-tight leading-snug">
                          Break Economic Complicity. End the Oppression.
                        </h3>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          Refusing to purchase boycotted products is not symbolic—it is direct economic warfare against apartheid. Every rupee diverted strengthens authentic Pakistani manufacturers.
                        </p>
                        <div className="pt-1">
                          <button
                            onClick={() => setActiveTab('about')}
                            className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-zinc-900 px-3 py-1.5 rounded-lg shadow-2xs hover:bg-zinc-100 active:scale-95 transition-all"
                          >
                            <span>Learn Why & How to Boycott</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* SECTION 3: Verified Pakistani Alternatives List */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                          <div>
                            <h2 className="text-sm sm:text-base font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                              Safe Pakistani Alternatives
                            </h2>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                              Authentic local brands to replace complicit goods immediately
                            </p>
                          </div>
                          <button
                            onClick={() => setActiveTab('categories')}
                            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            Browse Categories
                          </button>
                        </div>

                        <div className="space-y-2">
                          {featuredPakistaniSwaps.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => setSelectedProduct(item)}
                              className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 shadow-2xs flex items-center justify-between gap-3 cursor-pointer group active:scale-[0.99] transition-all"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <BrandLogo name={item.name} domain={item.domain} logo={item.logo} size="md" isBoycott={true} className="rounded-xl" />
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <h4 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 truncate group-hover:text-rose-600 transition-colors">
                                      {item.name}
                                    </h4>
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-400">
                                      Boycott
                                    </span>
                                  </div>
                                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold truncate mt-0.5">
                                    ✓ Replace with: {item.alternatives[0]?.name || 'Local'} (🇵🇰 Pakistan)
                                  </p>
                                </div>
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddProductToGrocery(item);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-2xs shrink-0 active:scale-95 transition-all"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ) : (
                    /* Search Results Stream */
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1 font-semibold">
                        <span>
                          {searchQuery ? `Found ${filteredProducts.length} results for "${searchQuery}"` : `${filteredProducts.length} Verified Brands`}
                        </span>
                        {selectedCategory !== 'All' && (
                          <button
                            onClick={() => setSelectedCategory('All')}
                            className="text-rose-600 dark:text-rose-400 font-bold hover:underline"
                          >
                            Clear Filter ({selectedCategory})
                          </button>
                        )}
                      </div>

                      {filteredProducts.length > 0 ? (
                        <>
                          <div className="space-y-2.5">
                            {filteredProducts.slice(0, itemsToShow).map((product) => (
                              <NoThanksProductCard
                                key={product.id}
                                product={product}
                                onAddToGrocery={(p) => handleAddProductToGrocery(p)}
                                onSelect={(p) => setSelectedProduct(p)}
                              />
                            ))}
                          </div>

                          {itemsToShow < filteredProducts.length && (
                            <div className="text-center pt-3 pb-2">
                              <button
                                onClick={() => setItemsToShow(prev => prev + 25)}
                                className="w-full py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-bold border border-zinc-200 dark:border-zinc-700"
                              >
                                Load More ({filteredProducts.length - itemsToShow} remaining)
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center space-y-2.5">
                          <AlertOctagon className="w-8 h-8 text-zinc-400 mx-auto" />
                          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">No product found for "{searchQuery}"</h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            If this brand should be boycotted or you have a verified Pakistani alternative, submit it below for verification.
                          </p>
                          <button
                            onClick={() => setIsSuggestOpen(true)}
                            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-2xs"
                          >
                            + Submit Brand Proposal
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}

              {/* CATEGORIES TAB (Dedicated Page) */}
              {activeTab === 'categories' && (
                <CategoriesView
                  products={products}
                  onSelectCategory={(categoryName, query) => {
                    setSelectedCategory(categoryName);
                    if (query) {
                      setSearchQuery(query);
                    } else {
                      setSearchQuery('');
                    }
                    setActiveTab('search');
                  }}
                />
              )}

              {/* GROCERY TAB */}
              {activeTab === 'grocery' && (
                <GroceryPlanner
                  groceryList={groceryList}
                  setGroceryList={setGroceryList}
                  notificationSettings={notificationSettings}
                  setNotificationSettings={setNotificationSettings}
                  products={products}
                />
              )}

              {/* ABOUT / INTEL TAB */}
              {activeTab === 'about' && (
                <AboutFaqSection />
              )}
            </>
          )}

        </main>

        {/* Floating Bottom Tab Bar */}
        <NoThanksTabBar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setSelectedProduct(null);
            setActiveTab(tab);
          }}
          groceryCount={groceryList.length}
          onOpenSuggest={() => setIsSuggestOpen(true)}
        />

      </div>

      {/* No Thanks Live Barcode Scanner Modal */}
      <NoThanksScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        products={products}
        onAddToGrocery={(p) => handleAddProductToGrocery(p)}
        onViewProof={(p) => setSelectedProduct(p)}
      />

      {/* Suggestion Modal */}
      <SuggestionModal
        isOpen={isSuggestOpen}
        onClose={() => setIsSuggestOpen(false)}
        onProductAdded={handleProductAdded}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-black shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
