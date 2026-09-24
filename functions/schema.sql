-- Boycott Israel Online & Takweyat Master Database Schema (Cloudflare D1 / SQLite)

-- 1. Products (Legacy / Core Catalog)
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT DEFAULT '',
  parent_company TEXT DEFAULT '',
  boycott_reason TEXT NOT NULL,
  severity TEXT DEFAULT 'High',
  israel_barcode TEXT,
  alternatives_json TEXT DEFAULT '[]',
  tags_json TEXT DEFAULT '[]',
  domain TEXT,
  logo TEXT,
  is_custom INTEGER DEFAULT 0,
  behavior_notes TEXT,
  behavior_timeline_json TEXT DEFAULT '[]',
  endorsed_brands_json TEXT DEFAULT '[]',
  category_type TEXT DEFAULT 'brand',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_parent ON products(parent_company);

-- 2. Suggestions
CREATE TABLE IF NOT EXISTS suggestions (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  parent_company TEXT,
  category TEXT,
  subcategory TEXT,
  alternative_name TEXT,
  alternative_country TEXT,
  reason_or_proof TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_suggestions_status ON suggestions(status);

-- 3. Community Posts & Stories
CREATE TABLE IF NOT EXISTS community_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_location TEXT DEFAULT '',
  category TEXT NOT NULL,
  tags_json TEXT DEFAULT '[]',
  upvotes INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published',
  pinned INTEGER DEFAULT 0,
  read_time TEXT DEFAULT '2 min read',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_community_posts_category ON community_posts(category);
CREATE INDEX IF NOT EXISTS idx_community_posts_status ON community_posts(status);
CREATE INDEX IF NOT EXISTS idx_community_posts_pinned ON community_posts(pinned);
CREATE INDEX IF NOT EXISTS idx_community_posts_created_at ON community_posts(created_at);

-- 4. Post Comments
CREATE TABLE IF NOT EXISTS post_comments (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_location TEXT DEFAULT '',
  content TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_post_comments_post_id ON post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_post_comments_created_at ON post_comments(created_at);

-- 5. App Notifications
CREATE TABLE IF NOT EXISTS app_notifications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  link TEXT,
  is_read INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_app_notifications_is_read ON app_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_app_notifications_created_at ON app_notifications(created_at);

-- =========================================================================
-- TAKWEYAT GEOPOLITICAL & CORPORATE COMPLICITY TABLES
-- =========================================================================

-- 6. Geopolitical Zones
CREATE TABLE IF NOT EXISTS geopolitical_zones (
  id TEXT PRIMARY KEY,
  zone_name TEXT NOT NULL,
  historical_colonial_actor TEXT NOT NULL,
  root_cause_summary TEXT NOT NULL,
  current_status TEXT NOT NULL,
  key_extraction_resources_json TEXT DEFAULT '[]',
  flag_emoji TEXT DEFAULT '',
  affected_population TEXT DEFAULT '',
  crisis_summary TEXT DEFAULT '',
  un_resolutions_json TEXT DEFAULT '[]',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_geopolitical_zones_name ON geopolitical_zones(zone_name);

-- 7. Raw Resources
CREATE TABLE IF NOT EXISTS raw_resources (
  id TEXT PRIMARY KEY,
  resource_name TEXT NOT NULL,
  primary_extraction_zone_id TEXT NOT NULL,
  human_cost_metric TEXT NOT NULL,
  exploitation_ratio TEXT NOT NULL,
  is_conflict_mineral INTEGER DEFAULT 0,
  description TEXT NOT NULL,
  primary_applications_json TEXT DEFAULT '[]',
  environmental_cost_summary TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (primary_extraction_zone_id) REFERENCES geopolitical_zones(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_raw_resources_zone ON raw_resources(primary_extraction_zone_id);

-- 8. Parent Conglomerates
CREATE TABLE IF NOT EXISTS parent_conglomerates (
  id TEXT PRIMARY KEY,
  entity_name TEXT NOT NULL,
  headquarters_country TEXT NOT NULL,
  annual_revenue_usd REAL DEFAULT 0,
  lobbying_spend_usd REAL DEFAULT 0,
  is_defense_contractor INTEGER DEFAULT 0,
  top_shareholders_json TEXT DEFAULT '[]',
  subsidiaries_json TEXT DEFAULT '[]',
  market_cap_usd REAL DEFAULT 0,
  complicity_summary TEXT DEFAULT '',
  logo TEXT,
  website TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_parent_conglomerates_name ON parent_conglomerates(entity_name);
CREATE INDEX IF NOT EXISTS idx_parent_conglomerates_defense ON parent_conglomerates(is_defense_contractor);

-- 9. Complicity Edges (Graph Relations)
CREATE TABLE IF NOT EXISTS complicity_edges (
  id TEXT PRIMARY KEY,
  conglomerate_id TEXT NOT NULL,
  geopolitical_zone_id TEXT,
  resource_id TEXT,
  complicity_type TEXT NOT NULL,
  evidence_dossier TEXT NOT NULL,
  financial_value_usd REAL DEFAULT 0,
  evidence_urls_json TEXT DEFAULT '[]',
  severity TEXT DEFAULT 'Critical',
  verified_source TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (conglomerate_id) REFERENCES parent_conglomerates(id) ON DELETE CASCADE,
  FOREIGN KEY (geopolitical_zone_id) REFERENCES geopolitical_zones(id) ON DELETE SET NULL,
  FOREIGN KEY (resource_id) REFERENCES raw_resources(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_complicity_edges_conglomerate ON complicity_edges(conglomerate_id);
CREATE INDEX IF NOT EXISTS idx_complicity_edges_zone ON complicity_edges(geopolitical_zone_id);
CREATE INDEX IF NOT EXISTS idx_complicity_edges_resource ON complicity_edges(resource_id);

-- 10. Retail Brands
CREATE TABLE IF NOT EXISTS retail_brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  brand_type TEXT NOT NULL, -- 'boycotted' | 'alternative'
  parent_company_id TEXT,
  country_of_origin TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT DEFAULT '',
  boycott_reason TEXT DEFAULT '',
  severity_tier INTEGER DEFAULT 1,
  direct_substitutes_json TEXT DEFAULT '[]',
  logo TEXT,
  domain TEXT,
  toxic_additive_flags_json TEXT DEFAULT '[]',
  is_halal_certified INTEGER DEFAULT 0,
  is_tayyib_certified INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (parent_company_id) REFERENCES parent_conglomerates(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_retail_brands_type ON retail_brands(brand_type);
CREATE INDEX IF NOT EXISTS idx_retail_brands_category ON retail_brands(category);
CREATE INDEX IF NOT EXISTS idx_retail_brands_parent ON retail_brands(parent_company_id);

-- 11. Alternative Profiles
CREATE TABLE IF NOT EXISTS alternative_profiles (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL UNIQUE,
  ingredient_breakdown TEXT NOT NULL,
  is_halal_certified INTEGER DEFAULT 1,
  is_organic INTEGER DEFAULT 0,
  is_tayyib INTEGER DEFAULT 1,
  packaging_type TEXT DEFAULT 'Recyclable',
  editorial_badge TEXT DEFAULT 'fully_recommended', -- 'fully_recommended' | 'conditionally_recommended' | 'toxic_swap_warning'
  origin_country TEXT NOT NULL,
  direct_substitute_for_json TEXT DEFAULT '[]',
  toxic_warnings_json TEXT DEFAULT '[]',
  producer_name TEXT DEFAULT '',
  farm_to_table INTEGER DEFAULT 0,
  clean_score INTEGER DEFAULT 95,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (brand_id) REFERENCES retail_brands(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_alternative_profiles_brand ON alternative_profiles(brand_id);
CREATE INDEX IF NOT EXISTS idx_alternative_profiles_editorial ON alternative_profiles(editorial_badge);

-- 12. Market Gaps / Bounty Board
CREATE TABLE IF NOT EXISTS market_gaps (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  product_name TEXT NOT NULL,
  unmet_demand_count INTEGER DEFAULT 0,
  pledged_monthly_spend_pkr REAL DEFAULT 0,
  description TEXT NOT NULL,
  votes_count INTEGER DEFAULT 0,
  urgency TEXT DEFAULT 'High', -- 'High' | 'Medium' | 'Critical'
  suggested_makers_json TEXT DEFAULT '[]',
  target_price_pkr REAL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_market_gaps_category ON market_gaps(category);
CREATE INDEX IF NOT EXISTS idx_market_gaps_urgency ON market_gaps(urgency);

-- 13. Toxic Additives Chemical Dictionary
CREATE TABLE IF NOT EXISTS toxic_additives (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT DEFAULT 'Preservative',
  common_products_json TEXT DEFAULT '[]',
  health_risks_json TEXT DEFAULT '[]',
  tayyib_verdict TEXT NOT NULL,
  safer_alternatives_json TEXT DEFAULT '[]',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_toxic_additives_code ON toxic_additives(code);

-- 14. User Impact Ledger
CREATE TABLE IF NOT EXISTS user_impact_ledger (
  id TEXT PRIMARY KEY,
  user_identifier TEXT DEFAULT 'anonymous',
  date TEXT NOT NULL,
  boycotted_brand_id TEXT NOT NULL,
  boycotted_brand_name TEXT NOT NULL,
  alternative_brand_id TEXT NOT NULL,
  alternative_brand_name TEXT NOT NULL,
  amount_saved_pkr REAL NOT NULL,
  amount_diverted_usd REAL NOT NULL,
  multiplier_effect_pkr REAL NOT NULL,
  category TEXT NOT NULL,
  notes TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_user_impact_user ON user_impact_ledger(user_identifier);
CREATE INDEX IF NOT EXISTS idx_user_impact_date ON user_impact_ledger(date);
