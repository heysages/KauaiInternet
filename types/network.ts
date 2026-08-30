/** Core domain types for the Kauai Resilience Network data model. */

export type NetworkAssetCategory =
  | "routing-switching"
  | "wireless-backhaul"
  | "access-points-radios"
  | "antennas"
  | "power-rack"
  | "edge-compute"
  | "backup-internet"
  | "batteries-resilience";

export type EquipmentDisposition =
  | "available"
  | "allocated"
  | "staging"
  | "deployed";

export type EquipmentItem = {
  id: string;
  name: string;
  category: NetworkAssetCategory;
  quantity: number;
  disposition: EquipmentDisposition;
  useCaseIds: string[];
  notes?: string;
  manufacturer?: string;
};

export type CandidateSiteType =
  | "emergency-anchor"
  | "community-anchor"
  | "high-site-ridge"
  | "data-center-edge"
  | "public-wifi-zone"
  | "backup-uplink"
  | "partner-hosted";

export type CandidateSiteStatus =
  | "proposed"
  | "under-review"
  | "approved"
  | "active"
  | "staging";

export type CandidateSite = {
  id: string;
  name: string;
  type: CandidateSiteType;
  /** Generalized coordinate — not exact infrastructure location */
  lat: number;
  lng: number;
  status: CandidateSiteStatus;
  description: string;
  /** Plain-language area label, e.g. "East Kauai · approximate" */
  areaLabel: string;
  /** Why this area or site type may matter for resilience planning */
  whyItMatters: string;
  elevation?: string;
  partnerName?: string;
  /** Rough population estimate this site could serve in planning scenarios */
  populationServed?: number;
};

export type DataConfidence = "verified" | "community" | "future-opportunity";

export type MapLayerId =
  | "existing-infrastructure"
  | "existing-connectivity"
  | "island-assets"
  | "what-residents-know"
  | "future-opportunities"
  | "candidate-sites"
  | "emergency-resilience"
  | "public-wifi"
  | "edge-compute"
  | "future-data-center"
  | "community-support"
  | "volunteer-opportunities"
  | "community-concerns"
  | "technology-options";

export type MapLayer = {
  id: MapLayerId;
  name: string;
  description: string;
  color: string;
  enabled: boolean;
  /** Candidate site types rendered when this layer is active */
  siteTypes?: CandidateSiteType[];
  /** When true, layer shows all candidate sites */
  isAllSitesLayer?: boolean;
  /** When true, layer shows legacy infrastructure points (deprecated) */
  isInfrastructureLayer?: boolean;
  /** When true, layer shows verified island assets */
  isIslandAssetsLayer?: boolean;
  /** When true, layer shows resident knowledge observations */
  isResidentKnowledgeLayer?: boolean;
  /** When true, layer shows future opportunity sites only */
  isFutureOpportunitiesLayer?: boolean;
  /** When true, layer shows region connectivity overlays */
  isConnectivityRegionLayer?: boolean;
  /** When true, layer shows community support markers */
  isSupportLayer?: boolean;
  /** When true, layer shows community questions & concerns markers */
  isConcernLayer?: boolean;
  /** When true, enabling shows technology option sub-toggles */
  isTechnologyLayer?: boolean;
};

export type ConnectivityServiceType =
  | "fiber-internet"
  | "cable-internet"
  | "fixed-wireless"
  | "satellite-internet"
  | "mobile-network"
  | "emergency-comms";

export type ConnectivityProvider = {
  id: string;
  name: string;
  serviceTypes: ConnectivityServiceType[];
  description: string;
  generalAvailability: string;
  note: string;
};

export type IslandAssetCategory =
  | "school"
  | "library"
  | "community-center"
  | "emergency-shelter"
  | "healthcare"
  | "public-safety"
  | "population-center"
  | "transportation";

export type IslandAsset = {
  id: string;
  name: string;
  category: IslandAssetCategory;
  lat: number;
  lng: number;
  areaLabel: string;
  description: string;
  sourceNote: string;
  dataConfidence: "verified";
};

export type ResidentObservationType =
  | "strong-connectivity"
  | "weak-connectivity"
  | "frequent-outages"
  | "storm-issues"
  | "backup-power"
  | "starlink-usage"
  | "community-wifi"
  | "emergency-comms";

