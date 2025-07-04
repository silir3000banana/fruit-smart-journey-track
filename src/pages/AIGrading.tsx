import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import aiGradingImage from "@/assets/ai-grading-system.jpg";

const AIGrading = () => {
  const gradingSamples = [
    { 
      grade: "A+", 
      description: "Premium Export Quality", 
      criteria: "Perfect color, no defects, optimal size",
      percentage: "15%",
      color: "text-success"
    },
    { 
      grade: "A", 
      description: "Export Quality", 
      criteria: "Good color, minimal defects, standard size",
      percentage: "35%",
      color: "text-primary"
    },
    { 
      grade: "B", 
      description: "Domestic Premium", 
      criteria: "Acceptable color, minor defects allowed",
      percentage: "30%",
      color: "text-warning"
    },
    { 
      grade: "C", 
      description: "Processing Grade", 
      criteria: "Color variations, defects present",
      percentage: "20%",
      color: "text-destructive"
    }
  ];

  const features = [
    { 
      title: "Computer Vision Analysis", 
      description: "Advanced AI algorithms analyze color, size, shape, and surface defects in real-time",
      icon: "👁️"
    },
    { 
      title: "Multi-Parameter Grading", 
      description: "Comprehensive evaluation including ripeness, blemishes, size consistency, and color uniformity",
      icon: "📊"
    },
    { 
      title: "Export Compliance", 
      description: "Grading standards aligned with international export requirements and quality certifications",
      icon: "🌍"
    },
    { 
      title: "Real-time Processing", 
      description: "Instant grading results with detailed defect mapping and quality scores",
      icon: "⚡"
    }
  ];

  const stats = [
    { label: "Accuracy Rate", value: "99.2%", description: "Compared to manual grading" },
    { label: "Processing Speed", value: "50 fruits/min", description: "High-speed conveyor system" },
    { label: "Defect Detection", value: "0.1mm", description: "Minimum defect size detected" },
    { label: "Grade Categories", value: "12", description: "Detailed classification levels" }
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
                AI-Powered Quality Grading
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Automated fruit grading system using computer vision and machine learning 
                to ensure consistent quality standards for export markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6">
                  Request Demo
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Download Specs
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={aiGradingImage} 
                alt="AI Grading System" 
                className="w-full h-auto rounded-lg shadow-elegant"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-lg"></div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl text-primary">{stat.value}</CardTitle>
                  <CardDescription className="font-semibold">{stat.label}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Grading Standards */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Quality Grading Standards</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI system classifies fruits into precise quality grades based on international standards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gradingSamples.map((grade, index) => (
              <Card key={index} className="hover:shadow-glow transition-all duration-300">
                <CardHeader className="text-center">
                  <div className={`text-4xl font-bold ${grade.color} mb-2`}>
                    {grade.grade}
                  </div>
                  <CardTitle className="text-lg">{grade.description}</CardTitle>
                  <Badge variant="outline" className="mx-auto">
                    {grade.percentage} of harvest
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {grade.criteria}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Advanced AI Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge technology for precise, consistent, and reliable quality assessment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-soft transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mb-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Technical Specifications</CardTitle>
              <CardDescription>Complete system specifications and requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Hardware Components</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• High-resolution industrial cameras (4K)</li>
                    <li>• LED lighting system with multiple angles</li>
                    <li>• Conveyor belt system (variable speed)</li>
                    <li>• Edge computing unit (NVIDIA Jetson)</li>
                    <li>• Pneumatic sorting mechanism</li>
                    <li>• Industrial PC with touchscreen interface</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Software Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Real-time image processing and analysis</li>
                    <li>• Machine learning model for quality assessment</li>
                    <li>• Defect detection and classification</li>
                    <li>• Data logging and reporting system</li>
                    <li>• Integration with ERP systems</li>
                    <li>• Remote monitoring and diagnostics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-subtle rounded-lg p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Upgrade Your Quality Control?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact our team to discuss implementation, pricing, and customization options for your facility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Schedule Consultation
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Request Quote
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AIGrading;