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
  
  if (isBound) {
    try {
      const pRes = await env.DB.prepare('SELECT COUNT(*) as c FROM products').first();
      productCount = pRes?.c || 0;
      const sRes = await env.DB.prepare('SELECT COUNT(*) as c FROM suggestions').first();
      suggestionCount = sRes?.c || 0;
    } catch {
      // Tables might not exist yet
    }
  }

  return new Response(JSON.stringify({
    d1Configured: isBound,
    productCount,
    suggestionCount
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
