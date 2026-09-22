import React, { useState, useMemo } from 'react';
import { ProductItem, UserSuggestion, AlternativeItem } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  ShieldAlert, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Download, 
  Upload, 
  Search, 
  Inbox, 
  Layers, 
  Settings, 
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  Send,
  AlertCircle,
  Cloud,
  Database
} from 'lucide-react';
import { 
  getStoredSuggestions, 
  deleteStoredSuggestion, 
  addCustomProduct, 
  updateProductInCms, 
  deleteProductInCms, 
  exportFullDatabaseJson, 
  importFullDatabaseJson,
  getAdminWebhookUrl,
  saveAdminWebhookUrl
} from '../utils/storage';
import { 
  isSanityConfigured, 
  fetchSanityProducts, 
  batchSyncAllToSanity 
} from '../lib/sanity';

interface Props {
  products: ProductItem[];
  setProducts: React.Dispatch<React.SetStateAction<ProductItem[]>>;
  onClose?: () => void;
}

export const AdminCMS: React.FC<Props> = ({ products, setProducts, onClose }) => {
  const [activeTab, setActiveTab] = useState<'submissions' | 'products' | 'sanity' | 'export' | 'webhook'>('sanity');
  
  // Sanity State
  const [sanityProjectId, setSanityProjectId] = useState(() => localStorage.getItem('SANITY_PROJECT_ID') || '');
  const [sanityDataset, setSanityDataset] = useState(() => localStorage.getItem('SANITY_DATASET') || 'production');
  const [sanityToken, setSanityToken] = useState(() => localStorage.getItem('SANITY_API_TOKEN') || '');
  const [isSyncingSanity, setIsSyncingSanity] = useState(false);
  const [syncProgress, setSyncProgress] = useState<{ current: number; total: number } | null>(null);
  const [sanityStatusMsg, setSanityStatusMsg] = useState('');
  
  // Suggestions queue
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>(() => getStoredSuggestions());
  
  // Product Search & Filter
  const [searchFilter, setSearchFilter] = useState('');
  
  // Edit / Add Product Modal State
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<ProductItem>>({
    name: '',
    category: 'Food & Beverages',
    subcategory: '',
    parentCompany: '',
    boycottReason: '',
    severity: 'High',
    alternatives: [],
    tags: []
  });
  const [newAltName, setNewAltName] = useState('');
  const [newAltCountry, setNewAltCountry] = useState('Pakistan');

  // Webhook State
  const [webhookUrl, setWebhookUrl] = useState<string>(() => getAdminWebhookUrl());
  const [webhookSavedMsg, setWebhookSavedMsg] = useState(false);

  // Status Feedback
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchFilter.trim()) return products.slice(0, 50);
    const q = searchFilter.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.parentCompany.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [products, searchFilter]);

  // Approve a Community Suggestion & Add Directly to Live Catalog
  const handleApproveSuggestion = (s: UserSuggestion) => {
    const newProduct: ProductItem = {
      id: `bio-${Date.now()}`,
      name: s.brandName,
      category: s.category || 'General',
      subcategory: s.subcategory || '',
      parentCompany: s.parentCompany || 'Israeli Affiliated Parent',
      boycottReason: s.reasonOrProof,
      severity: 'High',
      alternatives: s.alternativeName ? [
        {
          name: s.alternativeName,
          country: s.alternativeCountry || 'Pakistan',
          verified: true
        }
      ] : [],
      tags: [s.category, 'Community Verified']
    };

    const updated = addCustomProduct(newProduct);
    setProducts(updated);
    const remaining = deleteStoredSuggestion(s.id);
    setSuggestions(remaining);
    
    setActionSuccessMsg(`✓ Added "${s.brandName}" to live boycott catalog!`);
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  // Reject Suggestion
  const handleRejectSuggestion = (id: string) => {
    const remaining = deleteStoredSuggestion(id);
    setSuggestions(remaining);
  };

  // Save / Update Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct.name || !editingProduct.boycottReason) {
      alert('Please provide at least a brand name and boycott reason.');
      return;
    }

    const prod: ProductItem = {
      id: editingProduct.id || `bio-${Date.now()}`,
      name: editingProduct.name,
      category: editingProduct.category || 'General',
      subcategory: editingProduct.subcategory || '',
      parentCompany: editingProduct.parentCompany || '',
      boycottReason: editingProduct.boycottReason,
      severity: editingProduct.severity || 'High',
      alternatives: editingProduct.alternatives || [],
      tags: editingProduct.tags || [editingProduct.category || 'General'],
      domain: editingProduct.domain
    };

    let updated: ProductItem[];
    if (editingProduct.id) {
      updated = updateProductInCms(prod);
    } else {
      updated = addCustomProduct(prod);
    }

    setProducts(updated);
    setIsEditingProduct(false);
    setActionSuccessMsg(`✓ Saved "${prod.name}" successfully!`);
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  // Delete Product
  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the database?`)) {
      const updated = deleteProductInCms(id);
      setProducts(updated);
    }
  };

  // Add Alternative in Editor
  const handleAddAlternative = () => {
    if (!newAltName.trim()) return;
    const newAlt: AlternativeItem = {
      name: newAltName.trim(),
      country: newAltCountry.trim() || 'Pakistan',
      verified: true
    };
    setEditingProduct(prev => ({
      ...prev,
      alternatives: [...(prev.alternatives || []), newAlt]
    }));
    setNewAltName('');
  };

  // Remove Alternative in Editor
  const handleRemoveAlternative = (index: number) => {
    setEditingProduct(prev => ({
      ...prev,
      alternatives: (prev.alternatives || []).filter((_, i) => i !== index)
    }));
  };

  // Export JSON
  const handleExportJson = () => {
    const data = exportFullDatabaseJson();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `boycott-israel-catalog-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const content = evt.target?.result as string;
        const updated = importFullDatabaseJson(content);
        setProducts(updated);
        setActionSuccessMsg('✓ Database imported successfully!');
        setTimeout(() => setActionSuccessMsg(''), 4000);
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  // Save Sanity Credentials
  const handleSaveSanityConfig = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('SANITY_PROJECT_ID', sanityProjectId.trim());
    localStorage.setItem('SANITY_DATASET', sanityDataset.trim() || 'production');
    if (sanityToken.trim()) {
      localStorage.setItem('SANITY_API_TOKEN', sanityToken.trim());
    } else {
      localStorage.removeItem('SANITY_API_TOKEN');
    }
    setSanityStatusMsg('✓ Sanity configuration saved!');
    setTimeout(() => setSanityStatusMsg(''), 3000);
  };

  // Pull live data from Sanity
  const handlePullFromSanity = async () => {
    setIsSyncingSanity(true);
    setSanityStatusMsg('Fetching live dataset from Sanity...');
    try {
      const sanityProducts = await fetchSanityProducts();
      if (sanityProducts && sanityProducts.length > 0) {
        setProducts(sanityProducts);
        setSanityStatusMsg(`✓ Successfully loaded ${sanityProducts.length} live products from Sanity!`);
      } else {
        setSanityStatusMsg('⚠️ No products found on Sanity yet, or project ID was empty.');
      }
    } catch (err: any) {
      setSanityStatusMsg(`❌ Error fetching from Sanity: ${err.message}`);
    } finally {
      setIsSyncingSanity(false);
      setTimeout(() => setSanityStatusMsg(''), 5000);
    }
  };

  // Push all local products to Sanity
  const handleBatchSyncToSanity = async () => {
    if (!sanityToken.trim()) {
      alert('Please enter a Sanity API Token with "Editor" or "Administrator" role to upload data to Sanity.');
      return;
    }
    if (!window.confirm(`This will sync/upload all ${products.length} catalog items to your Sanity dataset. Continue?`)) {
      return;
    }

    setIsSyncingSanity(true);
    setSyncProgress({ current: 0, total: products.length });

    try {
      const result = await batchSyncAllToSanity(products, (current, total) => {
        setSyncProgress({ current, total });
      });
      setSanityStatusMsg(`✓ Sync complete! Uploaded ${result.success} products (${result.failed} failed).`);
    } catch (err: any) {
      setSanityStatusMsg(`❌ Sync error: ${err.message}`);
    } finally {
      setIsSyncingSanity(false);
      setSyncProgress(null);
      setTimeout(() => setSanityStatusMsg(''), 6000);
    }
  };

  // Save Webhook
  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    saveAdminWebhookUrl(webhookUrl);
    setWebhookSavedMsg(true);
    setTimeout(() => setWebhookSavedMsg(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-24 space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-black text-sm">
              CMS
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
              Admin & Moderation Hub
            </h1>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manage live boycott targets, review community suggestions & control catalog data via Sanity.io
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 text-xs font-bold flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            <span>Close CMS</span>
          </button>
        )}
      </div>

      {/* Global Success Notification */}
      {actionSuccessMsg && (
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('sanity')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all shrink-0 ${
            activeTab === 'sanity'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <Cloud className="w-3.5 h-3.5" />
          <span>Sanity.io Studio Control</span>
          {isSanityConfigured() && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('submissions')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all shrink-0 ${
            activeTab === 'submissions'
              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <Inbox className="w-3.5 h-3.5" />
          <span>Community Suggestions</span>
          {suggestions.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black">
              {suggestions.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all shrink-0 ${
            activeTab === 'products'
              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Product Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('export')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all shrink-0 ${
            activeTab === 'export'
              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Backup & JSON Sync</span>
        </button>

        <button
          onClick={() => setActiveTab('webhook')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all shrink-0 ${
            activeTab === 'webhook'
              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Team Webhook Alert</span>
        </button>
      </div>

      {/* TAB: Sanity.io Studio Control Panel */}
      {activeTab === 'sanity' && (
        <div className="space-y-5 animate-in fade-in">
          
          {/* Status & Connection Card */}
          <div className="p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 flex items-center justify-center font-black">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                    Sanity.io Headless CMS Connection
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Connect your Sanity Studio dataset for visual content editing, photo asset hosting, and live cloud sync
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 border ${
                  isSanityConfigured()
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isSanityConfigured() ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  <span>{isSanityConfigured() ? 'Connected' : 'Not Connected'}</span>
                </span>
              </div>
            </div>

            {/* Status Message Banner */}
            {sanityStatusMsg && (
              <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <RefreshCw className={`w-4 h-4 shrink-0 ${isSyncingSanity ? 'animate-spin text-red-600' : ''}`} />
                <span>{sanityStatusMsg}</span>
              </div>
            )}

            {/* Progress Bar when uploading */}
            {syncProgress && (
              <div className="space-y-1.5 p-3 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
                <div className="flex justify-between text-xs font-bold text-red-700 dark:text-red-400">
                  <span>Uploading to Sanity...</span>
                  <span>{syncProgress.current} / {syncProgress.total}</span>
                </div>
                <div className="w-full h-2 bg-red-200 dark:bg-red-900/60 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-600 rounded-full transition-all duration-150"
                    style={{ width: `${(syncProgress.current / syncProgress.total) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Sanity Project Credentials Form */}
            <form onSubmit={handleSaveSanityConfig} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Sanity Project ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={sanityProjectId}
                    onChange={(e) => setSanityProjectId(e.target.value)}
                    placeholder="e.g. abc123xy"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-medium focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Dataset Name
                  </label>
                  <input
                    type="text"
                    value={sanityDataset}
                    onChange={(e) => setSanityDataset(e.target.value)}
                    placeholder="production"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-medium focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Sanity API Token (Write/Editor Permission)
                </label>
                <input
                  type="password"
                  value={sanityToken}
                  onChange={(e) => setSanityToken(e.target.value)}
                  placeholder="sk..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-medium focus:outline-none focus:border-red-500 font-mono"
                />
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Required only if you want to push data from this web dashboard directly into Sanity. Create one at <a href="https://sanity.io/manage" target="_blank" rel="noreferrer" className="text-red-600 hover:underline">sanity.io/manage</a> under API &gt; Tokens.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>

                <button
                  type="button"
                  disabled={isSyncingSanity || !sanityProjectId}
                  onClick={handlePullFromSanity}
                  className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold flex items-center gap-1.5 transition-all border border-zinc-200 dark:border-zinc-700 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingSanity ? 'animate-spin' : ''}`} />
                  <span>Pull Live from Sanity</span>
                </button>

                <button
                  type="button"
                  disabled={isSyncingSanity || !sanityToken}
                  onClick={handleBatchSyncToSanity}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Sync Catalog to Sanity ({products.length} items)</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Setup Instructions & Studio Links */}
          <div className="p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850/50 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Sanity Studio Setup Guide:
            </h4>
            
            <ol className="text-xs text-zinc-600 dark:text-zinc-400 space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                <strong>Create your free Sanity Project:</strong> Go to <a href="https://sanity.io" target="_blank" rel="noreferrer" className="text-red-600 font-bold hover:underline">sanity.io</a> and create a project.
              </li>
              <li>
                <strong>Copy your Project ID:</strong> Paste your Project ID in the input box above and click Save.
              </li>
              <li>
                <strong>Pre-configured Studio Ready:</strong> The schemas are already pre-built in the <code className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono text-[11px]">sanity-studio/</code> folder in this codebase.
              </li>
              <li>
                <strong>Upload Catalog in 1-Click:</strong> Add your write token above and click <strong>"Sync Catalog to Sanity"</strong> to populate your Sanity Studio instantly with all Boycott products and safe alternatives!
              </li>
            </ol>
          </div>

        </div>
      )}

      {/* TAB 1: Community Submissions Inbox */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1">
            <span>Pending community proposals awaiting moderation:</span>
            <span>{suggestions.length} items in inbox</span>
          </div>

          {suggestions.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">All caught up!</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                No pending suggestions. When visitors submit new brands, they will appear here for 1-click approval.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {suggestions.map((s) => (
                <div 
                  key={s.id}
                  className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                          {s.brandName}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          s.type === 'boycott'
                            ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                            : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                        }`}>
                          {s.type === 'boycott' ? '⚠️ Boycott Proposal' : '✅ Alternative Suggestion'}
                        </span>
                      </div>
                      
                      {s.parentCompany && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                          Parent Company: <strong className="text-zinc-700 dark:text-zinc-300">{s.parentCompany}</strong> • Category: {s.category}
                        </p>
                      )}
                    </div>

                    <div className="text-[11px] text-zinc-400 shrink-0">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Reason / Proof */}
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-700 dark:text-zinc-300">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Reason / Evidence:</p>
                    <p className="leading-relaxed">{s.reasonOrProof}</p>
                  </div>

                  {/* Alternative info if provided */}
                  {s.alternativeName && (
                    <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                      Suggested Safe Alternative: {s.alternativeName} ({s.alternativeCountry || 'Pakistan'})
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      onClick={() => handleRejectSuggestion(s.id)}
                      className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-bold transition-all"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApproveSuggestion(s)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Add to Database</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Live Product Catalog Manager */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search catalog to edit or remove (e.g. Oreo, Lays, Unilever)..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            <button
              onClick={() => {
                setEditingProduct({
                  name: '',
                  category: 'Food & Beverages',
                  subcategory: '',
                  parentCompany: '',
                  boycottReason: '',
                  severity: 'High',
                  alternatives: [],
                  tags: []
                });
                setIsEditingProduct(true);
              }}
              className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Target Brand</span>
            </button>
          </div>

          <div className="space-y-2">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <BrandLogo name={p.name} domain={p.domain} isBoycott size="sm" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {p.name}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {p.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                      Parent: {p.parentCompany || 'N/A'} • {p.alternatives.length} Alternatives
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      setEditingProduct(p);
                      setIsEditingProduct(true);
                    }}
                    className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Edit brand"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(p.id, p.name)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    title="Delete brand"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Backup & JSON Sync */}
      {activeTab === 'export' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Database Export & Git Synchronization
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Export your live {products.length}-product catalog as a standardized JSON file to commit back to Git repository or share with researchers.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleExportJson}
                className="px-4 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Export Full Catalog JSON</span>
              </button>

              <label className="px-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all border border-zinc-200 dark:border-zinc-700">
                <Upload className="w-4 h-4" />
                <span>Import Catalog JSON</span>
                <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Team Webhook Dispatch Settings */}
      {activeTab === 'webhook' && (
        <div className="space-y-4">
          <form onSubmit={handleSaveWebhook} className="p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Instant Team Webhook Alerts (Discord / Telegram / Slack)
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Whenever a visitor submits a new boycott brand, alternative, or barcode suggestion, it will automatically dispatch a webhook payload so your team can review it in real-time.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Webhook URL:
              </label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://discord.com/api/webhooks/... or https://api.telegram.org/..."
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>Save Webhook</span>
              </button>
              {webhookSavedMsg && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  ✓ Webhook saved!
                </span>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Product Edit / Add Modal */}
      {isEditingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                {editingProduct.id ? 'Edit Boycott Brand' : 'Add New Boycott Target'}
              </h3>
              <button
                onClick={() => setIsEditingProduct(false)}
                className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3.5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    placeholder="e.g. KitKat"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Parent Conglomerate</label>
                  <input
                    type="text"
                    value={editingProduct.parentCompany || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, parentCompany: e.target.value })}
                    placeholder="e.g. Nestlé"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Category</label>
                  <select
                    value={editingProduct.category || 'Food & Beverages'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="Food & Beverages">Food & Beverages</option>
                    <option value="Personal Care & Cosmetics">Personal Care & Cosmetics</option>
                    <option value="Detergents & Cleaning">Detergents & Cleaning</option>
                    <option value="Baby Care">Baby Care</option>
                    <option value="Oral Care">Oral Care</option>
                    <option value="Snacks & Confectionery">Snacks & Confectionery</option>
                    <option value="Fast Food & Restaurants">Fast Food & Restaurants</option>
                    <option value="Tech & Electronics">Tech & Electronics</option>
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Official Domain (for Logo)</label>
                  <input
                    type="text"
                    value={editingProduct.domain || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, domain: e.target.value })}
                    placeholder="e.g. nestle.com"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Boycott Reason & Proof *</label>
                <textarea
                  required
                  rows={3}
                  value={editingProduct.boycottReason || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, boycottReason: e.target.value })}
                  placeholder="Documented BDS evidence, Israeli factories, investments..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100"
                />
              </div>

              {/* Safe Alternatives Manager */}
              <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Safe Local Alternatives ({editingProduct.alternatives?.length || 0})
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAltName}
                    onChange={(e) => setNewAltName(e.target.value)}
                    placeholder="Alternative brand name (e.g. Pakola, Dalda)"
                    className="flex-1 px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100"
                  />
                  <input
                    type="text"
                    value={newAltCountry}
                    onChange={(e) => setNewAltCountry(e.target.value)}
                    placeholder="Country"
                    className="w-24 px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100"
                  />
                  <button
                    type="button"
                    onClick={handleAddAlternative}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    + Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {editingProduct.alternatives?.map((alt, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5"
                    >
                      <span>{alt.name} ({alt.country})</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAlternative(idx)}
                        className="text-zinc-400 hover:text-rose-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsEditingProduct(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md"
                >
                  Save Product
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
