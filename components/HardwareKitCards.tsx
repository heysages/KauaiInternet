import { hardwareKits } from "@/data/hardwareKits";
import OperationalStatusBadge from "@/components/OperationalStatusBadge";

export default function HardwareKitCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {hardwareKits.map((kit) => (
        <div
          key={kit.id}
          className="rounded-2xl border border-sand-warm bg-white p-5 flex flex-col"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-ocean-deep">{kit.name}</h3>
            <OperationalStatusBadge status={kit.status} />
          </div>
          <p className="text-sm text-ridge-mid mb-3">{kit.tagline}</p>
          <ul className="space-y-1 flex-1 mb-4">
            {kit.features.map((f) => (
              <li key={f} className="text-xs text-ocean-mid flex gap-2">
                <span className="text-amber-emergency">•</span>
                {f}
              </li>
            ))}
          </ul>
          <p className="text-xs text-mist italic">Concept — not available for purchase</p>
        </div>
      ))}
    </div>
  );
}
