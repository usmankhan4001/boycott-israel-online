import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  side?: 'right' | 'left' | 'bottom';
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  title,
  description,
  side = 'right',
  children,
  className = '',
  showCloseButton = true
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sideStyles = {
    right: 'inset-y-0 right-0 max-w-md w-full animate-in slide-in-from-right duration-300 rounded-l-3xl',
    left: 'inset-y-0 left-0 max-w-md w-full animate-in slide-in-from-left duration-300 rounded-r-3xl',
    bottom: 'inset-x-0 bottom-0 max-h-[85vh] w-full animate-in slide-in-from-bottom duration-300 rounded-t-3xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Panel */}
      <div
        className={`fixed bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xl z-50 flex flex-col ${sideStyles[side]} ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-4 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
          <div className="min-w-0 pr-4">
            {title && typeof title === 'string' ? (
              <h2 className="text-base sm:text-lg font-black tracking-tight text-zinc-900 dark:text-white truncate">
                {title}
              </h2>
            ) : (
              title
            )}
            {description && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {description}
              </p>
            )}
          </div>
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  );
};
