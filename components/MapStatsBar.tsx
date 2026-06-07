import type { MapPlanningStats } from "@/types/network";

type MapStatsBarProps = {
  stats: MapPlanningStats;
};

function formatPopulation(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function MapStatsBar({ stats }: MapStatsBarProps) {
  const items = [
    {
      label: "Population served",
      value: formatPopulation(stats.populationServed),
      hint: "Planning estimate from visible sites",
    },
    {
      label: "Candidate sites",
      value: String(stats.candidateSites),
      hint: "Sites on active layers",
    },
    {
      label: "Resilience impact",
      value: `${stats.resilienceImpactPercent}%`,
      hint: "Modeled pilot coverage score",
    },
    {
      label: "Coverage zones",
      value: String(stats.coverageZones),
      hint: "Planning regions with site presence",
    },
  ];

  return (
    <div className="flex items-stretch gap-2 sm:gap-3 overflow-x-auto pb-0.5 scrollbar-none">
      {items.map((item) => (
        <div
          key={item.label}
          className="platform-panel shrink-0 px-3 sm:px-4 py-2 sm:py-2.5 min-w-[120px]"
          title={item.hint}
        >
          <p className="text-[10px] uppercase tracking-wider text-mist/70 font-medium">
            {item.label}
          </p>
          <p className="text-lg sm:text-xl font-semibold text-white tabular-nums leading-tight">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
