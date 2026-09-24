import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Search, 
  ScanLine, 
  ShoppingCart, 
  Download, 
  Menu, 
  X, 
  PlusCircle, 
  Globe, 
  Bell, 
  MessageSquare, 
  Command,
  ShieldCheck,
  Flame,
  Mic,
  Globe2,
  Target,
  Palette,
  Leaf
} from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';
import { useGroceryStore } from '../../stores/groceryStore';
import { useNotificationStore } from '../../stores/notificationStore';
import { useProducts } from '../../hooks/useProducts';
import { usePWA } from '../../hooks/usePWA';
import { useTranslation } from '../../i18n/useTranslation';
import { VoiceSearchModal } from '../scanner/VoiceSearchModal';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, setCommandPaletteOpen, setNotificationDrawerOpen } = useUIStore();
  const groceryList = useGroceryStore(state => state.groceryList);
  const notifications = useNotificationStore(state => state.notifications);
  const { searchQuery, setSearchQuery } = useProducts();
  const { isInstallable, installApp } = usePWA();
  const { t, isUrdu, setLanguage, language } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  return (
    <>
      <header className="bg-emerald-600 dark:bg-emerald-700 text-white rounded-b-3xl p-3.5 sm:p-5 shadow-sm space-y-3 relative z-30 transition-all sticky top-0 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0 group" onClick={() => setSearchQuery('')}>
            <div className="relative shrink-0">
              <img 
                src="/app-logo.png" 
                alt="BoycottIsrael Logo" 
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-contain bg-white p-0.5 shadow-sm ring-2 ring-white/20 group-hover:scale-105 transition-transform" 
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-emerald-600 dark:border-emerald-700" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white truncate">
                  {isUrdu ? 'بائیکاٹ اسرائیل' : 'BoycottIsrael'}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[10px] text-emerald-100 font-semibold">{isUrdu ? 'پیشکش' : 'by'}</span>
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

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-black/15 p-1 rounded-2xl text-xs font-bold text-emerald-50 backdrop-blur-md">
            <Link 
              to="/" 
              className={`px-3 py-1.5 rounded-xl transition-all ${
                location.pathname === '/' ? 'bg-white text-emerald-950 shadow-xs font-black' : 'hover:bg-white/10 text-white'
              }`}
            >
              {t.allBrands}
            </Link>
            <Link 
              to="/categories" 
              className={`px-3 py-1.5 rounded-xl transition-all ${
                location.pathname === '/categories' ? 'bg-white text-emerald-950 shadow-xs font-black' : 'hover:bg-white/10 text-white'
              }`}
            >
              {t.categories}
            </Link>
            <Link 
              to="/complicity" 
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                location.pathname === '/complicity' ? 'bg-white text-emerald-950 shadow-xs font-black' : 'hover:bg-white/10 text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-indigo-300" />
              <span>{isUrdu ? 'کمپلیسیٹی' : 'Complicity'}</span>
            </Link>
            <Link 
              to="/bounties" 
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                location.pathname === '/bounties' ? 'bg-white text-emerald-950 shadow-xs font-black' : 'hover:bg-white/10 text-white'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-amber-300" />
              <span>{isUrdu ? 'باؤنٹیز' : 'Bounties'}</span>
            </Link>
            <Link 
              to="/tayyib" 
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                location.pathname === '/tayyib' ? 'bg-white text-emerald-950 shadow-xs font-black' : 'hover:bg-white/10 text-white'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-teal-300" />
              <span>{isUrdu ? 'طیب' : 'Tayyib'}</span>
            </Link>
            <Link 
              to="/studio" 
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                location.pathname === '/studio' ? 'bg-white text-emerald-950 shadow-xs font-black' : 'hover:bg-white/10 text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-purple-300" />
              <span>{isUrdu ? 'اسٹوڈیو' : 'Studio'}</span>
            </Link>
            <Link 
              to="/community" 
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                location.pathname.startsWith('/community') ? 'bg-white text-emerald-950 shadow-xs font-black' : 'hover:bg-white/10 text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.community}</span>
            </Link>
            <Link 
              to="/grocery" 
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                location.pathname === '/grocery' ? 'bg-white text-emerald-950 shadow-xs font-black' : 'hover:bg-white/10 text-white'
              }`}
            >
              <span>{t.grocery}</span>
              {groceryList.length > 0 && (
                <span className="px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[10px] font-black">
                  {groceryList.length}
                </span>
              )}
            </Link>
          </nav>

          {/* Global Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Voice Search Button */}
            <button
              onClick={() => setIsVoiceSearchOpen(true)}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-all active:scale-95 shadow-2xs"
              title="Voice Conscience Search"
            >
              <Mic className="w-4 h-4 text-white" />
            </button>

            {/* Quick Command Search Trigger Button */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold backdrop-blur-md transition-all active:scale-95 shadow-2xs border border-white/10"
              title="Global Search (⌘K / Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isUrdu ? 'تلاش' : 'Search'}</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-mono font-bold bg-white/20 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setNotificationDrawerOpen(true)}
              className="relative p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-all active:scale-95 shadow-2xs"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs animate-pulse ring-2 ring-emerald-600 dark:ring-emerald-700">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-black flex items-center gap-1.5 backdrop-blur-md transition-all active:scale-95 shadow-2xs"
              title="Switch Language / زبان تبدیل کریں"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'English' : 'اردو'}</span>
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-colors active:scale-95" 
              title="Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
            </button>

            {/* Install PWA Button */}
            {isInstallable && (
              <button 
                onClick={installApp} 
                className="px-3 py-1.5 rounded-xl bg-white text-emerald-900 text-xs font-black flex items-center gap-1 shadow-xs active:scale-95 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.install}</span>
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button 
              className="lg:hidden p-2 bg-white/15 hover:bg-white/25 rounded-xl text-white transition-colors" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden flex flex-col gap-1.5 pt-2 pb-1 border-t border-white/15 animate-in fade-in slide-in-from-top-2 duration-200">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)} 
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center justify-between ${
                location.pathname === '/' ? 'bg-white text-emerald-900 shadow-xs font-black' : 'bg-white/10 text-white'
              }`}
            >
              <span>{t.allBrands}</span>
            </Link>
            <Link 
              to="/categories" 
              onClick={() => setIsMenuOpen(false)} 
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center justify-between ${
                location.pathname === '/categories' ? 'bg-white text-emerald-900 shadow-xs font-black' : 'bg-white/10 text-white'
              }`}
            >
              <span>{t.categories}</span>
            </Link>
            <Link 
              to="/complicity" 
              onClick={() => setIsMenuOpen(false)} 
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center justify-between ${
                location.pathname === '/complicity' ? 'bg-white text-emerald-900 shadow-xs font-black' : 'bg-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Globe2 className="w-3.5 h-3.5 text-indigo-300" />
                <span>{isUrdu ? 'کمپلیسیٹی نیٹ ورک' : 'Complicity Web'}</span>
              </div>
            </Link>
            <Link 
              to="/bounties" 
              onClick={() => setIsMenuOpen(false)} 
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center justify-between ${
                location.pathname === '/bounties' ? 'bg-white text-emerald-900 shadow-xs font-black' : 'bg-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-amber-300" />
                <span>{isUrdu ? 'مارکیٹ باؤنٹی بورڈ' : 'Market Bounties'}</span>
              </div>
            </Link>
            <Link 
              to="/tayyib" 
              onClick={() => setIsMenuOpen(false)} 
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center justify-between ${
                location.pathname === '/tayyib' ? 'bg-white text-emerald-900 shadow-xs font-black' : 'bg-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Leaf className="w-3.5 h-3.5 text-teal-300" />
                <span>{isUrdu ? 'طیب و صحت معیار' : 'Tayyib & Additives'}</span>
              </div>
            </Link>
            <Link 
              to="/studio" 
              onClick={() => setIsMenuOpen(false)} 
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center justify-between ${
                location.pathname === '/studio' ? 'bg-white text-emerald-900 shadow-xs font-black' : 'bg-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-purple-300" />
                <span>{isUrdu ? 'انفوگرافک اسٹوڈیو' : 'Card Studio'}</span>
              </div>
            </Link>
            <Link 
              to="/community" 
              onClick={() => setIsMenuOpen(false)} 
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center justify-between ${
                location.pathname.startsWith('/community') ? 'bg-white text-emerald-900 shadow-xs font-black' : 'bg-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-amber-300" />
                <span>{t.community}</span>
              </div>
            </Link>
            <Link 
              to="/grocery" 
              onClick={() => setIsMenuOpen(false)} 
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center justify-between ${
                location.pathname === '/grocery' ? 'bg-white text-emerald-900 shadow-xs font-black' : 'bg-white/10 text-white'
              }`}
            >
              <span>{t.grocery}</span>
              {groceryList.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black">
                  {groceryList.length}
                </span>
              )}
            </Link>
          </nav>
        )}

        {/* Embedded Search Bar (on Home Page) with quick Scanner link & Voice Search trigger */}
        {location.pathname === '/' && (
          <div className="pt-1">
            <div className="relative flex items-center bg-white dark:bg-zinc-900 rounded-2xl p-1.5 shadow-md border border-white/20 dark:border-zinc-700 transition-all">
              <Search className="w-4 h-4 text-zinc-400 mx-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                dir="auto"
                className="w-full px-2 py-2 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs sm:text-sm font-semibold focus:outline-none"
              />
              {searchQuery ? (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 mx-1"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsVoiceSearchOpen(true)}
                  className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-rose-600 transition-colors mr-1"
                  title="Voice Search"
                >
                  <Mic className="w-3.5 h-3.5 text-rose-500" />
                </button>
              )}
              <Link 
                to="/scan" 
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black flex items-center gap-1.5 shrink-0 shadow-xs active:scale-95 transition-all"
              >
                <ScanLine className="w-3.5 h-3.5" />
                <span>{t.scanner}</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Voice Search Modal */}
      <VoiceSearchModal 
        isOpen={isVoiceSearchOpen} 
        onClose={() => setIsVoiceSearchOpen(false)} 
      />
    </>
  );
};
