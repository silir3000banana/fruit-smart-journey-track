import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BusinessModelsSection = () => {
  const navigate = useNavigate();

  const models = [
    {
      title: "Modular",
      subtitle: "Individual Products",
      description: "Choose specific modules based on your needs.",
      features: [
        "SaaS subscription per MT",
        "IoT Devices (Hardware + AMC)",
        "Smart Container (Lease)",
        "AI Grading Camera add-on"
      ],
      pricing: "From ₹50K",
      badge: "Flexible",
      highlighted: false
    },
    {
      title: "Enterprise",
      subtitle: "All-in-One Solution",
      description: "Complete farm-to-retail turnkey deployment for large operations.",
      features: [
        "Full system deployment",
        "Farmer onboarding & training",
        "AI model customization",
        "Export compliance setup",
        "Dedicated support"
      ],
      pricing: "₹10L – ₹5Cr",
      badge: "Popular",
      highlighted: true
    },
    {
      title: "Partnership",
      subtitle: "Revenue Share Model",
      description: "Partner with us. Share the benefits of improved quality.",
      features: [
        "Revenue share on premiums",
        "Platform-as-a-Service",
        "Export market access",
        "Blockchain traceability"
      ],
      pricing: "Rev Share",
      badge: "Co-partner",
      highlighted: false
    }
  ];

  return (
    <section id="solutions" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-xs tracking-wider uppercase px-4 py-1">
            Business Models
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Flexible Commercial Models
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From modular subscriptions to enterprise deployments and revenue-share partnerships.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {models.map((model, index) => (
            <Card 
              key={index} 
              className={`transition-all duration-300 animate-slide-up relative ${
                model.highlighted 
                  ? 'border-primary shadow-elegant scale-[1.02]' 
                  : 'border-border/50 hover:shadow-elegant'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {model.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground text-[10px] uppercase tracking-wider">
                    {model.badge}
                  </Badge>
                </div>
              )}
              <CardHeader className="space-y-3 pt-8">
                {!model.highlighted && (
                  <Badge variant="outline" className="w-fit text-[10px] uppercase tracking-wider">
                    {model.badge}
                  </Badge>
                )}
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">{model.pricing}</div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {model.title}
                  </CardTitle>
                  <div className="text-xs font-medium text-muted-foreground mt-1">
                    {model.subtitle}
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {model.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2.5">
                  {model.features.map((feature, fi) => (
                    <div key={fi} className="flex items-center space-x-2.5">
                      <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full group ${model.highlighted ? 'bg-primary text-primary-foreground hover:bg-primary-glow' : ''}`}
                  variant={model.highlighted ? "default" : "outline"}
                  onClick={() => navigate('/contact')}
                >
                  {index === 0 ? "Explore Modules" : index === 1 ? "Request Quote" : "Partner With Us"}
                  <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-20 bg-gradient-hero rounded-2xl p-10 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-primary-foreground mb-3">
            Ready to Transform Your Value Chain?
          </h3>
          <p className="text-primary-foreground/60 mb-8 max-w-xl mx-auto text-sm">
            Join leading exporters and supermarket chains who trust our platform 
            for international-grade traceability and quality assurance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary-glow"
              onClick={() => navigate('/contact')}
            >
              Schedule Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/5"
              onClick={() => navigate('/auth')}
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModelsSection;
