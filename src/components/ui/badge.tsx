import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success';
}

export const Badge: React.FC<BadgeProps> = ({
  className = '',
  variant = 'default',
  ...props
}) => {
  const baseStyles = "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold transition-colors focus:outline-none";

  const variants = {
    default: "border-transparent bg-zinc-100 text-zinc-900",
    secondary: "border-transparent bg-zinc-800 text-zinc-300",
    destructive: "border-transparent bg-red-600 text-white uppercase tracking-wider",
    outline: "border border-zinc-700 text-zinc-300",
    success: "border-transparent bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />
  );
};
