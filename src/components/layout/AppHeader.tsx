import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Mic, 
  Sun, 
  Moon, 
  ShieldAlert, 
  Globe, 
  Sparkles,
  Barcode
} from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';
import { useNotificationStore } from '../../stores/notificationStore';
import { useTranslation } from '../../i18n/useTranslation';
import { VoiceSearchModal } from '../scanner/VoiceSearchModal';

export const AppHeader: React.FC = () => {
  const { theme, toggleTheme, setCommandPaletteOpen, setNotificationDrawerOpen } = useUIStore();
  const notifications = useNotificationStore(state => state.notifications);
  const { isUrdu, setLanguage, language } = useTranslation();
  const location = useLocation();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const toggleLang = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-200/70 dark:border-zinc-800/70 px-4 sm:px-6 py-3 transition-colors">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Brand Wordmark & Logo */}
          <Link to="/" className="flex items-center gap-2.5 min-w-0 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-black text-sm shadow-md group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-zinc-950 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base tracking-tight text-zinc-950 dark:text-white">
                  TAKWEYAT
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  Boycott
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-semibold truncate hidden sm:block">
                Ethical Consumer & Systems Sovereign
              </p>
            </div>
          </Link>

          {/* Desktop Search Bar Trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden md:flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-xs font-semibold w-72 transition-all hover:border-zinc-400 dark:hover:border-zinc-700"
          >
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span className="flex-1 text-left truncate">Search brands, swaps or 729...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px] font-mono text-zinc-600 dark:text-zinc-400">
              ⌘K
            </kbd>
          </button>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Voice Search Button */}
            <button
              onClick={() => setIsVoiceOpen(true)}
              className="p-2.5 rounded-2xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all"
              title="Voice Search (Elder Mode)"
              aria-label="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setNotificationDrawerOpen(true)}
              className="p-2.5 rounded-2xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all relative"
              title="Notification Center"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-950" />
              )}
            </button>

            {/* Language Switcher Pill */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-xs hover:border-rose-500/50 transition-all"
              title="Toggle Language"
            >
              {language === 'en' ? 'اردو' : 'EN'}
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Voice Search Modal */}
      {isVoiceOpen && <VoiceSearchModal isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />}
    </>
  );
};
