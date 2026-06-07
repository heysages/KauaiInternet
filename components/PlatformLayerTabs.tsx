import type { PlatformLayerId } from "@/types/network";

const layers: { id: PlatformLayerId; label: string; subtitle: string }[] = [
  { id: "vision", label: "Vision", subtitle: "Future outlook" },
  { id: "community", label: "Community", subtitle: "Property explorer" },
  { id: "infrastructure", label: "Infrastructure", subtitle: "Site details" },
];

type PlatformLayerTabsProps = {
  active: PlatformLayerId;
  onChange: (id: PlatformLayerId) => void;
};

export default function PlatformLayerTabs({ active, onChange }: PlatformLayerTabsProps) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-white/8 border border-white/10">
      {layers.map((layer) => {
        const isActive = layer.id === active;
        return (
          <button
            key={layer.id}
            type="button"
            onClick={() => onChange(layer.id)}
            className={`flex-1 min-w-0 rounded-lg px-2 sm:px-3 py-2 text-left transition-colors ${
              isActive
                ? "bg-amber-emergency text-ocean-deep shadow-sm"
                : "text-mist hover:text-white hover:bg-white/8"
            }`}
          >
            <p className="text-xs sm:text-sm font-semibold leading-none">{layer.label}</p>
            <p
              className={`text-[9px] sm:text-[10px] mt-0.5 leading-none hidden sm:block ${
                isActive ? "text-ocean-deep/70" : "text-mist/60"
              }`}
            >
              {layer.subtitle}
            </p>
          </button>
        );
      })}
    </div>
  );
}
