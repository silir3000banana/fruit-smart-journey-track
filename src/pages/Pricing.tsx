import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Star, Zap, Shield } from 'lucide-react';
import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  
  const plans = [
    {
      name: "Smart Modules", subtitle: "Individual Components", price: "₹2,50,000", period: "per module",
      description: "Perfect for testing specific value chain components",
      features: ["Single module (Cold Storage OR Ripening OR AI Grading)", "IoT sensors with 1-year warranty", "Basic dashboard access", "Email support", "Training for 2 operators", "Standard installation"],
      popular: false, cta: "Get Module Quote", icon: <Zap className="h-6 w-6 text-primary" />
    },
    {
      name: "Smart Solution", subtitle: "Complete Value Chain", price: "₹15,00,000", period: "turnkey solution",
      description: "End-to-end platform for medium to large operations",
      features: ["Complete farm-to-retail traceability", "All modules: Cold Storage + Ripening + AI Grading", "Dynamic Smart Container (1 unit)", "Web + Mobile apps for all roles", "24/7 phone support", "Training for up to 10 users", "6-month deployment + setup", "1-year comprehensive warranty", "Export compliance documentation"],
      popular: true, cta: "Book Demo", icon: <Star className="h-6 w-6 text-primary" />
    },
    {
      name: "Enterprise Partnership", subtitle: "Co-Investment Model", price: "Revenue Share", period: "partnership",
      description: "Joint venture for large-scale operations and export markets",
      features: ["Zero upfront investment option", "Revenue sharing from quality premiums", "Multiple Dynamic Smart Containers", "Dedicated account manager", "Custom integrations with your ERP", "White-label app options", "International market access support", "Blockchain-ready traceability", "Priority feature development"],
      popular: false, cta: "Discuss Partnership", icon: <Shield className="h-6 w-6 text-primary" />
    }
  ];

  const addOns = [
    { name: "Additional Smart Container", price: "₹8,00,000", description: "Mobile processing unit with solar power" },
    { name: "AI Grading Camera Module", price: "₹1,50,000", description: "Advanced computer vision for quality assessment" },
    { name: "Extended Warranty (per year)", price: "₹75,000", description: "Hardware + software support beyond standard warranty" },
    { name: "Custom Integration", price: "₹2,00,000", description: "API integration with existing ERP systems" },
    { name: "Training Program", price: "₹50,000", description: "Additional operator training (up to 20 people)" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-12 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Pricing Plans
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent block mt-2">Made for Indian Agriculture</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Flexible solutions designed for Indian farmers, cooperatives, and exporters. All prices include GST and are designed to deliver ROI within 12-18 months.
            </p>
            
            <div className="flex justify-center mb-8">
              <Tabs value={billingPeriod} onValueChange={(value) => setBillingPeriod(value as 'monthly' | 'yearly')}>
                <TabsList className="grid w-full grid-cols-2 w-64 rounded-xl">
                  <TabsTrigger value="monthly" className="rounded-lg">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly" className="rounded-lg">Yearly (Save 20%)</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge variant="secondary" className="px-4 py-2 rounded-full">🇮🇳 Made in India</Badge>
              <Badge variant="secondary" className="px-4 py-2 rounded-full">📱 Local Language Support</Badge>
              <Badge variant="secondary" className="px-4 py-2 rounded-full">🏦 Easy EMI Available</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative rounded-2xl transition-all duration-300 hover:-translate-y-1 ${plan.popular ? 'border-primary shadow-glow' : 'border-border/40 shadow-soft hover:shadow-elegant'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="px-4 py-1 bg-primary text-primary-foreground rounded-full shadow-elegant">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-2">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-xl" style={{ background: 'hsl(45 100% 65% / 0.1)' }}>{plan.icon}</div>
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-sm font-medium text-primary">{plan.subtitle}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full rounded-xl transition-all duration-300 ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary-glow shadow-elegant hover:shadow-glow' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    onClick={() => window.location.href = '/contact'}
                  >
                    {plan.cta}
                  </Button>
                  
                  {index === 1 && (
                    <p className="text-xs text-center text-muted-foreground mt-3">⚡ Quick setup: Operational in 4-6 weeks</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add-ons */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">Optional Add-ons & Extensions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addOns.map((addon, index) => (
                <Card key={index} className="border-border/40 hover:shadow-elegant hover:-translate-y-0.5 transition-all duration-300 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-foreground">{addon.name}</h3>
                      <span className="font-bold text-primary">{addon.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{addon.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ROI */}
          <div className="bg-gradient-subtle rounded-2xl p-8 mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">Proven ROI for Indian Agriculture</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { value: "20-30%", label: "Reduction in post-harvest losses" },
                  { value: "₹15-25", label: "Higher price per kg for traced produce" },
                  { value: "12-18", label: "Months typical payback period" },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Financing */}
          <Card className="bg-card border-border/40 shadow-elegant rounded-2xl mb-16">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Flexible Financing Options</h2>
                <p className="text-muted-foreground">We understand the unique needs of Indian agriculture. Choose the payment option that works for you.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { emoji: "🏦", title: "Bank EMI", desc: "Partner with leading agriculture financing banks. Interest rates starting from 9.5% per annum." },
                  { emoji: "🤝", title: "Lease Model", desc: "Pay as you process. Monthly payments based on actual throughput and utilization." },
                  { emoji: "📈", title: "Revenue Share", desc: "Zero upfront cost. Share the premium you earn from improved quality and traceability." },
                ].map((item, i) => (
                  <div key={i} className="text-center p-6 bg-background rounded-2xl border border-border/40">
                    <h3 className="font-semibold text-foreground mb-2">{item.emoji} {item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button size="lg" className="px-8 bg-primary text-primary-foreground hover:bg-primary-glow shadow-elegant hover:shadow-glow transition-all duration-300 rounded-xl" onClick={() => window.location.href = '/contact'}>
                  Discuss Financing Options
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Value Chain?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the agricultural revolution. Schedule a demo to see how FruitFlow AI can increase your profits and reduce waste.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button size="lg" className="px-8 bg-primary text-primary-foreground hover:bg-primary-glow shadow-elegant hover:shadow-glow transition-all duration-300 rounded-xl" onClick={() => window.location.href = '/contact'}>Schedule Free Demo</Button>
              <Button variant="outline" size="lg" className="px-8 rounded-xl" onClick={() => window.location.href = '/contact'}>Download Brochure</Button>
            </div>
          </div>

          {/* FAQ */}
          <Card className="bg-card border-border/40 shadow-elegant rounded-2xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[
                  { q: "What's included in setup?", a: "Complete hardware installation, software configuration, user training, and 30-day support." },
                  { q: "Do you support offline mode?", a: "Yes, our farmer apps work offline and sync when connectivity is restored." },
                  { q: "What about data security?", a: "Bank-grade encryption, local data storage options, and GDPR compliance." },
                  { q: "Can I integrate with my ERP?", a: "Yes, we provide API integration with popular ERP systems and custom solutions." },
                  { q: "What's the ROI timeline?", a: "Most customers see positive ROI within 12-18 months through reduced waste and premium pricing." },
                  { q: "Do you offer customization?", a: "Yes, we customize modules based on your specific crops, processes, and compliance needs." },
                ].map((item, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                    <p className="text-sm text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
