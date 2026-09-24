import { create } from 'zustand';
import { DemographicLens, MentalState } from '../types';

const STORAGE_KEY_LENS = 'takweyat_demographic_lens';
const STORAGE_KEY_MENTAL_STATE = 'takweyat_mental_state';
const STORAGE_KEY_FONT_SCALE = 'takweyat_font_scale';
const STORAGE_KEY_HIGH_CONTRAST = 'takweyat_high_contrast';

interface DemographicState {
  mentalState: MentalState;
  setMentalState: (mode: MentalState) => void;

  demographicLens: DemographicLens;
  setDemographicLens: (lens: DemographicLens) => void;

  fontScale: 'normal' | 'large';
  setFontScale: (scale: 'normal' | 'large') => void;

  highContrast: boolean;
  setHighContrast: (contrast: boolean) => void;
  toggleHighContrast: () => void;
}

const getInitialMentalState = (): MentalState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_MENTAL_STATE) as MentalState;
    if (saved === 'action' || saved === 'skeptical' || saved === 'scholar') {
      return saved;
    }
  } catch {}
  return 'action';
};

const getInitialLens = (): DemographicLens => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LENS) as DemographicLens;
    if (['general', 'students', 'mothers', 'men', 'elders'].includes(saved)) {
      return saved;
    }
  } catch {}
  return 'general';
};

const getInitialFontScale = (lens: DemographicLens): 'normal' | 'large' => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_FONT_SCALE) as 'normal' | 'large';
    if (saved === 'normal' || saved === 'large') return saved;
  } catch {}
  return lens === 'elders' ? 'large' : 'normal';
};

const getInitialHighContrast = (lens: DemographicLens): boolean => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_HIGH_CONTRAST);
    if (saved !== null) return saved === 'true';
  } catch {}
  return lens === 'elders';
};

const applyAccessibilityToDOM = (lens: DemographicLens, fontScale: 'normal' | 'large', highContrast: boolean) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  // Lens class
  root.classList.remove('lens-general', 'lens-students', 'lens-mothers', 'lens-men', 'lens-elders');
  root.classList.add(`lens-${lens}`);

  // 125% typography scale for elders
  if (fontScale === 'large' || lens === 'elders') {
    root.classList.add('text-scale-125');
  } else {
    root.classList.remove('text-scale-125');
  }

  // High contrast mode
  if (highContrast) {
    root.classList.add('high-contrast-mode');
  } else {
    root.classList.remove('high-contrast-mode');
  }
};

const initLens = getInitialLens();
const initFontScale = getInitialFontScale(initLens);
const initHighContrast = getInitialHighContrast(initLens);
applyAccessibilityToDOM(initLens, initFontScale, initHighContrast);

export const useDemographicStore = create<DemographicState>((set, get) => ({
  mentalState: getInitialMentalState(),
  setMentalState: (mode: MentalState) => {
    try {
      localStorage.setItem(STORAGE_KEY_MENTAL_STATE, mode);
    } catch {}
    set({ mentalState: mode });
  },

  demographicLens: initLens,
  setDemographicLens: (lens: DemographicLens) => {
    try {
      localStorage.setItem(STORAGE_KEY_LENS, lens);
    } catch {}

    const isElder = lens === 'elders';
    const newFontScale = isElder ? 'large' : 'normal';
    const newHighContrast = isElder ? true : get().highContrast;

    try {
      localStorage.setItem(STORAGE_KEY_FONT_SCALE, newFontScale);
      localStorage.setItem(STORAGE_KEY_HIGH_CONTRAST, String(newHighContrast));
    } catch {}

    applyAccessibilityToDOM(lens, newFontScale, newHighContrast);

    set({
      demographicLens: lens,
      fontScale: newFontScale,
      highContrast: newHighContrast,
    });
  },

  fontScale: initFontScale,
  setFontScale: (scale) => {
    try {
      localStorage.setItem(STORAGE_KEY_FONT_SCALE, scale);
    } catch {}
    applyAccessibilityToDOM(get().demographicLens, scale, get().highContrast);
    set({ fontScale: scale });
  },

  highContrast: initHighContrast,
  setHighContrast: (contrast) => {
    try {
      localStorage.setItem(STORAGE_KEY_HIGH_CONTRAST, String(contrast));
    } catch {}
    applyAccessibilityToDOM(get().demographicLens, get().fontScale, contrast);
    set({ highContrast: contrast });
  },

  toggleHighContrast: () => {
    const nextVal = !get().highContrast;
    try {
      localStorage.setItem(STORAGE_KEY_HIGH_CONTRAST, String(nextVal));
    } catch {}
    applyAccessibilityToDOM(get().demographicLens, get().fontScale, nextVal);
    set({ highContrast: nextVal });
  },
}));
