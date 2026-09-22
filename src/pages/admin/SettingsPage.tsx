import React, { useState } from 'react';
import { exportFullDatabaseJson, importFullDatabaseJson } from '../../utils/storage';
import { Save, Download, Upload } from 'lucide-react';

export function SettingsPage() {
  const [projectId, setProjectId] = useState(localStorage.getItem('SANITY_PROJECT_ID') || '');
  const [dataset, setDataset] = useState(localStorage.getItem('SANITY_DATASET') || 'production');
  const [token, setToken] = useState(localStorage.getItem('SANITY_API_TOKEN') || '');
  const [msg, setMsg] = useState('');

  const handleSaveSanity = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('SANITY_PROJECT_ID', projectId);
    localStorage.setItem('SANITY_DATASET', dataset);
    localStorage.setItem('SANITY_API_TOKEN', token);
    setMsg('Sanity config saved');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleExport = () => {
    const data = exportFullDatabaseJson();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'database.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          importFullDatabaseJson(evt.target?.result as string);
          setMsg('Import successful');
          setTimeout(() => setMsg(''), 3000);
        } catch {
          setMsg('Import failed');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Settings</h2>

      {msg && <div className="p-4 bg-green-100 text-green-800 rounded-xl font-bold">{msg}</div>}

      <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-6">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Sanity CMS Configuration</h3>
        <form onSubmit={handleSaveSanity} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">Project ID</label>
            <input type="text" value={projectId} onChange={e => setProjectId(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-red-500" />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">Dataset</label>
            <input type="text" value={dataset} onChange={e => setDataset(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-red-500" />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">API Token</label>
            <input type="password" value={token} onChange={e => setToken(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-red-500" />
          </div>
          <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-colors">
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </form>
      </div>

      <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-6">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Data Management</h3>
        <div className="flex gap-4">
          <button onClick={handleExport} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl font-bold transition-colors">
            <Download className="w-4 h-4" /> Export Database JSON
          </button>
          <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl font-bold transition-colors cursor-pointer">
            <Upload className="w-4 h-4" /> Import Database JSON
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}
