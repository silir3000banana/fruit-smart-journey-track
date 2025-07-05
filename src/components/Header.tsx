import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SmartHarvest</h1>
              <p className="text-xs text-muted-foreground">Value Chain Platform</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#modules" className="text-foreground hover:text-primary transition-colors">Modules</a>
            <a href="/ai-grading" className="text-foreground hover:text-primary transition-colors">AI Grading</a>
            <a href="/smart-container" className="text-foreground hover:text-primary transition-colors">Smart Container</a>
            <a href="/cold-storage" className="text-foreground hover:text-primary transition-colors">Cold Storage</a>
            <a href="/pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
            <a href="/contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                  🏠 Dashboard
                </Button>
                <Button variant="ghost" size="sm" onClick={() => navigate('/profile')}>
                  👤 Profile
                </Button>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate('/contact')}>
                  Book Demo
                </Button>
                <Button variant="hero" size="sm" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;