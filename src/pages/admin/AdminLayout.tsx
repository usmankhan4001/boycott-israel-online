import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useAdmin } from '../../hooks/useAdmin';
import { ShieldAlert, LayoutDashboard, Layers, Inbox, Settings, LogOut, ArrowLeft, Menu, X } from 'lucide-react';

export function AdminLayout() {
  const { isLoading } = useAdmin();
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center text-zinc-500 font-sans" dir="ltr" lang="en">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold">Loading Admin Portal...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/products', icon: Layers, label: 'Products' },
    { to: '/admin/suggestions', icon: Inbox, label: 'Suggestions' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col md:flex-row font-sans text-zinc-900 dark:text-zinc-100 max-w-full overflow-x-hidden" dir="ltr" lang="en">
      {/* Mobile Top App Bar */}
      <div className="md:hidden sticky top-0 z-40 bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 text-red-500 min-w-0">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <h1 className="font-black text-sm text-white truncate">Admin Panel</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-[11px] font-bold text-zinc-400 hover:text-white bg-zinc-800 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Site</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800 p-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    isActive ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-zinc-800">
            <button
              onClick={() => { logout(); navigate('/admin/login'); }}
              className="flex items-center gap-3 px-3.5 py-2.5 w-full rounded-xl text-sm font-bold text-rose-400 hover:bg-zinc-800 transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:shrink-0 bg-zinc-900 text-zinc-100 flex-col md:min-h-screen md:sticky md:top-0 md:h-screen">
        <div className="p-5 border-b border-zinc-800">
          <div className="flex items-center gap-2 mb-3 text-red-500">
            <ShieldAlert className="w-6 h-6 shrink-0" />
            <h1 className="font-black text-lg text-white tracking-tight">Admin Panel</h1>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            Back to Public Site
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  isActive ? 'bg-red-600 text-white shadow-xs' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <button 
            onClick={() => { logout(); navigate('/admin/login'); }}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-bold text-zinc-400 hover:bg-zinc-800 hover:text-rose-400 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 max-w-full overflow-x-hidden p-3.5 sm:p-5 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
