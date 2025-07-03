const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">SmartHarvest</h3>
                <p className="text-xs text-muted-foreground">Value Chain Platform</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Transforming post-harvest value chains with smart technology, 
              from farm to supermarket with international-grade compliance.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Farm Tracking</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cold Storage</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Smart Containers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI Grading</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Individual Modules</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Turnkey Solutions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Partnership Models</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Export Compliance</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@smartharvest.com</li>
              <li>+91 XXXXX XXXXX</li>
              <li>Bangalore, India</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 SmartHarvest Platform. All rights reserved. | Built for international export standards.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;