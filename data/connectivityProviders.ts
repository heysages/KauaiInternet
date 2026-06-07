import type { ConnectivityProvider } from "@/types/network";

/**
 * Provider overview — general service types only.
 * No address-level coverage claims. Encourage visitors to verify with providers.
 */
export const connectivityProviders: ConnectivityProvider[] = [
  {
    id: "hawaiian-telcom",
    name: "Hawaiian Telcom",
    serviceTypes: ["fiber-internet", "fixed-wireless"],
    description:
      "Primary local telecommunications provider serving Hawaiʻi with fiber and other services.",
    generalAvailability:
      "Fiber and internet services are offered on Kauai in many populated areas. Availability varies significantly by street address.",
    note: "Verify service at your address on the provider website — coverage is not uniform island-wide.",
  },
  {
    id: "spectrum",
    name: "Spectrum",
    serviceTypes: ["cable-internet", "fixed-wireless"],
    description: "National cable and internet provider with presence in Hawaiʻi markets.",
    generalAvailability:
      "Cable internet may be available in some Kauai communities. Not all neighborhoods are served.",
    note: "Address-level availability check required. We do not display coverage maps on this site.",
  },
  {
    id: "starlink",
    name: "Starlink",
    serviceTypes: ["satellite-internet"],
    description: "Low-earth-orbit satellite internet used by some Kauai residents and businesses.",
    generalAvailability:
      "Satellite service depends on clear sky view and equipment. Used as primary or backup connectivity in some areas.",
    note: "Community observations welcome — many residents report using Starlink where wired options are limited.",
  },
  {
    id: "t-mobile",
    name: "T-Mobile",
    serviceTypes: ["mobile-network"],
    description: "National mobile carrier with cellular service across parts of Kauai.",
    generalAvailability:
      "Mobile voice and data vary by location, terrain, and indoor conditions. Not a substitute for fixed broadband everywhere.",
    note: "Signal strength is location-specific. We do not publish coverage polygons.",
  },
  {
    id: "verizon",
    name: "Verizon",
    serviceTypes: ["mobile-network"],
    description: "National mobile carrier serving portions of the island.",
    generalAvailability:
      "Cellular coverage exists in many corridors but weak spots are common in valleys and remote areas.",
    note: "Verify at your location. Community outage reports help us understand real-world experience.",
  },
  {
    id: "att",
    name: "AT&T",
    serviceTypes: ["mobile-network"],
    description: "National mobile carrier with service in parts of Kauai.",
    generalAvailability:
      "Mobile connectivity available in many areas with significant variation by terrain and weather.",
    note: "No coverage guarantees displayed here — share your observations to help neighbors.",
  },
];

export const connectivityServiceLabels: Record<
  import("@/types/network").ConnectivityServiceType,
  string
> = {
  "fiber-internet": "Fiber Internet",
  "cable-internet": "Cable Internet",
  "fixed-wireless": "Fixed Wireless",
  "satellite-internet": "Satellite Internet",
  "mobile-network": "Mobile Networks",
  "emergency-comms": "Emergency Communications",
};
