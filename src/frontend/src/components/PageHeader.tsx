import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  action?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-6" data-ocid="page-header">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.label} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="w-3 h-3" />}
              <span
                className={
                  i === breadcrumbs.length - 1
                    ? "text-foreground font-medium"
                    : "hover:text-foreground cursor-pointer transition-colors"
                }
              >
                {crumb.label}
              </span>
            </span>
          ))}
        </nav>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  );
}
