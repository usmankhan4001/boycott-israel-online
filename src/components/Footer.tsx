import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';

interface Props {
  onOpenSuggest: () => void;
  onOpenScanner: () => void;
}

export const Footer: React.FC<Props> = ({ onOpenSuggest, onOpenScanner }) => {
  return (
    <footer className="border-t border-white/[0.06] bg-[#000000] py-8 text-xs text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span>🇵🇸</span>
            <span className="font-semibold text-gray-200">Free Palestine • Boycott Directory</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button onClick={onOpenScanner} className="hover:text-white transition-colors">
              729 Scanner
            </button>
            <span>•</span>
            <button onClick={onOpenSuggest} className="hover:text-white transition-colors">
              Suggest Brand
            </button>
            <span>•</span>
            <a 
              href="https://bdsmovement.net" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white inline-flex items-center gap-1 transition-colors"
            >
              BDS Movement <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="text-center text-[11px] text-gray-600">
          "Don't let the money for oppression come from us." Built with solidarity for Gaza.
        </div>
      </div>
    </footer>
  );
};
