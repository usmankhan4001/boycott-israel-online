import json

with open('products_database_with_logos.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

print(f"Original count: {len(products)}")

# Filter out celebrities, actors, influencers, and noisy entries
cleaned_products = []
for p in products:
    cat = p.get('category', '')
    subcat = p.get('subcategory', '')
    name = p.get('name', '')
    
    # Exclude celebrity/influencer category
    if 'Entertainment' in cat or 'Actor' in subcat or 'Influencer' in subcat or 'BlockOut' in name:
        continue
    
    # Exclude empty or noisy names
    if len(name.strip()) <= 1 or name.lower() in ['why?', 'why', 'none', 'n/a']:
        continue
        
    cleaned_products.append(p)

print(f"Cleaned count (products only): {len(cleaned_products)}")

with open('products_clean_consumer_only.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned_products, f, indent=2, ensure_ascii=False)

ts_content = f"""// Verified Boycott Consumer Products Database
// Cleaned: FMCG, Groceries, Beverages, Personal Care, Baby Products, Cleaning, Tech & Fast Food

export interface AlternativeItem {{
  name: string;
  country: string;
  verified: boolean;
  domain?: string;
  logo?: string;
}}

export interface ProductItem {{
  id: string;
  name: string;
  category: string;
  subcategory: string;
  parentCompany: string;
  boycottReason: string;
  severity: 'Critical' | 'High' | 'Caution';
  israelBarcode?: string | null;
  alternatives: AlternativeItem[];
  tags: string[];
  domain?: string;
  logo?: string;
  isCustom?: boolean;
}}

export const INITIAL_PRODUCTS: ProductItem[] = {json.dumps(cleaned_products, indent=2, ensure_ascii=False)};
"""

with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Updated src/data/products.ts with pure consumer products only!")
