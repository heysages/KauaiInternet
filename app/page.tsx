import { AddressImpactProvider } from "@/components/AddressImpactContext";
import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import WhyThisMattersSection from "@/components/WhyThisMattersSection";
import ProblemSection from "@/components/ProblemSection";
import CommunityExperience from "@/components/CommunityExperience";
import PlanningToolsSection from "@/components/PlanningToolsSection";
import WaysToHelpSection from "@/components/WaysToHelpSection";
import ProjectRoadmapSection from "@/components/ProjectRoadmapSection";
import PilotPlanSection from "@/components/PilotPlanSection";
import UseCasesSection from "@/components/UseCasesSection";
import InventoryPreview from "@/components/InventoryPreview";
import BeneficiaryGrid from "@/components/BeneficiaryGrid";
import PartnerOpportunitiesSection from "@/components/PartnerOpportunitiesSection";
import DigitalTwinRoadmap from "@/components/DigitalTwinRoadmap";
import SupportCTA from "@/components/SupportCTA";

export default function Home() {
  return (
    <AddressImpactProvider>
      <SiteNav />
      <Hero />
      <WhyThisMattersSection />
      <ProblemSection />
      <CommunityExperience />
      <PlanningToolsSection />
      <WaysToHelpSection />
      <ProjectRoadmapSection />
      <PilotPlanSection />
      <UseCasesSection />
      <InventoryPreview />
      <BeneficiaryGrid />
      <PartnerOpportunitiesSection />
      <DigitalTwinRoadmap />
      <SupportCTA />

      <footer className="bg-ocean-deep text-mist py-12 px-5 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-amber-emergency/20 border border-amber-glow/30 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-glow" fill="currentColor">
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <p className="font-semibold text-white">Kauai Resilience Network</p>
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                A community-built blueprint for a more connected and resilient Kauai —
                shaped by neighbors, for neighbors.
              </p>
            </div>

            <div>
              <p className="font-semibold text-white text-sm mb-3">Explore</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#why" className="hover:text-white transition-colors">Why This Matters</a></li>
                <li><a href="#explore" className="hover:text-white transition-colors">Your Community</a></li>
                <li><a href="#providers" className="hover:text-white transition-colors">Connectivity Today</a></li>
                <li><a href="#connectivity" className="hover:text-white transition-colors">Connectivity Explorer</a></li>
                <li><a href="#conversation" className="hover:text-white transition-colors">Conversation</a></li>
                <li><a href="#map" className="hover:text-white transition-colors">Community Map</a></li>
                <li><a href="#planning" className="hover:text-white transition-colors">Planning Tools</a></li>
                <li><a href="#inventory" className="hover:text-white transition-colors">Inventory</a></li>
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
                <li>
                  <a href="#support" className="hover:text-white transition-colors">
                    Support the Vision
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
            <p>&copy; {new Date().getFullYear()} Kauai Resilience Network. All rights reserved.</p>
            <p className="text-mist/70">
              A community movement — with open planning tools for volunteers and neighbors.
            </p>
          </div>
        </div>
      </footer>
    </AddressImpactProvider>
  );
}
