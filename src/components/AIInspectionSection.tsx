import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Eye, Zap } from "lucide-react";

const AIInspectionSection = () => {
  const [captured, setCaptured] = useState(false);

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4 text-xs tracking-wider uppercase px-4 py-1.5 rounded-full">AI Vision</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">AI Camera Fruit Inspection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Computer vision powered quality grading, bruising detection, and size classification.</p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* Camera */}
          <Card className="border-border/40 overflow-hidden rounded-2xl">
            <CardContent className="p-0">
              <div className="relative bg-foreground/5 aspect-[4/3] flex items-center justify-center">
                {!captured ? (
                  <>
                    <div className="absolute inset-8 border-2 border-dashed border-primary/30 rounded-2xl" />
                    <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-xl" />
                    <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-xl" />
                    <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-xl" />
                    <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-xl" />
                    <div className="text-center z-10">
                      <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">Position fruit in frame</p>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center relative animate-fade-in" style={{ background: 'linear-gradient(135deg, hsl(30 92% 50% / 0.08), hsl(45 100% 65% / 0.08))' }}>
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-success rounded-xl">
                      <span className="absolute -top-5 left-0 text-[10px] font-mono bg-success text-success-foreground px-1.5 py-0.5 rounded-lg">Grade A 91%</span>
                    </div>
                    <div className="absolute top-[55%] left-[60%] w-[25%] h-[30%] border-2 border-warning rounded-xl">
                      <span className="absolute -top-5 left-0 text-[10px] font-mono bg-warning text-warning-foreground px-1.5 py-0.5 rounded-lg">Bruise 3%</span>
                    </div>
                    <div className="w-24 h-24 rounded-full" style={{ background: 'hsl(45 100% 65% / 0.15)' }} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-glow shadow-elegant hover:shadow-glow transition-all duration-300 rounded-xl" onClick={() => setCaptured(!captured)}>
                  <Camera className="w-4 h-4 mr-2" />
                  {captured ? "Retake Image" : "Capture Image"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            {captured ? (
              <div className="animate-slide-up space-y-4">
                <Card className="border-border/40 rounded-2xl">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-primary" /> Analysis Results
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: "Ripeness Level", value: "72%", bar: 72, color: "from-warning to-primary" },
                        { label: "Color Uniformity", value: "89%", bar: 89, color: "from-primary to-success" },
                        { label: "Bruising Detection", value: "3%", bar: 3, color: "from-destructive to-warning" },
                        { label: "Size Classification", value: "Large", bar: 85, color: "from-info to-primary" },
                      ].map((r, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">{r.label}</span>
                            <span className="font-semibold text-foreground">{r.value}</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${r.color} rounded-full transition-all duration-700`} style={{ width: `${r.bar}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/40 rounded-2xl">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-warning" /> AI Recommendation
                    </h3>
                    <div className="space-y-2">
                      {[
                        { label: "Suitable for Export", status: true },
                        { label: "Needs Ripening", status: false },
                        { label: "Send to Local Market", status: false },
                      ].map((rec, i) => (
                        <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl text-sm transition-colors duration-200 ${rec.status ? "bg-success/5 text-success border border-success/20" : "bg-muted/40 text-muted-foreground border border-border/30"}`}>
                          <div className={`w-2 h-2 rounded-full ${rec.status ? "bg-success" : "bg-muted-foreground/30"}`} />
                          {rec.label}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 rounded-xl border border-primary/20 text-center banana-glow" style={{ background: 'hsl(45 100% 65% / 0.05)' }}>
                      <div className="text-xs text-muted-foreground">Overall Quality Score</div>
                      <div className="text-3xl font-bold text-primary mt-1">91%</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-8">
                  <Camera className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Capture an image to see AI analysis results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIInspectionSection;
