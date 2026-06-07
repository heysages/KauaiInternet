type ScoreGaugeProps = {
  label: string;
  value: number;
  compareValue?: number;
  size?: "sm" | "md";
};

export default function ScoreGauge({
  label,
  value,
  compareValue,
  size = "md",
}: ScoreGaugeProps) {
  const radius = size === "sm" ? 28 : 36;
  const stroke = size === "sm" ? 5 : 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: radius * 2 + stroke * 2, height: radius * 2 + stroke * 2 }}>
        <svg
          width={radius * 2 + stroke * 2}
          height={radius * 2 + stroke * 2}
          className="-rotate-90"
          aria-hidden
        >
          <circle
            cx={radius + stroke}
            cy={radius + stroke}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={stroke}
          />
          <circle
            cx={radius + stroke}
            cy={radius + stroke}
            r={radius}
            fill="none"
            stroke="var(--amber-emergency)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-semibold text-white tabular-nums ${size === "sm" ? "text-sm" : "text-lg"}`}>
            {value}
          </span>
          {compareValue !== undefined && (
            <span className="text-[9px] text-mist/60 tabular-nums">was {compareValue}</span>
          )}
        </div>
      </div>
      <p className={`mt-2 text-mist leading-snug ${size === "sm" ? "text-[10px]" : "text-xs"}`}>
        {label}
      </p>
    </div>
  );
}
