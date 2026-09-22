import React from 'react';
import { getAllProducts, getStoredSuggestions } from '../../utils/storage';

export function DashboardPage() {
  const products = getAllProducts();
  const suggestions = getStoredSuggestions();

  const totalProducts = products.length;
  const pendingSuggestions = suggestions.length;
  const categories = new Set(products.map(p => p.category)).size;
  const totalAlternatives = products.reduce((acc, p) => acc + (p.alternatives?.length || 0), 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400">Total Products</h3>
          <p className="text-3xl font-black text-zinc-900 dark:text-white mt-2">{totalProducts}</p>
        </div>
        <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400">Pending Suggestions</h3>
          <p className="text-3xl font-black text-zinc-900 dark:text-white mt-2">{pendingSuggestions}</p>
        </div>
        <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400">Total Alternatives</h3>
          <p className="text-3xl font-black text-zinc-900 dark:text-white mt-2">{totalAlternatives}</p>
        </div>
        <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400">Categories</h3>
          <p className="text-3xl font-black text-zinc-900 dark:text-white mt-2">{categories}</p>
        </div>
      </div>

      <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Recent Suggestions</h3>
        <div className="space-y-3">
          {suggestions.slice(0, 5).map(s => (
            <div key={s.id} className="flex justify-between items-center p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
              <div>
                <p className="font-bold text-zinc-900 dark:text-white">{s.brandName}</p>
                <p className="text-xs text-zinc-500">{s.category}</p>
              </div>
              <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs rounded-lg font-bold">
                {s.type}
              </span>
            </div>
          ))}
          {suggestions.length === 0 && (
            <p className="text-sm text-zinc-500">No recent suggestions.</p>
          )}
        </div>
      </div>
    </div>
  );
}
