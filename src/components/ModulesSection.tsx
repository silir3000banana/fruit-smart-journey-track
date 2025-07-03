import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ModulesSection = () => {
  const modules = [
    {
      title: "Farm Level Tracking",
      description: "Harvest point scanning, farmer mobile app, QR code generation with AI-based camera capture for fruit analysis.",
      features: ["Location & Lot ID Scanning", "Mobile App Integration", "AI Quality Assessment", "Waterproof Tagging"],
      color: "bg-emerald-50 border-emerald-200",
      badge: "Core Module"
    },
    {
      title: "Pre-Cool Storage",
      description: "Smart pre-cold chambers with temperature and humidity sensors, automatic cloud logging.",
      features: ["Temperature Control", "Humidity Monitoring", "Cloud Connectivity", "LoRaWAN Support"],
      color: "bg-blue-50 border-blue-200",
      badge: "IoT Enabled"
    },
    {
      title: "Cold Storage Chamber",
      description: "Advanced monitoring with AI cameras, weight sensors, and comprehensive environmental controls.",
      features: ["AI Quality Grading", "Weight Tracking", "Door Monitoring", "Offline Sync"],
      color: "bg-purple-50 border-purple-200",
      badge: "AI Powered"
    },
    {
      title: "Ripening Chamber",
      description: "Smart ripening control with gas sensors and color index tracking for optimal fruit maturation.",
      features: ["Ethylene Control", "CO2 Monitoring", "Color Analysis", "Ripeness Tracking"],
      color: "bg-orange-50 border-orange-200",
      badge: "Smart Control"
    },
    {
      title: "Dynamic Smart Container",
      description: "Fully integrated movable container with solar power option for remote deployment.",
      features: ["Solar Powered", "Plug & Play", "Remote Deployment", "Integrated Sensors"],
      color: "bg-green-50 border-green-200",
      badge: "Mobile Solution"
    },
    {
      title: "Supermarket Dispatch",
      description: "Final quality checks, retail app integration, and complete journey visibility for consumers.",
      features: ["Final QC", "Retail Integration", "Consumer Traceability", "Quality Reports"],
      color: "bg-indigo-50 border-indigo-200",
      badge: "Retail Ready"
    }
  ];

  return (
    <section id="modules" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comprehensive Platform Modules
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From farm to retail, our integrated modules ensure complete traceability, 
            quality control, and compliance throughout the value chain.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <Card 
              key={index} 
              className={`${module.color} hover:shadow-elegant transition-all duration-300 animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {module.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {module.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {module.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {module.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
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