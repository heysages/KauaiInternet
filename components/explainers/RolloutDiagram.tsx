export default function RolloutDiagram() {
  const coast =
    "M 318.7 85.8 C 323.1 84.3, 332.7 78.9, 337.2 78.4 C 341.7 77.9, 350.8 80.0, 354.6 81.5 C 358.4 83.0, 363.9 89.6, 367.6 90 C 371.3 90.4, 380.1 84.7, 383.9 84.7 C 387.7 84.7, 395.0 88.5, 398 90 C 401.0 91.5, 405.8 94.3, 407.8 96.3 C 409.8 98.3, 412.7 106.4, 414.3 105.9 C 415.9 105.4, 418.8 95.1, 420.8 92.1 C 422.8 89.0, 427.5 83.2, 430.6 81.5 C 433.7 79.8, 441.7 78.9, 445.8 78.4 C 449.9 77.9, 459.1 76.1, 463.2 77.3 C 467.3 78.5, 474.3 87.5, 478.4 87.9 C 482.5 88.3, 492.0 80.9, 495.8 80.5 C 499.6 80.1, 505.8 85.8, 508.8 84.7 C 511.8 83.6, 517.1 71.3, 519.7 72 C 522.3 72.7, 526.5 85.9, 529.5 90 C 532.5 94.1, 540.2 101.4, 543.6 104.8 C 547.0 108.2, 553.1 114.8, 556.6 117.5 C 560.1 120.2, 568.1 123.1, 571.9 126 C 575.7 128.9, 583.0 136.8, 587.1 140.8 C 591.2 144.8, 600.6 154.0, 604.4 157.7 C 608.2 161.4, 615.0 166.4, 617.5 170.4 C 620.0 174.4, 623.7 184.5, 624 189.5 C 624.3 194.5, 621.6 205.4, 619.7 210.7 C 617.8 216.0, 611.8 226.0, 608.8 231.8 C 605.8 237.6, 598.5 251.4, 595.8 257.2 C 593.1 263.0, 589.3 272.3, 587.1 278.4 C 584.9 284.5, 580.3 299.3, 578.4 305.9 C 576.5 312.5, 573.3 324.9, 571.9 331.3 C 570.5 337.7, 567.0 351.9, 567.5 356.7 C 568.0 361.5, 577.8 365.9, 576.2 369.4 C 574.6 372.8, 560.5 379.3, 554.5 384.3 C 548.5 389.3, 535.7 403.3, 528.4 409.7 C 521.1 416.1, 503.9 429.8, 495.8 435.1 C 487.7 440.4, 471.3 450.9, 463.2 452 C 455.1 453.1, 438.8 445.6, 430.6 443.5 C 422.5 441.4, 407.0 437.2, 398 435.1 C 389.0 433.0, 368.8 428.7, 358.9 426.6 C 349.0 424.5, 329.1 422.1, 318.7 418.1 C 308.3 414.1, 285.8 400.9, 275.3 394.8 C 264.9 388.7, 246.0 375.2, 235.1 369.4 C 224.2 363.6, 200.0 352.8, 188.3 348.3 C 176.6 343.8, 151.5 338.7, 141.6 333.4 C 131.7 328.1, 114.7 314.6, 109 305.9 C 103.3 297.2, 96.8 274.2, 96 263.6 C 95.2 253.0, 97.3 231.8, 102.5 221.2 C 107.7 210.6, 127.0 188.9, 137.3 178.9 C 147.6 168.9, 172.9 148.7, 185.1 140.8 C 197.3 132.9, 224.2 120.7, 235.1 115.4 C 246.0 110.1, 263.6 101.7, 272 98.5 C 280.4 95.3, 296.6 91.6, 302.4 90 C 308.2 88.4, 314.3 87.3, 318.7 85.8 Z";
  const northShore =
    "M 318.7 85.8 C 321.0 84.9, 332.7 78.9, 337.2 78.4 C 341.7 77.9, 350.8 80.0, 354.6 81.5 C 358.4 83.0, 363.9 89.6, 367.6 90 C 371.3 90.4, 380.1 84.7, 383.9 84.7 C 387.7 84.7, 395.0 88.5, 398 90 C 401.0 91.5, 405.8 94.3, 407.8 96.3 C 409.8 98.3, 412.7 106.4, 414.3 105.9 C 415.9 105.4, 418.8 95.1, 420.8 92.1 C 422.8 89.0, 427.5 83.2, 430.6 81.5 C 433.7 79.8, 441.7 78.9, 445.8 78.4 C 449.9 77.9, 459.1 76.1, 463.2 77.3 C 467.3 78.5, 474.3 87.5, 478.4 87.9 C 482.5 88.3, 492.0 80.9, 495.8 80.5 C 499.6 80.1, 505.8 85.8, 508.8 84.7 C 511.8 83.6, 517.1 71.3, 519.7 72 C 522.3 72.7, 528.3 87.8, 529.5 90";
  const eastShore =
    "M 519.7 72 C 520.9 74.3, 526.5 85.9, 529.5 90 C 532.5 94.1, 540.2 101.4, 543.6 104.8 C 547.0 108.2, 553.1 114.8, 556.6 117.5 C 560.1 120.2, 568.1 123.1, 571.9 126 C 575.7 128.9, 583.0 136.8, 587.1 140.8 C 591.2 144.8, 600.6 154.0, 604.4 157.7 C 608.2 161.4, 615.0 166.4, 617.5 170.4 C 620.0 174.4, 623.7 184.5, 624 189.5 C 624.3 194.5, 621.6 205.4, 619.7 210.7 C 617.8 216.0, 610.2 229.2, 608.8 231.8";

  return (
    <figure>
      <svg viewBox="0 0 720 500" className="w-full h-auto" role="img" aria-labelledby="rollout-title rollout-desc">
        <title id="rollout-title">How the build grows across Kauaʻi</title>
        <desc id="rollout-desc">
          Kauaʻi’s coastline. The first build follows the North Shore from Hāʻena through
          Hanalei and Princeville to Kīlauea. Anahola and Kapaʻa are the next stretch.
          Līhuʻe, Poʻipū, and Waimea come later. This is not a signal survey.
        </desc>
        <defs>
          <radialGradient id="rollout-sea" cx="48%" cy="40%" r="68%">
            <stop offset="0%" stopColor="#16384f" />
            <stop offset="100%" stopColor="#0b2236" />
          </radialGradient>
          <radialGradient id="rollout-land" cx="47%" cy="46%" r="78%">
            <stop offset="0%" stopColor="#1c5564" />
            <stop offset="100%" stopColor="#246e80" />
          </radialGradient>
        </defs>
        <rect width="720" height="500" rx="24" fill="url(#rollout-sea)" />
        <path d={coast} fill="url(#rollout-land)" />
        <path d={coast} fill="none" stroke="#d5e4ea" strokeWidth="1.6" opacity="0.7" />
        <path d={northShore} fill="none" stroke="#3fa7b5" strokeWidth="18" strokeLinecap="round" opacity="0.35" />
        <path d={northShore} fill="none" stroke="#7fd3dc" strokeWidth="4.5" strokeLinecap="round" />
        <path d={eastShore} fill="none" stroke="#7db9a6" strokeWidth="14" strokeLinecap="round" opacity="0.4" />
        <path d={eastShore} fill="none" stroke="#b7e0d2" strokeWidth="3.5" strokeLinecap="round" />

        <Town x={346} y={82} label="Hāʻena" lx={346} ly={62} />
        <Town x={413} y={104} label="Hanalei" lx={400} ly={126} />
        <Town x={435} y={80} label="Princeville" lx={448} ly={62} />
        <Town x={511} y={86} label="Kīlauea" lx={524} ly={56} />
        <Town x={615} y={173} label="Anahola" lx={640} ly={170} anchor="start" tone="next" />
        <Town x={612} y={214} label="Kapaʻa" lx={640} ly={218} anchor="start" tone="next" />
        <Town x={555} y={345} label="Līhuʻe" lx={572} ly={348} anchor="start" tone="later" />
        <Town x={459} y={440} label="Poʻipū" lx={459} ly={468} tone="later" />
        <Town x={229} y={365} label="Waimea" lx={212} ly={362} anchor="end" tone="later" />

        <text x="28" y="36" fill="#c5d4dc" fontSize="13" fontFamily="var(--font-dm-sans), ui-sans-serif, sans-serif">
          Kauaʻi · towns in the plan, not a signal survey
        </text>
      </svg>
      <figcaption className="mt-3 grid sm:grid-cols-3 gap-2 text-xs text-ocean-mid">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-brand-teal" />
          Now: Hāʻena, Hanalei, Princeville, Kīlauea
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-brand-sage" />
          Next: Anahola and Kapaʻa
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-ridge-dark" />
          Later: Līhuʻe, the south shore, and the west side
        </span>
      </figcaption>
    </figure>
  );
}

function Town({
  x,
  y,
  label,
  lx,
  ly,
  anchor = "middle",
  tone = "now",
}: {
  x: number;
  y: number;
  label: string;
  lx: number;
  ly: number;
  anchor?: "start" | "middle" | "end";
  tone?: "now" | "next" | "later";
}) {
  const ring = tone === "now" ? "#7fd3dc" : tone === "next" ? "#b7e0d2" : "#8aa4b3";
  const fill = tone === "later" ? "#8aa4b3" : "#f7f4ef";
  const ink = tone === "later" ? "#c5d4dc" : "#f7f4ef";
  return (
    <g>
      <circle cx={x} cy={y} r={tone === "later" ? 3.5 : 5} fill={fill} stroke={ring} strokeWidth="2" />
      <text
        x={lx}
        y={ly}
        textAnchor={anchor}
        fill={ink}
        fontSize={tone === "later" ? 12 : 13}
        fontFamily="var(--font-dm-sans), ui-sans-serif, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}
