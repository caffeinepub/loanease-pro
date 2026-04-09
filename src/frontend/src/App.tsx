import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { AdminLayout } from "./components/AdminLayout";
import { AdminRoute } from "./components/AdminRoute";
import { BrandedLoadingScreen } from "./components/BrandedLoadingScreen";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/Home"));
const ApplyPage = lazy(() => import("./pages/Apply"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboard"));
const AdminApplicationDetailPage = lazy(
  () => import("./pages/AdminApplicationDetail"),
);
const LoginPage = lazy(() => import("./pages/Login"));

function PageFallback() {
  return <BrandedLoadingScreen visible={true} />;
}

// Root route
const rootRoute = createRootRoute({
  component: Outlet,
});

// Public routes (with Layout)
const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <HomePage />
    </Suspense>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <LoginPage />
    </Suspense>
  ),
});

const applyRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/apply",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageFallback />}>
        <ApplyPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageFallback />}>
        <DashboardPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

// Admin routes (with AdminLayout)
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin-layout",
  component: () => (
    <AdminRoute>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </AdminRoute>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AdminDashboardPage />
    </Suspense>
  ),
});

const adminStatsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/stats",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AdminDashboardPage />
    </Suspense>
  ),
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/settings",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AdminDashboardPage />
    </Suspense>
  ),
});

const adminApplicationDetailRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/applications/$id",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AdminApplicationDetailPage />
    </Suspense>
  ),
});

// Build the route tree
const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([homeRoute, loginRoute, applyRoute, dashboardRoute]),
  adminLayoutRoute.addChildren([
    adminRoute,
    adminStatsRoute,
    adminSettingsRoute,
    adminApplicationDetailRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
