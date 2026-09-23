import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Building2,
  Sparkles,
  ShieldAlert,
  ArrowRightLeft
} from 'lucide-react';
import { UserSuggestion } from '../types';
import { saveStoredSuggestion, getAdminWebhookUrl } from '../utils/storage';
import { api } from '../lib/api';
import { useTranslation } from '../i18n/useTranslation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

export const SuggestionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onProductAdded
}) => {
  const { t, isUrdu } = useTranslation();
  const [submissionType, setSubmissionType] = useState<'boycott' | 'alternative'>('boycott');
  const [brandName, setBrandName] = useState('');
  const [parentCompany, setParentCompany] = useState('');
  const [category, setCategory] = useState('Food & Beverages');
  const [subcategory, setSubcategory] = useState('');
  const [alternativeName, setAlternativeName] = useState('');
  const [alternativeCountry, setAlternativeCountry] = useState('Pakistan');
  const [reasonOrProof, setReasonOrProof] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) return;

    setIsSubmitting(true);

    const newSuggestion: UserSuggestion = {
      id: `sug-${Date.now()}`,
      type: submissionType,
      brandName: brandName.trim(),
      parentCompany: parentCompany.trim() || 'Israeli Affiliated Parent',
      category,
      subcategory: subcategory.trim() || category,
      alternativeName: alternativeName.trim() || undefined,
      alternativeCountry: alternativeCountry.trim() || undefined,
      reasonOrProof: reasonOrProof.trim() || 'Community proposed entry',
      createdAt: new Date().toISOString()
    };

    // Save to local storage inbox for CMS admin moderation
    saveStoredSuggestion(newSuggestion);

    // Save to native Cloudflare D1 Backend
    try {
      await api.suggestions.submit(newSuggestion);
    } catch (e) {
      console.warn('API suggestion submit error:', e);
    }

    // If Admin configured a webhook (Discord/Telegram/API), dispatch it
    const webhookUrl = getAdminWebhookUrl();
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `📢 **New Community Proposal Submitted!**\n**Brand:** ${newSuggestion.brandName}\n**Type:** ${newSuggestion.type}\n**Parent:** ${newSuggestion.parentCompany}\n**Evidence:** ${newSuggestion.reasonOrProof}\n**Safe Alternative:** ${newSuggestion.alternativeName || 'None provided'}`
          })
        });
      } catch (err) {
        console.warn('Webhook dispatch failed, saved to local CMS queue:', err);
      }
    }

    onProductAdded();
    setIsSubmitting(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setBrandName('');
      setParentCompany('');
      setSubcategory('');
      setAlternativeName('');
      setReasonOrProof('');
      onClose();
    }, 2000);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 ${isUrdu ? 'font-urdu' : ''}`}>
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                {t.submitProposal}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {t.submitProposalSub}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {success ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                {t.proposalSuccess}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
                {t.proposalSuccessDesc}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setSubmissionType('boycott')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    submissionType === 'boycott'
                      ? 'bg-white dark:bg-zinc-900 text-rose-600 dark:text-rose-400 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{t.boycottTarget}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSubmissionType('alternative')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    submissionType === 'alternative'
                      ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>{t.safeAlt}</span>
                </button>
              </div>

              {/* Brand Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {t.brandToBoycott}
                </label>
                <input
                  type="text"
                  required
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder={isUrdu ? "مثال: KitKat, Oreo, Lays, Starbucks..." : "e.g. KitKat, Oreo, Lays, Starbucks..."}
                  className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              {/* Parent Company & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {t.parentLabel}
                  </label>
                  <input
                    type="text"
                    value={parentCompany}
                    onChange={(e) => setParentCompany(e.target.value)}
                    placeholder="e.g. Unilever, Nestlé, P&G..."
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {t.categoryLabel}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:border-emerald-500 font-medium"
                  >
                    <option value="Food & Beverages">{isUrdu ? 'کھانے پینے کی اشیاء' : 'Food & Beverages'}</option>
                    <option value="Personal Care & Cosmetics">{isUrdu ? 'ذاتی نگہداشت و کاسمیٹکس' : 'Personal Care & Cosmetics'}</option>
                    <option value="Detergents & Cleaning">{isUrdu ? 'سرف و صفائی' : 'Detergents & Cleaning'}</option>
                    <option value="Baby Care">{isUrdu ? 'بچوں کی دیکھ بھال' : 'Baby Care'}</option>
                    <option value="Oral Care">{isUrdu ? 'ٹوتھ پیسٹ و ڈینٹل' : 'Oral Care'}</option>
                    <option value="Snacks & Confectionery">{isUrdu ? 'اسنیکس و بسکٹ' : 'Snacks & Confectionery'}</option>
                    <option value="Fast Food & Restaurants">{isUrdu ? 'فاسٹ فوڈ و ریسٹورنٹس' : 'Fast Food & Restaurants'}</option>
                    <option value="Tech & Electronics">{isUrdu ? 'ٹیکنالوجی و الیکٹرانکس' : 'Tech & Electronics'}</option>
                    <option value="Fashion & Apparel">{isUrdu ? 'لباس و فیشن' : 'Fashion & Apparel'}</option>
                  </select>
                </div>
              </div>

              {/* Alternative Suggestion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {t.safeLocalAltLabel}
                  </label>
                  <input
                    type="text"
                    value={alternativeName}
                    onChange={(e) => setAlternativeName(e.target.value)}
                    placeholder={isUrdu ? "مثال: Gourmet Cola, Pakola, Sufi" : "e.g. Gourmet Cola, Pakola, Sufi"}
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {t.altOriginLabel}
                  </label>
                  <input
                    type="text"
                    value={alternativeCountry}
                    onChange={(e) => setAlternativeCountry(e.target.value)}
                    placeholder="e.g. Pakistan, Turkey"
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
              </div>

              {/* Evidence / Reason */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {t.proofLabel}
                </label>
                <textarea
                  required
                  rows={3}
                  value={reasonOrProof}
                  onChange={(e) => setReasonOrProof(e.target.value)}
                  placeholder={isUrdu ? "اسرائیلی تعلق، سرمایہ کاری یا فیکٹری کا ثبوت یا لنک فراہم کریں..." : "Provide evidence of Israeli occupation ties, investments, factory locations or news link..."}
                  className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t.submittingProposal : t.sendProposal}</span>
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

