/**
 * Proposed service areas for the North Shore plan.
 * These polygons are the communities a hub is meant to serve.
 * They are not a measured radio footprint and not a promise of signal.
 */

export type CoverageStage = "pilot" | "expansion";

export type CoverageAreaProps = {
  id: string;
  name: string;
  stage: CoverageStage;
  note: string;
};

export const pilotHubs = {
  type: "FeatureCollection" as const,
  features: [
    hub("haena", "Hāʻena", -159.58, 22.22),
    hub("hanalei", "Hanalei", -159.5, 22.21),
    hub("princeville", "Princeville", -159.48, 22.22),
    hub("kilauea", "Kīlauea", -159.41, 22.21),
  ],
};

export const expansionHubs = {
  type: "FeatureCollection" as const,
  features: [
    hub("anahola", "Anahola", -159.32, 22.15),
    hub("kapaa", "Kapaʻa", -159.32, 22.08),
  ],
};

export const pilotLinks = {
  type: "FeatureCollection" as const,
  features: [
    link("haena-hanalei", [
      [-159.58, 22.22],
      [-159.5, 22.21],
    ]),
    link("hanalei-princeville", [
      [-159.5, 22.21],
      [-159.48, 22.22],
    ]),
    link("princeville-kilauea", [
      [-159.48, 22.22],
      [-159.41, 22.21],
    ]),
  ],
};

export const expansionLinks = {
  type: "FeatureCollection" as const,
  features: [
    link("kilauea-anahola", [
      [-159.41, 22.21],
      [-159.32, 22.15],
    ]),
    link("anahola-kapaa", [
      [-159.32, 22.15],
      [-159.32, 22.08],
    ]),
  ],
};

export const pilotServiceAreas = {
  type: "FeatureCollection" as const,
  features: [
    area("haena", "Hāʻena", "pilot", "End of the road, including Wainiha", [
      [-159.6, 22.219],
      [-159.568, 22.228],
      [-159.548, 22.216],
      [-159.555, 22.198],
      [-159.598, 22.202],
      [-159.6, 22.219],
    ]),
    area("hanalei", "Hanalei", "pilot", "The bay and the valley floor", [
      [-159.522, 22.214],
      [-159.485, 22.216],
      [-159.478, 22.196],
      [-159.505, 22.186],
      [-159.528, 22.196],
      [-159.522, 22.214],
    ]),
    area("princeville", "Princeville", "pilot", "The plateau above the bay", [
      [-159.498, 22.23],
      [-159.462, 22.228],
      [-159.458, 22.208],
      [-159.492, 22.206],
      [-159.498, 22.23],
    ]),
    area("kilauea", "Kīlauea", "pilot", "The town and the nearby coast", [
      [-159.43, 22.22],
      [-159.388, 22.218],
      [-159.384, 22.196],
      [-159.422, 22.19],
      [-159.43, 22.22],
    ]),
  ],
};

export const expansionServiceAreas = {
  type: "FeatureCollection" as const,
  features: [
    area("anahola", "Anahola", "expansion", "After the pilot corridor is working", [
      [-159.345, 22.165],
      [-159.3, 22.16],
      [-159.305, 22.135],
      [-159.348, 22.138],
      [-159.345, 22.165],
    ]),
    area("kapaa", "Kapaʻa", "expansion", "After the pilot corridor is working", [
      [-159.35, 22.1],
      [-159.3, 22.105],
      [-159.295, 22.06],
      [-159.345, 22.055],
      [-159.35, 22.1],
    ]),
  ],
};

export const pilotCoverageBounds: [[number, number], [number, number]] = [
  [-159.63, 22.17],
  [-159.36, 22.25],
];

export const expansionCoverageBounds: [[number, number], [number, number]] = [
  [-159.64, 22.03],
  [-159.27, 22.26],
];

function hub(id: string, name: string, lng: number, lat: number) {
  return {
    type: "Feature" as const,
    properties: { id, name },
    geometry: { type: "Point" as const, coordinates: [lng, lat] },
  };
}

function link(id: string, coordinates: [number, number][]) {
  return {
    type: "Feature" as const,
    properties: { id },
    geometry: { type: "LineString" as const, coordinates },
  };
}

function area(
  id: string,
  name: string,
  stage: CoverageStage,
  note: string,
  coordinates: [number, number][],
) {
  return {
    type: "Feature" as const,
    properties: { id, name, stage, note } satisfies CoverageAreaProps,
    geometry: { type: "Polygon" as const, coordinates: [coordinates] },
  };
}
