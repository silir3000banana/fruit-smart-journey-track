import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ModulesSection from "@/components/ModulesSection";
import ComplianceSection from "@/components/ComplianceSection";
import BusinessModelsSection from "@/components/BusinessModelsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ModulesSection />
      <ComplianceSection />
      <BusinessModelsSection />
      <Footer />
    </div>
  );
};

export default Index;
