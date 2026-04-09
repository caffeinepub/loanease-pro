import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight, Menu, Shield, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useIsAdmin, useProfile } from "../hooks/useQueries";

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Apply for Loan", href: "/apply" },
  { label: "My Account", href: "/dashboard" },
];

export function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, login, logout } = useAuth();
  const { data: profile } = useProfile();
  const { data: isAdmin } = useIsAdmin();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header
        className="sticky top-0 z-50 bg-card border-b border-border shadow-elevated"
        data-ocid="main-header"
      >
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              data-ocid="nav-logo"
            >
              <img
                src="/assets/images/logo-transparent.png"
                alt="ZORRO Instant Personal Loan"
                className="h-9 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPath === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-ocid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                    currentPath.startsWith("/admin")
                      ? "text-accent bg-accent/10"
                      : "text-muted-foreground hover:text-accent hover:bg-accent/10"
                  }`}
                  data-ocid="nav-link-admin"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin
                </Link>
              )}
            </nav>

            {/* Auth Actions */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated && profile && (
                <span className="text-sm text-muted-foreground">
                  Hi, {profile.name.split(" ")[0]}
                </span>
              )}
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  data-ocid="nav-logout-btn"
                >
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={login}
                    data-ocid="nav-login-btn"
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={login}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    data-ocid="nav-apply-btn"
                  >
                    Apply Now <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              data-ocid="nav-mobile-toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPath === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
            <div className="pt-2 border-t border-border mt-2">
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="w-full"
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={login}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Login / Apply
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer
        className="bg-primary text-primary-foreground"
        data-ocid="main-footer"
      >
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <img
                  src="/assets/images/logo-transparent.png"
                  alt="ZORRO Instant Personal Loan"
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-sm text-primary-foreground/70 max-w-xs leading-relaxed">
                Trusted financial solutions for Personal, Home, and Business
                needs. Fast approvals, transparent terms.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3 text-primary-foreground/90">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-primary-foreground/60">
                {[
                  { label: "Our Loans", href: "/apply" },
                  { label: "Apply Now", href: "/apply" },
                  { label: "About Us", href: "/" },
                  { label: "Resources", href: "/" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="hover:text-primary-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3 text-primary-foreground/90">
                Contact Info
              </h4>
              <ul className="space-y-2 text-sm text-primary-foreground/60">
                <li>📞 1800-123-LOAN</li>
                <li>✉️ support@zorroloan.in</li>
                <li>🕐 Mon–Sat 9AM–6PM</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
            <p>
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                className="underline hover:text-primary-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex gap-4">
              <span className="hover:text-primary-foreground transition-colors cursor-pointer">
                Privacy Policy
              </span>
              <span className="hover:text-primary-foreground transition-colors cursor-pointer">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
