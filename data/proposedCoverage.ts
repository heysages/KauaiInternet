/**
 * Proposed service areas for the North Shore plan.
 * These polygons are the communities a hub is meant to serve.
 * They are not a measured radio footprint and not a promise of signal.
 */

export type CoverageStage = "pilot" | "expansion" | "island";

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

/** Towns the 2024 public record already calls unreliable: Princeville west to Keʻē. */
export const phoneGapAreas = {
  type: "FeatureCollection" as const,
  features: pilotServiceAreas.features.filter(
    (feature) => feature.properties.id === "haena" || feature.properties.id === "hanalei",
  ),
};

/**
 * Pockets the 180° town radios do not face.
 * Illustrative sites for the gap-fill phase. Not surveyed, and not a signal contour.
 */
export const phoneFillAreas = {
  type: "FeatureCollection" as const,
  features: [
    area("kee", "Keʻē", "pilot", "End of the road, west of the Hāʻena radio", [
      [-159.604, 22.224],
      [-159.584, 22.226],
      [-159.582, 22.212],
      [-159.602, 22.21],
      [-159.604, 22.224],
    ]),
    area("wainiha-pocket", "Wainiha", "pilot", "The road between Hāʻena and Hanalei", [
      [-159.568, 22.214],
      [-159.538, 22.212],
      [-159.54, 22.196],
      [-159.57, 22.198],
      [-159.568, 22.214],
    ]),
    area("hanalei-valley", "Hanalei valley", "pilot", "Inland of the bay, behind the town radio", [
      [-159.512, 22.188],
      [-159.484, 22.186],
      [-159.486, 22.172],
      [-159.514, 22.174],
      [-159.512, 22.188],
    ]),
    area("princeville-road", "Princeville road", "pilot", "The drop from the plateau into Hanalei", [
      [-159.478, 22.22],
      [-159.456, 22.216],
      [-159.458, 22.202],
      [-159.48, 22.206],
      [-159.478, 22.22],
    ]),
    area("anini", "Anini", "pilot", "The coast between Princeville and Kīlauea", [
      [-159.47, 22.234],
      [-159.436, 22.232],
      [-159.438, 22.218],
      [-159.47, 22.22],
      [-159.47, 22.234],
    ]),
    area("kalihiwai", "Kalihiwai", "pilot", "The bay the town radios do not face", [
      [-159.436, 22.23],
      [-159.406, 22.228],
      [-159.408, 22.214],
      [-159.438, 22.216],
      [-159.436, 22.23],
    ]),
    area("kilauea-point", "Kīlauea point", "pilot", "The coast north of town", [
      [-159.414, 22.234],
      [-159.39, 22.232],
      [-159.392, 22.22],
      [-159.416, 22.222],
      [-159.414, 22.234],
    ]),
    area("moloaa", "Moloaʻa", "pilot", "East of Kīlauea, before the next corridor", [
      [-159.394, 22.2],
      [-159.366, 22.198],
      [-159.368, 22.182],
      [-159.396, 22.184],
      [-159.394, 22.2],
    ]),
  ],
};

export const phoneFillNodes = {
  type: "FeatureCollection" as const,
  features: [
    hub("kee", "Keʻē", -159.593, 22.218),
    hub("wainiha-pocket", "Wainiha", -159.554, 22.205),
    hub("hanalei-valley", "Hanalei valley", -159.499, 22.18),
    hub("princeville-road", "Princeville road", -159.468, 22.211),
    hub("anini", "Anini", -159.453, 22.226),
    hub("kalihiwai", "Kalihiwai", -159.422, 22.222),
    hub("kilauea-point", "Kīlauea point", -159.402, 22.227),
    hub("moloaa", "Moloaʻa", -159.381, 22.191),
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

/** Towns around the coast where people live. Not the mountains, Nāpali, or the canyon. */
export const islandHubs = {
  type: "FeatureCollection" as const,
  features: [
    hub("wailua", "Wailua", -159.34, 22.04),
    hub("lihue", "Līhuʻe", -159.37, 21.98),
    hub("koloa", "Kōloa", -159.47, 21.9),
    hub("kalaheo", "Kalaheo", -159.53, 21.92),
    hub("hanapepe", "Hanapēpē", -159.59, 21.91),
    hub("waimea", "Waimea", -159.67, 21.96),
    hub("kekaha", "Kekaha", -159.71, 21.97),
  ],
};

export const islandLinks = {
  type: "FeatureCollection" as const,
  features: [
    link("kapaa-wailua", [
      [-159.32, 22.08],
      [-159.34, 22.04],
    ]),
    link("wailua-lihue", [
      [-159.34, 22.04],
      [-159.37, 21.98],
    ]),
    link("lihue-koloa", [
      [-159.37, 21.98],
      [-159.47, 21.9],
    ]),
    link("koloa-kalaheo", [
      [-159.47, 21.9],
      [-159.53, 21.92],
    ]),
    link("kalaheo-hanapepe", [
      [-159.53, 21.92],
      [-159.59, 21.91],
    ]),
    link("hanapepe-waimea", [
      [-159.59, 21.91],
      [-159.67, 21.96],
    ]),
    link("waimea-kekaha", [
      [-159.67, 21.96],
      [-159.71, 21.97],
    ]),
  ],
};

export const islandServiceAreas = {
  type: "FeatureCollection" as const,
  features: [
    area("wailua", "Wailua", "island", "Homes along the river and the highway", [
      [-159.365, 22.058],
      [-159.318, 22.055],
      [-159.315, 22.022],
      [-159.362, 22.02],
      [-159.365, 22.058],
    ]),
    area("lihue", "Līhuʻe", "island", "The town, Hanamāʻulu, and the services people travel to", [
      [-159.4, 22.012],
      [-159.338, 22.008],
      [-159.332, 21.958],
      [-159.398, 21.952],
      [-159.4, 22.012],
    ]),
    area("koloa", "Kōloa / Poʻipū", "island", "The south-shore towns, not a resort network", [
      [-159.492, 21.918],
      [-159.442, 21.912],
      [-159.438, 21.868],
      [-159.488, 21.872],
      [-159.492, 21.918],
    ]),
    area("kalaheo", "Kalaheo", "island", "The ridge town on the way west", [
      [-159.552, 21.942],
      [-159.508, 21.94],
      [-159.505, 21.9],
      [-159.55, 21.902],
      [-159.552, 21.942],
    ]),
    area("hanapepe", "Hanapēpē", "island", "Hanapēpē and ʻEleʻele", [
      [-159.615, 21.925],
      [-159.568, 21.928],
      [-159.565, 21.888],
      [-159.612, 21.886],
      [-159.615, 21.925],
    ]),
    area("waimea", "Waimea", "island", "The west-end town at the river", [
      [-159.692, 21.978],
      [-159.648, 21.976],
      [-159.646, 21.938],
      [-159.69, 21.94],
      [-159.692, 21.978],
    ]),
    area("kekaha", "Kekaha", "island", "The last coastal town to the west", [
      [-159.732, 21.988],
      [-159.688, 21.982],
      [-159.69, 21.948],
      [-159.73, 21.952],
      [-159.732, 21.988],
    ]),
  ],
};

export const islandCoverageBounds: [[number, number], [number, number]] = [
  [-159.78, 21.84],
  [-159.28, 22.26],
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
