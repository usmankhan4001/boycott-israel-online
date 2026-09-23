import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { TabBar } from './TabBar';
import { useUIStore } from '../../stores/uiStore';
import { WifiOff, X } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

import { LanguageModal } from '../LanguageModal';
import { useTranslation } from '../../i18n/useTranslation';

export const AppShell: React.FC = () => {
  const { theme, toastMessage, showToast, isOffline } = useUIStore();
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

  return (
    <div className={`min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col items-center justify-start selection:bg-rose-600 selection:text-white pb-20 md:pb-10 transition-colors duration-200 ${isUrdu ? 'font-urdu' : ''}`}>
      <div className="w-full max-w-xl lg:max-w-6xl xl:max-w-7xl min-h-screen bg-white dark:bg-zinc-900 lg:border-x border-zinc-200 dark:border-zinc-800 flex flex-col shadow-sm relative">
        <Navbar />
        
        {isOffline && (
          <div className="bg-rose-600 text-white text-xs font-bold py-2 px-4 flex items-center justify-center gap-2">
            <WifiOff className="w-4 h-4" />
            <span>{isUrdu ? 'آپ آف لائن ہیں۔ محفوظ شدہ ڈیٹا استعمال ہو رہا ہے۔' : 'You are currently offline. Using cached data.'}</span>
          </div>
        )}

        <main className="flex-1 px-4 sm:px-6 py-5 space-y-5">
          <Outlet />
        </main>

        <TabBar />
        <LanguageModal />

        {toastMessage && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5">
            <span className="text-sm font-bold">{toastMessage}</span>
            <button onClick={() => showToast('', 0)} className="p-1 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-full">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
