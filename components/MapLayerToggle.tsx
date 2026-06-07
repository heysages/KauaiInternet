import type { MapLayer, MapLayerId } from "@/types/network";

type MapLayerToggleProps = {
  layers: MapLayer[];
  onToggle: (id: string) => void;
  emphasizedLayers?: Set<MapLayerId>;
  variant?: "default" | "platform";
};

export default function MapLayerToggle({
  layers,
  onToggle,
  emphasizedLayers,
  variant = "default",
}: MapLayerToggleProps) {
  const isPlatform = variant === "platform";

  return (
    <div className={isPlatform ? "flex flex-col min-h-0 h-full" : "glass-card rounded-2xl p-4 shadow-lg shadow-ocean-deep/10"}>
      <h3 className={`font-semibold text-sm mb-1 ${isPlatform ? "text-white" : "text-ocean-deep"}`}>
        Map Layers
      </h3>
      <p className={`text-[11px] mb-3 leading-relaxed ${isPlatform ? "text-mist/75" : "text-ocean-mid"}`}>
        Explore what we are discussing together. Locations are approximate.
      </p>
      <div className={`space-y-1.5 overflow-y-auto pr-1 ${isPlatform ? "flex-1" : "max-h-[42vh]"}`}>
        {layers.map((layer) => {
          const emphasized = emphasizedLayers?.has(layer.id);
          return (
            <label
              key={layer.id}
              className={`flex items-start gap-2.5 cursor-pointer group rounded-lg px-2 py-2 transition-colors ${
                isPlatform
                  ? emphasized
                    ? "bg-amber-emergency/10 hover:bg-amber-emergency/15 ring-1 ring-amber-emergency/25"
                    : "hover:bg-white/8"
                  : "hover:bg-ocean-deep/5"
              }`}
            >
              <input
                type="checkbox"
                checked={layer.enabled}
                onChange={() => onToggle(layer.id)}
                className="mt-0.5 w-4 h-4 rounded border-ocean-deep/20 text-ocean-mid focus:ring-ocean-light shrink-0"
              />
              <span
                className="w-3 h-3 rounded-full shrink-0 mt-1"
                style={{ backgroundColor: layer.color }}
              />
              <div className="min-w-0">
                <p className={`text-sm font-medium transition-colors ${
                  isPlatform ? "text-white group-hover:text-mist" : "text-ocean-deep group-hover:text-ocean-mid"
                }`}>
                  {layer.name}
                  {emphasized && (
                    <span className="ml-1.5 text-[9px] uppercase tracking-wider text-amber-glow font-semibold">
                      focus
                    </span>
                  )}
                </p>
                <p className={`text-[11px] leading-snug ${isPlatform ? "text-mist/70" : "text-ocean-mid"}`}>
                  {layer.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
