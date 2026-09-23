import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Tag, 
  MapPin, 
  User, 
  BookOpen, 
  Flame, 
  CheckCircle2, 
  HelpCircle, 
  Newspaper 
} from 'lucide-react';
import { Modal } from '../ui/modal';
import { CommunityCategory } from '../../types';
import { useCommunityStore } from '../../stores/communityStore';
import { useUIStore } from '../../stores/uiStore';
import { useTranslation } from '../../i18n/useTranslation';

interface StoryComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CATEGORIES: { id: CommunityCategory; labelEn: string; labelUr: string; icon: React.ReactNode; descEn: string }[] = [
  {
    id: 'Story',
    labelEn: 'Personal Story',
    labelUr: 'ذاتی تجربہ و کہانی',
    icon: <BookOpen className="w-4 h-4 text-emerald-500" />,
    descEn: 'Share how you swapped brands at home or work'
  },
  {
    id: 'AlternativeReview',
    labelEn: 'Alternative Review',
    labelUr: 'پاکستانی متبادل کا ریویو',
    icon: <CheckCircle2 className="w-4 h-4 text-blue-500" />,
    descEn: 'Compare quality and price of local Pakistani products'
  },
  {
    id: 'Campaign',
    labelEn: 'Campaign & Victory',
    labelUr: 'مہم اور بائیکاٹ کامیابی',
    icon: <Flame className="w-4 h-4 text-rose-500" />,
    descEn: 'Divestment wins, student activism, or boycott updates'
  },
  {
    id: 'News',
    labelEn: 'Economic News',
    labelUr: 'معاشی خبریں و اثرات',
    icon: <Newspaper className="w-4 h-4 text-amber-500" />,
    descEn: 'Financial reports and multinational revenue dips'
  },
  {
    id: 'Question',
    labelEn: 'Q&A / Advice',
    labelUr: 'سوال یا رہنمائی',
    icon: <HelpCircle className="w-4 h-4 text-purple-500" />,
    descEn: 'Ask the community for safe alternative recommendations'
  }
];

const SUGGESTED_TAGS = ['GrocerySwitch', 'LocalBrands', 'NextCola', 'BDSMovement', 'PakistaniMade', 'TechBoycott', 'BudgetFriendly'];