export type ResidentObservation = {
  id: string;
  observationType: ResidentObservationType;
  message: string;
  lat: number;
  lng: number;
  locationLabel: string;
  nameOrOrg?: string;
  createdAt: string;
  source: "mock" | "visitor";
  dataConfidence: "community";
};

export type RegionConnectivityProfile = {
  regionId: string;
  knownServiceTypes: ConnectivityServiceType[];
  providerNotes: string[];
  communityObservations: string[];
  dataNeeded: string[];
  resilienceConsiderations: string[];
  opportunityQuestions: string[];
};

export type ConcernCategory =
  | "health-emf"
  | "environmental-impact"
  | "visual-impact"
  | "privacy"
  | "emergency-preparedness"
  | "cultural-stewardship"
  | "community-benefits"
  | "tourism-impact"
  | "questions-ideas";

export type CommunityConcernMarker = {
  id: string;
  nameOrOrg: string;
  email?: string;
  category: ConcernCategory;
  message: string;
  lat: number;
  lng: number;
  locationLabel: string;
  mayContact: boolean;
  createdAt: string;
  source: "mock" | "visitor";
};

export type TechnologyOptionId =
  | "fiber"
  | "fixed-wireless"
  | "point-to-point"
  | "community-wifi"
  | "starlink-backup"
  | "edge-computing"
  | "local-data-storage"
  | "emergency-comms"
  | "public-safety";

export type TechnologyOption = {
  id: TechnologyOptionId;
  name: string;
  description: string;
  color: string;
  enabled: boolean;
  /** Candidate site types highlighted when this option is toggled on */
  siteTypes?: CandidateSiteType[];
  /** Existing infrastructure types highlighted */
  infraTypes?: ExistingInfrastructure["type"][];
  /** When true, show planning connection lines */
  showConnections?: boolean;
};

export type PlanningScenarioId =
  | "resident"
  | "emergency-services"
  | "tourism"
  | "economic-development"
  | "digital-sovereignty";

export type PlanningScenario = {
  id: PlanningScenarioId;
  name: string;
  description: string;
  /** Layers enabled when this scenario is selected */
  enabledLayers: MapLayerId[];
  /** Layers visually emphasized in the UI */
  emphasizedLayers: MapLayerId[];
};

export type MapTown = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

/** @deprecated Unverified point locations removed — use island assets and region profiles */
export type ExistingInfrastructure = {
  id: string;
  name: string;
  type: "fiber-hub" | "cell-tower" | "isp-pop" | "utility-substation";
  lat: number;
  lng: number;
  description: string;
  operator?: string;
  dataConfidence?: DataConfidence;
};

export type SitePlanningDetail = {
  siteId: string;
  potentialBenefits: string[];
  challenges: string[];
  equipmentIds: string[];
  commentIds: string[];
  /** Plain-language coverage radius or corridor description */
  potentialCoverage?: string;
  /** Simulated resilience impact 0–100 for planning displays */
  resilienceImpactPercent?: number;
};

export type PlatformLayerId = "vision" | "community" | "infrastructure";

export type VisionScoreSet = {
  resilience: number;
  communityImpact: number;
  emergencyReadiness: number;
  economicImpact: number;
};

export type VisionStory = {
  id: string;
  title: string;
  description: string;
  icon: "storm" | "comms" | "school" | "tourism" | "sovereignty" | "remote";
};

export type PlaceSearchType =
  | "home"
  | "business"
  | "school"
  | "neighborhood"
  | "landmark";

export type SampleAddress = {
  id: string;
  address: string;
  lat: number;
  lng: number;
  neighborhood: string;
  placeType: "residential" | "business" | "school" | "public" | "landmark";
  source?: "sample" | "geocoded";
  searchType?: PlaceSearchType;
};

export type CommunityScoreSet = {
  connectivity: number;
  emergencyReadiness: number;
  communityResources: number;
  resilience: number;
  participationOpportunities: number;
};

