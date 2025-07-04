import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import smartContainerImage from "@/assets/smart-container.jpg";

const SmartContainer = () => {
  const features = [
    {
      title: "Real-time Environmental Monitoring",
      description: "Continuous tracking of temperature, humidity, CO2, and ethylene levels with instant alerts",
      icon: "🌡️",
      specs: ["Temperature: ±0.1°C accuracy", "Humidity: ±2% RH accuracy", "Gas sensors: ppm level detection"]
    },
    {
      title: "GPS Location Tracking",
      description: "Live location updates with geofencing alerts and route optimization",
      icon: "📍",
      specs: ["GPS accuracy: ±3 meters", "Real-time tracking", "Geofence alerts", "Route history"]
    },
    {
      title: "Smart Refrigeration Control",
      description: "Automated cooling system with AI-powered optimization for different fruit types",
      icon: "❄️",
      specs: ["Auto temperature control", "Energy optimization", "Backup cooling system", "Remote adjustment"]
    },
    {
      title: "Solar Power Integration",
      description: "Self-sustaining power system with solar panels and battery backup",
      icon: "☀️",
      specs: ["Solar panel capacity: 2kW", "Battery backup: 48 hours", "Energy monitoring", "Grid backup"]
    }
  ];

  const specifications = [
    { category: "Dimensions", details: ["Length: 20ft / 40ft options", "Width: 8ft", "Height: 8.5ft", "Capacity: 28-58 cubic meters"] },
    { category: "Power System", details: ["Solar panels: 2kW monocrystalline", "Battery: 20kWh lithium-ion", "Grid connection: 220V/440V", "Autonomy: 48-72 hours"] },
    { category: "Refrigeration", details: ["Temperature range: -5°C to +25°C", "Cooling capacity: 3-5 tons", "Defrost system: Hot gas", "Insulation: Polyurethane foam"] },
    { category: "IoT & Connectivity", details: ["4G/5G cellular connectivity", "Wi-Fi hotspot capability", "Satellite backup (optional)", "Edge computing unit"] }
  ];

  const monitoring = [
    { parameter: "Temperature", range: "-5°C to +25°C", accuracy: "±0.1°C", frequency: "Every 30 seconds" },
    { parameter: "Humidity", range: "40% to 95% RH", accuracy: "±2% RH", frequency: "Every 30 seconds" },
    { parameter: "CO2 Level", range: "0-20%", accuracy: "±0.1%", frequency: "Every 2 minutes" },
    { parameter: "Ethylene", range: "0-1000 ppm", accuracy: "±5 ppm", frequency: "Every 5 minutes" },
    { parameter: "GPS Location", range: "Global", accuracy: "±3 meters", frequency: "Every 1 minute" },
    { parameter: "Door Status", range: "Open/Closed", accuracy: "100%", frequency: "Real-time" }
  ];

  const pricingPlans = [
    {
      title: "Purchase",
      description: "Own the container outright",
      price: "₹45,00,000",
      period: "One-time",
      features: ["Complete ownership", "5-year warranty", "Free maintenance (1st year)", "Training included", "24/7 support"],
      popular: false
    },
    {
      title: "Lease",
      description: "Monthly lease with maintenance",
      price: "₹85,000",
      period: "/month",
      features: ["Full maintenance included", "Insurance covered", "Upgrade options", "24/7 support", "Training included"],
      popular: true
    },
    {
      title: "Pay-per-Use",
      description: "Pay only when you transport",
      price: "₹2,500",
      period: "/day",
      features: ["No upfront cost", "Maintenance included", "Flexible usage", "Basic support", "Per-trip billing"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8 pt-24">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-6">
                Smart Dynamic Container
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Revolutionary IoT-enabled refrigerated transport container with real-time monitoring, 
                GPS tracking, and automated climate control for perfect fruit preservation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6">
                  Request Demo
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Download Brochure
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={smartContainerImage} 
                alt="Smart Dynamic Container" 
                className="w-full h-auto rounded-lg shadow-elegant"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-lg"></div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Advanced Container Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete end-to-end cold chain solution with intelligent monitoring and control systems
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-1">
                    {feature.specs.map((spec, specIndex) => (
                      <li key={specIndex} className="text-sm text-muted-foreground">
                        • {spec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Monitoring Parameters */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Real-time Monitoring</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive sensor array providing detailed insights into cargo condition
            </p>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left p-4 font-semibold">Parameter</th>
                      <th className="text-left p-4 font-semibold">Range</th>
                      <th className="text-left p-4 font-semibold">Accuracy</th>
                      <th className="text-left p-4 font-semibold">Update Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monitoring.map((param, index) => (
                      <tr key={index} className="border-b hover:bg-muted/20">
                        <td className="p-4 font-medium">{param.parameter}</td>
                        <td className="p-4 text-muted-foreground">{param.range}</td>
                        <td className="p-4 text-muted-foreground">{param.accuracy}</td>
                        <td className="p-4 text-muted-foreground">{param.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Technical Specifications */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Technical Specifications</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specifications.map((spec, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{spec.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {spec.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-muted-foreground">
                        • {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Flexible Acquisition Options</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that best fits your business needs and budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-glow' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge variant="premium" className="px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.title}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-subtle rounded-lg p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Transform Your Cold Chain Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the revolution in fruit transportation with our smart container solution. 
            Reduce losses, improve quality, and gain complete visibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Schedule Site Visit
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Speak with Expert
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SmartContainer;