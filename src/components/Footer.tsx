import { Link } from "react-router-dom";
import { QrCode, Mail, Phone, MapPin, Cpu } from "lucide-react";

const Footer = () => (
  <footer className="bg-gradient-hero text-primary-foreground/80 border-t border-border/10">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">FF</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-primary-foreground">FruitFlow AI</h3>
              <p className="text-[9px] text-primary-foreground/40 leading-tight tracking-wide uppercase">iYarKai Tech Lab</p>
            </div>
          </div>
          <p className="text-sm text-primary-foreground/50 leading-relaxed">
            AI + IoT powered fruit supply chain intelligence. Barcode traceability and AI camera quality inspection.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary-foreground/40">AIoT DeepTech for Post-Harvest Intelligence</span>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-primary-foreground text-sm mb-4 uppercase tracking-wider">Traceability</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/batch-trace" className="hover:text-primary transition-colors flex items-center gap-2"><QrCode className="w-3 h-3" />Trace Batch</Link></li>
            <li><Link to="/farm-tracking" className="hover:text-primary transition-colors">Farm Tracking</Link></li>
            <li><Link to="/know-your-fruit" className="hover:text-primary transition-colors">Know Your Fruit</Link></li>
            <li><Link to="/consumer-portal" className="hover:text-primary transition-colors">Consumer Portal</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-primary-foreground text-sm mb-4 uppercase tracking-wider">Operations</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/cold-storage" className="hover:text-primary transition-colors">Ripening & Storage</Link></li>
            <li><Link to="/smart-container" className="hover:text-primary transition-colors">Cold Chain Transport</Link></li>
            <li><Link to="/warehouse" className="hover:text-primary transition-colors">Warehouse</Link></li>
            <li><Link to="/ai-grading" className="hover:text-primary transition-colors">AI Quality Grading</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-primary-foreground text-sm mb-4 uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" />info@iyarkai.com</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" />+91 98765 43210</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" />Chennai, Tamil Nadu, India</li>
          </ul>
          <div className="mt-5">
            <Link to="/contact" className="text-sm text-primary hover:text-primary-glow transition-colors font-medium">Book a Demo →</Link>
          </div>
        </div>
      </div>
      
      <div className="border-t border-primary-foreground/10 mt-12 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40">© 2026 FruitFlow AI by iYarKai Tech Lab (ITL). All rights reserved.</p>
          <div className="flex items-center gap-3 text-xs text-primary-foreground/40">
            <span className="px-2 py-1 rounded border border-primary-foreground/10">✓ GLOBALG.A.P</span>
            <span className="px-2 py-1 rounded border border-primary-foreground/10">✓ HACCP</span>
            <span className="px-2 py-1 rounded border border-primary-foreground/10">✓ ISO 22000</span>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-[10px] text-primary-foreground/25 tracking-widest uppercase">Powered by iYarKai Tech Lab — AIoT DeepTech for Post-Harvest Intelligence</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
