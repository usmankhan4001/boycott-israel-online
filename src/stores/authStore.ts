import { create } from 'zustand';
import { api } from '../lib/api';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  verifyToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: sessionStorage.getItem('admin_token'),
  isAuthenticated: !!sessionStorage.getItem('admin_token'),
  isLoading: false,
  error: null,

  login: async (password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.auth.login(password);
      if (response.token) {
        sessionStorage.setItem('admin_token', response.token);
        set({ token: response.token, isAuthenticated: true, isLoading: false });
        return true;
      }
      throw new Error(response.error || 'Login failed');
    } catch (err: any) {
      set({ error: err.message || 'Login failed', isLoading: false });
      return false;
    }
  },

  logout: () => {
    sessionStorage.removeItem('admin_token');
    set({ token: null, isAuthenticated: false });
  },

  verifyToken: async () => {
    const { token, logout } = get();
    if (!token) return false;
    
    set({ isLoading: true });
    try {
      const res = await api.auth.verify();
      if (res.valid) {
        set({ isAuthenticated: true, isLoading: false });
        return true;
      }
      throw new Error('Invalid token');
    } catch {
      logout();
      set({ isLoading: false });
      return false;
    }
  }
}));
