import { AddressImpactProvider } from "@/components/AddressImpactContext";
import KauaiInternetLogo from "@/components/KauaiInternetLogo";
import SiteNav from "@/components/SiteNav";
import { siteConfig } from "@/lib/site";
import EmergencyBanner from "@/components/EmergencyBanner";
import Hero from "@/components/Hero";
import NetworkStatusBanner from "@/components/NetworkStatusBanner";
import HowNetworkWorksSection from "@/components/HowNetworkWorksSection";
import NetworkLayersSection from "@/components/NetworkLayersSection";
import WhyThisMattersSection from "@/components/WhyThisMattersSection";
import IslandModeSection from "@/components/IslandModeSection";
import NetworkMapSection from "@/components/NetworkMapSection";
import CommunityExperience from "@/components/CommunityExperience";
import NorthShorePilotSection from "@/components/NorthShorePilotSection";
import HostNodeSection from "@/components/HostNodeSection";
import TechnologySection from "@/components/TechnologySection";
import NetworkRoadmapSection from "@/components/NetworkRoadmapSection";
import CommunityResilienceSection from "@/components/CommunityResilienceSection";
import BuildWithUsSection from "@/components/BuildWithUsSection";
import WaysToHelpSection from "@/components/WaysToHelpSection";
import UseCasesSection from "@/components/UseCasesSection";
import InventoryPreview from "@/components/InventoryPreview";
import PartnerOpportunitiesSection from "@/components/PartnerOpportunitiesSection";
import SupportCTA from "@/components/SupportCTA";

export default function Home() {
  return (
    <AddressImpactProvider>
      <EmergencyBanner />
      <SiteNav />
      <Hero />
      <NetworkStatusBanner />
      <HowNetworkWorksSection />
      <NetworkLayersSection />
      <WhyThisMattersSection />
      <IslandModeSection />
      <NetworkMapSection />
      <CommunityExperience />
      <NorthShorePilotSection />
      <HostNodeSection />
      <TechnologySection />
      <NetworkRoadmapSection />
      <CommunityResilienceSection />
      <BuildWithUsSection />
      <WaysToHelpSection />
      <UseCasesSection />
      <InventoryPreview />
      <PartnerOpportunitiesSection />
      <SupportCTA />

      <footer className="bg-ocean-deep text-mist py-12 px-5 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <KauaiInternetLogo variant="light" />
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                {siteConfig.projectName} — a resilient communications network for Kauaʻi,
                shaped by neighbors, for neighbors.
              </p>
            </div>

            <div>
              <p className="font-semibold text-white text-sm mb-3">Explore</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#island-mode" className="hover:text-white transition-colors">Island Mode</a></li>
                <li><a href="/network" className="hover:text-white transition-colors">Network Status</a></li>
                <li><a href="#network-map" className="hover:text-white transition-colors">Network Map</a></li>
                <li><a href="#north-shore-pilot" className="hover:text-white transition-colors">North Shore Pilot</a></li>
                <li><a href="#technology" className="hover:text-white transition-colors">Technology</a></li>
                <li><a href="#host-node" className="hover:text-white transition-colors">Host a Node</a></li>
                <li><a href="#support" className="hover:text-white transition-colors">Get Involved</a></li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-white text-sm mb-3">Contact</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:hello@kauaiinternet.com" className="hover:text-white transition-colors">
                    hello@kauaiinternet.com
                  </a>
                </li>
                <li>Līhuʻe, Kauai, Hawaiʻi</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
            <p>&copy; {new Date().getFullYear()} Kauai Resilience Network. All rights reserved.</p>
            <p className="text-mist/70">
              Planning data is approximate — live, testing, and proposed statuses are labeled throughout.
            </p>
          </div>
        </div>
      </footer>
    </AddressImpactProvider>
  );
}
