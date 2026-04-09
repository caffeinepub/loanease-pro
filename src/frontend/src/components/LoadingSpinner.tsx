import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  message,
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
      data-ocid="loading-spinner"
    >
      <div
        className={cn(
          "rounded-full border-primary/20 border-t-primary animate-spin",
          sizeClasses[size],
        )}
        style={{ borderWidth: size === "lg" ? 3 : 2 }}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
      )}
    </div>
  );
}
