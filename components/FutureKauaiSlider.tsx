type FutureKauaiSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function FutureKauaiSlider({ value, onChange }: FutureKauaiSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-white">Future Kauai</p>
          <p className="text-[10px] text-mist/75 mt-0.5">Drag to compare today vs. a connected island</p>
        </div>
        <span className="text-lg font-semibold text-amber-glow tabular-nums">{value}%</span>
      </div>

      <div className="relative">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="future-kauai-slider w-full"
          aria-label="Future Kauai progress"
        />
        <div className="flex justify-between text-[10px] text-mist/60 mt-1.5">
          <span>Today</span>
          <span>Future network</span>
        </div>
      </div>
    </div>
  );
}
