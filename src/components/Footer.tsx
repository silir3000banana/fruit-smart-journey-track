import { Link } from "react-router-dom";
import { QrCode, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-lg">S3</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Silir3000</h3>
                <p className="text-[10px] text-muted-foreground leading-tight">by iYarKai Tech Lab</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-IoT enabled Smart Banana Supply Chain & Fruit Ripening Management Platform. 
              End-to-end traceability from farm to retail.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Traceability</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/batch-trace" className="hover:text-primary transition-colors flex items-center gap-2">
                  <QrCode className="w-3 h-3" />
                  Trace Batch
                </Link>
              </li>
              <li><Link to="/farm-tracking" className="hover:text-primary transition-colors">Farm Tracking</Link></li>
              <li><Link to="/packing-logistics" className="hover:text-primary transition-colors">Post-Harvest</Link></li>
              <li><Link to="/consumer-portal" className="hover:text-primary transition-colors">Consumer Portal</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Operations</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/cold-storage" className="hover:text-primary transition-colors">Ripening & Storage</Link></li>
              <li><Link to="/smart-container" className="hover:text-primary transition-colors">Cold Chain Transport</Link></li>
              <li><Link to="/warehouse" className="hover:text-primary transition-colors">Warehouse</Link></li>
              <li><Link to="/ai-grading" className="hover:text-primary transition-colors">AI Quality Grading</Link></li>
              <li><Link to="/analytics" className="hover:text-primary transition-colors">Analytics</Link></li>
              <li><Link to="/alerts" className="hover:text-primary transition-colors">Alerts</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                info@iyarkai.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Chennai, Tamil Nadu, India
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/contact" className="text-sm text-primary hover:underline">
                Book a Demo →
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Silir3000 by iYarKai Tech Lab (ITL). All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded">
                ✓ GLOBALG.A.P
              </span>
              <span className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded">
                ✓ HACCP
              </span>
              <span className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded">
                ✓ ISO 22000
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
