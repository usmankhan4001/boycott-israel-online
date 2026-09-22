export async function onRequestGet(context: any) {
  const { request, env } = context;
  const url = new URL(request.url);
  const q = url.searchParams.get('q')?.toLowerCase()?.trim() || '';
  const category = url.searchParams.get('category') || '';
  const limit = parseInt(url.searchParams.get('limit') || '500');
  const offset = parseInt(url.searchParams.get('offset') || '0');

  if (!env.DB) {
    return new Response(JSON.stringify({
      source: 'fallback',
      products: [],
      message: 'DB binding not active'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    let query = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (q) {
      query += ' AND (LOWER(name) LIKE ? OR LOWER(parent_company) LIKE ? OR LOWER(boycott_reason) LIKE ?)';
      const searchParam = `%${q}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const stmt = env.DB.prepare(query);
    const { results } = await stmt.bind(...params).all();

    const formattedProducts = (results || []).map((row: any) => ({
      id: row.id,
      name: row.name,
      category: row.category,
      subcategory: row.subcategory || '',
      parentCompany: row.parent_company || '',
      boycottReason: row.boycott_reason,
      severity: row.severity || 'High',
      israelBarcode: row.israel_barcode || null,
      alternatives: row.alternatives_json ? JSON.parse(row.alternatives_json) : [],
      tags: row.tags_json ? JSON.parse(row.tags_json) : [],
      domain: row.domain || undefined,
      logo: row.logo || undefined,
      isCustom: Boolean(row.is_custom),
      behaviorNotes: row.behavior_notes || undefined,
      behaviorTimeline: row.behavior_timeline_json ? JSON.parse(row.behavior_timeline_json) : undefined,
      endorsedBrands: row.endorsed_brands_json ? JSON.parse(row.endorsed_brands_json) : undefined,
      categoryType: row.category_type || 'brand'
    }));

    return new Response(JSON.stringify({
      source: 'd1',
      total: formattedProducts.length,
      products: formattedProducts
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60, s-maxage=300'
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to fetch products',
      products: [] 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost(context: any) {
  const { request, env } = context;

  if (!env.DB) {
    return new Response(JSON.stringify({ error: 'DB binding not active' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const p = await request.json();
    const id = p.id || `bio-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    await env.DB.prepare(`
      INSERT OR REPLACE INTO products (
        id, name, category, subcategory, parent_company, boycott_reason,
        severity, israel_barcode, alternatives_json, tags_json, domain, logo,
        is_custom, behavior_notes, behavior_timeline_json, endorsed_brands_json,
        category_type, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      id,
      p.name,
      p.category || 'Food & Beverages',
      p.subcategory || '',
      p.parentCompany || '',
      p.boycottReason || 'Supports Israeli entities or settlement commerce.',
      p.severity || 'High',
      p.israelBarcode || null,
      JSON.stringify(p.alternatives || []),
      JSON.stringify(p.tags || []),
      p.domain || null,
      p.logo || null,
      p.isCustom ? 1 : 0,
      p.behaviorNotes || null,
      JSON.stringify(p.behaviorTimeline || []),
      JSON.stringify(p.endorsedBrands || []),
      p.categoryType || 'brand'
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Failed to save product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
