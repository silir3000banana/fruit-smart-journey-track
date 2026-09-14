import { ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

type AppRole = Database['public']['Enums']['app_role'];

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: AppRole[];
}

const ProtectedRoute = ({ children, requiredRoles = [] }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div
          role="status"
          aria-label="Loading"
          className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRoles.length > 0 && profile && !requiredRoles.includes(profile.role)) {
    return (
      <div className="min-h-dvh flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-2">You don't have access to this page</h1>
          <p className="text-sm text-muted-foreground mb-6">
            This area is limited to {requiredRoles.map((r) => r.replace(/_/g, ' ')).join(' and ')} accounts.
            Ask your administrator if you need access.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate('/dashboard')}>Go to my dashboard</Button>
            <Button variant="outline" onClick={() => navigate(-1)}>Go back</Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

