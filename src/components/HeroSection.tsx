import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Leaf, Cpu, Thermometer, BarChart3, Store, TrendingUp } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const stages = [
    { icon: Leaf, label: "Farm", color: "text-success" },
    { icon: Cpu, label: "AI Grading", color: "text-primary" },
    { icon: Thermometer, label: "Cold Storage", color: "text-info" },
    { icon: BarChart3, label: "Ripening", color: "text-warning" },
    { icon: Store, label: "Retail", color: "text-primary" },
  ];

  const insights = [
    { text: "Batch BN-2025-014 predicted +10% value", type: "positive" },
    { text: "Optimal dispatch window in 18 hrs", type: "info" },
    { text: "Delay may reduce ₹3/kg margin", type: "warning" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-info/8 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left content — 3 cols */}
            <div className="lg:col-span-3 animate-slide-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-8">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                <span className="text-xs font-semibold tracking-wider uppercase text-primary-foreground/80">
                  SILIR 3000™ — AIoT Platform
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] mb-6">
                Maximize Produce Value.{" "}
                <span className="text-primary">Minimize Post-Harvest Loss.</span>
              </h1>

              <p className="text-lg text-primary-foreground/60 mb-10 leading-relaxed max-w-xl">
                AI grading, smart cold storage, ripening intelligence, and retail traceability 
                in one enterprise system. From harvest to retail — powered by AI intelligence.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary-glow text-base px-8 py-6 group shadow-glow"
                  onClick={() => navigate('/silir')}
                >
                  View Dashboard
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 py-6 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/5"
                  onClick={() => navigate('/contact')}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Run ROI Simulation
                </Button>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: "50%", label: "Loss Prevented" },
                  { value: "6", label: "Tracked Stages" },
                  { value: "100%", label: "Traceability" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-primary-foreground/50 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel — 2 cols */}
            <div className="lg:col-span-2 space-y-5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {/* Lifecycle visualization */}
              <div className="glass-strong rounded-2xl p-6">
                <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-5">
                  Supply Chain Lifecycle
                </p>
                <div className="space-y-3">
                  {stages.map((stage, i) => (
                    <div key={i} className="flex items-center gap-3 group">
                      <div className={`w-9 h-9 rounded-lg bg-card flex items-center justify-center border border-border/50 shadow-soft group-hover:shadow-elegant transition-all`}>
                        <stage.icon className={`w-4 h-4 ${stage.color}`} />
                      </div>
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-sm font-medium text-foreground">{stage.label}</span>
                      {i < stages.length - 1 && (
                        <div className="absolute" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insight Panel */}
              <div className="glass-strong rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="w-4 h-4 text-primary" />
                  <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                    AI Insights — Live
                  </p>
                </div>
                <div className="space-y-3">
                  {insights.map((insight, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-3 rounded-lg border text-sm animate-fade-in ${
                        insight.type === 'positive'
                          ? 'bg-success/5 border-success/20 text-success'
                          : insight.type === 'warning'
                          ? 'bg-warning/5 border-warning/20 text-warning'
                          : 'bg-info/5 border-info/20 text-info'
                      }`}
                      style={{ animationDelay: `${0.4 + i * 0.15}s` }}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                        insight.type === 'positive' ? 'bg-success' : insight.type === 'warning' ? 'bg-warning' : 'bg-info'
                      }`} />
                      {insight.text}
                    </div>
                  ))}
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
