import FutureKauaiSlider from "@/components/FutureKauaiSlider";
import { visionStories } from "@/data/visionStories";

const storyIcons: Record<string, string> = {
  storm: "⛈️",
  comms: "📻",
  school: "🏫",
  tourism: "🌺",
  sovereignty: "🏝️",
  remote: "💼",
};

type VisionLayerPanelProps = {
  futureProgress: number;
  onFutureProgressChange: (value: number) => void;
};

export default function VisionLayerPanel({
  futureProgress,
  onFutureProgressChange,
}: VisionLayerPanelProps) {
  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden">
      <div className="platform-panel p-4 shrink-0">
        <h2 className="heading-display text-sm font-semibold text-white mb-1">
          Vision Layer
        </h2>
        <p className="text-[11px] text-mist/80 mb-4 leading-relaxed">
          Explore why stronger local digital infrastructure benefits every corner of Kauai.
        </p>
        <FutureKauaiSlider value={futureProgress} onChange={onFutureProgressChange} />
      </div>

      <div className="platform-panel p-4 flex-1 min-h-0 overflow-y-auto">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-amber-glow mb-3">
          Visual storytelling
        </h3>
        <ul className="space-y-2.5">
          {visionStories.map((story) => (
            <li
              key={story.id}
              className="rounded-xl bg-white/5 border border-white/8 px-3 py-2.5"
            >
              <div className="flex items-start gap-2.5">
                <span className="text-base shrink-0" aria-hidden>
                  {storyIcons[story.icon]}
                </span>
                <div>
                  <p className="text-sm font-medium text-white leading-snug">{story.title}</p>
                  <p className="text-[11px] text-mist/80 mt-1 leading-relaxed">
                    {story.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
