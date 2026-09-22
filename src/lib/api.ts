import { ProductItem, UserSuggestion } from '../types';

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = sessionStorage.getItem('admin_token');
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(err.error || `HTTP error ${response.status}`);
  }

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
  db: {
    status: () => fetchWithAuth('/api/setup', { method: 'GET' }),
    init: () => fetchWithAuth('/api/setup', { method: 'POST' })
  },
  products: {
    list: (params?: { q?: string; category?: string; limit?: number }) => {
      const sp = new URLSearchParams();
      if (params?.q) sp.set('q', params.q);
      if (params?.category) sp.set('category', params.category);
      if (params?.limit) sp.set('limit', String(params.limit));
      const qs = sp.toString();
      return fetchWithAuth(`/api/products${qs ? `?${qs}` : ''}`);
    },
    create: (product: Partial<ProductItem>) => fetchWithAuth('/api/products', {
      method: 'POST',
      body: JSON.stringify(product)
    }),
    update: (id: string, product: Partial<ProductItem>) => fetchWithAuth(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product)
    }),
    delete: (id: string) => fetchWithAuth(`/api/products/${id}`, {
      method: 'DELETE'
    }),
    seed: (products: ProductItem[]) => fetchWithAuth('/api/products/seed', {
      method: 'POST',
      body: JSON.stringify({ products })
    })
  },
  suggestions: {
    list: () => fetchWithAuth('/api/suggestions'),
    submit: (suggestion: Partial<UserSuggestion>) => fetchWithAuth('/api/suggestions', {
      method: 'POST',
      body: JSON.stringify(suggestion)
    }),
    approve: (id: string) => fetchWithAuth(`/api/suggestions/${id}`, {
      method: 'POST'
    }),
    delete: (id: string) => fetchWithAuth(`/api/suggestions/${id}`, {
      method: 'DELETE'
    })
  }
};
