import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Cpu, Thermometer, ThermometerSnowflake, Truck, Store } from "lucide-react";

const ModulesSection = () => {
  const modules = [
    { title: "Farm Level Tracking", description: "Harvest point scanning, barcode generation, geo-location tagging with mobile app integration.", features: ["Barcode & QR Generation", "Geo-location Tagging", "Mobile App", "Waterproof Labels"], icon: Leaf, badge: "Core Module" },
    { title: "AI Quality Grading", description: "Vision-based AI camera integration for automated fruit grading, defect detection, and size classification.", features: ["Defect Detection", "Size Classification", "Color Maturity", "Confidence Scoring"], icon: Cpu, badge: "AI Powered" },
    { title: "Cold Storage Monitoring", description: "IoT sensor integration for temperature, humidity, and environmental monitoring with real-time alerts.", features: ["Temperature Logging", "Humidity Control", "Power Failure Alerts", "Shelf-life Countdown"], icon: ThermometerSnowflake, badge: "IoT Enabled" },
    { title: "Ripening Intelligence", description: "Smart ripening chamber control with ethylene monitoring and AI-predicted dispatch windows.", features: ["Ethylene Control", "Maturity Prediction", "Dispatch Window AI", "Quality Index"], icon: Thermometer, badge: "Smart Control" },
    { title: "Cold Chain Transport", description: "Real-time logistics tracking with temperature breach monitoring and route optimization.", features: ["Live GPS Tracking", "Temp Breach Alerts", "Route Optimization", "Driver Management"], icon: Truck, badge: "Real-time" },
    { title: "Retail Dispatch", description: "Final quality validation, retail readiness scoring, and suggested MRP with margin estimation.", features: ["Readiness Score", "MRP Suggestion", "Margin Estimation", "Grade Certification"], icon: Store, badge: "Retail Ready" },
  ];

  return (
    <section id="modules" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-xs tracking-wider uppercase px-4 py-1.5 rounded-full">Platform Modules</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">End-to-End Intelligence</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Six integrated modules powering complete post-harvest traceability, quality control, and revenue optimization.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <Card 
              key={index} 
              className="group bg-card hover:shadow-elegant border-border/40 transition-all duration-300 hover:-translate-y-1 animate-slide-up rounded-2xl"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <CardHeader className="space-y-3 pb-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-200">
                    <module.icon className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-[10px] tracking-wider uppercase rounded-full">
                    {module.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">{module.title}</CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed">{module.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {module.features.map((feature, fi) => (
                    <div key={fi} className="flex items-center space-x-2.5">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
