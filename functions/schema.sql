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

-- Community Posts & Stories
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

-- Post Comments
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

-- App Notifications
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
