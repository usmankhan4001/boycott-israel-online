import React from 'react';
import { Globe, Check, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

export const LanguageModal: React.FC = () => {
  const { showLanguageModal, setLanguage, language } = useTranslation();

  if (!showLanguageModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xl overflow-hidden p-6 sm:p-7 space-y-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Palestinian Colors */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
            <Globe className="w-8 h-8" />
          </div>
          
          <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
            Choose Language / زبان منتخب کریں
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            Select your preferred language. You can change it anytime.
          </p>
        </div>

        {/* 2 Big Language Option Cards */}
        <div className="grid grid-cols-1 gap-3.5">
          {/* English Option */}
          <button
            onClick={() => setLanguage('en')}
            className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-left group hover:scale-[1.01] active:scale-[0.99] ${
              language === 'en'
                ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100 shadow-sm'
                : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850/50 hover:border-emerald-500/50 text-zinc-800 dark:text-zinc-200'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span className="text-3xl shadow-xs">🇬🇧</span>
              <div>
                <div className="font-black text-base text-zinc-900 dark:text-zinc-50">
                  English
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  Continue in English
                </div>
              </div>
            </div>

            <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs group-hover:bg-emerald-500 transition-colors">
              Select
            </span>
          </button>

          {/* Urdu Nastaliq Option */}
          <button
            onClick={() => setLanguage('ur')}
            className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-right group hover:scale-[1.01] active:scale-[0.99] font-urdu ${
              language === 'ur'
                ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100 shadow-sm'
                : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850/50 hover:border-emerald-500/50 text-zinc-800 dark:text-zinc-200'
            }`}
            dir="rtl"
          >
            <div className="flex items-center gap-3.5">
              <span className="text-3xl shadow-xs">🇵🇰</span>
              <div>
                <div className="font-bold text-lg text-zinc-900 dark:text-zinc-50 leading-tight">
                  اردو (Urdu)
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  اردو میں جاری رکھیں
                </div>
              </div>
            </div>

            <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs group-hover:bg-emerald-500 transition-colors">
              منتخب کریں
            </span>
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-1 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
            BoycottIsrael • Takweyat Foundation
          </span>
        </div>
      </div>
    </div>
  );
};
