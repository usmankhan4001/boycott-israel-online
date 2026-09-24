import {
  ProductItem,
  UserSuggestion,
  CommunityPost,
  PostComment,
  AppNotification,
  GeopoliticalZone,
  RawResource,
  ParentConglomerate,
  ComplicityEdge,
  RetailBrand,
  AlternativeProfile,
  MarketGap,
  ToxicAdditive,
  UserImpactRecord
} from '../types';

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
  },
  community: {
    posts: {
      list: (params?: { category?: string; tag?: string; q?: string; sort?: 'latest' | 'popular'; limit?: number; offset?: number }) => {
        const sp = new URLSearchParams();
        if (params?.category) sp.set('category', params.category);
        if (params?.tag) sp.set('tag', params.tag);
        if (params?.q) sp.set('q', params.q);
        if (params?.sort) sp.set('sort', params.sort);
        if (params?.limit) sp.set('limit', String(params.limit));
        if (params?.offset) sp.set('offset', String(params.offset));
        const qs = sp.toString();
        return fetchWithAuth(`/api/community/posts${qs ? `?${qs}` : ''}`);
      },
      get: (id: string): Promise<CommunityPost> => fetchWithAuth(`/api/community/posts/${id}`),
      create: (post: Partial<CommunityPost>) => fetchWithAuth('/api/community/posts', {
        method: 'POST',
        body: JSON.stringify(post)
      }),
      upvote: (id: string) => fetchWithAuth(`/api/community/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ action: 'upvote' })
      }),
      delete: (id: string) => fetchWithAuth(`/api/community/posts/${id}`, {
        method: 'DELETE'
      })
    },
    comments: {
      list: (postId: string): Promise<{ comments: PostComment[] }> => {
        return fetchWithAuth(`/api/community/comments?postId=${encodeURIComponent(postId)}`);
      },
      create: (comment: { postId: string; authorName: string; authorLocation?: string; content: string }) => fetchWithAuth('/api/community/comments', {
        method: 'POST',
        body: JSON.stringify(comment)
      })
    }
  },
  notifications: {
    list: (params?: { limit?: number }): Promise<{ notifications: AppNotification[] }> => {
      const sp = new URLSearchParams();
      if (params?.limit) sp.set('limit', String(params.limit));
      const qs = sp.toString();
      return fetchWithAuth(`/api/notifications${qs ? `?${qs}` : ''}`);
    },
    create: (notification: Partial<AppNotification>) => fetchWithAuth('/api/notifications', {
      method: 'POST',
      body: JSON.stringify(notification)
    }),
    markRead: (id: string) => fetchWithAuth('/api/notifications', {
      method: 'PUT',
      body: JSON.stringify({ id })
    }),
    markAllRead: () => fetchWithAuth('/api/notifications', {
      method: 'PUT',
      body: JSON.stringify({ markAllRead: true })
    })
  },
  // ==========================================
  // TAKWEYAT GEOPOLITICAL & COMPLICITY API CLIENTS
  // ==========================================
  zones: {
    list: (): Promise<{ zones: GeopoliticalZone[] }> => fetchWithAuth('/api/zones'),
    get: (id: string): Promise<{ zone: GeopoliticalZone }> => fetchWithAuth(`/api/zones/${id}`)
  },
  resources: {
    list: (): Promise<{ resources: RawResource[] }> => fetchWithAuth('/api/resources'),
    get: (id: string): Promise<{ resource: RawResource }> => fetchWithAuth(`/api/resources/${id}`)
  },
  conglomerates: {
    list: (): Promise<{ conglomerates: ParentConglomerate[] }> => fetchWithAuth('/api/conglomerates'),
    get: (id: string): Promise<{ conglomerate: ParentConglomerate }> => fetchWithAuth(`/api/conglomerates/${id}`)
  },
  complicityEdges: {
    list: (params?: { zoneId?: string; conglomerateId?: string; resourceId?: string }): Promise<{ edges: ComplicityEdge[] }> => {
      const sp = new URLSearchParams();
      if (params?.zoneId) sp.set('zoneId', params.zoneId);
      if (params?.conglomerateId) sp.set('conglomerateId', params.conglomerateId);
      if (params?.resourceId) sp.set('resourceId', params.resourceId);
      const qs = sp.toString();
      return fetchWithAuth(`/api/complicity-edges${qs ? `?${qs}` : ''}`);
    },
    get: (id: string): Promise<{ edge: ComplicityEdge }> => fetchWithAuth(`/api/complicity-edges/${id}`)
  },
  retailBrands: {
    list: (params?: { brandType?: 'boycotted' | 'alternative'; category?: string }): Promise<{ brands: RetailBrand[] }> => {
      const sp = new URLSearchParams();
      if (params?.brandType) sp.set('brandType', params.brandType);
      if (params?.category) sp.set('category', params.category);
      const qs = sp.toString();
      return fetchWithAuth(`/api/retail-brands${qs ? `?${qs}` : ''}`);
    },
    get: (id: string): Promise<{ brand: RetailBrand }> => fetchWithAuth(`/api/retail-brands/${id}`)
  },
  alternativeProfiles: {
    list: (): Promise<{ profiles: AlternativeProfile[] }> => fetchWithAuth('/api/alternative-profiles'),
    get: (brandId: string): Promise<{ profile: AlternativeProfile }> => fetchWithAuth(`/api/alternative-profiles/${brandId}`)
  },
  marketGaps: {
    list: (params?: { category?: string; urgency?: string }): Promise<{ gaps: MarketGap[] }> => {
      const sp = new URLSearchParams();
      if (params?.category) sp.set('category', params.category);
      if (params?.urgency) sp.set('urgency', params.urgency);
      const qs = sp.toString();
      return fetchWithAuth(`/api/market-gaps${qs ? `?${qs}` : ''}`);
    },
    get: (id: string): Promise<{ gap: MarketGap }> => fetchWithAuth(`/api/market-gaps/${id}`),
    create: (gap: Partial<MarketGap>) => fetchWithAuth('/api/market-gaps', {
      method: 'POST',
      body: JSON.stringify(gap)
    }),
    upvote: (id: string) => fetchWithAuth(`/api/market-gaps/${id}/vote`, {
      method: 'POST'
    }),
    pledge: (id: string, amountPkr: number) => fetchWithAuth(`/api/market-gaps/${id}/pledge`, {
      method: 'POST',
      body: JSON.stringify({ amountPkr })
    })
  },
  toxicAdditives: {
    list: (): Promise<{ additives: ToxicAdditive[] }> => fetchWithAuth('/api/toxic-additives'),
    get: (code: string): Promise<{ additive: ToxicAdditive }> => fetchWithAuth(`/api/toxic-additives/${encodeURIComponent(code)}`)
  },
  impactLedger: {
    list: (): Promise<{ records: UserImpactRecord[] }> => fetchWithAuth('/api/impact-ledger'),
    record: (record: Partial<UserImpactRecord>) => fetchWithAuth('/api/impact-ledger', {
      method: 'POST',
      body: JSON.stringify(record)
    })
  }
};
