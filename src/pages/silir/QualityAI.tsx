import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Loader2, CheckCircle2 } from "lucide-react";

interface GradeResult {
  gradeA: number;
  gradeB: number;
  reject: number;
  ripeness: number;
}

export default function QualityAI() {
  const [capturing, setCapturing] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);

  const handleCapture = () => {
    setCapturing(true);
    setResult(null);
    setTimeout(() => {
      setCapturing(false);
      setResult({ gradeA: 65, gradeB: 25, reject: 10, ripeness: 78 });
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Quality AI</h1>
        <p className="text-sm text-gray-500">Computer vision-based fruit grading</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera panel */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">AI Camera Interface</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
              {capturing ? (
                <div className="flex flex-col items-center gap-3 text-white">
                  <Loader2 className="w-10 h-10 animate-spin" />
                  <span className="text-sm">Analyzing fruit quality...</span>
                  <div className="absolute inset-4 border-2 border-[#38B27B] rounded-lg opacity-50 animate-pulse" />
                </div>
              ) : result ? (
                <div className="relative w-full h-full bg-gray-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <CheckCircle2 className="w-12 h-12 mx-auto text-[#38B27B] mb-2" />
                    <p className="font-medium">Analysis Complete</p>
                  </div>
                  {/* Detection overlay boxes */}
                  <div className="absolute top-[15%] left-[20%] w-24 h-20 border-2 border-[#1E7F5A] rounded">
                    <span className="absolute -top-5 left-0 text-[10px] bg-[#1E7F5A] text-white px-1.5 py-0.5 rounded">A 95%</span>
                  </div>
                  <div className="absolute top-[30%] right-[25%] w-20 h-16 border-2 border-[#38B27B] rounded">
                    <span className="absolute -top-5 left-0 text-[10px] bg-[#38B27B] text-white px-1.5 py-0.5 rounded">B 88%</span>
                  </div>
                  <div className="absolute bottom-[20%] left-[40%] w-16 h-14 border-2 border-[#EF4444] rounded">
                    <span className="absolute -top-5 left-0 text-[10px] bg-[#EF4444] text-white px-1.5 py-0.5 rounded">Reject</span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <Camera className="w-12 h-12 mx-auto mb-3" />
                  <p className="text-sm">Position fruit tray and capture</p>
                </div>
              )}
            </div>
            <Button
              onClick={handleCapture}
              disabled={capturing}
              className="w-full bg-[#1E7F5A] text-white hover:bg-[#1E7F5A]/90"
            >
              {capturing ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
              ) : (
                <><Camera className="w-4 h-4 mr-2" /> Capture Image</>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results panel */}
        <div className="space-y-4">
          {result ? (
            <>
              <Card className="border-gray-200 shadow-sm animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg">Grading Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Grade A", value: result.gradeA, color: "#1E7F5A" },
                    { label: "Grade B", value: result.gradeB, color: "#38B27B" },
                    { label: "Reject", value: result.reject, color: "#EF4444" },
                  ].map((grade) => (
                    <div key={grade.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-gray-700">{grade.label}</span>
                        <span className="text-sm font-bold" style={{ color: grade.color }}>{grade.value}%</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${grade.value}%`, backgroundColor: grade.color }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-sm animate-fade-in">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-gray-500 mb-1">Ripeness Score</p>
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="8" />
                      <circle
                        cx="50" cy="50" r="40" fill="none" stroke="#1E7F5A" strokeWidth="8"
                        strokeDasharray={`${result.ripeness * 2.51} 251`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900">{result.ripeness}%</span>
                    </div>
                  </div>
                  <Badge className="mt-3 bg-green-50 text-[#1E7F5A] border-[#1E7F5A]/20">Optimal Range</Badge>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-12 text-center text-gray-400">
                <Camera className="w-10 h-10 mx-auto mb-3" />
                <p>Capture an image to see AI grading results</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
