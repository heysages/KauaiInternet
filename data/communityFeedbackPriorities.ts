import type { CommunityFeedbackPriority } from "@/types/network";

export const communityFeedbackPriorities: {
  id: CommunityFeedbackPriority;
  label: string;
}[] = [
  { id: "emergency-readiness", label: "Emergency readiness" },
  { id: "community-wifi", label: "Community Wi-Fi" },
  { id: "connectivity-options", label: "Connectivity options" },
  { id: "school-support", label: "School support" },
  { id: "gathering-spaces", label: "Public gathering spaces" },
  { id: "neighborhood-resilience", label: "Neighborhood resilience" },
  { id: "other", label: "Other" },
];
