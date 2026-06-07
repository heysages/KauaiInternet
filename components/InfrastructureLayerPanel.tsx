import MapLayerToggle from "@/components/MapLayerToggle";
import { candidateSiteTypeById } from "@/data/candidateSiteTypes";
import type { CandidateSite, MapDisplayOptions, MapLayer, MapLayerId } from "@/types/network";

type InfrastructureLayerPanelProps = {
  layers: MapLayer[];
  displayOptions: MapDisplayOptions;
  visibleSites: CandidateSite[];
  emphasizedLayers: Set<MapLayerId>;
  selectedSiteId?: string;
  onToggleLayer: (id: string) => void;
  onDisplayOptionChange: (key: keyof MapDisplayOptions, value: boolean) => void;
  onSiteSelect: (site: CandidateSite) => void;
};

const displayToggles: { key: keyof MapDisplayOptions; label: string; hint: string }[] = [
  { key: "terrain", label: "Terrain", hint: "3D elevation relief" },
  { key: "towns", label: "Towns", hint: "Major town labels" },
  { key: "majorRoads", label: "Major Roads", hint: "Highway network (base map)" },
];

export default function InfrastructureLayerPanel({
  layers,
  displayOptions,
  visibleSites,
  emphasizedLayers,
  selectedSiteId,
  onToggleLayer,
  onDisplayOptionChange,
  onSiteSelect,
}: InfrastructureLayerPanelProps) {
  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden">
      <div className="platform-panel p-4 shrink-0">
        <h2 className="heading-display text-sm font-semibold text-white mb-1">
          Infrastructure Layer
        </h2>
        <p className="text-[11px] text-mist/80 leading-relaxed">
          Advanced map layers for planners, engineers, emergency management, and county stakeholders.
        </p>
      </div>

      <div className="platform-panel p-4 shrink-0">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-amber-glow mb-2">
          Base map
        </h3>
        <ul className="space-y-1.5">
          {displayToggles.map((toggle) => (
            <li key={toggle.key}>
              <label className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 hover:bg-white/5 cursor-pointer">
                <div>
                  <p className="text-xs font-medium text-white">{toggle.label}</p>
                  <p className="text-[10px] text-mist/60">{toggle.hint}</p>
                </div>
                <input
                  type="checkbox"
                  checked={displayOptions[toggle.key]}
                  onChange={(e) => onDisplayOptionChange(toggle.key, e.target.checked)}
                  className="rounded border-white/20 bg-white/10 text-amber-emergency focus:ring-amber-emergency/40"
                />
              </label>
            </li>
          ))}
        </ul>
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
        <div className="platform-panel p-4 shrink-0 max-h-[24vh] overflow-hidden flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-1">Infrastructure sites</h3>
          <p className="text-[10px] text-mist/75 mb-2">Click for planning details</p>
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
