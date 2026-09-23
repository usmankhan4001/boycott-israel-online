import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg'
};

const getInitials = (name?: string) => {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getAvatarColor = (name?: string) => {
  if (!name) return 'bg-emerald-600 text-white';
  const colors = [
    'bg-emerald-600 text-white',
    'bg-teal-600 text-white',
    'bg-cyan-600 text-white',
    'bg-rose-600 text-white',
    'bg-amber-600 text-white',
    'bg-indigo-600 text-white',
    'bg-purple-600 text-white',
    'bg-blue-600 text-white'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  name,
  size = 'md',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = React.useState(false);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full font-bold select-none overflow-hidden ring-2 ring-white/10 ${sizeClasses[size]} ${getAvatarColor(name)} ${className}`}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt || name}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-bold tracking-tight">{getInitials(name)}</span>
      )}
    </div>
  );
};
