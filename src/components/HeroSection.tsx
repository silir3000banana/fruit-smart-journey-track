import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, Calculator, Package, TrendingUp, Shield, Zap, BarChart3 } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const stats = [
    { value: "₹2.4Cr", label: "Spoilage Prevented" },
    { value: "12,500+", label: "Batches Tracked" },
    { value: "94%", label: "Supply Chain Efficiency" },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)',
        backgroundSize: '48px 48px'
      }} />
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 -right-40 w-[400px] h-[400px] bg-info/6 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-8">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                <span className="text-xs font-semibold tracking-wider uppercase text-white/80">
                  AI + IoT Supply Chain Intelligence
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.08] mb-6">
                Track. Inspect. Optimize.{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Every Fruit Batch.
                </span>
              </h1>

              <p className="text-lg text-white/55 mb-10 leading-relaxed max-w-lg">
                Scan barcodes, inspect quality with AI cameras, and optimize supply chain decisions — from farm gate to retail shelf.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-14">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary-glow text-sm px-7 py-6 group shadow-glow"
                  onClick={() => navigate('/contact')}
                >
                  Book Demo
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-sm px-7 py-6 border-white/20 text-white hover:bg-white/5"
                  onClick={() => navigate('/silir')}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Pilot
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-sm px-7 py-6 border-white/20 text-white hover:bg-white/5"
                  onClick={() => navigate('/contact')}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate ROI
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-primary">{s.value}</div>
                    <div className="text-[11px] text-white/45 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Executive Dashboard Preview */}
            <div className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <div className="glass-strong rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Executive Overview</p>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success/10 border border-success/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-[10px] font-medium text-success">Live</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Package, label: "Batches Tracked", value: "1,247", trend: "+23", up: true },
                    { icon: Shield, label: "Spoilage Prevented", value: "₹24.5L", trend: "+12%", up: true },
                    { icon: BarChart3, label: "Efficiency", value: "94.2%", trend: "+3.1%", up: true },
                    { icon: Zap, label: "Active Shipments", value: "38", trend: "+5", up: true },
                  ].map((kpi, i) => (
                    <div key={i} className="bg-card/60 rounded-xl p-3.5 border border-border/40">
                      <div className="flex items-center justify-between mb-2">
                        <kpi.icon className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-medium text-success flex items-center gap-0.5">
                          <TrendingUp className="w-2.5 h-2.5" />{kpi.trend}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-foreground">{kpi.value}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{kpi.label}</div>
                    </div>
                  ))}
                </div>

                {/* Supply Chain Mini Pipeline */}
                <div className="pt-2">
                  <p className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground mb-3">Supply Chain Pipeline</p>
                  <div className="flex items-center justify-between">
                    {["Farm", "Collection", "Sorting", "Ripening", "Cold Store", "Transport", "Retail"].map((stage, i, arr) => (
                      <div key={i} className="flex items-center">
                        <div className={`flex flex-col items-center`}>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold ${
                            i <= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}>
                            {i + 1}
                          </div>
                          <span className="text-[8px] text-muted-foreground mt-1 whitespace-nowrap">{stage}</span>
                        </div>
                        {i < arr.length - 1 && (
                          <div className={`w-3 h-px mx-0.5 ${i < 4 ? "bg-primary" : "bg-border"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
