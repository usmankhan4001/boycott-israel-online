import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { ShieldAlert, AlertCircle } from 'lucide-react';

export function LoginPage() {
  const [password, setPassword] = useState('');
  const { login, error, isLoading, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLang = localStorage.getItem('app_language') || 'en';
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    document.documentElement.classList.remove('font-urdu');

    return () => {
      document.documentElement.lang = savedLang;
      document.documentElement.dir = savedLang === 'ur' ? 'rtl' : 'ltr';
      if (savedLang === 'ur') {
        document.documentElement.classList.add('font-urdu');
      }
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(password);
    if (success) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 font-sans max-w-full overflow-x-hidden" dir="ltr" lang="en">
      <div className="max-w-md w-full p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl space-y-5 sm:space-y-6 text-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-red-500/20">
          <ShieldAlert className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100">
            Boycott Israel Online - Admin Access
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Enter your admin password to continue
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="break-words">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300">
              Admin Password
            </label>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-black shadow-lg shadow-red-600/20 transition-all text-sm"
          >
            {isLoading ? 'Authenticating...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
