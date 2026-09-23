import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({
  className = '',
  variant = 'default',
  ...props
}) => {
  const baseStyles = "inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none";

  const variants = {
    default: "border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
    secondary: "border-transparent bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
    destructive: "border-transparent bg-rose-600 text-white shadow-xs font-black uppercase tracking-wider",
    outline: "border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300",
    success: "border border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold",
    warning: "border border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold",
    info: "border border-blue-500/30 bg-blue-500/15 text-blue-700 dark:text-blue-400 font-bold"
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />
  );
};
