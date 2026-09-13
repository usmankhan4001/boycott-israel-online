import React, { useState, useEffect } from 'react';
import { GAZA_CONSCIENCE_MESSAGES } from '../data/gazaQuotes';
import { ChevronRight, X } from 'lucide-react';

interface Props {
  onOpenGrocery: () => void;
}

export const GazaMemorialBanner: React.FC<Props> = ({ onOpenGrocery }) => {
  const [index, setIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % GAZA_CONSCIENCE_MESSAGES.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  if (isDismissed) return null;

  const currentMsg = GAZA_CONSCIENCE_MESSAGES[index];

  return (
    <aside aria-label="Gaza Solidarity Banner" className="bg-[#1C1C1E] border-b border-white/[0.08] px-4 py-2 text-xs text-gray-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-sm shrink-0">🇵🇸</span>
          <div className="truncate">
            <span className="font-semibold text-white mr-1.5">{currentMsg.title}:</span>
            <span className="text-gray-300 italic">"{currentMsg.quote}"</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenGrocery}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300"
          >
            <span>Audit Grocery</span>
            <ChevronRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-gray-500 hover:text-gray-300 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
