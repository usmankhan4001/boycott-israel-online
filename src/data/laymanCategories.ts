export interface LaymanCategory {
  id: string;
  name: string;
  iconName: 'GlassWater' | 'Cookie' | 'Coffee' | 'Sparkles' | 'Droplets' | 'Baby' | 'Smile' | 'UtensilsCrossed' | 'Shirt' | 'Laptop' | 'Store' | 'ShieldAlert' | 'Users' | 'Star';
  subtitle: string;
  query?: string;
  categoryName?: string;
}

export const POPULAR_CATEGORIES: LaymanCategory[] = [
  {
    id: 'restaurants-places',
    name: 'Restaurants & Places',
    iconName: 'UtensilsCrossed',
    subtitle: 'KFC, McDonalds, Subway, Starbucks, Local Chains...',
    categoryName: 'Restaurants & Places'
  },
  {
    id: 'celebrities-endorsers',
    name: 'Celebrities & Endorsers',
    iconName: 'Users',
    subtitle: 'Actors & Cricketers promoting Coke, Pepsi, L\'Oréal...',
    categoryName: 'Celebrities & Endorsers'
  },
  {
    id: 'drinks',
    name: 'Cold Drinks & Juices',
    iconName: 'GlassWater',
    subtitle: 'Pepsi, Coke, Slice, 7Up...',
    categoryName: 'Food & Beverages',
    query: 'Drinks'
  },
  {
    id: 'biscuits',
    name: 'Biscuits & Snacks',
    iconName: 'Cookie',
    subtitle: 'Oreo, Lays, Kurkure, Tuc...',
    categoryName: 'Food & Beverages',
    query: 'Biscuits'
  },
  {
    id: 'tea-coffee',
    name: 'Tea & Coffee',
    iconName: 'Coffee',
    subtitle: 'Lipton, Nescafe, Everyday, Supreme...',
    categoryName: 'Food & Beverages',
    query: 'Tea'
  },
  {
    id: 'detergents',
    name: 'Washing & Cleaning',
    iconName: 'Sparkles',
    subtitle: 'Surf Excel, Ariel, Harpic, Vim...',
    categoryName: 'Detergents'
  },
  {
    id: 'soaps-hygiene',
    name: 'Soaps & Shampoos',
    iconName: 'Droplets',
    subtitle: 'Dove, Lux, Sunsilk, Pantene, Head & Shoulders...',
    categoryName: 'Personal Care & Health'
  },
  {
    id: 'baby',
    name: 'Baby Diapers & Food',
    iconName: 'Baby',
    subtitle: 'Pampers, Cerelac, Nido, Huggies...',
    categoryName: 'Baby Products'
  },
  {
    id: 'toothpaste',
    name: 'Toothpaste & Dental',
    iconName: 'Smile',
    subtitle: 'Colgate, Sensodyne, Oral-B, CloseUp...',
    categoryName: 'Personal Care & Health',
    query: 'Toothpaste'
  },
  {
    id: 'apparel',
    name: 'Clothing & Sportswear',
    iconName: 'Shirt',
    subtitle: 'Zara, Puma, H&M, Nike, Adidas...',
    categoryName: 'Fashion & Apparel'
  },
  {
    id: 'tech',
    name: 'Tech & Hardware',
    iconName: 'Laptop',
    subtitle: 'HP, Siemens, Wix, Fiverr, Intel...',
    categoryName: 'Electronics & Technology'
  }
];
