export interface Env {
  ADMIN_PASSWORD?: string;
  JWT_SECRET?: string;
}

function base64urlEncode(source: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(source);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export async function onRequest(context: any) {
  const { request, env, next } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(request.url);
  const path = url.pathname;
  
  // Public routes
  const isPublicRoute = 
    (path === '/api/auth/login' && request.method === 'POST') ||
    (path === '/api/products' && request.method === 'GET') ||
    (path === '/api/suggestions' && request.method === 'POST');
    
  if (isPublicRoute) {
    const response = await next();
    const newResponse = new Response(response.body, response);
    Object.entries(corsHeaders).forEach(([k, v]) => newResponse.headers.set(k, v));
    return newResponse;
  }
  
  // Auth validation
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
  
  const token = authHeader.split(' ')[1];
  const secret = env.JWT_SECRET || 'default-dev-secret';
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid token format');
    
    const [encodedHeader, encodedPayload, signature] = parts;
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const expectedSignatureBuffer = await crypto.subtle.sign(
      'HMAC',
      key,
      enc.encode(`${encodedHeader}.${encodedPayload}`)
    );
    
    const expectedSignature = base64urlEncode(expectedSignatureBuffer);
    
    if (signature !== expectedSignature) {
      throw new Error('Invalid signature');
    }
    
    const payloadStr = atob(encodedPayload.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadStr);
    
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired');
    }
    
    context.data = context.data || {};
    context.data.user = payload;
    
    const response = await next();
    const newResponse = new Response(response.body, response);
    Object.entries(corsHeaders).forEach(([k, v]) => newResponse.headers.set(k, v));
    return newResponse;
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}
