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
    const row = await env.DB.prepare('SELECT * FROM community_posts WHERE id = ?').bind(id).first();
    if (!row) {
      return new Response(JSON.stringify({ error: 'Community post not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const post = {
      id: row.id,
      title: row.title,
      content: row.content,
      authorName: row.author_name,
      authorLocation: row.author_location || undefined,
      category: row.category,
      tags: row.tags_json ? JSON.parse(row.tags_json) : [],
      upvotes: Number(row.upvotes || 0),
      commentsCount: Number(row.comments_count || 0),
      status: row.status || 'published',
      pinned: Boolean(row.pinned),
      readTime: row.read_time || '2 min read',
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };

    return new Response(JSON.stringify(post), {
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
    const body = await request.json().catch(() => ({}));

    // If upvote action specifically
    if (body.action === 'upvote') {
      await env.DB.prepare(`
        UPDATE community_posts
        SET upvotes = upvotes + 1, updated_at = datetime('now')
        WHERE id = ?
      `).bind(id).run();

      const updated = await env.DB.prepare('SELECT upvotes FROM community_posts WHERE id = ?').bind(id).first();

      return new Response(JSON.stringify({
        success: true,
        id,
        upvotes: updated?.upvotes || 0
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // General update
    await env.DB.prepare(`
      UPDATE community_posts SET
        title = COALESCE(?, title),
        content = COALESCE(?, content),
        category = COALESCE(?, category),
        tags_json = COALESCE(?, tags_json),
        status = COALESCE(?, status),
        pinned = COALESCE(?, pinned),
        updated_at = datetime('now')
      WHERE id = ?
    `).bind(
      body.title || null,
      body.content || null,
      body.category || null,
      body.tags ? JSON.stringify(body.tags) : null,
      body.status || null,
      body.pinned !== undefined ? (body.pinned ? 1 : 0) : null,
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
    // Delete comments first for referential safety
    await env.DB.prepare('DELETE FROM post_comments WHERE post_id = ?').bind(id).run();
    // Delete the post
    await env.DB.prepare('DELETE FROM community_posts WHERE id = ?').bind(id).run();

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
