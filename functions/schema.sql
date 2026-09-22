-- Boycott Israel Online Database Schema (Cloudflare D1 / SQLite)

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
