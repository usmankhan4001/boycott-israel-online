import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { TabBar } from './TabBar';
import { CommandPalette } from '../ui/CommandPalette';
import { NotificationDrawer } from '../NotificationDrawer';
import { LanguageModal } from '../LanguageModal';
import { useUIStore } from '../../stores/uiStore';
import { WifiOff, X } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';
import { useTranslation } from '../../i18n/useTranslation';

export const AppShell: React.FC = () => {
  const { 
    theme, 
    toastMessage, 
    showToast, 
    isOffline,
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    isNotificationDrawerOpen,
    setNotificationDrawerOpen
  } = useUIStore();
  const { isUrdu } = useTranslation();
  const location = useLocation();
  usePWA(); // Initialize PWA hooks

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  return (
    <div className={`min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col items-center justify-start selection:bg-emerald-600 selection:text-white pb-20 lg:pb-10 transition-colors duration-200 ${isUrdu ? 'font-urdu' : ''}`}>
      <div className="w-full max-w-xl lg:max-w-6xl xl:max-w-7xl min-h-screen bg-white dark:bg-zinc-900 lg:border-x border-zinc-200/80 dark:border-zinc-800 flex flex-col shadow-sm relative">
        <Navbar />
        
        {isOffline && (
          <div className="bg-rose-600 text-white text-xs font-bold py-2 px-4 flex items-center justify-center gap-2">
            <WifiOff className="w-4 h-4" />
            <span>{isUrdu ? 'آپ آف لائن ہیں۔ محفوظ شدہ ڈیٹا استعمال ہو رہا ہے۔' : 'You are currently offline. Using cached data.'}</span>
          </div>
        )}

        <main className="flex-1 px-3 sm:px-6 py-5 space-y-6">
          <Outlet />
        </main>

        <TabBar />
        <LanguageModal />
        
        {/* Global Command Palette */}
        <CommandPalette 
          isOpen={isCommandPaletteOpen} 
          onClose={() => setCommandPaletteOpen(false)} 
        />

        {/* Global Notification Drawer */}
        <NotificationDrawer 
          isOpen={isNotificationDrawerOpen} 
          onClose={() => setNotificationDrawerOpen(false)} 
        />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-20 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 border border-zinc-700/40">
            <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
            <button onClick={() => showToast('', 0)} className="p-1 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-full transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
