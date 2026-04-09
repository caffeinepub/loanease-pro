import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  ChevronLeft,
  FileText,
  LayoutDashboard,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useIsMobile } from "../hooks/use-mobile";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { label: "All Applications", href: "/admin", icon: FileText },
  { label: "Statistics", href: "/admin/stats", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function SidebarNav({
  currentPath,
  onNavClick,
}: {
  currentPath: string;
  onNavClick?: () => void;
}) {
  const { logout } = useAuth();

  return (
    <>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2.5" onClick={onNavClick}>
          <div className="w-8 h-8 rounded-lg bg-sidebar-foreground/20 flex items-center justify-center overflow-hidden">
            <img
              src="/assets/images/logo-transparent.png"
              alt="ZORRO Instant Personal Loan"
              className="h-7 w-auto object-contain"
            />
          </div>
          <div>
            <div className="font-display font-bold text-sm leading-tight text-sidebar-foreground">
              ZORRO
            </div>
            <div className="text-xs text-sidebar-foreground/50">
              Admin Panel
            </div>
          </div>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-3 space-y-1">
        {sidebarItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/admin"
              ? currentPath === href
              : currentPath.startsWith(href);
          return (
            <Link
              key={href}
              to={href}
              onClick={onNavClick}
              className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth min-h-[44px] ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/30"
              }`}
              data-ocid={`admin-nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        <Link
          to="/"
          onClick={onNavClick}
          className="flex items-center gap-2 px-3 py-3 rounded-md text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/20 transition-smooth min-h-[44px]"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Site
        </Link>
        <Button
          variant="outline"
          onClick={() => {
            logout();
            onNavClick?.();
          }}
          className="w-full h-11 border-sidebar-border text-sidebar-foreground/60 hover:text-sidebar-foreground bg-transparent hover:bg-sidebar-accent/20"
          data-ocid="admin-logout-btn"
        >
          Sign Out
        </Button>
      </div>
    </>
  );
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside
          className="w-64 bg-sidebar text-sidebar-foreground flex flex-col shadow-elevated flex-shrink-0"
          data-ocid="admin-sidebar"
        >
          <SidebarNav currentPath={currentPath} />
        </aside>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
          <SheetContent
            side="left"
            className="w-72 p-0 bg-sidebar text-sidebar-foreground border-sidebar-border"
            data-ocid="admin-mobile-drawer"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Admin Navigation</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full">
              <SidebarNav
                currentPath={currentPath}
                onNavClick={() => setDrawerOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Top Bar */}
        <header
          className="bg-card border-b border-border px-4 md:px-6 py-3 flex items-center gap-3 justify-between"
          data-ocid="admin-header"
        >
          <div className="flex items-center gap-3">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 -ml-1"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
                data-ocid="admin-hamburger-btn"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}
            <div className="flex items-center gap-2">
              {isMobile ? (
                <span className="font-display font-bold text-sm text-foreground">
                  ZORRO
                </span>
              ) : (
                <>
                  <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Admin Dashboard
                  </span>
                </>
              )}
            </div>
          </div>

          {isMobile && (
            <span className="text-xs text-muted-foreground font-medium">
              Admin Panel
            </span>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
