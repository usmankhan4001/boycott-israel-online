import React, { useState, useEffect } from 'react';
import { exportFullDatabaseJson, importFullDatabaseJson, getAllProducts } from '../../utils/storage';
import { api } from '../../lib/api';
import { Database, Download, Upload, RefreshCw, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export function SettingsPage() {
  const [dbStatus, setDbStatus] = useState<{ d1Configured: boolean; productCount: number; suggestionCount: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchStatus = async () => {
    try {
      const data = await api.db.status();
      setDbStatus(data);
    } catch {
      setDbStatus({ d1Configured: false, productCount: 0, suggestionCount: 0 });
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleInitDb = async () => {
    setLoading(true);
    try {
      const res = await api.db.init();
      setMsg({ text: res.message || 'Database tables initialized!', type: 'success' });
      await fetchStatus();
    } catch (err: any) {
      setMsg({ text: err.message || 'Failed to initialize database tables.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDb = async () => {
    setLoading(true);
    try {
      const allProducts = getAllProducts();
      const res = await api.products.seed(allProducts);
      setMsg({ text: res.message || `Successfully seeded ${allProducts.length} items!`, type: 'success' });
      await fetchStatus();
    } catch (err: any) {
      setMsg({ text: err.message || 'Failed to seed database.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const data = exportFullDatabaseJson();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `boycott-israel-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        try {
          const parsed = JSON.parse(evt.target?.result as string);
          if (Array.isArray(parsed)) {
            importFullDatabaseJson(evt.target?.result as string);
            if (dbStatus?.d1Configured) {
              await api.products.seed(parsed);
            }
            setMsg({ text: `Successfully imported ${parsed.length} products!`, type: 'success' });
            await fetchStatus();
          }
        } catch {
          setMsg({ text: 'Import failed: Invalid JSON format.', type: 'error' });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 max-w-3xl min-w-0">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">Database & Backend Control</h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Manage your native Cloudflare D1 SQL database and data backups.
        </p>
      </div>

      {msg && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-xs sm:text-sm ${
          msg.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
            : 'bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
        }`}>
          {msg.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span className="break-words">{msg.text}</span>
        </div>
      )}

      {/* Cloudflare D1 Connection Card */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 sm:space-y-5 shadow-xs min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white truncate">Cloudflare D1 SQL Database</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">Serverless Edge SQLite backend</p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              dbStatus?.d1Configured
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
            }`}>
              <span className={`w-2 h-2 rounded-full shrink-0 ${dbStatus?.d1Configured ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              <span className="truncate">{dbStatus?.d1Configured ? 'D1 Connected' : 'Local Mode'}</span>
            </span>
            <button
              onClick={fetchStatus}
              className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
              title="Refresh status"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {dbStatus?.d1Configured ? (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-bold text-zinc-500">Live D1 Products</span>
              <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-1">{dbStatus.productCount}</p>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-bold text-zinc-500">Live Suggestions</span>
              <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-1">{dbStatus.suggestionCount}</p>
            </div>
          </div>
        ) : (
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-2 break-words">
            <p className="font-bold">To bind Cloudflare D1 Database:</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>In Cloudflare Dashboard ➔ <strong>Storage & Databases</strong> ➔ Create database <code>boycottisrael-db</code>.</li>
              <li>Go to <strong>Pages</strong> ➔ <strong>Settings</strong> ➔ <strong>Functions</strong> ➔ <strong>D1 database bindings</strong>.</li>
              <li>Add binding with Variable name <code>DB</code> and database <code>boycottisrael-db</code>.</li>
            </ol>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2">
          <button
            onClick={handleInitDb}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-xs transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" /> Initialize / Update SQL Schema
          </button>
          <button
            onClick={handleSeedDb}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-colors disabled:opacity-50"
          >
            <Database className="w-4 h-4" /> Seed All Products to D1
          </button>
        </div>
      </div>

      {/* Backup & Restore Card */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-xs min-w-0">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">Backup & Restore</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Export your entire product database to JSON or import from a file.
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1">
          <button 
            onClick={handleExport} 
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl font-bold text-xs transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-600" /> Export Database JSON
          </button>
          <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl font-bold text-xs transition-colors cursor-pointer">
            <Upload className="w-4 h-4 text-emerald-600" /> Import Database JSON
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}
