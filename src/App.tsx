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
import { isSanityConfigured, fetchSanityProducts } from './lib/sanity';

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
import { AdminCMS } from './components/AdminCMS';
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
  HeartHandshake,
  UtensilsCrossed,
  Users,
  LayoutGrid,
  Info,
  PlusCircle
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
  const [itemsToShow, setItemsToShow] = useState(28);

  // Selected Product for Full-Screen Detail View
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Modals
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(() => {
    return window.location.search.includes('admin=true') || window.location.hash === '#admin';
  });

  // Fetch live products from Sanity if configured
  useEffect(() => {
    if (isSanityConfigured()) {
      fetchSanityProducts().then((sanityData) => {
        if (sanityData && sanityData.length > 0) {
          setProducts(sanityData);
        }
      }).catch(() => {});
    }
  }, []);

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
  };

  // Add Item to Grocery List
  const handleAddProductToGrocery = (product: ProductItem) => {
    const defaultAlt = product.alternatives[0]?.name || 'Local Safe Brand';
    const defaultCountry = product.alternatives[0]?.country || 'Pakistan';
    
    const newItem: GroceryItem = {
      id: `g-${Date.now()}-${Math.random()}`,
      name: product.name,
      category: product.category,
      isBoycott: true,
      parentCompany: product.parentCompany,
      boycottReason: product.boycottReason,
      chosenAlternative: defaultAlt,
      alternativeCountry: defaultCountry,
      suggestedAlternatives: product.alternatives,
      checked: false,
      quantity: 1,
      unit: 'item',
      logo: product.logo
    };

    setGroceryList(prev => [newItem, ...prev]);
    showToast(`Added ${defaultAlt} to your grocery list!`);
  };

  const showToast = (text: string) => {
    setToastMessage({ text });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleProductAdded = (newProduct?: ProductItem) => {
    if (newProduct) {
      setProducts(prev => [newProduct, ...prev]);
      setSelectedProduct(newProduct);
      showToast(`Product "${newProduct.name}" verified and added to database!`);
    } else {
      showToast('Thank you! Your suggestion was submitted for verification.');
    }
  };

  // Filtered Products Search Logic
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    
    return products.filter(product => {
      // Category check
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      if (!q) return true;

      // Match query
      const matchName = product.name.toLowerCase().includes(q);
      const matchCompany = product.parentCompany.toLowerCase().includes(q);
      const matchReason = product.boycottReason.toLowerCase().includes(q);
      const matchTags = product.tags && product.tags.some(t => t.toLowerCase().includes(q));
      const matchBarcode = product.israelBarcode && product.israelBarcode.includes(q);
      const matchAlt = product.alternatives.some(a => a.name.toLowerCase().includes(q) || a.country.toLowerCase().includes(q));
      const matchEndorsed = product.endorsedBrands && product.endorsedBrands.some(b => b.toLowerCase().includes(q));

      return matchName || matchCompany || matchReason || matchTags || matchBarcode || matchAlt || matchEndorsed;
    });
  }, [products, searchQuery, selectedCategory]);

  // Featured Brands for App Home
  const featuredTargets = useMemo(() => {
    const priorityNames = [
      'coca-cola',
      'pepsi',
      'mcdonald',
      'kfc',
      'starbucks',
      'l\'oréal',
      'nestlé',
      'unilever',
      'puma',
      'hp',
      'zara',
      'domino'
    ];
    return products
      .filter(p => priorityNames.some(target => p.name.toLowerCase().includes(target) || p.parentCompany.toLowerCase().includes(target)))
      .slice(0, 12);
  }, [products]);

  // Featured Safe Pakistani Alternatives
  const featuredPakistaniSwaps = useMemo(() => {
    return products
      .filter(p => p.alternatives.some(a => a.country.includes('Pakistan') && a.verified))
      .slice(0, 8);
  }, [products]);

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
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col items-center justify-start selection:bg-rose-600 selection:text-white pb-20 md:pb-10 transition-colors duration-200">
      
      {/* Responsive App Shell: Mobile-focused on small screens, wide & expansive on laptop/desktop */}
      <div className="w-full max-w-xl lg:max-w-6xl xl:max-w-7xl min-h-screen bg-white dark:bg-zinc-900 lg:border-x border-zinc-200 dark:border-zinc-800 flex flex-col shadow-sm">
        
        {/* APP HEADER HERO with Clean Responsive Geometry */}
        <header className="bg-emerald-600 dark:bg-emerald-700 text-white rounded-b-2xl p-4 sm:p-6 shadow-sm space-y-4 relative z-30 transition-all">
          
          {/* Top Bar: Brand, Byline, Desktop Nav & Actions */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div 
              onClick={() => { setActiveTab('search'); setSelectedProduct(null); setSelectedCategory('All'); setSearchQuery(''); }}
              className="cursor-pointer select-none flex items-center gap-3 min-w-0"
            >
              {/* App Logo */}
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
                {/* Takweyat Foundation Badge */}
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
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-black/15 p-1 rounded-xl text-xs font-bold text-emerald-50">
              <button
                onClick={() => { setSelectedProduct(null); setActiveTab('search'); setSelectedCategory('All'); }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'search' && selectedCategory !== 'Restaurants & Places' && selectedCategory !== 'Celebrities & Endorsers'
                    ? 'bg-white text-emerald-900 shadow-xs font-black'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                All Brands
              </button>
              <button
                onClick={() => { setSelectedProduct(null); setActiveTab('search'); setSelectedCategory('Restaurants & Places'); }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'search' && selectedCategory === 'Restaurants & Places'
                    ? 'bg-white text-emerald-900 shadow-xs font-black'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Restaurants & Places</span>
              </button>
              <button
                onClick={() => { setSelectedProduct(null); setActiveTab('search'); setSelectedCategory('Celebrities & Endorsers'); }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'search' && selectedCategory === 'Celebrities & Endorsers'
                    ? 'bg-white text-emerald-900 shadow-xs font-black'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Celebrities & Endorsers</span>
              </button>
              <button
                onClick={() => { setSelectedProduct(null); setActiveTab('categories'); }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'categories'
                    ? 'bg-white text-emerald-900 shadow-xs font-black'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Categories</span>
              </button>
              <button
                onClick={() => { setSelectedProduct(null); setActiveTab('grocery'); }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'grocery'
                    ? 'bg-white text-emerald-900 shadow-xs font-black'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Grocery ({groceryList.length})</span>
              </button>
              <button
                onClick={() => { setSelectedProduct(null); setActiveTab('about'); }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'about'
                    ? 'bg-white text-emerald-900 shadow-xs font-black'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Why Boycott</span>
              </button>
            </nav>

            {/* Right Header Icons & Actions */}
            <div className="flex items-center gap-2">
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
                className="relative p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-colors md:hidden"
                title="Grocery Checklist"
              >
                <ShoppingCart className="w-4 h-4" />
                {groceryList.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                    {groceryList.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsAdminOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all"
                title="Sanity & Catalog Control Panel"
              >
                <span>CMS Control</span>
              </button>

              <button
                onClick={() => setIsSuggestOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all"
                title="Suggest a brand or alternative"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Suggest Brand</span>
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
          <div className="pt-1">
            <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Boycott Now to Save Your Future.
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 font-medium leading-relaxed max-w-3xl">
              Every single rupee withheld dismantles the financial spine of apartheid and genocide. Boycott complicit multinationals and empower verified Pakistani alternatives.
            </p>
          </div>

          {/* Integrated Search Bar inside Header */}
          <div className="pt-1">
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
                placeholder="Search brand, restaurant, celebrity or barcode (e.g. KFC, McDonalds, Oreo, 72900123)..."
                className="w-full px-3 py-2 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs sm:text-sm font-semibold focus:outline-none"
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
                className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-black flex items-center gap-1.5 shrink-0 shadow-xs active:scale-95 transition-all"
                title="Scan barcode or Israeli 729 prefix"
              >
                <ScanLine className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Scan Barcode / 729</span>
                <span className="sm:hidden">Scan</span>
              </button>
            </div>
          </div>

        </header>

        {/* MAIN APP CONTENT */}
        <main className="flex-1 px-4 sm:px-6 py-5 space-y-5">
          
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
                <div className="space-y-5">
                  
                  {/* Category Horizontal Filter Bar */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
                    <button
                      onClick={() => { setSelectedCategory('All'); }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
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
                    <div className="space-y-6">
                      
                      {/* SECTION 1: Critical Targeted Brands */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                          <div>
                            <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
                              <span>Primary Boycott Targets</span>
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
                            </h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              Multinational corporations heavily invested in Israeli apartheid & military operations
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

                        {/* Responsive Grid for Featured Targets */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {featuredTargets.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => setSelectedProduct(item)}
                              className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/50 shadow-2xs hover:shadow-xs transition-all cursor-pointer space-y-2 group active:scale-[0.98] flex flex-col justify-between"
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
                                <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* SECTION 2: Dedicated Spotlight Banners: Restaurants & Celebrities */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Restaurants & Dining Box */}
                        <div 
                          onClick={() => { setSelectedCategory('Restaurants & Places'); setActiveTab('search'); }}
                          className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 shadow-2xs space-y-3 cursor-pointer group hover:border-rose-500/60 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center">
                              <UtensilsCrossed className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-rose-200 dark:bg-rose-900/80 text-rose-800 dark:text-rose-300">
                              Corporate Actions & Dining
                            </span>
                          </div>
                          <div>
                            <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 transition-colors">
                              Restaurants & Places Category
                            </h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                              Detailed complicity logs (IDF free meals, settlement factories) for fast-food chains like KFC, McDonald's, Pizza Hut, Subway, Starbucks & verified Pakistani dining alternatives.
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                            <span>Explore Boycotted Dining & Swaps</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Celebrities & Endorsers Box */}
                        <div 
                          onClick={() => { setSelectedCategory('Celebrities & Endorsers'); setActiveTab('search'); }}
                          className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 shadow-2xs space-y-3 cursor-pointer group hover:border-purple-500/60 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                              <Users className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-200 dark:bg-purple-900/80 text-purple-800 dark:text-purple-300">
                              Endorsement Tracker
                            </span>
                          </div>
                          <div>
                            <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 transition-colors">
                              Personalities & Endorsers
                            </h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                              Track Pakistani actors, cricketers, and influencers promoting Coke, Pepsi, L'Oréal, and Nestlé, alongside principled conscious role models.
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400">
                            <span>View Complicit Personalities & Voices</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>

                      </div>

                      {/* SECTION 3: Takweyat Foundation Mandate Card */}
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
                        <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug">
                          Break Economic Complicity. End the Oppression.
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
                          Refusing to purchase boycotted products is not symbolic—it is direct economic accountability against apartheid. Every rupee diverted strengthens authentic Pakistani manufacturers.
                        </p>
                        <div className="pt-1">
                          <button
                            onClick={() => setActiveTab('about')}
                            className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-zinc-900 px-3.5 py-2 rounded-lg shadow-2xs hover:bg-zinc-100 active:scale-95 transition-all"
                          >
                            <span>Learn Why & How to Boycott</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* SECTION 4: Verified Pakistani Alternatives List */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                          <div>
                            <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                              Safe Pakistani Alternatives
                            </h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              Authentic local brands to replace complicit goods immediately
                            </p>
                          </div>
                          <button
                            onClick={() => setActiveTab('categories')}
                            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            Browse All Categories
                          </button>
                        </div>

                        {/* Responsive 2-column or 3-column Grid for Swaps on Desktop */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {featuredPakistaniSwaps.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => setSelectedProduct(item)}
                              className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 shadow-2xs flex items-center justify-between gap-3 cursor-pointer group active:scale-[0.99] transition-all"
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
                    /* Search & Category Filter Results: Responsive Multi-Column Grid on Laptop/Desktop */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1 font-semibold">
                        <span>
                          {searchQuery ? `Found ${filteredProducts.length} results for "${searchQuery}"` : `${filteredProducts.length} Verified Brands in ${selectedCategory}`}
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
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
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
                            <div className="text-center pt-4 pb-2">
                              <button
                                onClick={() => setItemsToShow(prev => prev + 28)}
                                className="px-6 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-bold border border-zinc-200 dark:border-zinc-700 shadow-2xs transition-colors"
                              >
                                Load More ({filteredProducts.length - itemsToShow} remaining)
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center space-y-3">
                          <AlertOctagon className="w-10 h-10 text-zinc-400 mx-auto" />
                          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">No product found for "{searchQuery}"</h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                            If this brand or restaurant should be boycotted or you have a verified Pakistani alternative, submit it below for verification.
                          </p>
                          <button
                            onClick={() => setIsSuggestOpen(true)}
                            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-2xs active:scale-95 transition-all"
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

        {/* Floating Bottom Tab Bar (Visible on Mobile / Tablet) */}
        <div className="md:hidden">
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
        onProductAdded={() => handleProductAdded()}
      />

      {/* Admin CMS Modal */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md animate-in fade-in flex items-center justify-center p-3 sm:p-6">
          <div className="w-full max-w-5xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-2 sm:p-6 relative max-h-[95vh] overflow-y-auto">
            <AdminCMS
              products={products}
              setProducts={setProducts}
              onClose={() => {
                setIsAdminOpen(false);
                if (window.location.search.includes('admin=true')) {
                  window.history.replaceState({}, '', window.location.pathname);
                }
              }}
            />
          </div>
        </div>
      )}

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
