import { useAuth } from "@/contexts/AuthContext";
import FarmerDashboard from "@/components/dashboards/FarmerDashboard";
import SupervisorDashboard from "@/components/dashboards/SupervisorDashboard";
import ColdStorageDashboard from "@/components/dashboards/ColdStorageDashboard";
import RipeningDashboard from "@/components/dashboards/RipeningDashboard";
import RetailerDashboard from "@/components/dashboards/RetailerDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import ComprehensiveFarmerDashboard from "@/components/dashboards/ComprehensiveFarmerDashboard";
import EnhancedRetailerDashboard from "@/components/dashboards/EnhancedRetailerDashboard";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Setting up your profile...</h2>
          <p className="text-muted-foreground">Please wait while we configure your dashboard.</p>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (profile.role) {
      case 'farmer':
        return <ComprehensiveFarmerDashboard />;
      case 'packhouse_manager':
      case 'quality_manager':
        return <SupervisorDashboard />;
      case 'warehouse_admin':
        return <ColdStorageDashboard />;
      case 'ripening_manager':
        return <RipeningDashboard />;
      case 'retail_manager':
        return <EnhancedRetailerDashboard />;
      case 'logistics_manager':
        return <SupervisorDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'consumer':
        return <RetailerDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  return renderDashboard();
};

export default Dashboard;