export async function onRequestGet(context: any) {
  const { request, env } = context;
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit') || '50');

  if (!env.DB) {
    return new Response(JSON.stringify({
      source: 'fallback',
      notifications: [],
      message: 'DB binding not active'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { results } = await env.DB.prepare(`
      SELECT * FROM app_notifications
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(limit).all();

    const formatted = (results || []).map((row: any) => ({
      id: row.id,
      title: row.title,
      message: row.message,
      type: row.type,
      link: row.link || undefined,
      isRead: Boolean(row.is_read),
      createdAt: row.created_at
    }));

    return new Response(JSON.stringify({
      source: 'd1',
      total: formatted.length,
      notifications: formatted
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30, s-maxage=60'
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      error: error.message || 'Failed to fetch notifications',
      notifications: []
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

    if (!body.title || !body.message) {
      return new Response(JSON.stringify({ error: 'title and message are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const id = body.id || `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const notification = {
      id,
      title: body.title.trim(),
      message: body.message.trim(),
      type: body.type || 'system',
      link: body.link || null,
      isRead: body.isRead ? 1 : 0,
      createdAt: new Date().toISOString()
    };

    if (!env.DB) {
      return new Response(JSON.stringify({
        success: true,
        notification: { ...notification, isRead: Boolean(notification.isRead) },
        message: 'Notification recorded (local mode)'
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await env.DB.prepare(`
      INSERT INTO app_notifications (
        id, title, message, type, link, is_read, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      notification.id,
      notification.title,
      notification.message,
      notification.type,
      notification.link,
      notification.isRead
    ).run();

    return new Response(JSON.stringify({
      success: true,
      notification: { ...notification, isRead: Boolean(notification.isRead) }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Failed to create notification' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPut(context: any) {
  const { request, env } = context;

  if (!env.DB) {
    return new Response(JSON.stringify({ success: true, message: 'Updated locally' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json().catch(() => ({}));

    if (body.markAllRead) {
      await env.DB.prepare('UPDATE app_notifications SET is_read = 1').run();
      return new Response(JSON.stringify({ success: true, message: 'All notifications marked as read' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (body.id) {
      await env.DB.prepare('UPDATE app_notifications SET is_read = 1 WHERE id = ?').bind(body.id).run();
      return new Response(JSON.stringify({ success: true, id: body.id }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'No operation specified' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
