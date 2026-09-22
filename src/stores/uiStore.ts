import { create } from 'zustand';

interface UIState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  toastMessage: string | null;
  showToast: (msg: string, duration?: number) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  isInstallable: boolean;
  deferredPrompt: any;
  setDeferredPrompt: (prompt: any) => void;
  installApp: () => Promise<void>;
}

export const useUIStore = create<UIState>((set, get) => ({
  theme: (localStorage.getItem('no_thanks_theme') as 'light' | 'dark') || 'light',
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('no_thanks_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme: newTheme });
  },
  toastMessage: null,
  showToast: (msg, duration = 3000) => {
    set({ toastMessage: msg });
    setTimeout(() => {
      set((state) => (state.toastMessage === msg ? { toastMessage: null } : state));
    }, duration);
  },
  isOffline: !navigator.onLine,
  setIsOffline: (offline) => set({ isOffline: offline }),
  isInstallable: false,
  deferredPrompt: null,
  setDeferredPrompt: (prompt) => set({ deferredPrompt: prompt, isInstallable: !!prompt }),
  installApp: async () => {
    const { deferredPrompt } = get();
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      set({ isInstallable: false, deferredPrompt: null });
    }
  },
}));
