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

  const brandAsset = getBrandAsset(name);
  const isAvatar = brandAsset?.isAvatar || false;
  const resolvedDomain = (isAvatar ? brandAsset?.domain : (domain || brandAsset?.domain)) || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

  // Cascading high-fidelity logo sources - direct verified images first:
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

  const sizeClasses = {
    xs: 'w-8 h-8 text-xs rounded-lg',
    sm: 'w-12 h-12 text-sm rounded-xl',
    md: 'w-16 h-16 text-base rounded-2xl',
    lg: 'w-20 h-20 text-lg rounded-2xl',
    xl: 'w-28 h-28 text-2xl rounded-3xl',
    '2xl': 'w-36 h-36 text-3xl rounded-3xl'
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
