import type { ExistingInfrastructure } from "@/types/network";

/**
 * Unverified point locations (towers, fiber hubs) are intentionally NOT published.
 * Use islandAssets + regionConnectivity for grounded existing knowledge.
 */
export const existingInfrastructure: ExistingInfrastructure[] = [];
