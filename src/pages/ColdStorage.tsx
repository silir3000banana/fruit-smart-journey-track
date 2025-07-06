import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import coldStorageImage from "@/assets/cold-storage.jpg";

const ColdStorage = () => {
  const features = [
    {
      title: "Multi-Zone Temperature Control",
      description: "Independent temperature zones for different fruit varieties and ripeness stages",
      icon: "🌡️",
      benefits: ["Optimal storage for each variety", "Extended shelf life", "Reduced wastage", "Quality preservation"]
    },
    {
      title: "IoT Sensor Network",
      description: "Comprehensive monitoring with wireless sensors throughout the facility",
      icon: "📡",
      benefits: ["Real-time data collection", "Predictive maintenance", "Energy optimization", "Compliance reporting"]
    },
    {
      title: "Automated Inventory Management",
      description: "RFID and barcode integration for seamless lot tracking and management",
      icon: "📦",
      benefits: ["Automated stock updates", "FIFO compliance", "Lot traceability", "Reduced manual errors"]
    },
    {
      title: "Energy Optimization",
      description: "AI-powered energy management system for reduced operational costs",
      icon: "⚡",
      benefits: ["30% energy savings", "Smart load balancing", "Peak hour management", "Carbon footprint reduction"]
    }
  ];

  const monitoringMetrics = [
    { parameter: "Temperature", zones: "8 zones", accuracy: "±0.1°C", alerts: "Immediate" },
    { parameter: "Humidity", zones: "8 zones", accuracy: "±2% RH", alerts: "5 minutes" },
    { parameter: "Air Quality", zones: "4 zones", accuracy: "±0.1%", alerts: "10 minutes" },
    { parameter: "Door Status", zones: "All entrances", accuracy: "Real-time", alerts: "Immediate" },
    { parameter: "Power Status", zones: "Main & backup", accuracy: "Real-time", alerts: "Immediate" },
    { parameter: "Equipment Health", zones: "All systems", accuracy: "Diagnostic", alerts: "Predictive" }
  ];

  const storageCapacities = [
    { size: "Small Facility", capacity: "100-500 MT", chambers: "2-4", investment: "₹50L - ₹2Cr" },
    { size: "Medium Facility", capacity: "500-2000 MT", chambers: "4-8", investment: "₹2Cr - ₹8Cr" },
    { size: "Large Facility", capacity: "2000-5000 MT", chambers: "8-16", investment: "₹8Cr - ₹20Cr" },
    { size: "Mega Facility", capacity: "5000+ MT", chambers: "16+", investment: "₹20Cr+" }
  ];

  const roi = [
    { metric: "Wastage Reduction", before: "15-20%", after: "3-5%", savings: "₹12-15L/year" },
    { metric: "Energy Costs", before: "₹8L/year", after: "₹5.5L/year", savings: "₹2.5L/year" },
    { metric: "Labor Costs", before: "₹6L/year", after: "₹4L/year", savings: "₹2L/year" },
    { metric: "Quality Premium", before: "Standard", after: "15% premium", savings: "₹10L/year" }
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
                Smart Cold Storage Solutions
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Advanced cold storage management system with IoT sensors, automated controls, 
                and real-time monitoring for optimal fruit preservation and reduced wastage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6"
                  onClick={() => window.location.href = '/contact'}
                >
                  Schedule Assessment
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6"
                  onClick={() => window.location.href = '/contact'}
                >
                  View Case Studies
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={coldStorageImage} 
                alt="Smart Cold Storage Facility" 
                className="w-full h-auto rounded-lg shadow-elegant"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-lg"></div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Advanced Storage Management</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive solution for modern cold storage facilities with intelligent automation
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
                  <div className="grid grid-cols-2 gap-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Monitoring Dashboard */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Real-time Monitoring</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive sensor network providing 24/7 monitoring and instant alerts
            </p>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left p-4 font-semibold">Parameter</th>
                      <th className="text-left p-4 font-semibold">Coverage</th>
                      <th className="text-left p-4 font-semibold">Accuracy</th>
                      <th className="text-left p-4 font-semibold">Alert Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monitoringMetrics.map((metric, index) => (
                      <tr key={index} className="border-b hover:bg-muted/20">
                        <td className="p-4 font-medium">{metric.parameter}</td>
                        <td className="p-4 text-muted-foreground">{metric.zones}</td>
                        <td className="p-4 text-muted-foreground">{metric.accuracy}</td>
                        <td className="p-4">
                          <Badge variant={metric.alerts === 'Immediate' ? 'premium' : 'outline'}>
                            {metric.alerts}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Storage Capacities */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Scalable Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Customizable cold storage solutions for facilities of all sizes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {storageCapacities.map((capacity, index) => (
              <Card key={index} className="text-center hover:shadow-soft transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{capacity.size}</CardTitle>
                  <CardDescription className="text-primary font-semibold text-lg">
                    {capacity.capacity}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Chambers: </span>
                      <span className="font-medium">{capacity.chambers}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Investment: </span>
                      <span className="font-medium text-primary">{capacity.investment}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ROI Analysis */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Return on Investment</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Quantifiable benefits and cost savings from smart cold storage implementation
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Annual Savings Breakdown</CardTitle>
              <CardDescription className="text-center">Based on 1000 MT facility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left p-4 font-semibold">Metric</th>
                      <th className="text-left p-4 font-semibold">Before</th>
                      <th className="text-left p-4 font-semibold">After</th>
                      <th className="text-left p-4 font-semibold">Annual Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roi.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-muted/20">
                        <td className="p-4 font-medium">{item.metric}</td>
                        <td className="p-4 text-muted-foreground">{item.before}</td>
                        <td className="p-4 text-success font-medium">{item.after}</td>
                        <td className="p-4 text-primary font-bold">{item.savings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-gradient-subtle rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">Total Annual Savings: ₹26.5L+</p>
                <p className="text-muted-foreground mt-2">Typical payback period: 2-3 years</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-subtle rounded-lg p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Modernize Your Cold Storage Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get a customized assessment and implementation plan for your facility. 
            Our experts will help you maximize efficiency and minimize costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => window.location.href = '/contact'}
            >
              Book Facility Assessment
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => window.location.href = '/contact'}
            >
              Download ROI Calculator
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ColdStorage;