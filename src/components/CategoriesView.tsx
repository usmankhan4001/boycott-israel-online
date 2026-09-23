import React from 'react';
import { POPULAR_CATEGORIES } from '../data/laymanCategories';
import { CategoryIcon } from './CategoryIcon';
import { ProductItem } from '../types';
import { LayoutGrid, ChevronRight, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { getCategoryTranslation } from '../i18n/translations';

interface Props {
  products: ProductItem[];
  onSelectCategory: (categoryName: string, query?: string) => void;
}

export const CategoriesView: React.FC<Props> = ({ products, onSelectCategory }) => {
  const { t, isUrdu, language } = useTranslation();

  // Count items per category
  const categoryStats = React.useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  return (
    <div className={`space-y-4 animate-in fade-in duration-200 pb-8 ${isUrdu ? 'font-urdu' : ''}`}>
      
      {/* Page Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
            {t.browseCategories}
          </h1>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {t.browseCategoriesSub}
        </p>
      </div>

      {/* Grid of Categories with Clean Minimal Corners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {POPULAR_CATEGORIES.map((cat) => {
          const categoryKey = cat.categoryName || 'All';
          const count = categoryStats[categoryKey] || 0;
          const displayTitle = isUrdu ? getCategoryTranslation(cat.name, language) : cat.name;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.categoryName || 'All', cat.query)}
              className="p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-2xs hover:shadow-xs transition-all text-left flex items-center justify-between group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center justify-center transition-colors shrink-0">
                  <CategoryIcon name={cat.iconName} className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                    {displayTitle}
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                    {cat.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {count > 0 ? `${count} ${t.brandsTracked}` : t.explore}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-7 h-7 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 flex items-center justify-center text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 rtl-mirror transition-all shrink-0">
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};

