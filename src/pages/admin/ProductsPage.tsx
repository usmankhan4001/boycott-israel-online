import React, { useState, useEffect } from 'react';
import { ProductItem, AlternativeItem } from '../../types';
import { api } from '../../lib/api';
import { getAllProducts, addCustomProduct, updateProductInCms, deleteProductInCms } from '../../utils/storage';
import { BrandLogo } from '../../components/BrandLogo';
import { 
  Search, 
  Trash2, 
  Edit3, 
  Plus, 
  X, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  RefreshCw,
  Building2,
  Globe,
  Image as ImageIcon
} from 'lucide-react';

export function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Food & Beverages');
  const [subcategory, setSubcategory] = useState('');
  const [parentCompany, setParentCompany] = useState('');
  const [boycottReason, setBoycottReason] = useState('');
  const [severity, setSeverity] = useState<'Critical' | 'High' | 'Caution'>('High');
  const [israelBarcode, setIsraelBarcode] = useState('');
  const [domain, setDomain] = useState('');
  const [logo, setLogo] = useState('');
  const [alternatives, setAlternatives] = useState<AlternativeItem[]>([
    { name: '', country: 'Pakistan', verified: true, logo: '' }
  ]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await api.products.list();
      if (res?.products && res.products.length > 0) {
        setProducts(res.products);
      } else {
        setProducts(getAllProducts());
      }
    } catch {
      setProducts(getAllProducts());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setName('');
    setCategory('Food & Beverages');
    setSubcategory('');
    setParentCompany('');
    setBoycottReason('');
    setSeverity('High');
    setIsraelBarcode('');
    setDomain('');
    setLogo('');
    setAlternatives([{ name: '', country: 'Pakistan', verified: true, logo: '' }]);
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProductItem) => {
    setEditingId(p.id);
    setName(p.name || '');
    setCategory(p.category || 'Food & Beverages');
    setSubcategory(p.subcategory || '');
    setParentCompany(p.parentCompany || '');
    setBoycottReason(p.boycottReason || '');
    setSeverity(p.severity || 'High');
    setIsraelBarcode(p.israelBarcode || '');
    setDomain(p.domain || '');
    setLogo(p.logo || '');
    setAlternatives(
      p.alternatives && p.alternatives.length > 0 
        ? p.alternatives.map(a => ({ ...a }))
        : [{ name: '', country: 'Pakistan', verified: true, logo: '' }]
    );
    setIsModalOpen(true);
  };

  const handleAddAlternativeRow = () => {
    setAlternatives(prev => [...prev, { name: '', country: 'Pakistan', verified: true, logo: '' }]);
  };

  const handleAlternativeChange = (index: number, field: keyof AlternativeItem, val: any) => {
    setAlternatives(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: val };
      return updated;
    });
  };

  const handleRemoveAlternativeRow = (index: number) => {
    setAlternatives(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !boycottReason.trim()) {
      setFeedback({ text: 'Please fill in product name and boycott reason.', type: 'error' });
      return;
    }

    setIsSaving(true);
    const validAlts = alternatives
      .filter(a => a.name.trim().length > 0)
      .map(a => ({
        ...a,
        logo: a.logo?.trim() || undefined
      }));

    const payload: ProductItem = {
      id: editingId || `bio-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      category,
      subcategory: subcategory.trim(),
      parentCompany: parentCompany.trim(),
      boycottReason: boycottReason.trim(),
      severity,
      israelBarcode: israelBarcode.trim() || undefined,
      domain: domain.trim() || undefined,
      logo: logo.trim() || undefined,
      alternatives: validAlts,
      tags: [category, subcategory].filter(Boolean),
      isCustom: true
    };

    try {
      if (editingId) {
        // 1. Update in D1
        await api.products.update(editingId, payload).catch(() => {});
        // 2. Update in Local Storage fallback
        updateProductInCms(payload);
        setFeedback({ text: `Successfully updated "${payload.name}"!`, type: 'success' });
      } else {
        // 1. Create in D1
        await api.products.create(payload).catch(() => {});
        // 2. Add to Local Storage fallback
        addCustomProduct(payload);
        setFeedback({ text: `Successfully created "${payload.name}"!`, type: 'success' });
      }
      setIsModalOpen(false);
      await loadProducts();
    } catch (err: any) {
      setFeedback({ text: `Error saving product: ${err.message}`, type: 'error' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const handleDelete = async (id: string, brandName: string) => {
    if (!window.confirm(`Are you sure you want to delete ${brandName}?`)) return;
    try {
      await api.products.delete(id).catch(() => {});
      deleteProductInCms(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      setFeedback({ text: `Deleted "${brandName}".`, type: 'success' });
    } catch (err: any) {
      setFeedback({ text: `Error deleting product: ${err.message}`, type: 'error' });
    } finally {
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    const matchesSearch = !search || 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.parentCompany.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categoriesList = ['All', 'Food & Beverages', 'Personal Care', 'Technology', 'Clothing', 'Restaurants & Places', 'Celebrities & Endorsers'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Products Catalog</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Manage boycott targets and verified local alternatives ({products.length} total)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadProducts}
            className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl font-bold text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Boycott Target
          </button>
        </div>
      </div>

      {feedback && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-xs ${
          feedback.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
            : 'bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
        }`}>
          {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <input 
            type="text"
            placeholder="Search by brand name or parent company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-red-500 shadow-2xs"
          />
        </div>
        <select
          value={selectedCat}
          onChange={e => setSelectedCat(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs font-bold focus:outline-none focus:border-red-500"
        >
          {categoriesList.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs font-black uppercase tracking-wider">
                <th className="p-4">Brand / Logo</th>
                <th className="p-4">Category</th>
                <th className="p-4">Parent Company</th>
                <th className="p-4">Severity</th>
                <th className="p-4">Alternatives</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-400 font-bold">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-400 font-bold">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.slice(0, 100).map(p => (
                  <tr key={p.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4 font-bold text-zinc-900 dark:text-white">
                      <div className="flex items-center gap-3">
                        <BrandLogo name={p.name} domain={p.domain} logo={p.logo} size="xs" isBoycott={true} />
                        <span className="truncate max-w-[180px] font-bold">{p.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-zinc-600 dark:text-zinc-300">{p.category}</td>
                    <td className="p-4 text-zinc-500 dark:text-zinc-400">{p.parentCompany || '—'}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        p.severity === 'Critical' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300' 
                          : p.severity === 'High' 
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/60 dark:text-yellow-300'
                      }`}>
                        {p.severity}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-600 dark:text-zinc-300">
                      {p.alternatives && p.alternatives.length > 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold truncate max-w-[160px] block">
                          {p.alternatives[0].name} {p.alternatives.length > 1 && `+${p.alternatives.length - 1}`}
                        </span>
                      ) : (
                        <span className="text-zinc-400">None</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 max-w-xl w-full space-y-5 my-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white">
                  {editingId ? `Edit "${name || 'Product'}"` : 'Add New Boycott Target'}
                </h3>
                <p className="text-[11px] text-zinc-500">
                  {editingId ? 'Modify boycott evidence, logo, severity, or safe alternatives' : 'Fill in the target details, logo, and verified local alternatives'}
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Brand / Entity Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="e.g., Starbucks"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Category *</label>
                  <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-semibold"
                  >
                    <option value="Food & Beverages">Food & Beverages</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Technology">Technology</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Restaurants & Places">Restaurants & Places</option>
                    <option value="Celebrities & Endorsers">Celebrities & Endorsers</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Parent Company</label>
                  <input 
                    type="text" 
                    value={parentCompany} 
                    onChange={e => setParentCompany(e.target.value)} 
                    placeholder="e.g., PepsiCo / Unilever"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Severity Level</label>
                  <select 
                    value={severity} 
                    onChange={e => setSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-bold"
                  >
                    <option value="Critical">🔴 Critical (Direct Funding/IDF)</option>
                    <option value="High">🟠 High (Settlement Factory/Investment)</option>
                    <option value="Caution">🟡 Caution (Parent Company Links)</option>
                  </select>
                </div>
              </div>

              {/* Logo URL and Live Preview Field */}
              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-2">
                <label className="block font-bold text-zinc-700 dark:text-zinc-300">
                  Logo / Portrait Image URL
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                    {logo || name ? (
                      <BrandLogo name={name || 'Brand'} domain={domain} logo={logo} size="xs" isBoycott={true} />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-zinc-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input 
                      type="url" 
                      value={logo} 
                      onChange={e => setLogo(e.target.value)} 
                      placeholder="https://upload.wikimedia.org/wikipedia/commons/.../logo.svg"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs"
                    />
                    <span className="text-[10px] text-zinc-400 mt-1 block">
                      Direct image link (Wikimedia SVG/PNG, Brandfetch, or direct HTTPS link)
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Boycott Reason & Proof *</label>
                <textarea 
                  required 
                  rows={3} 
                  value={boycottReason} 
                  onChange={e => setBoycottReason(e.target.value)} 
                  placeholder="Explain why this brand is boycotted with factual evidence..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Website Domain (for auto-logo)</label>
                  <input 
                    type="text" 
                    value={domain} 
                    onChange={e => setDomain(e.target.value)} 
                    placeholder="e.g., starbucks.com"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Israeli Barcode (optional)</label>
                  <input 
                    type="text" 
                    value={israelBarcode} 
                    onChange={e => setIsraelBarcode(e.target.value)} 
                    placeholder="e.g., 729..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Safe Alternatives Section */}
              <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300">Verified Safe Alternatives</label>
                  <button 
                    type="button" 
                    onClick={handleAddAlternativeRow}
                    className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                  >
                    + Add Another Alternative
                  </button>
                </div>
                {alternatives.map((alt, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-2">
                    <div className="flex gap-2 items-center">
                      <input 
                        type="text" 
                        placeholder="Alternative Brand (e.g. Gourmet / Tapal)" 
                        value={alt.name} 
                        onChange={e => handleAlternativeChange(idx, 'name', e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                      />
                      <input 
                        type="text" 
                        placeholder="Country" 
                        value={alt.country} 
                        onChange={e => handleAlternativeChange(idx, 'country', e.target.value)}
                        className="w-24 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                      />
                      {alternatives.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => handleRemoveAlternativeRow(idx)}
                          className="p-1 text-zinc-400 hover:text-rose-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="url" 
                        placeholder="Alternative Logo URL (optional)" 
                        value={alt.logo || ''} 
                        onChange={e => handleAlternativeChange(idx, 'logo', e.target.value)}
                        className="flex-1 px-3 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-[11px]"
                      />
                      {alt.logo && (
                        <div className="w-6 h-6 rounded bg-white p-0.5 border border-zinc-200 shrink-0">
                          <img src={alt.logo} alt="alt logo" className="w-full h-full object-contain" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : editingId ? 'Update Target' : 'Save Target'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
