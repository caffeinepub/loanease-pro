import { Navigate } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import { useIsAdmin } from "../hooks/useQueries";
import { LoadingSpinner } from "./LoadingSpinner";

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, isInitializing } = useAuth();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();

  if (isInitializing || adminLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" message="Verifying permissions..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center p-8">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <Shield className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Access Denied</h2>
        <p className="text-muted-foreground max-w-sm">
          You don't have permission to access the admin area. Please contact
          your system administrator.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
