import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useAdmin } from '../../hooks/useAdmin';
import { ShieldAlert, LayoutDashboard, Layers, Inbox, Settings, LogOut, ArrowLeft } from 'lucide-react';

export function AdminLayout() {
  const { isLoading } = useAdmin();
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center text-zinc-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-zinc-900 text-zinc-100 flex flex-col">
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 mb-4 text-red-500">
            <ShieldAlert className="w-6 h-6" />
            <h1 className="font-black text-lg text-white">Admin Panel</h1>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavLink to="/admin/dashboard" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-colors ${isActive ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-colors ${isActive ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>
            <Layers className="w-4 h-4" /> Products
          </NavLink>
          <NavLink to="/admin/suggestions" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-colors ${isActive ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>
            <Inbox className="w-4 h-4" /> Suggestions
          </NavLink>
          <NavLink to="/admin/settings" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-colors ${isActive ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>
            <Settings className="w-4 h-4" /> Settings
          </NavLink>
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <button 
            onClick={() => { logout(); navigate('/admin/login'); }}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-xl text-sm font-bold text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
