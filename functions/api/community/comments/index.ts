export async function onRequestGet(context: any) {
  const { request, env } = context;
  const url = new URL(request.url);
  const postId = url.searchParams.get('postId') || '';
  const limit = parseInt(url.searchParams.get('limit') || '100');

  if (!env.DB) {
    return new Response(JSON.stringify({
      source: 'fallback',
      comments: [],
      message: 'DB binding not active'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    let query = 'SELECT * FROM post_comments';
    const params: any[] = [];

    if (postId) {
      query += ' WHERE post_id = ?';
      params.push(postId);
    }

    query += ' ORDER BY created_at ASC LIMIT ?';
    params.push(limit);

    const stmt = env.DB.prepare(query);
    const { results } = await stmt.bind(...params).all();

    const formatted = (results || []).map((row: any) => ({
      id: row.id,
      postId: row.post_id,
      authorName: row.author_name,
      authorLocation: row.author_location || undefined,
      content: row.content,
      createdAt: row.created_at
    }));

    return new Response(JSON.stringify({
      source: 'd1',
      total: formatted.length,
      comments: formatted
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=15, s-maxage=30'
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      error: error.message || 'Failed to fetch comments',
      comments: []
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const body = await request.json();

    if (!body.postId || !body.authorName || !body.content) {
      return new Response(JSON.stringify({
        error: 'postId, authorName, and content are required.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const id = body.id || `comment-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const comment = {
      id,
      postId: body.postId,
      authorName: body.authorName.trim(),
      authorLocation: (body.authorLocation || '').trim(),
      content: body.content.trim(),
      createdAt: new Date().toISOString()
    };

    if (!env.DB) {
      return new Response(JSON.stringify({
        success: true,
        comment,
        message: 'Comment recorded (local/fallback mode)'
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await env.DB.prepare(`
      INSERT INTO post_comments (
        id, post_id, author_name, author_location, content, created_at
      ) VALUES (?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      comment.id,
      comment.postId,
      comment.authorName,
      comment.authorLocation,
      comment.content
    ).run();

    // Increment comments count on the post
    try {
      await env.DB.prepare(`
        UPDATE community_posts
        SET comments_count = comments_count + 1, updated_at = datetime('now')
        WHERE id = ?
      `).bind(comment.postId).run();
    } catch {}

    return new Response(JSON.stringify({
      success: true,
      comment
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      error: error.message || 'Failed to submit comment'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
