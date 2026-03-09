import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ExecutiveDashboardSection from "@/components/ExecutiveDashboardSection";
import SupplyChainJourneySection from "@/components/SupplyChainJourneySection";
import ScanCenterSection from "@/components/ScanCenterSection";
import AIInspectionSection from "@/components/AIInspectionSection";
import ModulesSection from "@/components/ModulesSection";
import IoTMonitoringSection from "@/components/IoTMonitoringSection";
import ShipmentTrackingSection from "@/components/ShipmentTrackingSection";
import ComplianceSection from "@/components/ComplianceSection";
import BusinessImpactSection from "@/components/BusinessImpactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <HeroSection />
    <ExecutiveDashboardSection />
    <SupplyChainJourneySection />
    <ScanCenterSection />
    <AIInspectionSection />
    <ModulesSection />
    <IoTMonitoringSection />
    <ComplianceSection />
    <BusinessImpactSection />
    <Footer />
  </div>
);

export default Index;
