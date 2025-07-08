import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Eye, CheckCircle, AlertTriangle, BarChart3 } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const AIQualityAssessment = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const dummyResults = [
    {
      id: "LOT001",
      grade: "Grade A",
      score: 92,
      defects: ["Minor bruising", "Slight color variation"],
      recommendations: ["Suitable for export", "Pack with care"],
      timestamp: "2024-01-08 10:30:00",
      image: "/placeholder.svg"
    },
    {
      id: "LOT002", 
      grade: "Grade B",
      score: 78,
      defects: ["Surface scratches", "Size inconsistency"],
      recommendations: ["Local market suitable", "Sort by size"],
      timestamp: "2024-01-08 11:15:00",
      image: "/placeholder.svg"
    },
    {
      id: "LOT003",
      grade: "Grade A+",
      score: 96,
      defects: ["None detected"],
      recommendations: ["Premium export grade", "Immediate packaging"],
      timestamp: "2024-01-08 12:00:00",
      image: "/placeholder.svg"
    }
  ];

  const handleCapture = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const mockResult = {
        lotId: "LOT" + String(Math.floor(Math.random() * 1000)).padStart(3, '0'),
        grade: ["Grade A+", "Grade A", "Grade B"][Math.floor(Math.random() * 3)],
        score: Math.floor(Math.random() * 30) + 70,
        defects: ["Minor bruising", "Surface scratches", "Color variation", "None detected"][Math.floor(Math.random() * 4)],
        ripeness: Math.floor(Math.random() * 20) + 80,
        size: "Medium-Large",
        color: "Golden Yellow"
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
      
      toast({
        title: "AI Analysis Complete",
        description: `Fruit quality assessed: ${mockResult.grade}`,
      });
    }, 3000);
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes("A+")) return "bg-green-600";
    if (grade.includes("A")) return "bg-green-500";
    if (grade.includes("B")) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Quality Assessment</h1>
          <p className="text-muted-foreground">AI-powered fruit quality analysis and grading</p>
        </div>

        <Tabs defaultValue="capture" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="capture">AI Capture</TabsTrigger>
            <TabsTrigger value="results">Analysis Results</TabsTrigger>
            <TabsTrigger value="history">Quality History</TabsTrigger>
          </TabsList>

          <TabsContent value="capture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  AI Camera Capture
                </CardTitle>
                <CardDescription>
                  Capture fruit images for AI quality analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-muted-foreground rounded-lg p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
                  {!isAnalyzing && !analysisResult && (
                    <>
                      <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">Position fruit within the frame for analysis</p>
                      <div className="text-sm text-muted-foreground mb-4">
                        <p>• Ensure good lighting</p>
                        <p>• Keep fruit centered</p>
                        <p>• Avoid shadows</p>
                      </div>
                      <Button onClick={handleCapture} variant="hero" size="lg">
                        Start AI Analysis
                      </Button>
                    </>
                  )}

                  {isAnalyzing && (
                    <div className="text-center">
                      <Eye className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
                      <p className="text-lg font-semibold mb-2">AI Analyzing...</p>
                      <p className="text-muted-foreground mb-4">Processing fruit quality parameters</p>
                      <Progress value={75} className="w-64 mx-auto" />
                      <p className="text-sm text-muted-foreground mt-2">This may take a few seconds</p>
                    </div>
                  )}

                  {analysisResult && (
                    <div className="w-full">
                      <div className="flex items-center gap-2 mb-4 justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="text-lg font-semibold">Analysis Complete</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Grade:</span>
                            <Badge className={getGradeColor(analysisResult.grade)}>
                              {analysisResult.grade}
                            </Badge>
                          </div>
                          <div>
                            <span className="font-medium">Quality Score: </span>
                            <span className="text-lg font-bold">{analysisResult.score}/100</span>
                          </div>
                          <div>
                            <span className="font-medium">Ripeness: </span>
                            <span>{analysisResult.ripeness}%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium">Size: </span>
                            <span>{analysisResult.size}</span>
                          </div>
                          <div>
                            <span className="font-medium">Color: </span>
                            <span>{analysisResult.color}</span>
                          </div>
                          <div>
                            <span className="font-medium">Defects: </span>
                            <span>{analysisResult.defects}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => {
                          setAnalysisResult(null);
                          toast({
                            title: "Analysis Saved",
                            description: "Quality assessment has been recorded."
                          });
                        }}
                        className="mt-4"
                      >
                        Save & Continue
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Analysis Dashboard
                </CardTitle>
                <CardDescription>Quality metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">12</div>
                      <div className="text-sm text-muted-foreground">Grade A+ Lots</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">87%</div>
                      <div className="text-sm text-muted-foreground">Avg Quality Score</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">5</div>
                      <div className="text-sm text-muted-foreground">Rejected Lots</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Quality Distribution</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-600 rounded"></div>
                      <span className="text-sm">Grade A+ (45%)</span>
                      <Progress value={45} className="flex-1 ml-2" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="text-sm">Grade A (35%)</span>
                      <Progress value={35} className="flex-1 ml-2" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                      <span className="text-sm">Grade B (15%)</span>
                      <Progress value={15} className="flex-1 ml-2" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span className="text-sm">Below Grade (5%)</span>
                      <Progress value={5} className="flex-1 ml-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quality Assessment History</CardTitle>
                <CardDescription>Recent AI analysis results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dummyResults.map((result) => (
                    <div key={result.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{result.id}</h3>
                          <Badge className={getGradeColor(result.grade)}>
                            {result.grade}
                          </Badge>
                          <span className="text-lg font-bold">{result.score}/100</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{result.timestamp}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Defects: </span>
                          <span>{result.defects.join(", ")}</span>
                        </div>
                        <div>
                          <span className="font-medium">Recommendations: </span>
                          <span>{result.recommendations.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIQualityAssessment;