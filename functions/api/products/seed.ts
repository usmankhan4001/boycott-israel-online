export async function onRequestPost(context: any) {
  const { request, env } = context;

  if (!env.DB) {
    return new Response(JSON.stringify({ error: 'DB binding not active' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json();
    const items = Array.isArray(body) ? body : body.products;

    if (!items || !items.length) {
      return new Response(JSON.stringify({ error: 'No items provided for seeding' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let inserted = 0;
    const batchSize = 25; // D1 batch limit per query execution

    for (let i = 0; i < items.length; i += batchSize) {
      const chunk = items.slice(i, i + batchSize);
      const statements = chunk.map((p: any) => {
        const id = p.id || `bio-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        return env.DB.prepare(`
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
          p.boycottReason || 'Boycott verified target.',
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
        );
      });

      await env.DB.batch(statements);
      inserted += chunk.length;
    }

    return new Response(JSON.stringify({ 
      success: true, 
      count: inserted, 
      message: `Successfully seeded ${inserted} products into D1 database!` 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
