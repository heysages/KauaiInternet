import { networkNodes } from "@/data/networkNodes";
import { networkLinks } from "@/data/networkLinks";
import { filterPublicLinks, filterPublicNodes } from "@/lib/networkVisibility";
import type { NetworkLink, NetworkNode } from "@/types/network";

export type TopologyNode = {
  id: string;
  label: string;
  nodeClass: string;
  x?: number;
  y?: number;
};

export type TopologyEdge = {
  id: string;
  from: string;
  to: string;
  medium: string;
  active: boolean;
};

export function buildTopologyGraph(options?: {
  disabledNodeIds?: string[];
  disabledLinkIds?: string[];
}): { nodes: TopologyNode[]; edges: TopologyEdge[] } {
  const disabledNodes = new Set(options?.disabledNodeIds ?? []);
  const disabledLinks = new Set(options?.disabledLinkIds ?? []);

  const nodes = filterPublicNodes(networkNodes)
    .filter((n) => !disabledNodes.has(n.id))
    .map((n) => ({
      id: n.id,
      label: n.name.replace(/ Planning Node| Candidate/g, ""),
      nodeClass: n.nodeClass,
    }));

  const nodeIds = new Set(nodes.map((n) => n.id));

  const edges = filterPublicLinks(networkLinks)
    .filter(
      (l) =>
        !disabledLinks.has(l.id) &&
        nodeIds.has(l.fromNodeId) &&
        nodeIds.has(l.toNodeId)
    )
    .map((l) => ({
      id: l.id,
      from: l.fromNodeId,
      to: l.toNodeId,
      medium: l.medium,
      active: l.operationalStatus !== "proposed" || !disabledLinks.has(l.id),
    }));

  return { nodes, edges };
}

/** Demo route using existing planning nodes */
export const demoRoute = {
  from: "Princeville",
  to: "Kapaʻa",
  fromNodeId: "node-princeville-plan",
  toNodeId: "node-kapaa-plan",
  normalPath: [
    "node-princeville-plan",
    "node-kilauea-plan",
    "node-anahola-plan",
    "node-kapaa-plan",
  ],
  labels: ["Princeville", "Kīlauea", "Anahola", "Kapaʻa"],
  failureScenario: {
    label: "Kīlauea backbone unavailable",
    disabledNodeId: "node-kilauea-plan",
  },
};

export function findAlternatePath(
  fromId: string,
  toId: string,
  disabledLinkIds: string[]
): string[] | null {
  const { edges } = buildTopologyGraph({ disabledLinkIds });
  const adj = new Map<string, string[]>();
  for (const e of edges) {
    if (!adj.has(e.from)) adj.set(e.from, []);
    adj.get(e.from)!.push(e.to);
    if (!adj.has(e.to)) adj.set(e.to, []);
    adj.get(e.to)!.push(e.from);
  }

  const queue: { id: string; path: string[] }[] = [{ id: fromId, path: [fromId] }];
  const visited = new Set<string>([fromId]);

  while (queue.length > 0) {
    const { id, path } = queue.shift()!;
    if (id === toId) return path;
    for (const next of adj.get(id) ?? []) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push({ id: next, path: [...path, next] });
      }
    }
  }
  return null;
}

export function getNodeLabel(nodeId: string): string {
  const n = networkNodes.find((x) => x.id === nodeId);
  return n?.name ?? nodeId;
}

export function getNeighborNodes(nodeId: string): NetworkNode[] {
  const ids = new Set<string>();
  for (const l of networkLinks) {
    if (l.fromNodeId === nodeId) ids.add(l.toNodeId);
    if (l.toNodeId === nodeId) ids.add(l.fromNodeId);
  }
  return networkNodes.filter((n) => ids.has(n.id));
}

export function getLinkBetween(a: string, b: string): NetworkLink | undefined {
  return networkLinks.find(
    (l) =>
      (l.fromNodeId === a && l.toNodeId === b) ||
      (l.fromNodeId === b && l.toNodeId === a)
  );
}
