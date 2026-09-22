import React, { useState, useEffect } from 'react';
import { UserSuggestion } from '../../types';
import { api } from '../../lib/api';
import { getStoredSuggestions, deleteStoredSuggestion } from '../../utils/storage';
import { CheckCircle2, XCircle, Inbox, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

export function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const loadSuggestions = async () => {
    setLoading(true);
    try {
      const res = await api.suggestions.list();
      if (res?.suggestions && res.suggestions.length > 0) {
        setSuggestions(res.suggestions);
      } else {
        setSuggestions(getStoredSuggestions());
      }
    } catch {
      setSuggestions(getStoredSuggestions());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestions();
  }, []);

  const handleApprove = async (s: UserSuggestion) => {
    try {
      await api.suggestions.approve(s.id);
      setMsg({ text: `Approved "${s.brandName}" and added to live products catalog!`, type: 'success' });
      setSuggestions(prev => prev.filter(item => item.id !== s.id));
      deleteStoredSuggestion(s.id);
    } catch (err: any) {
      setMsg({ text: `Error approving suggestion: ${err.message}`, type: 'error' });
    }
  };

  const handleReject = async (id: string, brandName: string) => {
    if (!window.confirm(`Reject and delete suggestion for "${brandName}"?`)) return;
    try {
      await api.suggestions.delete(id);
      setSuggestions(prev => prev.filter(s => s.id !== id));
      deleteStoredSuggestion(id);
      setMsg({ text: `Rejected suggestion for "${brandName}".`, type: 'success' });
    } catch (err: any) {
      setMsg({ text: `Error rejecting suggestion: ${err.message}`, type: 'error' });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Community Submissions</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Review user-suggested boycotted brands and Pakistani alternatives
          </p>
        </div>
        <button
          onClick={loadSuggestions}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Submissions
        </button>
      </div>

      {msg && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-xs ${
          msg.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
            : 'bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
        }`}>
          {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{msg.text}</span>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-zinc-400 text-sm font-bold">Loading submissions...</div>
      ) : suggestions.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-zinc-700 dark:text-zinc-300 text-sm">No Pending Submissions</h3>
          <p className="text-xs text-zinc-400">All community suggestions have been reviewed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map(s => (
            <div key={s.id} className="p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-black text-base text-zinc-900 dark:text-white">{s.brandName}</h3>
                    <p className="text-[11px] text-zinc-500 font-semibold">{s.category || 'General'}</p>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-black rounded-md bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 uppercase">
                    {s.type || 'BOYCOTT'}
                  </span>
                </div>
                
                <div className="bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-2xl space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-800">
                  <p><strong>Reason:</strong> {s.reasonOrProof}</p>
                  {s.parentCompany && <p><strong>Parent:</strong> {s.parentCompany}</p>}
                  {s.alternativeName && (
                    <p className="text-emerald-600 dark:text-emerald-400">
                      <strong>Suggested Alt:</strong> {s.alternativeName} ({s.alternativeCountry || 'Pakistan'})
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                <button 
                  onClick={() => handleApprove(s)} 
                  className="flex-1 flex justify-center items-center gap-1.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-colors shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve
                </button>
                <button 
                  onClick={() => handleReject(s.id, s.brandName)} 
                  className="flex-1 flex justify-center items-center gap-1.5 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl font-bold transition-colors"
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
