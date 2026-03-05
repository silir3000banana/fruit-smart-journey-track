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
import KnowYourFruit from "./pages/consumer/KnowYourFruit";
import FruitJourney from "./pages/consumer/FruitJourney";
import Warehouse from "./pages/Warehouse";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// Silir SaaS pages
import SilirLayout from "./components/SilirLayout";
import SilirDashboard from "./pages/silir/SilirDashboard";
import Operations from "./pages/silir/Operations";
import Facilities from "./pages/silir/Facilities";
import QualityAI from "./pages/silir/QualityAI";
import Inventory from "./pages/silir/Inventory";
import Dispatch from "./pages/silir/Dispatch";
import Traceability from "./pages/silir/Traceability";
import Reports from "./pages/silir/Reports";
import SilirAdmin from "./pages/silir/SilirAdmin";

const queryClient = new QueryClient();

const SilirPage = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <SilirLayout>{children}</SilirLayout>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/consumer-portal" element={<ConsumerPortal />} />
            <Route path="/batch-trace" element={<BatchTrace />} />

            {/* Silir SaaS prototype routes */}
            <Route path="/silir" element={<SilirPage><SilirDashboard /></SilirPage>} />
            <Route path="/silir/operations" element={<SilirPage><Operations /></SilirPage>} />
            <Route path="/silir/facilities" element={<SilirPage><Facilities /></SilirPage>} />
            <Route path="/silir/quality-ai" element={<SilirPage><QualityAI /></SilirPage>} />
            <Route path="/silir/inventory" element={<SilirPage><Inventory /></SilirPage>} />
            <Route path="/silir/dispatch" element={<SilirPage><Dispatch /></SilirPage>} />
            <Route path="/silir/traceability" element={<SilirPage><Traceability /></SilirPage>} />
            <Route path="/silir/reports" element={<SilirPage><Reports /></SilirPage>} />
            <Route path="/silir/admin" element={<SilirPage><SilirAdmin /></SilirPage>} />

            {/* Protected routes - require authentication */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/harvest" element={<ProtectedRoute><HarvestModule /></ProtectedRoute>} />
            <Route path="/ai-grading" element={<ProtectedRoute><AIGrading /></ProtectedRoute>} />
            <Route path="/smart-container" element={<ProtectedRoute><SmartContainer /></ProtectedRoute>} />
            <Route path="/cold-storage" element={<ProtectedRoute><ColdStorage /></ProtectedRoute>} />
            <Route path="/farm-tracking" element={<ProtectedRoute><FarmLevelTracking /></ProtectedRoute>} />
            <Route path="/farm-tracking/harvest-entry" element={<ProtectedRoute><HarvestEntry /></ProtectedRoute>} />
            <Route path="/farm-tracking/lot-management" element={<ProtectedRoute><LotManagement /></ProtectedRoute>} />
            <Route path="/farm-tracking/qr-generation" element={<ProtectedRoute><QRGeneration /></ProtectedRoute>} />
            <Route path="/farm-tracking/field-mapping" element={<ProtectedRoute><FieldMapping /></ProtectedRoute>} />
            <Route path="/location-scanning" element={<ProtectedRoute><LocationScanning /></ProtectedRoute>} />
            <Route path="/ai-assessment" element={<ProtectedRoute><AIQualityAssessment /></ProtectedRoute>} />
            <Route path="/waterproof-tagging" element={<ProtectedRoute><WaterproofTagging /></ProtectedRoute>} />
            <Route path="/packing-logistics" element={<ProtectedRoute><PackingLogistics /></ProtectedRoute>} />
            <Route path="/compliance-certification" element={<ProtectedRoute><ComplianceCertification /></ProtectedRoute>} />
            <Route path="/warehouse" element={<ProtectedRoute><Warehouse /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute requiredRoles={['admin', 'quality_manager']}><Analytics /></ProtectedRoute>} />
            <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
