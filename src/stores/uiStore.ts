import { create } from 'zustand';

export type Language = 'en' | 'ur';

interface UIState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  showLanguageModal: boolean;
  setShowLanguageModal: (show: boolean) => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  isNotificationDrawerOpen: boolean;
  setNotificationDrawerOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string, duration?: number) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  isInstallable: boolean;
  deferredPrompt: any;
  setDeferredPrompt: (prompt: any) => void;
  installApp: () => Promise<void>;
}

const getInitialLanguage = (): Language => {
  const saved = localStorage.getItem('app_language');
  if (saved === 'en' || saved === 'ur') {
    return saved;
  }
  return 'en';
};

const hasSavedLanguage = (): boolean => {
  return !!localStorage.getItem('app_language');
};

const applyLanguageToDOM = (lang: Language) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    if (lang === 'ur') {
      document.documentElement.classList.add('font-urdu');
    } else {
      document.documentElement.classList.remove('font-urdu');
    }
  }
};

// Initial run
const initialLang = getInitialLanguage();
applyLanguageToDOM(initialLang);

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
  language: initialLang,
  setLanguage: (lang: Language) => {
    localStorage.setItem('app_language', lang);
    applyLanguageToDOM(lang);
    set({ language: lang, showLanguageModal: false });
  },
  showLanguageModal: !hasSavedLanguage(),
  setShowLanguageModal: (show: boolean) => set({ showLanguageModal: show }),
  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (open: boolean) => set({ isCommandPaletteOpen: open }),
  isNotificationDrawerOpen: false,
  setNotificationDrawerOpen: (open: boolean) => set({ isNotificationDrawerOpen: open }),
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
