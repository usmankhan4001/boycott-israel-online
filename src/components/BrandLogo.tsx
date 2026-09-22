import React, { useState, useEffect } from 'react';
import { getBrandAsset } from '../data/brandLogos';

interface Props {
  name: string;
  domain?: string;
  logo?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  isBoycott?: boolean;
  className?: string;
}

const FEMALE_CELEBRITY_KEYWORDS = [
  'mahira', 'ayeza', 'hania', 'momina', 'sajal', 'yumna', 'maya ali',
  'iqra aziz', 'ushna', 'fatima bhutto', 'sania mirza', 'mehwish',
  'amna ilyas', 'ayesha omar', 'nida yasir', 'saboor', 'urwa',
  'mawra', 'alizeh', 'gal gadot', 'amy schumer', 'dua lipa',
  'gigi', 'bella', 'kylie', 'kendall', 'kardashian', 'scarlett',
  'natalie portman', 'taylor swift', 'aimen', 'minal', 'hira mani',
  'kinza', 'sarah khan', 'neelam', 'sohai', 'syra', 'sanah', 'kubra',
  'ramsha', 'komal', 'zarnish', 'sonya hussyn', 'amina sheikh',
  'sarwat gilani', 'juggun', 'shaista', 'bushra ansari', 'sanju',
  'katrina', 'deepika', 'alia bhatt', 'priyanka', 'kareena',
  'anushka', 'shraddha', 'kangana', 'sonam', 'saba qamar',
  'hareem', 'dananeer', 'rabi pirzada', 'nadia khan', 'shaista lodhi',
  'veena malik', 'mathira', 'sadia khan', 'noor zafar', 'mariyam nafees',
  'sidra', 'momal', 'mansha', 'sunita', 'zara noor', 'yashma gill'
];

export const isFemaleCelebrity = (name: string): boolean => {
  if (!name) return false;
  const lower = name.toLowerCase().trim();
  return FEMALE_CELEBRITY_KEYWORDS.some(keyword => lower.includes(keyword));
};

export const BrandLogo: React.FC<Props> = ({
  name,
  domain,
  logo,
  size = 'md',
  isBoycott = false,
  className = ''
}) => {
  const [hasError, setHasError] = useState(false);
  const [retryIndex, setRetryIndex] = useState(0);

  // Reset error when name or logo changes
  useEffect(() => {
    setHasError(false);
    setRetryIndex(0);
  }, [name, logo, domain]);

  const isFemale = isFemaleCelebrity(name);

  const sizeClasses = {
    xs: 'w-8 h-8 text-xs rounded-lg',
    sm: 'w-12 h-12 text-sm rounded-xl',
    md: 'w-16 h-16 text-base rounded-2xl',
    lg: 'w-20 h-20 text-lg rounded-2xl',
    xl: 'w-28 h-28 text-2xl rounded-3xl',
    '2xl': 'w-36 h-36 text-3xl rounded-3xl'
  };

  // Female silhouette rendering (no real photo displayed for female personalities)
  if (isFemale) {
    return (
      <div
        className={`relative shrink-0 flex items-center justify-center overflow-hidden select-none border transition-all bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 dark:from-purple-950/60 dark:via-pink-950/30 dark:to-purple-950/50 border-purple-300/80 dark:border-purple-800 text-purple-600 dark:text-purple-300 shadow-inner ${sizeClasses[size]} ${className}`}
        title={`${name} (Avatar Profile)`}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.6" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-3/5 h-3/5 drop-shadow-xs"
        >
          {/* Modest vector female silhouette */}
          <path d="M12 2.5a4.5 4.5 0 0 0-4.5 4.5c0 2.3 1.6 4.2 3.8 4.45A7.5 7.5 0 0 0 4.5 19a.75.75 0 0 0 .75.75h13.5a.75.75 0 0 0 .75-.75 7.5 7.5 0 0 0-6.8-7.55c2.2-.25 3.8-2.15 3.8-4.45A4.5 4.5 0 0 0 12 2.5z" fill="currentColor" fillOpacity="0.85" />
          <path d="M8.5 7c.5-2 2-3 3.5-3s3 1 3.5 3" />
        </svg>
      </div>
    );
  }

  const brandAsset = getBrandAsset(name);
  const isAvatar = brandAsset?.isAvatar || false;
  const resolvedDomain = (isAvatar ? brandAsset?.domain : (domain || brandAsset?.domain)) || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

  // Cascading high-fidelity logo sources
  const logoSources: string[] = isAvatar
    ? [
        ...(brandAsset?.directImage ? [brandAsset.directImage] : []),
        ...(logo ? [logo] : [])
      ]
    : [
        ...(brandAsset?.directImage ? [brandAsset.directImage] : []),
        ...(logo ? [logo] : []),
        ...(brandAsset?.brandfetchCdn ? [brandAsset.brandfetchCdn] : []),
        `https://cdn.brandfetch.io/${resolvedDomain}/w/400/h/400`,
        `https://logo.clearbit.com/${resolvedDomain}`,
        `https://www.google.com/s2/favicons?domain=${resolvedDomain}&sz=128`,
        `https://icons.duckduckgo.com/ip3/${resolvedDomain}.ico`
      ];

  const currentSrc = logoSources[retryIndex] || logoSources[0];

  const handleImageError = () => {
    if (retryIndex < logoSources.length - 1) {
      setRetryIndex(prev => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center overflow-hidden font-bold select-none border transition-all ${
        isBoycott
          ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400'
          : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400'
      } ${sizeClasses[size]} ${className}`}
    >
      {!hasError && currentSrc ? (
        <div className={`w-full h-full flex items-center justify-center ${isAvatar ? 'bg-zinc-100 dark:bg-zinc-800' : 'bg-white p-1.5'}`}>
          <img
            src={currentSrc}
            alt={name}
            onError={handleImageError}
            className={`w-full h-full ${isAvatar ? 'object-cover object-top' : 'object-contain'} rounded-[inherit]`}
            loading="lazy"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <div className={`w-full h-full flex flex-col items-center justify-center ${
          isBoycott ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
        }`}>
          <span className="font-black tracking-tight leading-none">{initial}</span>
        </div>
      )}
    </div>
  );
};
