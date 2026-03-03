import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Globe, FileCheck } from "lucide-react";

const ComplianceSection = () => {
  const certifications = [
    { name: "HACCP", description: "Hazard Analysis Critical Control Points", type: "Food Safety" },
    { name: "GLOBALG.A.P.", description: "Good Agricultural Practices", type: "Agriculture" },
    { name: "FSSAI", description: "Food Safety Standards Authority", type: "India Compliance" },
    { name: "ISO 22000:2018", description: "Food Safety Management System", type: "International" },
    { name: "EU Export Ready", description: "European Union Standards", type: "Export" },
    { name: "US FDA Ready", description: "US Food & Drug Administration", type: "Export" }
  ];

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-xs tracking-wider uppercase px-4 py-1">
            Compliance & Standards
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Export-Grade Compliance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built-in compliance for global markets including EU, US, and premium export destinations.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {certifications.map((cert, index) => (
            <Card 
              key={index} 
              className="bg-card hover:shadow-elegant border-border/50 transition-all duration-300 animate-slide-up text-center"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <CardHeader className="pb-2 pt-5 px-4">
                <Shield className="w-5 h-5 text-primary mx-auto mb-2" />
                <CardTitle className="text-sm font-bold text-foreground">
                  {cert.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-5">
                <p className="text-[11px] text-muted-foreground leading-snug">
                  {cert.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 glass-strong rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">Immutable Audit Trail</h4>
                <p className="text-xs text-muted-foreground">Every scan and event logged with tamper-proof records.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">API Integration Ready</h4>
                <p className="text-xs text-muted-foreground">Connect seamlessly with ERP, marketplaces, and platforms.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">Edge + Cloud Hybrid</h4>
                <p className="text-xs text-muted-foreground">Reliable offline operation with automatic sync.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
