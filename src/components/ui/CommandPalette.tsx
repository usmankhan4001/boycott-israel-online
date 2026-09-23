import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  X, 
  ShieldAlert, 
  CheckCircle2, 
  MessageSquare, 
  ScanLine, 
  ShoppingCart, 
  Layers, 
  Info, 
  PlusCircle, 
  CornerDownLeft,
  Sparkles
} from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { useCommunityStore } from '../../stores/communityStore';
import { useTranslation } from '../../i18n/useTranslation';
import { getLocalizedProductName } from '../../utils/urduProductTranslator';
import { POPULAR_CATEGORIES } from '../../data/laymanCategories';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResultItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'product' | 'alternative' | 'community' | 'action';
  badge?: string;
  badgeType?: 'danger' | 'success' | 'info' | 'neutral';
  url?: string;
  action?: () => void;
  icon: React.ReactNode;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { products } = useProducts();
  const { posts } = useCommunityStore();
  const { t, isUrdu, language, translateCategory } = useTranslation();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global keydown handler for Escape & Navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Build Results
  const results = useMemo<SearchResultItem[]>(() => {
    const q = query.toLowerCase().trim();

    // Default quick suggestions when query is empty
    if (!q) {
      const quickActions: SearchResultItem[] = [
        {
          id: 'action-scan',
          title: isUrdu ? 'بارکوڈ و ۷۲۹ سکینر کھولیں' : 'Open 729 Barcode Scanner',
          subtitle: isUrdu ? 'کیمرہ یا بارکوڈ سے فوری تصدیق' : 'Verify product in 1 second',
          category: 'action',
          badge: isUrdu ? 'فوری ٹول' : 'Tool',
          badgeType: 'danger',
          url: '/scan',
          icon: <ScanLine className="w-4 h-4 text-rose-500" />
        },
        {
          id: 'action-community',
          title: isUrdu ? 'کمیونٹی فورم اور عوامی کہانیاں' : 'Community Forum & Boycott Stories',
          subtitle: isUrdu ? 'شہریوں کے تجربات اور متبادل کے تبصرے' : 'Read lived experiences & boycott wins',
          category: 'action',
          badge: isUrdu ? 'کمیونٹی' : 'Forum',
          badgeType: 'info',
          url: '/community',
          icon: <MessageSquare className="w-4 h-4 text-blue-500" />
        },
        {
          id: 'action-grocery',
          title: isUrdu ? 'گروسری لسٹ اور چیک لسٹ' : 'Ethical Grocery Conscience Planner',
          subtitle: isUrdu ? 'ماہانہ راشن کو بائیکاٹ برانڈز سے پاک رکھیں' : 'Swap complicit brands before shopping',
          category: 'action',
          badge: isUrdu ? 'گروسری' : 'Shopping',
          badgeType: 'success',
          url: '/grocery',
          icon: <ShoppingCart className="w-4 h-4 text-emerald-500" />
        },
        {
          id: 'action-suggest',
          title: isUrdu ? 'نئے بائیکاٹ ہدف کی تجویز دیں' : 'Suggest a Boycott Target or Safe Swap',
          subtitle: isUrdu ? 'تحقیقی ٹیم کو تفصیلات ارسال کریں' : 'Help expand verified boycott database',
          category: 'action',
          badge: isUrdu ? 'شراکت' : 'Contribute',
          badgeType: 'neutral',
          url: '/suggest',
          icon: <PlusCircle className="w-4 h-4 text-amber-500" />
        }
      ];

      // Top featured boycott targets
      const featured = products.slice(0, 4).map(p => ({
        id: `prod-${p.id}`,
        title: getLocalizedProductName(p, language),
        subtitle: `${p.parentCompany || translateCategory(p.category)} • ${p.alternatives?.length || 0} ${isUrdu ? 'پاکستانی متبادل' : 'safe swaps'}`,
        category: 'product' as const,
        badge: isUrdu ? 'بائیکاٹ ہدف' : 'Target',
        badgeType: 'danger' as const,
        url: `/product/${p.id}`,
        icon: <ShieldAlert className="w-4 h-4 text-rose-500" />
      }));

      return [...quickActions, ...featured];
    }

    const items: SearchResultItem[] = [];

    // 1. Search Products & Brands
    const matchedProducts = products.filter(p => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchParent = p.parentCompany?.toLowerCase().includes(q);
      const matchReason = p.boycottReason?.toLowerCase().includes(q);
      const matchTags = p.tags?.some(t => t.toLowerCase().includes(q));
      return matchName || matchParent || matchReason || matchTags;
    });

    matchedProducts.slice(0, 6).forEach(p => {
      items.push({
        id: `prod-${p.id}`,
        title: getLocalizedProductName(p, language),
        subtitle: `${p.parentCompany ? `${p.parentCompany} • ` : ''}${translateCategory(p.category)}`,
        category: 'product',
        badge: p.severity === 'Critical' ? (isUrdu ? 'شدید ہدف' : 'Critical') : (isUrdu ? 'بائیکاٹ ہدف' : 'Boycott'),
        badgeType: 'danger',
        url: `/product/${p.id}`,
        icon: <ShieldAlert className="w-4 h-4 text-rose-500" />
      });
    });

    // 2. Search Safe Alternatives
    products.forEach(p => {
      p.alternatives?.forEach(alt => {
        if (alt.name.toLowerCase().includes(q) || alt.country?.toLowerCase().includes(q)) {
          // Avoid duplicate entries if already added
          if (!items.some(i => i.id === `alt-${alt.name}-${p.id}`)) {
            items.push({
              id: `alt-${alt.name}-${p.id}`,
              title: `${alt.name} (${alt.country || 'Pakistan'})`,
              subtitle: `${isUrdu ? 'محفوظ متبادل برائے' : 'Safe local alternative for'} ${p.name}`,
              category: 'alternative',
              badge: isUrdu ? 'پاکستانی متبادل' : 'Safe Swap',
              badgeType: 'success',
              url: `/product/${p.id}`,
              icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            });
          }
        }
      });
    });

    // 3. Search Community Posts
    const matchedPosts = posts.filter(post => 
      post.title.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q) ||
      post.tags?.some(t => t.toLowerCase().includes(q))
    );

    matchedPosts.slice(0, 4).forEach(post => {
      items.push({
        id: `post-${post.id}`,
        title: post.title,
        subtitle: `${post.authorName}${post.authorLocation ? ` (${post.authorLocation})` : ''} • ${post.category}`,
        category: 'community',
        badge: post.category,
        badgeType: 'info',
        url: `/community/${post.id}`,
        icon: <MessageSquare className="w-4 h-4 text-blue-500" />
      });
    });

    // 4. Categories Match
    POPULAR_CATEGORIES.forEach(cat => {
      if (cat.name.toLowerCase().includes(q) || (cat.categoryName && cat.categoryName.toLowerCase().includes(q))) {
        items.push({
          id: `cat-${cat.id}`,
          title: translateCategory(cat.name),
          subtitle: isUrdu ? 'کیٹیگری کے تمام پروڈکٹس دیکھیں' : 'Browse full category collection',
          category: 'action',
          badge: isUrdu ? 'کیٹیگری' : 'Category',
          badgeType: 'neutral',
          url: '/categories',
          icon: <Layers className="w-4 h-4 text-purple-500" />
        });
      }
    });

    return items;
  }, [query, products, posts, isUrdu, language, translateCategory]);

  // Adjust selection on results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const handleSelect = (item: SearchResultItem) => {
    onClose();
    if (item.action) {
      item.action();
    } else if (item.url) {
      navigate(item.url);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (results.length || 1));
      scrollActiveIntoView(selectedIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % (results.length || 1));
      scrollActiveIntoView(selectedIndex - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    }
  };

  const scrollActiveIntoView = (index: number) => {
    const list = listRef.current;
    if (!list) return;
    const items = list.getElementsByClassName('search-result-item');
    const target = items[index] as HTMLElement;
    if (target) {
      target.scrollIntoView({ block: 'nearest' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Palette Box */}
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 z-10 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-100 dark:border-zinc-800 gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isUrdu ? 'برانڈ، متبادل، کیٹیگری یا کمیونٹی کہانی تلاش کریں...' : 'Type a brand, safe alternative, category, or story...'}
            dir="auto"
            className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div 
          ref={listRef}
          className="max-h-[60vh] overflow-y-auto p-2 space-y-1 divide-y divide-zinc-100 dark:divide-zinc-800/40"
        >
          {results.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <Sparkles className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mx-auto" />
              <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
                {isUrdu ? 'کوئی نتیجہ نہیں ملا' : 'No matching results found'}
              </p>
              <p className="text-xs text-zinc-400">
                {isUrdu ? 'مختلف الفاظ سے تلاش کریں یا نیا برانڈ تجویز کریں۔' : 'Try searching with another keyword or suggest a new boycott target.'}
              </p>
            </div>
          ) : (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`search-result-item flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                      : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-3">
                    <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm truncate block" dir="auto">
                          {item.title}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5 block" dir="auto">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                        item.badgeType === 'danger'
                          ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                          : item.badgeType === 'success'
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : item.badgeType === 'info'
                          ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                          : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 font-medium">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded font-mono text-[9px]">↑↓</kbd> {isUrdu ? 'نیویگیٹ' : 'navigate'}
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded font-mono text-[9px]">↵</kbd> {isUrdu ? 'منتخب کریں' : 'select'}
            </span>
          </div>
          <span className="hidden sm:inline">
            {isUrdu ? 'تقویت فاؤنڈیشن سرچ انڈیکس' : 'Takweyat Foundation Database'}
          </span>
        </div>
      </div>
    </div>
  );
};
