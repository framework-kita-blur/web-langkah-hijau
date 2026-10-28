import { lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage';
import { AuthProvider, useAuth } from '@/providers/auth-provider';

/** Halaman dalam dimuat saat dibutuhkan agar recharts tidak ikut pada muatan awal. */
const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((module) => ({ default: module.DashboardPage })),
);
const TripsPage = lazy(() => import('@/pages/TripsPage').then((module) => ({ default: module.TripsPage })));

function RequireAuth({ children }: { children: ReactNode }) {
  const { isLoading, isSignedIn } = useAuth();
  // Tunggu pemulihan sesi; tanpa ini, hard-load/refresh langsung salah dialihkan ke /login.
  if (isLoading) return <p role="status">Memuat…</p>;
  return isSignedIn ? children : <Navigate to="/login" replace />;
}

function ProtectedPage({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <Suspense fallback={<p role="status">Memuat…</p>}>{children}</Suspense>
    </RequireAuth>
  );
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedPage>
                <DashboardPage />
              </ProtectedPage>
            }
          />
          <Route
            path="/perjalanan"
            element={
              <ProtectedPage>
                <TripsPage />
              </ProtectedPage>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
