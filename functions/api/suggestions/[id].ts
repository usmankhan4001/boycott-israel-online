export async function onRequestPost(context: any) {
  // Approve suggestion endpoint
  const { params, env } = context;
  const id = params.id;

  if (!env.DB) {
    return new Response(JSON.stringify({ error: 'DB binding not active' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const sugg = await env.DB.prepare('SELECT * FROM suggestions WHERE id = ?').bind(id).first();
    if (!sugg) {
      return new Response(JSON.stringify({ error: 'Suggestion not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const productId = `bio-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const alternatives = sugg.alternative_name ? [{
      name: sugg.alternative_name,
      country: sugg.alternative_country || 'Pakistan',
      verified: true
    }] : [];

    // 1. Insert into products
    await env.DB.prepare(`
      INSERT INTO products (
        id, name, category, subcategory, parent_company, boycott_reason,
        severity, israel_barcode, alternatives_json, tags_json, domain, logo,
        is_custom, category_type, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, 'High', NULL, ?, ?, NULL, NULL, 1, 'brand', datetime('now'))
    `).bind(
      productId,
      sugg.brand_name,
      sugg.category || 'General',
      sugg.subcategory || '',
      sugg.parent_company || '',
      sugg.reason_or_proof || 'Community submitted and admin approved.',
      JSON.stringify(alternatives),
      JSON.stringify([sugg.category || 'General'])
    ).run();

    // 2. Delete from suggestions
    await env.DB.prepare('DELETE FROM suggestions WHERE id = ?').bind(id).run();

    return new Response(JSON.stringify({ 
      success: true, 
      productId, 
      message: 'Suggestion approved and published as product!' 
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
    await env.DB.prepare('DELETE FROM suggestions WHERE id = ?').bind(id).run();
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
