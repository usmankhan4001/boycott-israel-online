export interface CategoryMeta {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export const CATEGORIES_META: CategoryMeta[] = [
  {
    id: 'All',
    name: 'All Categories',
    icon: 'LayoutGrid',
    description: 'Explore all verified boycotted grocery and consumer brands.',
    color: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'Restaurants & Places',
    name: 'Restaurants & Places',
    icon: 'UtensilsCrossed',
    description: 'Boycotted fast-food franchises, coffee houses, and dining spots, including corporate behavior logs and local Pakistani alternatives.',
    color: 'from-red-600 to-rose-700'
  },
  {
    id: 'Celebrities & Endorsers',
    name: 'Celebrities & Endorsers',
    icon: 'Users',
    description: 'Pakistani actors, cricketers, influencers & singers endorsing boycotted multinational brands (Coke Studio, Pepsi, L\'Oréal, Nestlé).',
    color: 'from-purple-600 to-indigo-700'
  },
  {
    id: 'Food & Beverages',
    name: 'Food & Drinks',
    icon: 'Utensils',
    description: 'Cold drinks, juices, biscuits, cooking oil, dairy, snacks, chocolates, tea & coffee.',
    color: 'from-amber-600 to-orange-700'
  },
  {
    id: 'Personal Care & Health',
    name: 'Personal Care',
    icon: 'HeartPulse',
    description: 'Soaps, shampoos, skincare, toothpaste, cosmetics & medicines.',
    color: 'from-rose-600 to-pink-700'
  },
  {
    id: 'Detergents',
    name: 'Cleaning & Detergents',
    icon: 'Sparkles',
    description: 'Washing powders, dishwashing, surface cleaners & fresheners.',
    color: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'Baby Products',
    name: 'Baby Products',
    icon: 'Baby',
    description: 'Diapers, baby formula, wipes & infant soaps.',
    color: 'from-violet-600 to-purple-700'
  },
  {
    id: 'Fashion & Apparel',
    name: 'Fashion & Clothing',
    icon: 'Shirt',
    description: 'Apparel brands, sportswear, footwear & luxury fashion.',
    color: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'Electronics & Technology',
    name: 'Tech & Hardware',
    icon: 'Laptop',
    description: 'Computers, printers, industrial tech & online platforms.',
    color: 'from-slate-700 to-slate-900'
  },
  {
    id: 'Hypermarket / Online store',
    name: 'Supermarkets',
    icon: 'ShoppingCart',
    description: 'International retail chains & hypermarkets.',
    color: 'from-green-600 to-emerald-800'
  },
  {
    id: 'Pesticides',
    name: 'Pest Control',
    icon: 'ShieldAlert',
    description: 'Insect repellents, sprays & mosquito killers.',
    color: 'from-yellow-600 to-amber-800'
  }
];
