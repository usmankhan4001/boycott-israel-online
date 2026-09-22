import React, { useMemo, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useSearch } from '../hooks/useSearch';
import { ProductCard } from '../components/product/ProductCard';
import { ChevronRight, ArrowRight, UtensilsCrossed, Users } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { Link } from 'react-router-dom';
import { POPULAR_CATEGORIES } from '../data/laymanCategories';
import { CategoryIcon } from '../components/CategoryIcon';

export const HomePage: React.FC = () => {
  const { products, searchQuery, selectedCategory, setSelectedCategory, setSearchQuery } = useProducts();
  const { filteredProducts } = useSearch();
  const [itemsToShow, setItemsToShow] = useState(24);

  // Featured Brands
  const featuredTargets = useMemo(() => {
    const priorityNames = ['coca-cola', 'pepsi', 'mcdonald', 'kfc', 'starbucks', 'nestlé', 'hp'];
    return products
      .filter(p => priorityNames.some(target => p.name.toLowerCase().includes(target) || p.parentCompany.toLowerCase().includes(target)))
      .slice(0, 6);
  }, [products]);

  const handleCategoryClick = (catName: string, query?: string) => {
    if (selectedCategory === catName && searchQuery === (query || '')) {
      setSelectedCategory('All');
      setSearchQuery('');
    } else {
      setSelectedCategory(catName || 'All');
      setSearchQuery(query || '');
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Horizontal Filter */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
            selectedCategory === 'All' && !searchQuery
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
          }`}
        >
          All Brands
        </button>

        {POPULAR_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === (cat.categoryName || 'All') && (cat.query ? searchQuery === cat.query : true);
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.categoryName || 'All', cat.query)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
              }`}
            >
              <CategoryIcon name={cat.iconName} className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {(!searchQuery && selectedCategory === 'All') ? (
        <>
          {/* Featured Targets Section */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black flex items-center gap-2">
                Primary Boycott Targets <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {featuredTargets.map(item => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500 shadow-sm transition-all flex flex-col items-center gap-2 text-center group"
                >
                  <BrandLogo name={item.name} domain={item.domain} logo={item.logo} size="md" isBoycott={true} />
                  <div>
                    <h3 className="font-bold text-xs group-hover:text-rose-600">{item.name}</h3>
                    <p className="text-[10px] text-zinc-500">{item.parentCompany}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Spotlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div onClick={() => handleCategoryClick('Restaurants & Places')} className="p-5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 cursor-pointer group hover:border-rose-500">
              <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center mb-3">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black group-hover:text-rose-600">Restaurants & Places</h3>
              <p className="text-xs text-zinc-600 mt-1">Check complicity logs for fast-food chains.</p>
            </div>
            <div onClick={() => handleCategoryClick('Celebrities & Endorsers')} className="p-5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 cursor-pointer group hover:border-purple-500">
              <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black group-hover:text-purple-600">Celebrities & Endorsers</h3>
              <p className="text-xs text-zinc-600 mt-1">Track personalities promoting complicit brands.</p>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="text-xs font-semibold text-zinc-500">
            {searchQuery ? `Found ${filteredProducts.length} results for "${searchQuery}"` : `${filteredProducts.length} Brands in ${selectedCategory}`}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {filteredProducts.slice(0, itemsToShow).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {itemsToShow < filteredProducts.length && (
            <div className="text-center pt-4">
              <button 
                onClick={() => setItemsToShow(prev => prev + 24)}
                className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg text-sm font-bold"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
