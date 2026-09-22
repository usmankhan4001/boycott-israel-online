import { useEffect } from 'react';
import { useUIStore } from '../stores/uiStore';

export const usePWA = () => {
  const setIsOffline = useUIStore(state => state.setIsOffline);
  const setDeferredPrompt = useUIStore(state => state.setDeferredPrompt);
  const isInstallable = useUIStore(state => state.isInstallable);
  const installApp = useUIStore(state => state.installApp);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setIsOffline]);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, [setDeferredPrompt]);

  return { isInstallable, installApp };
};
