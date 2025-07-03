import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company_name: formData.get('company_name') as string,
      inquiry_type: formData.get('inquiry_type') as string,
      message: formData.get('message') as string,
    };

    const { error } = await supabase
      .from('contact_inquiries')
      .insert([data]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Inquiry Submitted!",
        description: "Thank you for your interest. Our team will contact you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get Started with 
              <span className="bg-gradient-primary bg-clip-text text-transparent block">
                SmartHarvest Platform
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your post-harvest operations with India's most advanced 
              traceability and quality assurance platform. Contact us for a demo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl">Request Demo & Pricing</CardTitle>
                <CardDescription>
                  Fill out the form below and our agricultural technology specialists will contact you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_name">Company/Organization</Label>
                      <Input
                        id="company_name"
                        name="company_name"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiry_type">I'm interested in *</Label>
                    <Select name="inquiry_type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
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
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your requirements, farm size, current challenges, or any specific questions..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    variant="hero"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit Inquiry'}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    * Required fields. We typically respond within 4-6 hours during business hours.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Direct Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-foreground">Sales & Partnerships</p>
                    <p className="text-muted-foreground">+91 8067 504 XXX</p>
                    <p className="text-muted-foreground">sales@smartharvest.in</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Technical Support</p>
                    <p className="text-muted-foreground">+91 8067 505 XXX</p>
                    <p className="text-muted-foreground">support@smartharvest.in</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Office Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">Bangalore Headquarters</p>
                    <p className="text-muted-foreground">
                      Electronic City Phase 1<br />
                      Bangalore, Karnataka 560100<br />
                      India
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p className="text-muted-foreground">Saturday: 9:00 AM - 2:00 PM IST</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                    <p className="text-sm text-primary font-medium mt-3">
                      Emergency support available 24/7 for existing customers
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-subtle shadow-soft">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    🚀 Ready to Transform Your Operations?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Join 100+ agri-businesses across India already using SmartHarvest 
                    for end-to-end traceability and quality assurance.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      WhatsApp Us
                    </Button>
                    <Button variant="hero" size="sm">
                      Schedule Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;