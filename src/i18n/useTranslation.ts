import { useUIStore, Language } from '../stores/uiStore';
import { translations, Translations, getCategoryTranslation } from './translations';

export const useTranslation = () => {
  const language = useUIStore(state => state.language);
  const setLanguage = useUIStore(state => state.setLanguage);
  const showLanguageModal = useUIStore(state => state.showLanguageModal);
  const setShowLanguageModal = useUIStore(state => state.setShowLanguageModal);

  const t: Translations = translations[language] || translations.en;

  const translateCategory = (catName: string) => {
    return getCategoryTranslation(catName, language);
  };

  return {
    t,
    language,
    setLanguage,
    showLanguageModal,
    setShowLanguageModal,
    isUrdu: language === 'ur',
    translateCategory
  };
};
