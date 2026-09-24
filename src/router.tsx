import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { GroceryPage } from './pages/GroceryPage';
import { AboutPage } from './pages/AboutPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ScannerPage } from './pages/ScannerPage';
import { SuggestionPage } from './pages/SuggestionPage';
import { CommunityPage } from './pages/CommunityPage';
import { PostDetailPage } from './pages/PostDetailPage';
import { ComplicityPage } from './pages/ComplicityPage';
import { BountiesPage } from './pages/BountiesPage';
import { StudioPage } from './pages/StudioPage';
import { TayyibPage } from './pages/TayyibPage';

import { AdminLayout } from './pages/admin/AdminLayout';
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { ProductsPage } from './pages/admin/ProductsPage';
import { SuggestionsPage } from './pages/admin/SuggestionsPage';
import { SettingsPage } from './pages/admin/SettingsPage';

import { ErrorBoundary } from './components/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <AppShell />
      </ErrorBoundary>
    ),
    errorElement: (
      <ErrorBoundary>
        <AppShell />
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'community', element: <CommunityPage /> },
      { path: 'community/:id', element: <PostDetailPage /> },
      { path: 'grocery', element: <GroceryPage /> },
      { path: 'complicity', element: <ComplicityPage /> },
      { path: 'bounties', element: <BountiesPage /> },
      { path: 'studio', element: <StudioPage /> },
      { path: 'tayyib', element: <TayyibPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'product/:id', element: <ProductDetailPage /> },
      { path: 'scan', element: <ScannerPage /> },
      { path: 'suggest', element: <SuggestionPage /> }
    ]
  },
  {
    path: '/admin/login',
    element: <LoginPage />
  },
  {
    path: '/admin',
    element: (
      <ErrorBoundary>
        <AdminLayout />
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'suggestions', element: <SuggestionsPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <Navigate to="/admin/dashboard" replace /> }
    ]
  }
]);