export type AddressImpactReport = {
  headline: string;
  summary: string;
  scores: CommunityScoreSet;
  connectivityOptions: string[];
  nearbyAssets: { id: string; name: string; category: string; km: number }[];
  emergencyResources: string[];
  participationOpportunities: { id: string; label: string; description: string; href: string }[];
  futureProjects: { id: string; name: string; area: string; km: number }[];
  futureBenefits: string[];
};

export type CommunityFeedbackPriority =
  | "emergency-readiness"
  | "community-wifi"
  | "connectivity-options"
  | "school-support"
  | "gathering-spaces"
  | "neighborhood-resilience"
  | "other";

export type GeocodeResult = {
  id: string;
  label: string;
  lat: number;
  lng: number;
  neighborhood: string;
  placeType: SampleAddress["placeType"];
};

export type PropertyImpactSnapshot = {
  resilienceScore: number;
  nearbySiteIds: string[];
  emergencyResources: string[];
  coverageImprovements: string[];
  communityBenefitEstimate: string;
  propertyHelpCategories: string[];
};

export type PropertyHelpCategory = {
  id: string;
  label: string;
  description: string;
  icon: string;
};

export type DigitalTwinPhase = {
  phase: number;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  status: "current" | "next" | "future";
};

export type MapDisplayOptions = {
  terrain: boolean;
  towns: boolean;
  majorRoads: boolean;
};

export type MapPlanningStats = {
  populationServed: number;
  candidateSites: number;
  resilienceImpactPercent: number;
  coverageZones: number;
};

export type SupportType =
  | "resident"
  | "business"
  | "emergency-services"
  | "land-site-owner"
  | "nonprofit"
  | "government"
  | "visitor"
  | "technical-volunteer";

export type SupportMarker = {
  id: string;
  nameOrOrg: string;
  email?: string;
  supportType: SupportType;
  message: string;
  lat: number;
  lng: number;
  locationLabel: string;
  mayContact: boolean;
  createdAt: string;
  source: "mock" | "visitor";
};

export type MapRegion = {
  id: string;
  name: string;
  description: string;
  whyItMatters: string;
  /** GeoJSON polygon coordinates [lng, lat][] */
  polygon: [number, number][];
  fillColor: string;
};

export type SupportComment = {
  id: string;
  name: string;
  location: string;
  text: string;
  date: string;
  moderated: boolean;
};

export type PartnerType = {
  id: string;
  label: string;
  description: string;
};

export type UseCase = {
  id: string;
  title: string;
  description: string;
  category: NetworkAssetCategory;
  /** How this gear could support a pilot — not a claim of full deployment */
  pilotRole: string;
};

export type InventoryStats = {
  totalUnits: number;
  uniqueSkus: number;
  categoriesRepresented: number;
  dispositionAvailable: number;
};

export type SupportSubmission = {
  id: string;
  name: string;
  organization?: string;
  email: string;
  supportType: SupportType;
  helpMessage: string;
  location: string;
  mayContact: boolean;
  createdAt: string;
};

/* ─── Resilient Communications Network (Phase 2) ─── */

export type OperationalStatus =
  | "live"
  | "testing"
  | "planned"
  | "proposed"
  | "simulated"
  | "experimental";

export type NetworkLayerId = "internet" | "kauaiLocal" | "resilientRadio";

export type NodeClass = "K1" | "K2" | "K3" | "K4" | "K5";

export type LinkMedium =
  | "fiber"
  | "microwave"
  | "fixedWireless"
  | "wifi"
  | "lora"
  | "radio"
  | "satellite"
  | "internetBackhaul"
  | "reticulumLogical";

export type SitePermissionStatus =
  | "known"
  | "potential"
  | "permissionRequired"
  | "historic"
  | "activePartner";

export type VisibilityLevel =
  | "public"
  | "approximate"
  | "members"
  | "operations"
  | "adminOnly";

export type NetworkMode = "global" | "island" | "emergencyMesh";

export type MessagePriority = "P0" | "P1" | "P2" | "P3" | "P4" | "P5";

export type NetworkNodeRole =
  | "backbone"
  | "loraRelay"
  | "reticulumTransport"
  | "wifiNode"
  | "fixedWireless"
  | "microwaveLink"
  | "internetGateway"
  | "satelliteGateway"
  | "localService"
  | "emergencyComms"
  | "voiceRepeater"
  | "communityHub";