export const StoryComposerModal: React.FC<StoryComposerModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { createPost } = useCommunityStore();
  const { showToast } = useUIStore();
  const { t, isUrdu } = useTranslation();

  const [category, setCategory] = useState<CommunityCategory>('Story');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorLocation, setAuthorLocation] = useState('');
  const [tags, setTags] = useState<string[]>(['GrocerySwitch']);
  const [customTagInput, setCustomTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleToggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      if (tags.length < 5) {
        setTags([...tags, tag]);
      }
    }
  };

  const handleAddCustomTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const cleaned = customTagInput.trim().replace(/^#/, '');
      if (cleaned && !tags.includes(cleaned) && tags.length < 5) {
        setTags([...tags, cleaned]);
        setCustomTagInput('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = isUrdu ? 'عنوان درج کرنا لازمی ہے' : 'Title is required';
    } else if (title.trim().length < 8) {
      newErrors.title = isUrdu ? 'عنوان کم از کم ۸ حروف پر مشتمل ہو' : 'Title must be at least 8 characters';
    }

    if (!content.trim()) {
      newErrors.content = isUrdu ? 'کہانی یا تفصیل درج کریں' : 'Content is required';
    } else if (content.trim().length < 25) {
      newErrors.content = isUrdu ? 'تفصیل کم از کم ۲۵ حروف کی ہو' : 'Content must be at least 25 characters';
    }

    if (!authorName.trim()) {
      newErrors.authorName = isUrdu ? 'اپنا نام درج کریں' : 'Author name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const created = await createPost({
        title: title.trim(),
        content: content.trim(),
        authorName: authorName.trim(),
        authorLocation: authorLocation.trim() || undefined,
        category,
        tags
      });

      if (created) {
        showToast(isUrdu ? 'آپ کی کہانی کامیابی سے شائع ہو گئی!' : 'Your story was published successfully!', 4000);
        // Reset
        setTitle('');
        setContent('');
        setAuthorName('');
        setAuthorLocation('');
        setTags(['GrocerySwitch']);
        onClose();
        if (onSuccess) onSuccess();
      }
    } catch {
      showToast(isUrdu ? 'کہانی شائع کرنے میں خرابی پیش آئی' : 'Failed to publish story', 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black tracking-tight text-zinc-900 dark:text-white">
              {isUrdu ? 'اپنی کہانی یا ریویو شیئر کریں' : 'Share Your Story or Review'}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {isUrdu ? 'پاکستانی عوام کے ساتھ اپنا بائیکاٹ تجربہ اور متبادل برانڈز شیئر کریں' : 'Inspire thousands of households with your conscious boycott journey'}
            </p>
          </div>
        </div>
      }
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-black text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            {isUrdu ? 'کیٹیگری منتخب کریں' : 'Post Category'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-2.5 rounded-2xl border text-left flex items-start gap-2.5 transition-all active:scale-95 ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{cat.icon}</div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold block truncate">
                      {isUrdu ? cat.labelUr : cat.labelEn}
                    </span>
                    <span className="text-[10px] text-zinc-400 line-clamp-1">
                      {cat.descEn}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <label className="text-xs font-black text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            {isUrdu ? 'عنوان *' : 'Story Title *'}
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={isUrdu ? 'مثلاً: ہم نے گھر کے تمام واشنگ پاؤڈر کیسے صوفی اور برائٹ پر منتقل کیے' : 'e.g. How our family replaced 100% of multinational detergents with Sufi & Brite'}
            dir="auto"
            className={`w-full px-3.5 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
              errors.title ? 'border-rose-500' : 'border-zinc-200 dark:border-zinc-700'
            }`}
          />
          {errors.title && <p className="text-[11px] font-bold text-rose-500">{errors.title}</p>}
        </div>

        {/* Content Body */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              {isUrdu ? 'کہانی / تفصیل *' : 'Detailed Experience / Review *'}
            </label>
            <span className="text-[10px] text-zinc-400 font-semibold">
              {content.split(/\s+/).filter(Boolean).length} {isUrdu ? 'الفاظ' : 'words'}
            </span>
          </div>
          <textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={isUrdu ? 'اپنے تجربات، متبادل اشیاء کے نام، کوالٹی کا موازنہ اور قیمتوں کے فرق کی تفصیل یہاں لکھیں...' : 'Share what products you replaced, how they performed, price differences, and tips for other families...'}
            dir="auto"
            className={`w-full px-3.5 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border text-xs sm:text-sm font-medium text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-y ${
              errors.content ? 'border-rose-500' : 'border-zinc-200 dark:border-zinc-700'
            }`}
          />
          {errors.content && <p className="text-[11px] font-bold text-rose-500">{errors.content}</p>}
        </div>

        {/* Author Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-black text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'آپ کا نام *' : 'Your Name *'}</span>
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder={isUrdu ? 'مثلاً: حمزہ فاروق' : 'e.g. Hamza Farooq'}
              dir="auto"
              className={`w-full px-3.5 py-2 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.authorName ? 'border-rose-500' : 'border-zinc-200 dark:border-zinc-700'
              }`}
            />
            {errors.authorName && <p className="text-[11px] font-bold text-rose-500">{errors.authorName}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'شہر / علاقہ' : 'Location (Optional)'}</span>
            </label>
            <input
              type="text"
              value={authorLocation}
              onChange={(e) => setAuthorLocation(e.target.value)}
              placeholder={isUrdu ? 'مثلاً: لاہور، پاکستان' : 'e.g. Lahore, Pakistan'}
              dir="auto"
              className="w-full px-3.5 py-2 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Tags Section */}
        <div className="space-y-2">
          <label className="text-xs font-black text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'ٹیگز (زیادہ سے زیادہ ۵)' : 'Tags (Max 5)'}</span>
          </label>
          <div className="flex flex-wrap gap-1.5 items-center">
            {SUGGESTED_TAGS.map((tag) => {
              const active = tags.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  onClick={() => handleToggleTag(tag)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                    active
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={customTagInput}
              onChange={(e) => setCustomTagInput(e.target.value)}
              onKeyDown={handleAddCustomTag}
              placeholder={isUrdu ? 'اضافی ٹیگ درج کر کے Enter دبائیں...' : 'Add custom tag & press Enter...'}
              className="flex-1 px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {isUrdu ? 'منسوخ کریں' : 'Cancel'}
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? (isUrdu ? 'شائع ہو رہا ہے...' : 'Publishing...') : (isUrdu ? 'کہانی شائع کریں' : 'Publish Story')}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
