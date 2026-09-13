import React, { useState } from 'react';
import { getBrandAsset } from '../data/brandLogos';

interface Props {
  name: string;
  domain?: string;
  logo?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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

  const brandAsset = getBrandAsset(name);
  const resolvedDomain = domain || brandAsset?.domain || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

  // Cascading high-fidelity logo sources:
  // 1. Explicit logo URL / brandfetch CDN
  // 2. Brandfetch direct asset CDN (no API key required)
  // 3. Clearbit Logo CDN
  // 4. Google S2 High-Res Favicon
  // 5. DuckDuckGo Icon
  const logoSources: string[] = [
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
    xs: 'w-6 h-6 text-[10px] rounded-md',
    sm: 'w-8 h-8 text-xs rounded-lg',
    md: 'w-10 h-10 text-sm rounded-xl',
    lg: 'w-12 h-12 text-base rounded-2xl',
    xl: 'w-16 h-16 text-xl rounded-2xl'
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
      {!hasError ? (
        <div className="w-full h-full bg-white p-1 flex items-center justify-center">
          <img
            src={currentSrc}
            alt={name}
            onError={handleImageError}
            className="w-full h-full object-contain"
            loading="lazy"
            crossOrigin="anonymous"
          />
        </div>
      ) : (
        <span className="font-black tracking-tight">{initial}</span>
      )}
    </div>
  );
};
