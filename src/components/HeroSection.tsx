import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { QrCode, ArrowRight, Shield, Leaf, Truck, Store } from "lucide-react";
import heroImage from "@/assets/hero-farm-to-retail.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle">
      <div className="absolute inset-0 opacity-10">
        <img 
          src={heroImage} 
          alt="Smart Agriculture Platform" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-2xl">🍌</span>
              <span className="text-sm font-medium text-primary">Silir3000 by iYarKai Tech Lab</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              End-to-End
              <span className="bg-gradient-primary bg-clip-text text-transparent block">
                Farm to Retail Traceability
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              AI-IoT enabled Smart Banana Supply Chain & Fruit Ripening Management Platform. 
              Complete post-harvest visibility with GLOBALG.A.P, HACCP, ISO 22000 compliance.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-6 group"
                onClick={() => navigate('/batch-trace')}
              >
                <QrCode className="w-5 h-5 mr-2" />
                Trace a Batch
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => navigate('/contact')}
              >
                Book Free Demo
              </Button>
            </div>

            {/* Traceability Journey Visual */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 mb-12 max-w-4xl mx-auto">
              <p className="text-sm text-muted-foreground mb-4">Complete Supply Chain Traceability</p>
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-success/10 border border-success/20">
                  <Leaf className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium">Farm</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-sm">📦</span>
                  <span className="text-sm font-medium">Post-Harvest</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-warning/10 border border-warning/20">
                  <span className="text-sm">🍌</span>
                  <span className="text-sm font-medium">Ripening</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-info/10 border border-info/20">
                  <Truck className="w-4 h-4 text-info" />
                  <span className="text-sm font-medium">Transport</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-secondary">
                  <span className="text-sm">🏭</span>
                  <span className="text-sm font-medium">Warehouse</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-success/10 border border-success/20">
                  <Store className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium">Retail</span>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center animate-float">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Traceability</div>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="text-3xl font-bold text-primary mb-2">50%</div>
                <div className="text-sm text-muted-foreground">Waste Reduction</div>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-sm text-muted-foreground">Tracked Stages</div>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center justify-center gap-1 text-3xl font-bold text-primary mb-2">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="text-sm text-muted-foreground">Export Compliant</div>
              </div>
            </div>

            {/* Sample Batch Quick Access */}
            <div className="mt-12 flex flex-col items-center gap-3">
              <p className="text-sm text-muted-foreground">Try sample batches:</p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/batch-trace?id=BN-2025-014')}
                >
                  🍌 BN-2025-014
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/batch-trace?id=BN-2025-015')}
                >
                  🍌 BN-2025-015
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/30 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default HeroSection;
