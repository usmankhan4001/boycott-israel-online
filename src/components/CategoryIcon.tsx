import React from 'react';
import { 
  GlassWater, 
  Cookie, 
  Coffee, 
  Sparkles, 
  Droplets, 
  Baby, 
  Smile, 
  UtensilsCrossed, 
  Shirt, 
  Laptop, 
  Store, 
  ShieldAlert 
} from 'lucide-react';

interface Props {
  name: string;
  className?: string;
}

export const CategoryIcon: React.FC<Props> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'GlassWater':
      return <GlassWater className={className} />;
    case 'Cookie':
      return <Cookie className={className} />;
    case 'Coffee':
      return <Coffee className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Droplets':
      return <Droplets className={className} />;
    case 'Baby':
      return <Baby className={className} />;
    case 'Smile':
      return <Smile className={className} />;
    case 'UtensilsCrossed':
      return <UtensilsCrossed className={className} />;
    case 'Shirt':
      return <Shirt className={className} />;
    case 'Laptop':
      return <Laptop className={className} />;
    case 'Store':
      return <Store className={className} />;
    default:
      return <ShieldAlert className={className} />;
  }
};
