import React, { useState } from 'react';
import { getStoredSuggestions, deleteStoredSuggestion, addCustomProduct } from '../../utils/storage';
import { UserSuggestion } from '../../types';
import { CheckCircle, XCircle } from 'lucide-react';

export function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>(getStoredSuggestions());

  const handleApprove = (s: UserSuggestion) => {
    addCustomProduct({
      id: `bio-${Date.now()}`,
      name: s.brandName,
      category: s.category || 'General',
      subcategory: s.subcategory || '',
      parentCompany: s.parentCompany || '',
      boycottReason: s.reasonOrProof,
      severity: 'High',
      alternatives: s.alternativeName ? [{ name: s.alternativeName, country: s.alternativeCountry || 'Pakistan', verified: true }] : [],
      tags: [s.category]
    });
    handleReject(s.id);
  };

  const handleReject = (id: string) => {
    setSuggestions(deleteStoredSuggestion(id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Community Suggestions</h2>

      {suggestions.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <p className="text-zinc-500 font-bold">No pending suggestions.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map(s => (
            <div key={s.id} className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-black text-lg text-zinc-900 dark:text-white">{s.brandName}</h3>
                  <p className="text-xs text-zinc-500 font-bold">{s.category}</p>
                </div>
                <span className={`px-2 py-1 text-[10px] font-bold rounded-lg ${s.type === 'boycott' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                  {s.type.toUpperCase()}
                </span>
              </div>
              
              <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl">
                <p className="text-xs text-zinc-600 dark:text-zinc-300"><strong>Reason:</strong> {s.reasonOrProof}</p>
                {s.alternativeName && (
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2"><strong>Alternative:</strong> {s.alternativeName} ({s.alternativeCountry})</p>
                )}
              </div>

              <div className="flex gap-2">
                <button onClick={() => handleApprove(s)} className="flex-1 flex justify-center items-center gap-2 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-colors">
                  <CheckCircle className="w-4 h-4" /> Approve
                </button>
                <button onClick={() => handleReject(s.id)} className="flex-1 flex justify-center items-center gap-2 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl font-bold transition-colors">
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
