import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { getAllProducts, getStoredSuggestions } from '../../utils/storage';
import { ProductItem, UserSuggestion } from '../../types';
import { Database, Inbox, CheckCircle2, Layers, ArrowRight, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);
  const [dbInfo, setDbInfo] = useState<{ d1Configured: boolean } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, suggRes, dbRes] = await Promise.allSettled([
          api.products.list(),
          api.suggestions.list(),
          api.db.status()
        ]);

        if (prodRes.status === 'fulfilled' && prodRes.value?.products?.length > 0) {
          setProducts(prodRes.value.products);
        } else {
          setProducts(getAllProducts());
        }

        if (suggRes.status === 'fulfilled' && suggRes.value?.suggestions) {
          setSuggestions(suggRes.value.suggestions);
        } else {
          setSuggestions(getStoredSuggestions());
        }

        if (dbRes.status === 'fulfilled') {
          setDbInfo(dbRes.value);
        }
      } catch {
        setProducts(getAllProducts());
        setSuggestions(getStoredSuggestions());
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalProducts = products.length;
  const pendingSuggestions = suggestions.length;
  const totalCategories = new Set(products.map(p => p.category)).size;
  const totalAlternatives = products.reduce((acc, p) => acc + (p.alternatives?.length || 0), 0);

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Admin Dashboard</h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Real-time metrics & moderation queue for Boycott Israel Online
        </p>
      </div>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Boycott Targets</span>
            <ShieldAlert className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-3xl font-black text-zinc-900 dark:text-white">{loading ? '...' : totalProducts}</p>
          <span className="text-[11px] text-zinc-400 font-semibold mt-1 block">Active in catalog</span>
        </div>

        <div className="p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Safe Alternatives</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-zinc-900 dark:text-white">{loading ? '...' : totalAlternatives}</p>
          <span className="text-[11px] text-zinc-400 font-semibold mt-1 block">Pakistani & safe brands</span>
        </div>

        <div className="p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Pending Reviews</span>
            <Inbox className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-zinc-900 dark:text-white">{loading ? '...' : pendingSuggestions}</p>
          <span className="text-[11px] text-zinc-400 font-semibold mt-1 block">Community submissions</span>
        </div>

        <div className="p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Categories</span>
            <Layers className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-black text-zinc-900 dark:text-white">{loading ? '...' : totalCategories}</p>
          <span className="text-[11px] text-zinc-400 font-semibold mt-1 block">Distinct sectors</span>
        </div>
      </div>

      {/* Quick Action & Recent Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Submissions */}
        <div className="lg:col-span-2 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Recent Community Submissions</h3>
            <Link to="/admin/suggestions" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline">
              View All ({suggestions.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {suggestions.slice(0, 4).map(s => (
              <div key={s.id} className="flex justify-between items-center p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800">
                <div className="min-w-0 pr-3">
                  <p className="font-bold text-sm text-zinc-900 dark:text-white truncate">{s.brandName}</p>
                  <p className="text-[11px] text-zinc-500 truncate">{s.category} • {s.reasonOrProof}</p>
                </div>
                <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-[10px] rounded-md font-black shrink-0">
                  {s.type || 'BOYCOTT'}
                </span>
              </div>
            ))}
            {suggestions.length === 0 && (
              <div className="p-8 text-center text-zinc-400 text-xs font-bold">
                No pending suggestions in queue.
              </div>
            )}
          </div>
        </div>

        {/* Database Status Card */}
        <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Cloudflare D1 Backend</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {dbInfo?.d1Configured 
                ? 'Your Cloudflare Edge SQL database is active and serving live product queries.' 
                : 'Running on local fallback mode. Bind "DB" in Cloudflare Pages to activate serverless SQL.'}
            </p>
          </div>
          <Link 
            to="/admin/settings"
            className="block text-center py-2.5 px-4 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 font-bold text-xs transition-colors"
          >
            Manage Database & Backups
          </Link>
        </div>
      </div>
    </div>
  );
}
