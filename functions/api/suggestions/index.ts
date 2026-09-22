export async function onRequestGet() {
  return new Response(JSON.stringify([]), { headers: { 'Content-Type': 'application/json' } });
}

export async function onRequestPost(context: any) {
  const data = await context.request.json();
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}

export async function onRequestDelete(context: any) {
  // Usually this would be /suggestions/:id, but for simplicity
  return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
}
