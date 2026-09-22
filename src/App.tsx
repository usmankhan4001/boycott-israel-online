// App.tsx is no longer the main entry point, routing is handled in router.tsx
// Keeping this file empty or as a thin wrapper to avoid breaking imports if any.
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export function App() {
  return <RouterProvider router={router} />;
}
