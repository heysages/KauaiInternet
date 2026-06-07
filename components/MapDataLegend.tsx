import { dataConfidenceLegend } from "@/data/dataConfidenceLegend";

type MapDataLegendProps = {
  variant?: "platform" | "light";
  compact?: boolean;
};

export default function MapDataLegend({
  variant = "platform",
  compact = false,
}: MapDataLegendProps) {
  const isPlatform = variant === "platform";

  return (
    <div
      className={
        isPlatform
          ? "platform-panel px-3 py-2.5"
          : "glass-card rounded-xl px-4 py-3"
      }
    >
      {!compact && (
        <p
          className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${
            isPlatform ? "text-amber-glow" : "text-ridge-mid"
          }`}
        >
          Map legend
        </p>
      )}
      <ul className={`space-y-${compact ? "1.5" : "2"}`}>
        {dataConfidenceLegend.map((item) => (
          <li key={item.id} className="flex items-start gap-2">
            <span
              className="w-3 h-3 rounded-full shrink-0 mt-0.5 border border-white/30"
              style={{ backgroundColor: item.color }}
            />
            <div className="min-w-0">
              <p
                className={`text-xs font-medium leading-snug ${
                  isPlatform ? "text-white" : "text-ocean-deep"
                }`}
              >
                {item.label}
              </p>
              {!compact && (
                <p
                  className={`text-[10px] leading-snug mt-0.5 ${
                    isPlatform ? "text-mist/65" : "text-ocean-mid/80"
                  }`}
                >
                  {item.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
