import KauaiInternetBird from "@/components/KauaiInternetBird";
import { siteConfig } from "@/lib/site";

type KauaiInternetLogoProps = {
  variant?: "light" | "dark";
  showTagline?: boolean;
  compact?: boolean;
  className?: string;
};

/** Official Kauai Internet mark — bird emblem + wordmark */
export default function KauaiInternetLogo({
  variant = "light",
  showTagline = true,
  compact = false,
  className = "",
}: KauaiInternetLogoProps) {
  const isLight = variant === "light";
  const emblemSize = compact ? 44 : 52;
  const birdSize = compact ? 38 : 46;

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <div
        className={`relative shrink-0 rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-[1.03] bg-brand-cream shadow-[0_4px_20px_rgba(0,0,0,0.28)] ${
          isLight ? "ring-2 ring-white/30" : "ring-2 ring-brand-teal/25"
        }`}
        style={{ width: emblemSize, height: emblemSize }}
      >
        <KauaiInternetBird size={birdSize} />
      </div>

      <div className="min-w-0">
        <p
          className={`font-semibold tracking-[0.14em] uppercase leading-tight ${
            compact ? "text-xs" : "text-sm"
          } ${isLight ? "text-white" : "text-brand-navy"}`}
        >
          {siteConfig.name}
        </p>
        {showTagline && (
          <p
            className={`text-[10px] tracking-[0.12em] uppercase leading-snug mt-0.5 ${
              compact ? "hidden sm:block" : ""
            } ${isLight ? "text-brand-cream/80" : "text-brand-blue/80"}`}
          >
            {siteConfig.tagline}
          </p>
        )}
      </div>
    </div>
  );
}
