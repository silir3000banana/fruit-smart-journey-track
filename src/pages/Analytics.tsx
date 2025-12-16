import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  FileSpreadsheet,
  FileText,
  Leaf,
  AlertTriangle,
  CheckCircle,
  Package,
  Thermometer,
} from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const Analytics = () => {
  const { toast } = useToast();

  // Sample analytics data
  const summaryStats = {
    totalBatches: 156,
    activeBatches: 42,
    completedBatches: 114,
    totalVolume: 78500,
    wastageReduced: 22,
    ripeningAccuracy: 93,
    coldChainCompliance: 98.5,
    qualityScore: 89,
  };

  const monthlyTrends = [
    { month: "Jul", batches: 18, wastage: 8.5, quality: 85 },
    { month: "Aug", batches: 22, wastage: 7.2, quality: 86 },
    { month: "Sep", batches: 26, wastage: 6.1, quality: 87 },
    { month: "Oct", batches: 31, wastage: 5.3, quality: 89 },
    { month: "Nov", batches: 35, wastage: 4.2, quality: 91 },
    { month: "Dec", batches: 42, wastage: 3.1, quality: 93 },
  ];

  const qualityBreakdown = [
    { grade: "Grade A", percentage: 72, count: 112 },
    { grade: "Grade B", percentage: 23, count: 36 },
    { grade: "Grade C", percentage: 5, count: 8 },
  ];

  const stagePerformance = [
    { stage: "Harvest", avgTime: "4h", onTimeRate: 95, issues: 2 },
    { stage: "Post-Harvest", avgTime: "6h", onTimeRate: 92, issues: 4 },
    { stage: "Ripening", avgTime: "72h", onTimeRate: 89, issues: 6 },
    { stage: "Transport", avgTime: "12h", onTimeRate: 94, issues: 3 },
    { stage: "Warehouse", avgTime: "48h", onTimeRate: 97, issues: 1 },
    { stage: "Retail", avgTime: "96h", onTimeRate: 91, issues: 5 },
  ];

  const topFarms = [
    { name: "Anjan Banana Farm", location: "Sathyamangalam", batches: 24, qualityAvg: 91 },
    { name: "Green Valley Organics", location: "Theni", batches: 18, qualityAvg: 89 },
    { name: "Kumar Agro Farms", location: "Erode", batches: 15, qualityAvg: 87 },
    { name: "Sunrise Plantations", location: "Coimbatore", batches: 12, qualityAvg: 92 },
  ];

  const handleExport = (format: string) => {
    toast({
      title: "Export Started",
      description: `Generating ${format.toUpperCase()} report...`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-8 mt-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Reporting</h1>
            <p className="text-muted-foreground">Track performance, quality trends, and operational metrics</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="30d">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => handleExport("csv")}>
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              CSV
            </Button>
            <Button variant="outline" onClick={() => handleExport("pdf")}>
              <FileText className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Wastage Reduced</span>
                <TrendingDown className="w-4 h-4 text-success" />
              </div>
              <p className="text-3xl font-bold text-success">{summaryStats.wastageReduced}%</p>
              <p className="text-xs text-muted-foreground mt-1">vs. pre-platform baseline</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Ripening Accuracy</span>
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-blue-500">{summaryStats.ripeningAccuracy}%</p>
              <p className="text-xs text-muted-foreground mt-1">prediction accuracy</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Cold Chain</span>
                <Thermometer className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-3xl font-bold text-purple-500">{summaryStats.coldChainCompliance}%</p>
              <p className="text-xs text-muted-foreground mt-1">compliance rate</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Quality Score</span>
                <CheckCircle className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-3xl font-bold text-amber-500">{summaryStats.qualityScore}%</p>
              <p className="text-xs text-muted-foreground mt-1">average across batches</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="farms">Farm Performance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Batch Volume Trend</CardTitle>
                  <CardDescription>Monthly batch processing volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyTrends.map((month) => (
                      <div key={month.month} className="flex items-center gap-4">
                        <span className="w-12 text-sm text-muted-foreground">{month.month}</span>
                        <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                          <div
                            className="bg-primary h-full rounded-full transition-all"
                            style={{ width: `${(month.batches / 42) * 100}%` }}
                          />
                        </div>
                        <span className="w-12 text-sm font-medium text-right">{month.batches}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Wastage Reduction Trend</CardTitle>
                  <CardDescription>Monthly wastage percentage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyTrends.map((month) => (
                      <div key={month.month} className="flex items-center gap-4">
                        <span className="w-12 text-sm text-muted-foreground">{month.month}</span>
                        <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                          <div
                            className="bg-destructive/70 h-full rounded-full transition-all"
                            style={{ width: `${month.wastage * 10}%` }}
                          />
                        </div>
                        <span className="w-12 text-sm font-medium text-right">{month.wastage}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-success/10 rounded-lg">
                    <p className="text-sm text-success font-medium">
                      <TrendingDown className="w-4 h-4 inline mr-1" />
                      63% reduction in wastage over 6 months
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Package className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-bold">{summaryStats.totalBatches}</p>
                  <p className="text-sm text-muted-foreground">Total Batches</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Leaf className="w-8 h-8 mx-auto mb-2 text-success" />
                  <p className="text-2xl font-bold">{summaryStats.activeBatches}</p>
                  <p className="text-sm text-muted-foreground">Active Batches</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <p className="text-2xl font-bold">{summaryStats.completedBatches}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{(summaryStats.totalVolume / 1000).toFixed(1)}T</p>
                  <p className="text-sm text-muted-foreground">Total Volume</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Quality Tab */}
          <TabsContent value="quality" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quality Grade Distribution</CardTitle>
                <CardDescription>Breakdown of batches by quality grade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {qualityBreakdown.map((grade) => (
                    <div
                      key={grade.grade}
                      className={`p-6 rounded-lg text-center ${
                        grade.grade === "Grade A"
                          ? "bg-success/10 border border-success/20"
                          : grade.grade === "Grade B"
                          ? "bg-blue-500/10 border border-blue-500/20"
                          : "bg-amber-500/10 border border-amber-500/20"
                      }`}
                    >
                      <p className="text-4xl font-bold mb-2">{grade.percentage}%</p>
                      <p className="font-semibold">{grade.grade}</p>
                      <p className="text-sm text-muted-foreground">{grade.count} batches</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Score Trend</CardTitle>
                <CardDescription>Average quality score over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyTrends.map((month) => (
                    <div key={month.month} className="flex items-center gap-4">
                      <span className="w-12 text-sm text-muted-foreground">{month.month}</span>
                      <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-success h-full rounded-full transition-all"
                          style={{ width: `${month.quality}%` }}
                        />
                      </div>
                      <Badge className="bg-success">{month.quality}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Operations Tab */}
          <TabsContent value="operations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stage Performance</CardTitle>
                <CardDescription>Processing time and on-time rates by stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Stage</th>
                        <th className="text-center py-3 px-4">Avg Time</th>
                        <th className="text-center py-3 px-4">On-Time Rate</th>
                        <th className="text-center py-3 px-4">Issues</th>
                        <th className="text-center py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stagePerformance.map((stage) => (
                        <tr key={stage.stage} className="border-b">
                          <td className="py-3 px-4 font-medium">{stage.stage}</td>
                          <td className="py-3 px-4 text-center">{stage.avgTime}</td>
                          <td className="py-3 px-4 text-center">
                            <Badge
                              className={
                                stage.onTimeRate >= 95
                                  ? "bg-success"
                                  : stage.onTimeRate >= 90
                                  ? "bg-blue-500"
                                  : "bg-warning"
                              }
                            >
                              {stage.onTimeRate}%
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            {stage.issues > 0 && (
                              <Badge variant="outline" className="border-warning text-warning">
                                {stage.issues}
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {stage.onTimeRate >= 95 ? (
                              <CheckCircle className="w-4 h-4 text-success inline" />
                            ) : stage.onTimeRate >= 90 ? (
                              <CheckCircle className="w-4 h-4 text-blue-500 inline" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-warning inline" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Farms Tab */}
          <TabsContent value="farms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Farms</CardTitle>
                <CardDescription>Farms ranked by volume and quality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topFarms.map((farm, index) => (
                    <div key={farm.name} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0
                            ? "bg-amber-500 text-white"
                            : index === 1
                            ? "bg-gray-400 text-white"
                            : index === 2
                            ? "bg-amber-700 text-white"
                            : "bg-muted"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{farm.name}</p>
                        <p className="text-sm text-muted-foreground">{farm.location}</p>
                      </div>
                      <div className="text-center px-4">
                        <p className="text-lg font-bold">{farm.batches}</p>
                        <p className="text-xs text-muted-foreground">Batches</p>
                      </div>
                      <div>
                        <Badge className="bg-success">{farm.qualityAvg}% Quality</Badge>
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

export default Analytics;