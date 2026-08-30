import type { NetworkNode, NetworkLink, VisibilityLevel } from "@/types/network";

const FUZZ_DEGREES = 0.008;

export function canShowPublicly(visibility: VisibilityLevel): boolean {
  return visibility === "public" || visibility === "approximate";
}

export function fuzzCoordinate(value: number, seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash << 5) - hash + seed.charCodeAt(i);
  const offset = ((hash % 1000) / 1000 - 0.5) * FUZZ_DEGREES * 2;
  return value + offset;
}

export function getPublicNode(node: NetworkNode): NetworkNode {
  if (node.visibility === "public") return node;
  if (node.visibility === "approximate") {
    return {
      ...node,
      lat: fuzzCoordinate(node.lat, node.id + "lat"),
      lng: fuzzCoordinate(node.lng, node.id + "lng"),
    };
  }
  return node;
}

export function filterPublicNodes(nodes: NetworkNode[]): NetworkNode[] {
  return nodes.filter((n) => canShowPublicly(n.visibility)).map(getPublicNode);
}

export function filterPublicLinks(links: NetworkLink[]): NetworkLink[] {
  return links.filter((l) => canShowPublicly(l.visibility));
}

export function maskAdminFields<T extends Record<string, unknown>>(
  obj: T,
  fields: (keyof T)[]
): Partial<T> {
  const out = { ...obj };
  for (const f of fields) delete out[f];
  return out;
}
