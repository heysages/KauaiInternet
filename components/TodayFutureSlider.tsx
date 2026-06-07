type TodayFutureSliderProps = {
  value: number;
  onChange: (value: number) => void;
  variant?: "light" | "platform";
};

export default function TodayFutureSlider({
  value,
  onChange,
  variant = "light",
}: TodayFutureSliderProps) {
  const isPlatform = variant === "platform";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p
            className={`text-sm font-semibold ${isPlatform ? "text-white" : "text-ocean-deep"}`}
          >
            Today ← → Future Possibilities
          </p>
          <p className={`text-[10px] mt-0.5 ${isPlatform ? "text-mist/75" : "text-ocean-mid/80"}`}>
            See how community projects and resources could grow over time
          </p>
        </div>
        <span
          className={`text-lg font-semibold tabular-nums ${
            isPlatform ? "text-amber-glow" : "text-ridge-mid"
          }`}
        >
          {value}%
        </span>
      </div>

      <div className="relative">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="future-kauai-slider w-full"
          aria-label="Today versus future possibilities"
        />
        <div
          className={`flex justify-between text-[10px] mt-1.5 ${
            isPlatform ? "text-mist/60" : "text-ocean-mid/70"
          }`}
        >
          <span>Today</span>
          <span>Future possibilities</span>
        </div>
      </div>
    </div>
  );
}
