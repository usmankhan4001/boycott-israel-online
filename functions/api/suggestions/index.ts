export async function onRequestGet(context: any) {
  const { env } = context;

  if (!env.DB) {
    return new Response(JSON.stringify({ suggestions: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { results } = await env.DB.prepare('SELECT * FROM suggestions ORDER BY created_at DESC').all();
    
    const formatted = (results || []).map((row: any) => ({
      id: row.id,
      type: row.type || 'boycott',
      brandName: row.brand_name,
      parentCompany: row.parent_company || '',
      category: row.category || 'Food & Beverages',
      subcategory: row.subcategory || '',
      alternativeName: row.alternative_name || '',
      alternativeCountry: row.alternative_country || 'Pakistan',
      reasonOrProof: row.reason_or_proof || '',
      status: row.status || 'pending',
      createdAt: row.created_at
    }));

    return new Response(JSON.stringify({ suggestions: formatted }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message, suggestions: [] }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const id = `sugg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    if (!env.DB) {
      return new Response(JSON.stringify({ 
        success: true, 
        id, 
        message: 'Suggestion recorded (local mode)' 
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await env.DB.prepare(`
      INSERT INTO suggestions (
        id, type, brand_name, parent_company, category, subcategory,
        alternative_name, alternative_country, reason_or_proof, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', datetime('now'))
    `).bind(
      id,
      body.type || 'boycott',
      body.brandName || '',
      body.parentCompany || '',
      body.category || 'General',
      body.subcategory || '',
      body.alternativeName || '',
      body.alternativeCountry || 'Pakistan',
      body.reasonOrProof || ''
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
