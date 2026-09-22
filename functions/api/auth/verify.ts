export async function onRequestGet() {
  // If we reach this point, the middleware has already validated the JWT token
  return new Response(JSON.stringify({ valid: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
