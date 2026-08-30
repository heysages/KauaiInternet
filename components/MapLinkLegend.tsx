import { linkMediumLabels, linkMediumColors } from "@/data/networkLinks";
import type { LinkMedium } from "@/types/network";

const mediums: LinkMedium[] = [
  "fiber",
  "microwave",
  "fixedWireless",
  "wifi",
  "lora",
  "radio",
  "satellite",
  "internetBackhaul",
  "reticulumLogical",
];

export default function MapLinkLegend({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`flex flex-wrap gap-x-4 gap-y-2 text-xs ${dark ? "text-mist" : "text-ocean-mid"}`}
    >
      {mediums.map((m) => (
        <span key={m} className="flex items-center gap-1.5">
          <span
            className="w-4 h-0.5 rounded-full"
            style={{
              backgroundColor: linkMediumColors[m],
              opacity: m === "reticulumLogical" ? 0.7 : 1,
            }}
          />
          {linkMediumLabels[m]}
        </span>
      ))}
    </div>
  );
}
