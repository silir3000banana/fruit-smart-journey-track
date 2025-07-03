import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SmartHarvest</h1>
              <p className="text-xs text-muted-foreground">Value Chain Platform</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#overview" className="text-foreground hover:text-primary transition-colors">Overview</a>
            <a href="#modules" className="text-foreground hover:text-primary transition-colors">Modules</a>
            <a href="#solutions" className="text-foreground hover:text-primary transition-colors">Solutions</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">Demo</Button>
            <Button variant="hero" size="sm">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;