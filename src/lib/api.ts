const BASE_URL = '';

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = sessionStorage.getItem('admin_token');
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers
  });

  return response.json();
};

export const api = {
  auth: {
    login: (password: string) => fetchWithAuth('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password })
    }),
    verify: () => fetchWithAuth('/api/auth/verify', { method: 'GET' })
  },
  products: {
    list: () => fetchWithAuth('/api/products'),
    create: (product: any) => fetchWithAuth('/api/products', {
      method: 'POST',
      body: JSON.stringify(product)
    }),
    update: (product: any) => fetchWithAuth('/api/products', {
      method: 'PUT',
      body: JSON.stringify(product)
    }),
    delete: (id: string) => fetchWithAuth(`/api/products?id=${id}`, {
      method: 'DELETE'
    })
  },
  suggestions: {
    list: () => fetchWithAuth('/api/suggestions'),
    submit: (suggestion: any) => fetchWithAuth('/api/suggestions', {
      method: 'POST',
      body: JSON.stringify(suggestion)
    }),
    delete: (id: string) => fetchWithAuth(`/api/suggestions/${id}`, {
      method: 'DELETE'
    })
  }
};
