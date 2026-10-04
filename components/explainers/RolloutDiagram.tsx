export default function RolloutDiagram() {
  return (
    <figure>
      <svg viewBox="0 0 640 380" className="w-full h-auto" role="img" aria-labelledby="rollout-title rollout-desc">
        <title id="rollout-title">How the build grows across Kauaʻi</title>
        <desc id="rollout-desc">
          A schematic of Kauaʻi. The North Shore from Hāʻena to Kīlauea is the first stage.
          Anahola and Kapaʻa are the next stage. The rest of the island is a later backbone, not this build.
        </desc>
        <rect width="640" height="380" rx="20" fill="#0d2b45" />
        <path
          d="M118 214
             C108 168 128 112 176 82
             C214 58 262 52 304 64
             C356 58 414 74 458 104
             C502 138 518 184 498 222
             C484 262 452 304 400 322
             C348 344 276 348 220 328
             C164 308 124 270 118 214 Z"
          fill="#1a4a5c"
          stroke="#7db9a6"
          strokeWidth="2"
        />
        <path
          d="M250 78 C286 70 330 74 368 92 C390 78 430 86 452 108 C418 96 360 88 312 96 C286 88 264 84 250 78 Z"
          fill="#3fa7b5"
          opacity="0.9"
        />
        <path
          d="M430 112 C468 128 492 168 486 204 C470 176 452 148 430 112 Z"
          fill="#7db9a6"
          opacity="0.85"
        />
        <circle cx="286" cy="86" r="5" fill="#e6e2d6" />
        <circle cx="328" cy="84" r="5" fill="#e6e2d6" />
        <circle cx="362" cy="90" r="5" fill="#e6e2d6" />
        <circle cx="424" cy="102" r="5" fill="#e6e2d6" />
        <circle cx="470" cy="150" r="4" fill="#e6e2d6" />
        <circle cx="478" cy="188" r="4" fill="#e6e2d6" />
        <text x="248" y="68" fill="#e6e2d6" fontSize="13" fontFamily="ui-sans-serif, system-ui, sans-serif">
          Hāʻena
        </text>
        <text x="392" y="78" fill="#e6e2d6" fontSize="13" fontFamily="ui-sans-serif, system-ui, sans-serif">
          Kīlauea
        </text>
        <text x="492" y="168" fill="#e6e2d6" fontSize="12" fontFamily="ui-sans-serif, system-ui, sans-serif">
          Kapaʻa
        </text>
        <text x="36" y="44" fill="#e6e2d6" fontSize="12" fontFamily="ui-sans-serif, system-ui, sans-serif">
          Schematic, not a survey map
        </text>
      </svg>
      <figcaption className="mt-3 grid sm:grid-cols-3 gap-2 text-xs text-ocean-mid">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-brand-teal" />
          Now: Hāʻena to Kīlauea
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-brand-sage" />
          Next: Anahola and Kapaʻa
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-ridge-dark" />
          Later: the rest of the island
        </span>
      </figcaption>
    </figure>
  );
}
