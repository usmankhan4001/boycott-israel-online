export async function onRequestGet(context: any) {
  const { request, env } = context;
  const url = new URL(request.url);
  const q = url.searchParams.get('q')?.toLowerCase()?.trim() || '';
  const category = url.searchParams.get('category') || '';
  const tag = url.searchParams.get('tag')?.toLowerCase()?.trim() || '';
  const sort = url.searchParams.get('sort') || 'latest';
  const status = url.searchParams.get('status') || 'published';
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const offset = parseInt(url.searchParams.get('offset') || '0');

  if (!env.DB) {
    return new Response(JSON.stringify({
      source: 'fallback',
      posts: [],
      message: 'DB binding not active'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    let query = 'SELECT * FROM community_posts WHERE 1=1';
    const params: any[] = [];

    if (status && status !== 'all') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (q) {
      query += ' AND (LOWER(title) LIKE ? OR LOWER(content) LIKE ? OR LOWER(tags_json) LIKE ?)';
      const searchParam = `%${q}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    if (tag) {
      query += ' AND LOWER(tags_json) LIKE ?';
      params.push(`%${tag}%`);
    }

    if (sort === 'popular') {
      query += ' ORDER BY pinned DESC, upvotes DESC, created_at DESC LIMIT ? OFFSET ?';
    } else {
      query += ' ORDER BY pinned DESC, created_at DESC LIMIT ? OFFSET ?';
    }
    params.push(limit, offset);

    const stmt = env.DB.prepare(query);
    const { results } = await stmt.bind(...params).all();

    const formattedPosts = (results || []).map((row: any) => ({
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
    }));

    return new Response(JSON.stringify({
      source: 'd1',
      total: formattedPosts.length,
      posts: formattedPosts
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30, s-maxage=60'
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      error: error.message || 'Failed to fetch community posts',
      posts: []
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

    if (!body.title || !body.content || !body.authorName) {
      return new Response(JSON.stringify({ error: 'Title, content, and authorName are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const id = body.id || `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const wordCount = body.content.split(/\s+/).length;
    const readTime = body.readTime || `${Math.max(1, Math.ceil(wordCount / 180))} min read`;

    const newPost = {
      id,
      title: body.title.trim(),
      content: body.content.trim(),
      authorName: body.authorName.trim(),
      authorLocation: (body.authorLocation || '').trim(),
      category: body.category || 'Story',
      tags: Array.isArray(body.tags) ? body.tags : [],
      upvotes: Number(body.upvotes || 0),
      commentsCount: 0,
      status: body.status || 'published',
      pinned: body.pinned ? 1 : 0,
      readTime,
      createdAt: new Date().toISOString()
    };

    if (!env.DB) {
      return new Response(JSON.stringify({
        success: true,
        post: { ...newPost, pinned: Boolean(newPost.pinned) },
        message: 'Post recorded (local/fallback mode)'
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await env.DB.prepare(`
      INSERT INTO community_posts (
        id, title, content, author_name, author_location, category,
        tags_json, upvotes, comments_count, status, pinned, read_time,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `).bind(
      newPost.id,
      newPost.title,
      newPost.content,
      newPost.authorName,
      newPost.authorLocation,
      newPost.category,
      JSON.stringify(newPost.tags),
      newPost.upvotes,
      0,
      newPost.status,
      newPost.pinned,
      newPost.readTime
    ).run();

    return new Response(JSON.stringify({
      success: true,
      post: { ...newPost, pinned: Boolean(newPost.pinned) }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Failed to create community post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
