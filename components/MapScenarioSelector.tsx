import type { CandidateSite, MapLayer, MapLayerId, PlanningScenario, PlanningScenarioId } from "@/types/network";
import { candidateSiteTypeById } from "@/data/candidateSiteTypes";
import MapLayerToggle from "@/components/MapLayerToggle";

type MapScenarioSelectorProps = {
  scenarios: PlanningScenario[];
  activeScenarioId: PlanningScenarioId;
  layers: MapLayer[];
  visibleSites: CandidateSite[];
  emphasizedLayers: Set<MapLayerId>;
  selectedSiteId?: string;
  onScenarioChange: (id: PlanningScenarioId) => void;
  onToggleLayer: (id: string) => void;
  onSiteSelect: (site: CandidateSite) => void;
};

export default function MapScenarioSelector({
  scenarios,
  activeScenarioId,
  layers,
  visibleSites,
  emphasizedLayers,
  selectedSiteId,
  onScenarioChange,
  onToggleLayer,
  onSiteSelect,
}: MapScenarioSelectorProps) {
  const active = scenarios.find((s) => s.id === activeScenarioId);

  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden">
      <div className="platform-panel p-4 shrink-0">
        <h2 className="heading-display text-sm font-semibold text-white mb-1">
          Planning Scenario
        </h2>
        <p className="text-[11px] text-mist/80 mb-3 leading-relaxed">
          Each view emphasizes different layers for island stakeholders.
        </p>
        <div className="space-y-1.5 max-h-[34vh] overflow-y-auto pr-0.5">
          {scenarios.map((scenario) => {
            const isActive = scenario.id === activeScenarioId;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => onScenarioChange(scenario.id)}
                className={`w-full text-left rounded-xl px-3 py-2.5 transition-colors border ${
                  isActive
                    ? "bg-amber-emergency/15 border-amber-emergency/40 text-white"
                    : "bg-white/5 border-white/8 text-mist hover:bg-white/10 hover:text-white"
                }`}
              >
                <p className="text-sm font-medium leading-snug">{scenario.name}</p>
                <p className="text-[10px] mt-1 leading-relaxed opacity-80 line-clamp-2">
                  {scenario.description}
                </p>
              </button>
            );
          })}
        </div>
        {active && (
          <p className="text-[10px] text-amber-glow/90 mt-3 leading-relaxed">
            Emphasizing: {active.emphasizedLayers.map((id) => layers.find((l) => l.id === id)?.name).filter(Boolean).join(", ")}
          </p>
        )}
      </div>

      <div className="platform-panel p-4 flex-1 min-h-0 overflow-hidden flex flex-col">
        <MapLayerToggle
          layers={layers}
          emphasizedLayers={emphasizedLayers}
          onToggle={onToggleLayer}
          variant="platform"
        />
      </div>

      {visibleSites.length > 0 && (
        <div className="platform-panel p-4 shrink-0 max-h-[28vh] overflow-hidden flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-1">Visible Sites</h3>
          <p className="text-[10px] text-mist/75 mb-2">Click a site to open details</p>
          <ul className="space-y-1 overflow-y-auto pr-0.5 flex-1">
            {visibleSites.map((site) => {
              const typeMeta = candidateSiteTypeById[site.type];
              const isSelected = site.id === selectedSiteId;
              return (
                <li key={site.id}>
                  <button
                    type="button"
                    onClick={() => onSiteSelect(site)}
                    className={`w-full text-left rounded-lg px-2.5 py-2 text-xs transition-colors border ${
                      isSelected
                        ? "bg-amber-emergency/15 border-amber-emergency/35 text-white"
                        : "border-transparent text-mist hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
                      style={{ backgroundColor: typeMeta?.mapColor ?? "#94a3b8" }}
                    />
                    <span className="font-medium">{site.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