export type NetworkNode = {
  id: string;
  name: string;
  nodeClass: NodeClass;
  roles: NetworkNodeRole[];
  networkLayers: NetworkLayerId[];
  operationalStatus: OperationalStatus;
  permissionStatus: SitePermissionStatus;
  visibility: VisibilityLevel;
  lat: number;
  lng: number;
  /** Generalized area label — not exact infrastructure position */
  areaLabel: string;
  elevation?: string;
  planningAreaId?: string;
  description: string;
  whyItMatters: string;
  /** Links to legacy candidate site when mapped from planning data */
  candidateSiteId?: string;
  power?: { grid?: boolean; solar?: boolean; battery?: boolean; generator?: boolean };
  radios?: string[];
  populationServed?: number;
};

export type NetworkLink = {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  medium: LinkMedium;
  operationalStatus: OperationalStatus;
  visibility: VisibilityLevel;
  label?: string;
  bidirectional?: boolean;
};

export type PlanningArea = {
  id: string;
  name: string;
  description: string;
  /** Approximate center for map highlighting */
  lat: number;
  lng: number;
  region: "north" | "east" | "central" | "west" | "south";
};

export type RadioSiteResearch = {
  id: string;
  name: string;
  type: "amateurRepeater" | "fmBroadcast" | "commercialTower" | "publicSafety" | "utility" | "historic";
  permissionStatus: SitePermissionStatus;
  operationalStatus: OperationalStatus;
  lat: number;
  lng: number;
  areaLabel: string;
  notes: string;
  source?: string;
};

export type NodeApplicationInput = {
  name: string;
  email: string;
  phone?: string;
  locationLabel: string;
  siteType: string;
  elevation?: string;
  hasPower: boolean;
  hasInternet: boolean;
  hasRoofOrTower: boolean;
  hasSolar: boolean;
  hasBackupPower: boolean;
  willingToHostAntennas: boolean;
  technicalHelp?: boolean;
  sponsorInterest?: boolean;
  pilotInterest?: boolean;
  message?: string;
  mayContact: boolean;
};

export type CommunityReportCategory =
  | "roadBlocked"
  | "powerOut"
  | "treeDown"
  | "flooding"
  | "bridgeClosed"
  | "fire"
  | "cellDown"
  | "internetDown"
  | "needHelp"
  | "safeCheckIn"
  | "infrastructure";

export type CommunityReport = {
  id: string;
  category: CommunityReportCategory;
  description: string;
  lat?: number;
  lng?: number;
  locationLabel?: string;
  verificationCount: number;
  confidence: "unverified" | "community" | "verified";
  moderationState: "pending" | "approved" | "rejected" | "expired";
  createdAt: string;
};

export type NetworkStatusComponent = {
  label: string;
  online: number | null;
  total: number | null;
  status: OperationalStatus;
  detail?: string;
};

export type NetworkStatusSnapshot = {
  mode: NetworkMode;
  dataSource: "unavailable" | "simulated" | "live";
  updatedAt: string | null;
  components: NetworkStatusComponent[];
  localNetworkStatus: OperationalStatus;
  internetStatus: OperationalStatus;
  emergencyMessagingStatus: OperationalStatus;
};

export type NetworkMapLayerId =
  | "existing-fiber"
  | "existing-towers"
  | "existing-radio"
  | "proposed-backbone"
  | "proposed-lora"
  | "proposed-reticulum"
  | "proposed-wifi"
  | "proposed-gateway"
  | "proposed-emergency"
  | "network-links";

export type NetworkMapLayer = {
  id: NetworkMapLayerId;
  name: string;
  description: string;
  color: string;
  enabled: boolean;
  category: "existing" | "proposed" | "links";
  nodeRoles?: NetworkNodeRole[];
  linkMediums?: LinkMedium[];
};

export type HardwareKitConcept = {
  id: string;
  name: string;
  tagline: string;
  nodeClass: NodeClass;
  priceRange?: string;
  features: string[];
  status: OperationalStatus;
};

export type NetworkRoadmapPhase = {
  phase: number;
  title: string;
  summary: string;
  status: "current" | "next" | "future" | "complete";
  outcomes: string[];
};
