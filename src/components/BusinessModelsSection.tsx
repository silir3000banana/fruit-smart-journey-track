import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BusinessModelsSection = () => {
  const models = [
    {
      title: "Individual Products",
      subtitle: "Modular Solutions",
      description: "Choose specific modules based on your needs. Perfect for targeted improvements in your value chain.",
      features: [
        "Software Platform (SaaS subscription per MT)",
        "IoT Devices (Hardware + AMC)",
        "Smart Container (Sale/Lease options)",
        "AI Grading Camera (Premium add-on)"
      ],
      pricing: "Starting from ₹50K",
      badge: "Flexible",
      color: "border-blue-200 bg-blue-50"
    },
    {
      title: "All-in-One Solution", 
      subtitle: "Farm to Retail Turnkey",
      description: "Complete end-to-end solution for large aggregators, exporters, and supermarket chains.",
      features: [
        "Full system deployment",
        "Farmer onboarding & training",
        "Container deployment",
        "AI model customization",
        "Export compliance setup"
      ],
      pricing: "₹10L - ₹5Cr",
      badge: "Enterprise",
      color: "border-green-200 bg-green-50"
    },
    {
      title: "Co-Partner Model",
      subtitle: "Joint Venture & Revenue Share",
      description: "Partner with us in your fruit operations. Share the benefits of improved quality and reduced wastage.",
      features: [
        "Revenue share on quality premiums",
        "Platform-as-a-Service for partners",
        "Export market access",
        "Tech-enabled fruit brand development",
        "Blockchain traceability for premiums"
      ],
      pricing: "Revenue Share",
      badge: "Partnership",
      color: "border-purple-200 bg-purple-50"
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Flexible Business Models
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the model that fits your business needs. From individual modules 
            to complete turnkey solutions and partnership opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <Card 
              key={index} 
              className={`${model.color} hover:shadow-elegant transition-all duration-300 animate-slide-up relative`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {model.badge}
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{model.pricing}</div>
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">
                    {model.title}
                  </CardTitle>
                  <div className="text-sm font-medium text-primary mb-3">
                    {model.subtitle}
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {model.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {model.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant={index === 1 ? "hero" : "default"} 
                  className="w-full"
                >
                  {index === 0 ? "Explore Modules" : index === 1 ? "Request Quote" : "Partner With Us"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-gradient-hero rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Value Chain?
            </h3>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Join leading exporters and supermarket chains who trust our platform 
              for international-grade traceability and quality assurance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="bg-background text-primary border-background hover:bg-background/90">
                Schedule Demo
              </Button>
              <Button variant="premium" size="lg">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModelsSection;