import type { TechnologyOption } from "@/types/network";

type TechnologyOptionsPanelProps = {
  options: TechnologyOption[];
  onToggle: (id: string) => void;
};

export default function TechnologyOptionsPanel({
  options,
  onToggle,
}: TechnologyOptionsPanelProps) {
  return (
    <div className="platform-panel p-4 shrink-0">
      <h3 className="text-sm font-semibold text-white mb-1">Technology options</h3>
      <p className="text-[10px] text-mist/75 mb-3 leading-relaxed">
        There is no single solution. Resilience may come from a combination of approaches
        we are still evaluating together.
      </p>
      <ul className="space-y-2 max-h-[36vh] overflow-y-auto pr-0.5">
        {options.map((tech) => (
          <li key={tech.id}>
            <label className="flex items-start gap-2 rounded-lg px-2 py-2 hover:bg-white/5 cursor-pointer">
              <input
                type="checkbox"
                checked={tech.enabled}
                onChange={() => onToggle(tech.id)}
                className="mt-0.5 rounded border-white/20 bg-white/10 text-amber-emergency"
              />
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 mt-1"
                style={{ backgroundColor: tech.color }}
              />
              <div className="min-w-0">
                <p className="text-xs font-medium text-white">{tech.name}</p>
                <p className="text-[10px] text-mist/65 leading-snug mt-0.5">
                  {tech.description}
                </p>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
