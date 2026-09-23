export async function onRequestPost(context: any) {
  const { env } = context;

  if (!env.DB) {
    return new Response(JSON.stringify({ 
      error: 'D1 Database binding "DB" is not configured yet in Cloudflare Pages Settings.' 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // 1. Create products table
    await env.DB.prepare(`
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
      )
    `).run();

    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)`).run();
    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_products_name ON products(name)`).run();
    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_products_parent ON products(parent_company)`).run();

    // 2. Create suggestions table
    await env.DB.prepare(`
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
      )
    `).run();

    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_suggestions_status ON suggestions(status)`).run();

    // 3. Create community_posts table
    await env.DB.prepare(`
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
      )
    `).run();

    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_community_posts_category ON community_posts(category)`).run();
    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_community_posts_status ON community_posts(status)`).run();
    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_community_posts_pinned ON community_posts(pinned)`).run();
    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_community_posts_created_at ON community_posts(created_at)`).run();

    // 4. Create post_comments table
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS post_comments (
        id TEXT PRIMARY KEY,
        post_id TEXT NOT NULL,
        author_name TEXT NOT NULL,
        author_location TEXT DEFAULT '',
        content TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE
      )
    `).run();

    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_post_comments_post_id ON post_comments(post_id)`).run();
    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_post_comments_created_at ON post_comments(created_at)`).run();

    // 5. Create app_notifications table
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS app_notifications (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT NOT NULL,
        link TEXT,
        is_read INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `).run();

    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_app_notifications_is_read ON app_notifications(is_read)`).run();
    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_app_notifications_created_at ON app_notifications(created_at)`).run();

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Cloudflare D1 tables initialized successfully!' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to initialize database' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestGet(context: any) {
  const { env } = context;
  const isBound = !!env.DB;
  
  let productCount = 0;
  let suggestionCount = 0;
  let postCount = 0;
  let commentCount = 0;
  let notificationCount = 0;
  
  if (isBound) {
    try {
      const pRes = await env.DB.prepare('SELECT COUNT(*) as c FROM products').first();
      productCount = pRes?.c || 0;
    } catch {}

    try {
      const sRes = await env.DB.prepare('SELECT COUNT(*) as c FROM suggestions').first();
      suggestionCount = sRes?.c || 0;
    } catch {}

    try {
      const cpRes = await env.DB.prepare('SELECT COUNT(*) as c FROM community_posts').first();
      postCount = cpRes?.c || 0;
    } catch {}

    try {
      const cmRes = await env.DB.prepare('SELECT COUNT(*) as c FROM post_comments').first();
      commentCount = cmRes?.c || 0;
    } catch {}

    try {
      const nRes = await env.DB.prepare('SELECT COUNT(*) as c FROM app_notifications').first();
      notificationCount = nRes?.c || 0;
    } catch {}
  }

  return new Response(JSON.stringify({
    d1Configured: isBound,
    productCount,
    suggestionCount,
    postCount,
    commentCount,
    notificationCount
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
