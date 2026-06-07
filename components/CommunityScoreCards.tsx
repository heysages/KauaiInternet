import type { CommunityScoreSet } from "@/types/network";

const scoreMeta: { key: keyof CommunityScoreSet; label: string; icon: string }[] = [
  { key: "connectivity", label: "Connectivity", icon: "📶" },
  { key: "emergencyReadiness", label: "Emergency Readiness", icon: "🛡️" },
  { key: "communityResources", label: "Community Resources", icon: "🏛️" },
  { key: "resilience", label: "Resilience", icon: "🌿" },
  { key: "participationOpportunities", label: "Participation", icon: "🤝" },
];

type CommunityScoreCardsProps = {
  scores: CommunityScoreSet;
  variant?: "light" | "platform";
};

export default function CommunityScoreCards({
  scores,
  variant = "light",
}: CommunityScoreCardsProps) {
  const isPlatform = variant === "platform";

  return (
    <div>
      <p
        className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${
          isPlatform ? "text-amber-glow" : "text-ridge-mid"
        }`}
      >
        Community scores
      </p>
      <p className={`text-[10px] mb-3 ${isPlatform ? "text-mist/60" : "text-ocean-mid/70"}`}>
        Planning estimates · simulated · not official ratings
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {scoreMeta.map(({ key, label, icon }) => {
          const value = scores[key];
          return (
            <div
              key={key}
              className={`rounded-xl px-3 py-3 border ${
                isPlatform
                  ? "bg-white/8 border-white/10"
                  : "bg-white/70 border-ocean-mid/10"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm" aria-hidden>
                  {icon}
                </span>
                <p
                  className={`text-[10px] font-medium leading-tight ${
                    isPlatform ? "text-mist" : "text-ocean-mid"
                  }`}
                >
                  {label}
                </p>
              </div>
              <div className="flex items-end gap-2">
                <span
                  className={`text-2xl font-semibold tabular-nums ${
                    isPlatform ? "text-amber-glow" : "text-ocean-deep"
                  }`}
                >
                  {value}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-black/10 overflow-hidden mb-1.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isPlatform ? "bg-amber-emergency/80" : "bg-ridge-mid"
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
