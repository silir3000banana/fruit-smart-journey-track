import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ComplianceSection = () => {
  const certifications = [
    {
      name: "HACCP",
      description: "Hazard Analysis Critical Control Points",
      type: "Food Safety"
    },
    {
      name: "GLOBALG.A.P.",
      description: "Good Agricultural Practices",
      type: "Agriculture"
    },
    {
      name: "FSSAI",
      description: "Food Safety Standards Authority",
      type: "India Compliance"
    },
    {
      name: "ISO 22000:2018",
      description: "Food Safety Management System",
      type: "International"
    },
    {
      name: "EU Export Ready",
      description: "European Union Standards",
      type: "Export"
    },
    {
      name: "US FDA Ready",
      description: "US Food & Drug Administration",
      type: "Export"
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Export-Grade Compliance
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet international standards with built-in compliance features. 
            Ready for global markets including EU, US, and premium export destinations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card 
              key={index} 
              className="bg-card hover:shadow-elegant transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <Badge className="w-fit mx-auto mb-2 bg-primary/10 text-primary border-primary/20">
                  {cert.type}
                </Badge>
                <CardTitle className="text-lg font-bold text-foreground">
                  {cert.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  {cert.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 bg-card rounded-2xl p-8 shadow-soft">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Blockchain-Ready Architecture
              </h3>
              <p className="text-muted-foreground mb-6">
                Future-proof your supply chain with blockchain integration capabilities 
                for premium markets and enhanced consumer trust.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground">Immutable transaction records</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground">Smart contract integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground">Premium market access</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-primary/10 rounded-lg p-4 border border-primary/20">
                <h4 className="font-semibold text-foreground mb-2">API Integration Ready</h4>
                <p className="text-sm text-muted-foreground">
                  Connect seamlessly with ERP systems, marketplaces, and customer platforms.
                </p>
              </div>
              <div className="bg-success/10 rounded-lg p-4 border border-success/20">
                <h4 className="font-semibold text-foreground mb-2">Edge + Cloud Hybrid</h4>
                <p className="text-sm text-muted-foreground">
                  Reliable operation with offline capabilities and automatic synchronization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;