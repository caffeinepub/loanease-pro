import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface BrandedLoadingScreenProps {
  /** When false, the screen fades out and unmounts */
  visible?: boolean;
  className?: string;
}

export function BrandedLoadingScreen({
  visible = true,
  className,
}: BrandedLoadingScreenProps) {
  const [mounted, setMounted] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) {
      setFading(true);
      const t = setTimeout(() => setMounted(false), 500);
      return () => clearTimeout(t);
    }
    setMounted(true);
    setFading(false);
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      aria-label="Loading ZORRO Instant Personal Loan"
      data-ocid="branded-loading-screen"
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center",
        "bg-[oklch(0.16_0.06_267)]",
        "transition-opacity duration-500 ease-in-out",
        fading ? "opacity-0 pointer-events-none" : "opacity-100",
        className,
      )}
    >
      {/* Radial glow behind logo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="w-[480px] h-[480px] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.82 0.18 75) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Logo container with pulse glow */}
      <div className="relative flex flex-col items-center gap-6 z-10">
        {/* Logo with shimmer overlay */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
          {/* Pulsing ring */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{
              background:
                "radial-gradient(circle, oklch(0.82 0.18 75), transparent)",
            }}
          />
          {/* Logo image */}
          <img
            src="/assets/images/logo-transparent.png"
            alt="ZORRO Logo"
            className="w-full h-full object-contain animate-[zorro-pulse_2.4s_ease-in-out_infinite]"
            style={{
              filter: "drop-shadow(0 0 24px oklch(0.82 0.18 75 / 0.6))",
            }}
            draggable={false}
          />
        </div>

        {/* Brand name */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1
            className="text-2xl md:text-3xl font-bold tracking-widest uppercase font-display"
            style={{ color: "oklch(0.82 0.18 75)" }}
          >
            ZORRO
          </h1>
          <p
            className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase font-body"
            style={{ color: "oklch(0.82 0.18 75 / 0.7)" }}
          >
            Instant Personal Loan
          </p>
        </div>

        {/* Animated loading bar */}
        <div className="w-48 md:w-64 flex flex-col items-center gap-2 mt-2">
          <div
            className="w-full h-[3px] rounded-full overflow-hidden"
            style={{ background: "oklch(0.82 0.18 75 / 0.15)" }}
          >
            <div
              className="h-full rounded-full animate-[zorro-bar_1.8s_ease-in-out_infinite]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.82 0.18 75), oklch(0.92 0.12 75), transparent)",
                width: "60%",
              }}
            />
          </div>
          <p
            className="text-xs tracking-widest font-body animate-pulse"
            style={{ color: "oklch(0.82 0.18 75 / 0.5)" }}
          >
            Loading your experience…
          </p>
        </div>
      </div>

      {/* Keyframe definitions */}
      <style>{`
        @keyframes zorro-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 12px oklch(0.82 0.18 75 / 0.4));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 28px oklch(0.82 0.18 75 / 0.8));
            transform: scale(1.04);
          }
        }
        @keyframes zorro-bar {
          0%   { transform: translateX(-150%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}
