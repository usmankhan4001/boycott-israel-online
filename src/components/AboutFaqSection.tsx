import React, { useState } from 'react';
import { SITE_INFO } from '../data/pagesContent';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Scale, 
  Globe2, 
  Building,
  HeartHandshake,
  ShieldAlert,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

export const AboutFaqSection: React.FC = () => {
  const { t, isUrdu } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const corePillars = [
    {
      title: t.pillar1Title,
      description: t.pillar1Desc,
      icon: <Flame className="w-4 h-4 text-rose-600 dark:text-rose-400" />
    },
    {
      title: t.pillar2Title,
      description: t.pillar2Desc,
      icon: <ShieldAlert className="w-4 h-4 text-amber-500" />
    },
    {
      title: t.pillar3Title,
      description: t.pillar3Desc,
      icon: <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
    }
  ];

  const boycottFaqs = t.faqList;

  return (
    <div className={`max-w-4xl mx-auto py-4 space-y-6 pb-24 ${isUrdu ? 'font-urdu' : ''}`}>
      
      {/* Header with Official Logos */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <img 
            src="/app-logo.png" 
            alt="BoycottIsrael App Logo" 
            className="w-10 h-10 rounded-full object-contain bg-white p-0.5 shadow-xs border border-zinc-200 dark:border-zinc-700" 
          />
          <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 rounded-lg flex items-center shadow-2xs">
            <img 
              src="/takweyat-logo.png" 
              alt="Takweyat Foundation" 
              className="h-4 object-contain" 
            />
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
          {t.aboutTitle}
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t.aboutSubtitle}
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {corePillars.map((p, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs space-y-2"
          >
            <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              {p.icon}
            </div>
            <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100">{p.title}</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {p.description}
            </p>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 px-1 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{t.faqHeader}</span>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800">
          {boycottFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 shrink-0 text-zinc-400" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1 bg-zinc-50/50 dark:bg-zinc-800/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

