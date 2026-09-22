export async function onRequestGet(context: any) {
  const { params, env } = context;
  const id = params.id;

  if (!env.DB) {
    return new Response(JSON.stringify({ error: 'DB binding not active' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const row = await env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(id).first();
    if (!row) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const product = {
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
    };

    return new Response(JSON.stringify(product), {
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

export async function onRequestPut(context: any) {
  const { params, request, env } = context;
  const id = params.id;

  if (!env.DB) {
    return new Response(JSON.stringify({ error: 'DB binding not active' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const p = await request.json();

    await env.DB.prepare(`
      UPDATE products SET
        name = ?, category = ?, subcategory = ?, parent_company = ?,
        boycott_reason = ?, severity = ?, israel_barcode = ?,
        alternatives_json = ?, tags_json = ?, domain = ?, logo = ?,
        behavior_notes = ?, behavior_timeline_json = ?, endorsed_brands_json = ?,
        category_type = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(
      p.name,
      p.category,
      p.subcategory || '',
      p.parentCompany || '',
      p.boycottReason,
      p.severity || 'High',
      p.israelBarcode || null,
      JSON.stringify(p.alternatives || []),
      JSON.stringify(p.tags || []),
      p.domain || null,
      p.logo || null,
      p.behaviorNotes || null,
      JSON.stringify(p.behaviorTimeline || []),
      JSON.stringify(p.endorsedBrands || []),
      p.categoryType || 'brand',
      id
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
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

export async function onRequestDelete(context: any) {
  const { params, env } = context;
  const id = params.id;

  if (!env.DB) {
    return new Response(JSON.stringify({ error: 'DB binding not active' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    await env.DB.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
    return new Response(JSON.stringify({ success: true, id }), {
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
