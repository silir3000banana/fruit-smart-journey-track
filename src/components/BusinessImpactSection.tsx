import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Shield, Truck, ArrowRight, Wifi, WifiOff, Camera, ScanBarcode, QrCode, Thermometer, Snowflake } from "lucide-react";

const BusinessImpactSection = () => {
  const navigate = useNavigate();

  const impacts = [
    { label: "Spoilage Prevented Today", value: "₹2,45,000", icon: Shield, color: "text-success" },
    { label: "Profit Optimization", value: "+12% Margin", icon: TrendingUp, color: "text-primary" },
    { label: "Dispatch Savings", value: "₹85,000", icon: Truck, color: "text-info" },
  ];

  const devices = [
    { name: "AI Camera Unit", status: "online", icon: Camera },
    { name: "Barcode Scanner", status: "online", icon: ScanBarcode },
    { name: "QR Reader", status: "online", icon: QrCode },
    { name: "IoT Sensors (x12)", status: "online", icon: Thermometer },
    { name: "Cold Storage Controller", status: "offline", icon: Snowflake },
  ];

  const segments = [
    "Exporters", "Cold Storage Operators", "Fruit Aggregators", "Retail Chains", "Food Processing Companies"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4 text-xs tracking-wider uppercase px-4 py-1.5 rounded-full">Business Impact</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Measurable Financial Outcomes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {impacts.map((item, i) => (
            <Card key={i} className="border-border/40 hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 text-center animate-slide-up rounded-2xl" style={{ animationDelay: `${i * 0.08}s` }}>
              <CardContent className="p-8">
                <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-4`} />
                <div className="text-2xl font-bold text-foreground mb-1">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <Card className="border-border/40 rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Connected Devices</h3>
              <div className="space-y-3">
                {devices.map((d, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/20 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <d.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{d.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {d.status === "online" ? <Wifi className="w-3.5 h-3.5 text-success" /> : <WifiOff className="w-3.5 h-3.5 text-destructive" />}
                      <span className={`text-[10px] font-medium ${d.status === "online" ? "text-success" : "text-destructive"}`}>{d.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Customer Segments</h3>
              <div className="space-y-3">
                {segments.map((seg, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/20 transition-colors duration-200">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm text-foreground">{seg}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="bg-gradient-hero rounded-2xl p-12 text-center max-w-4xl mx-auto grain relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Start Intelligent Fruit Supply Chains
            </h3>
            <p className="text-white/45 mb-8 max-w-lg mx-auto text-sm">
              Loss reduction. Quality inspection. Full traceability. Profit optimization. All in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-glow shadow-glow hover:shadow-[0_0_50px_hsl(45_100%_65%/0.35)] transition-all duration-300 rounded-xl" onClick={() => navigate('/contact')}>
                Book Demo <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white/15 text-white/90 hover:bg-white/5 hover:border-white/25 transition-all duration-200 rounded-xl" onClick={() => navigate('/silir')}>
                Start Pilot
              </Button>
              <Button variant="outline" size="lg" className="border-white/15 text-white/90 hover:bg-white/5 hover:border-white/25 transition-all duration-200 rounded-xl" onClick={() => navigate('/contact')}>
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessImpactSection;
