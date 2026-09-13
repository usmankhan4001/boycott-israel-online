export interface LaymanCategory {
  id: string;
  name: string;
  iconName: 'GlassWater' | 'Cookie' | 'Coffee' | 'Sparkles' | 'Droplets' | 'Baby' | 'Smile' | 'UtensilsCrossed' | 'Shirt' | 'Laptop' | 'Store' | 'ShieldAlert';
  subtitle: string;
  query?: string;
  categoryName?: string;
}

export const POPULAR_CATEGORIES: LaymanCategory[] = [
  {
    id: 'drinks',
    name: 'Cold Drinks & Juices',
    iconName: 'GlassWater',
    subtitle: 'Pepsi, Coke, Slice...',
    categoryName: 'Food & Beverages',
    query: 'Drinks'
  },
  {
    id: 'biscuits',
    name: 'Biscuits & Snacks',
    iconName: 'Cookie',
    subtitle: 'Oreo, Lays, Kurkure...',
    categoryName: 'Food & Beverages',
    query: 'Biscuits'
  },
  {
    id: 'tea-coffee',
    name: 'Tea & Coffee',
    iconName: 'Coffee',
    subtitle: 'Lipton, Nescafe, Everyday...',
    categoryName: 'Food & Beverages',
    query: 'Tea'
  },
  {
    id: 'detergents',
    name: 'Washing & Cleaning',
    iconName: 'Sparkles',
    subtitle: 'Surf Excel, Ariel, Harpic...',
    categoryName: 'Detergents'
  },
  {
    id: 'soaps-hygiene',
    name: 'Soaps & Shampoos',
    iconName: 'Droplets',
    subtitle: 'Dove, Lux, Sunsilk, Pantene...',
    categoryName: 'Personal Care & Health'
  },
  {
    id: 'baby',
    name: 'Baby Diapers & Food',
    iconName: 'Baby',
    subtitle: 'Pampers, Cerelac, Nido...',
    categoryName: 'Baby Products'
  },
  {
    id: 'toothpaste',
    name: 'Toothpaste & Dental',
    iconName: 'Smile',
    subtitle: 'Colgate, Sensodyne, Oral-B...',
    categoryName: 'Personal Care & Health',
    query: 'Toothpaste'
  },
  {
    id: 'fast-food',
    name: 'Fast Food & Dining',
    iconName: 'UtensilsCrossed',
    subtitle: 'McDonalds, KFC, Pizza Hut...',
    categoryName: 'Hotels & Restaurants'
  },
  {
    id: 'apparel',
    name: 'Clothing & Sportswear',
    iconName: 'Shirt',
    subtitle: 'Zara, Puma, H&M...',
    categoryName: 'Fashion & Apparel'
  },
  {
    id: 'tech',
    name: 'Tech & Hardware',
    iconName: 'Laptop',
    subtitle: 'HP, Siemens, Wix, Fiverr...',
    categoryName: 'Electronics & Technology'
  }
];
