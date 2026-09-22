function base64urlEncode(source: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(source);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export async function onRequestPost(context: any) {
  const { request, env } = context;
  
  try {
    const body = await request.json();
    const { password } = body;
    
    if (!env.ADMIN_PASSWORD) {
      console.warn('ADMIN_PASSWORD not set in environment, falling back to dummy check');
    }
    const validPassword = env.ADMIN_PASSWORD || 'admin';
    
    if (password !== validPassword) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const secret = env.JWT_SECRET || 'default-dev-secret';
    const enc = new TextEncoder();
    
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = { 
      admin: true, 
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) 
    };
    
    const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signatureBuffer = await crypto.subtle.sign(
      'HMAC',
      key,
      enc.encode(`${encodedHeader}.${encodedPayload}`)
    );
    
    const signature = base64urlEncode(signatureBuffer);
    const token = `${encodedHeader}.${encodedPayload}.${signature}`;
    
    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Bad request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
