import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-platform.jpg";

const HeroSection = () => {
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
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Smart Post-Harvest
              <span className="bg-gradient-primary bg-clip-text text-transparent block">
                Value Chain Platform
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              End-to-end traceability, quality assurance, and dynamic cold chain solutions 
              from farm to supermarket. International-grade compliance for export markets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => window.location.href = '/contact'}
              >
                Book Free Demo
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => window.location.href = '/pricing'}
              >
                View Pricing
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center animate-float">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Traceability</div>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="text-3xl font-bold text-primary mb-2">50%</div>
                <div className="text-sm text-muted-foreground">Waste Reduction</div>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-3xl font-bold text-primary mb-2">30%</div>
                <div className="text-sm text-muted-foreground">Quality Increase</div>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Monitoring</div>
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