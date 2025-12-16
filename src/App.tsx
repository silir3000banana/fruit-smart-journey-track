import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import HarvestModule from "./components/dashboards/HarvestModule";
import AIGrading from "./pages/AIGrading";
import SmartContainer from "./pages/SmartContainer";
import ColdStorage from "./pages/ColdStorage";
import FarmLevelTracking from "./pages/FarmLevelTracking/index";
import HarvestEntry from "./pages/FarmLevelTracking/HarvestEntry";
import LotManagement from "./pages/FarmLevelTracking/LotManagement";
import QRGeneration from "./pages/FarmLevelTracking/QRGeneration";
import FieldMapping from "./pages/FarmLevelTracking/FieldMapping";
import LocationScanning from "./pages/LocationScanning";
import AIQualityAssessment from "./pages/AIQualityAssessment";
import WaterproofTagging from "./pages/WaterproofTagging";
import PackingLogistics from "./pages/PackingLogistics";
import ComplianceCertification from "./pages/ComplianceCertification";
import ConsumerPortal from "./pages/ConsumerPortal";
import BatchTrace from "./pages/BatchTrace";
import Warehouse from "./pages/Warehouse";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/harvest" element={<HarvestModule />} />
            <Route path="/ai-grading" element={<AIGrading />} />
            <Route path="/smart-container" element={<SmartContainer />} />
            <Route path="/cold-storage" element={<ColdStorage />} />
            <Route path="/farm-tracking" element={<FarmLevelTracking />} />
            <Route path="/farm-tracking/harvest-entry" element={<HarvestEntry />} />
            <Route path="/farm-tracking/lot-management" element={<LotManagement />} />
            <Route path="/farm-tracking/qr-generation" element={<QRGeneration />} />
            <Route path="/farm-tracking/field-mapping" element={<FieldMapping />} />
            <Route path="/location-scanning" element={<LocationScanning />} />
            <Route path="/ai-assessment" element={<AIQualityAssessment />} />
            <Route path="/waterproof-tagging" element={<WaterproofTagging />} />
            <Route path="/packing-logistics" element={<PackingLogistics />} />
            <Route path="/compliance-certification" element={<ComplianceCertification />} />
            <Route path="/consumer-portal" element={<ConsumerPortal />} />
            <Route path="/batch-trace" element={<BatchTrace />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/alerts" element={<Alerts />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
