import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    toast({
      title: "Inquiry Submitted!",
      description: "Thank you for your interest. Our team will contact you within 24 hours.",
    });
    (e.target as HTMLFormElement).reset();
    setTimeout(() => navigate('/'), 2000);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-12 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get Started with
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent block mt-2">FruitFlow AI Platform</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform your post-harvest operations with India's most advanced traceability and quality assurance platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="shadow-elegant rounded-2xl border-border/40">
              <CardHeader>
                <CardTitle className="text-2xl">Request Demo & Pricing</CardTitle>
                <CardDescription>Fill out the form below and our agricultural technology specialists will contact you.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" name="name" placeholder="Your full name" required className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" placeholder="your@email.com" required className="rounded-xl" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+91 9876543210" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_name">Company/Organization</Label>
                      <Input id="company_name" name="company_name" placeholder="Company name" className="rounded-xl" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiry_type">I'm interested in *</Label>
                    <Select name="inquiry_type" required>
                      <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select your interest" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="demo">Product Demo</SelectItem>
                        <SelectItem value="pricing">Pricing & Packages</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" name="message" placeholder="Tell us about your requirements..." className="min-h-[120px] rounded-xl" required />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary-glow shadow-elegant hover:shadow-glow transition-all duration-300 rounded-xl"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit Inquiry'}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">* Required fields. We typically respond within 4-6 hours.</p>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {[
                { icon: Phone, title: "Direct Contact", content: (
                  <div className="space-y-4">
                    <div><p className="font-medium text-foreground">Sales & Partnerships</p><p className="text-muted-foreground text-sm">+91 8067 504 XXX</p><p className="text-muted-foreground text-sm">sales@fruitflow.ai</p></div>
                    <div><p className="font-medium text-foreground">Technical Support</p><p className="text-muted-foreground text-sm">+91 8067 505 XXX</p><p className="text-muted-foreground text-sm">support@fruitflow.ai</p></div>
                  </div>
                )},
                { icon: MapPin, title: "Office Location", content: (
                  <div><p className="font-medium text-foreground">Chennai Headquarters</p><p className="text-muted-foreground text-sm">Chennai, Tamil Nadu 600001<br />India</p></div>
                )},
                { icon: Clock, title: "Business Hours", content: (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p className="text-muted-foreground text-sm">Saturday: 9:00 AM - 2:00 PM IST</p>
                    <p className="text-sm text-primary font-medium mt-3">Emergency support available 24/7 for existing customers</p>
                  </div>
                )},
              ].map((card, i) => (
                <Card key={i} className="border-border/40 rounded-2xl hover:shadow-soft transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><card.icon className="h-5 w-5 text-primary" />{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>{card.content}</CardContent>
                </Card>
              ))}

              <Card className="bg-gradient-subtle border-border/40 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">🚀 Ready to Transform Your Operations?</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Join 100+ agri-businesses across India already using FruitFlow AI for end-to-end traceability and quality assurance.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="rounded-xl">WhatsApp Us</Button>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary-glow shadow-elegant transition-all duration-300 rounded-xl">Schedule Call</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
