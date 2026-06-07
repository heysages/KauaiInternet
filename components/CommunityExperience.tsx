"use client";

import { useState } from "react";
import AddressImpactExplorer from "@/components/AddressImpactExplorer";
import { useAddressImpact } from "@/components/AddressImpactContext";
import CommunityConversationSection from "@/components/CommunityConversationSection";
import CommunityMap from "@/components/CommunityMap";
import ConnectivityExplorerSection from "@/components/ConnectivityExplorerSection";
import ProviderOverviewSection from "@/components/ProviderOverviewSection";

export default function CommunityExperience() {
  const { selectedLocation, futureProgress } = useAddressImpact();
  const [concernRefreshKey, setConcernRefreshKey] = useState(0);
  const [observationRefreshKey, setObservationRefreshKey] = useState(0);

  const handleConcernAdded = () => {
    setConcernRefreshKey((k) => k + 1);
  };

  const handleObservationAdded = () => {
    setObservationRefreshKey((k) => k + 1);
  };

  return (
    <>
      <ProviderOverviewSection />
      <ConnectivityExplorerSection onObservationAdded={handleObservationAdded} />
      <AddressImpactExplorer />
      <CommunityConversationSection onConcernAdded={handleConcernAdded} />
      <CommunityMap
        focusLocation={selectedLocation}
        futureProgress={futureProgress}
        concernRefreshKey={concernRefreshKey}
        observationRefreshKey={observationRefreshKey}
        onConcernAdded={handleConcernAdded}
        onObservationAdded={handleObservationAdded}
      />
    </>
  );
}
