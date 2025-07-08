import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const ComprehensiveFarmerDashboard = () => {
  const navigate = useNavigate();
  const currentHarvest = {
    totalHarvested: "24.5 MT",
    targetHarvest: "30 MT",
    progress: 82,
    averageQuality: "A+",
    totalLots: 156,
    exportQuality: "68%"
  };

  const lots = [
    { id: "BN-2024-001", quantity: "2.5 MT", quality: "A+", status: "In Cold Storage", temperature: "12°C", days: 3 },
    { id: "BN-2024-002", quantity: "3.2 MT", quality: "A", status: "Ready for Dispatch", temperature: "13°C", days: 1 },
    { id: "BN-2024-003", quantity: "1.8 MT", quality: "A+", status: "Quality Check", temperature: "11°C", days: 0 },
    { id: "BN-2024-004", quantity: "2.1 MT", quality: "B", status: "Processing", temperature: "14°C", days: 2 }
  ];

  const weatherData = {
    temperature: "28°C",
    humidity: "72%",
    rainfall: "15mm",
    windSpeed: "12 km/h",
    forecast: "Partly cloudy, good for harvesting"
  };

  const qualityAnalytics = [
    { grade: "A+", percentage: 68, count: 106, color: "bg-success" },
    { grade: "A", percentage: 25, count: 39, color: "bg-primary" },
    { grade: "B", percentage: 7, count: 11, color: "bg-warning" }
  ];

  const recentActivities = [
    { time: "2 hours ago", activity: "Lot BN-2024-003 completed AI grading", result: "Grade A+ assigned" },
    { time: "4 hours ago", activity: "Temperature alert resolved", result: "Cold storage CH-02 stabilized" },
    { time: "6 hours ago", activity: "New harvest lot created", result: "BN-2024-004 - 2.1 MT recorded" },
    { time: "8 hours ago", activity: "Quality inspection completed", result: "Export certification approved" }
  ];

  const earnings = {
    currentMonth: "₹8,45,000",
    lastMonth: "₹7,22,000",
    increase: "+17%",
    exportPremium: "₹1,25,000",
    qualityBonus: "₹85,000"
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Farmer Dashboard</h1>
          <p className="text-muted-foreground">Complete overview of your harvest operations and quality management</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Harvested</CardDescription>
              <CardTitle className="text-2xl text-primary">{currentHarvest.totalHarvested}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Progress value={currentHarvest.progress} className="flex-1" />
                <span className="text-sm text-muted-foreground">{currentHarvest.progress}%</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Target: {currentHarvest.targetHarvest}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Average Quality</CardDescription>
              <CardTitle className="text-2xl text-success">{currentHarvest.averageQuality}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Export Quality: {currentHarvest.exportQuality}</p>
              <p className="text-sm text-muted-foreground">Total Lots: {currentHarvest.totalLots}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>This Month's Earnings</CardDescription>
              <CardTitle className="text-2xl text-primary">{earnings.currentMonth}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-success border-success">
                  {earnings.increase}
                </Badge>
                <span className="text-sm text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Weather Conditions</CardDescription>
              <CardTitle className="text-2xl text-foreground">{weatherData.temperature}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Humidity: {weatherData.humidity}</p>
              <p className="text-sm text-success font-medium">{weatherData.forecast}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="lots" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="lots">Active Lots</TabsTrigger>
            <TabsTrigger value="quality">Quality Analytics</TabsTrigger>
            <TabsTrigger value="activities">Recent Activities</TabsTrigger>
            <TabsTrigger value="earnings">Earnings Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="lots">
            <Card>
              <CardHeader>
                <CardTitle>Active Harvest Lots</CardTitle>
                <CardDescription>Real-time status of your harvest lots in the value chain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lots.map((lot) => (
                    <div key={lot.id} className="p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{lot.id}</h4>
                          <Badge variant={lot.quality === 'A+' ? 'default' : lot.quality === 'A' ? 'outline' : 'secondary'}>
                            Grade {lot.quality}
                          </Badge>
                        </div>
                        <Badge 
                          variant={lot.status.includes('Ready') ? 'default' : lot.status.includes('Storage') ? 'outline' : 'secondary'}
                        >
                          {lot.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Quantity:</span>
                          <span className="ml-2 font-medium">{lot.quantity}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Temperature:</span>
                          <span className="ml-2 font-medium">{lot.temperature}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Days in Storage:</span>
                          <span className="ml-2 font-medium">{lot.days}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Track</Button>
                          <Button size="sm" variant="ghost">Details</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quality Distribution</CardTitle>
                  <CardDescription>Breakdown of grades for current harvest</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {qualityAnalytics.map((grade) => (
                      <div key={grade.grade} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded ${grade.color}`}></div>
                            <span className="font-medium">Grade {grade.grade}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold">{grade.percentage}%</span>
                            <span className="text-sm text-muted-foreground ml-2">({grade.count} lots)</span>
                          </div>
                        </div>
                        <Progress value={grade.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Premium Earnings</CardTitle>
                  <CardDescription>Quality-based bonus calculations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Export Premium</span>
                        <span className="font-bold text-success">{earnings.exportPremium}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">A+ grade lots (68% of harvest)</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Quality Bonus</span>
                        <span className="font-bold text-primary">{earnings.qualityBonus}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Consistency reward for A+ grades</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Premium</span>
                        <span className="font-bold text-foreground">₹2,10,000</span>
                      </div>
                      <p className="text-sm text-muted-foreground">+33% above base price</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest updates from your value chain operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-muted/30">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm">{activity.activity}</p>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                        <p className="text-sm text-success">{activity.result}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Earnings Comparison</CardTitle>
                  <CardDescription>Income trend and growth analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                      <span className="font-medium">Current Month</span>
                      <span className="font-bold text-primary">{earnings.currentMonth}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Last Month</span>
                      <span className="font-bold text-muted-foreground">{earnings.lastMonth}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg border border-success/20">
                      <span className="font-medium">Growth</span>
                      <span className="font-bold text-success">{earnings.increase}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Essential farmer operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="h-16 flex flex-col gap-1" onClick={() => navigate('/farm-tracking')}>
                      <span className="text-lg">🌾</span>
                      <span className="text-sm">Farm Tracking</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col gap-1" onClick={() => navigate('/ai-assessment')}>
                      <span className="text-lg">🤖</span>
                      <span className="text-sm">AI Quality</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col gap-1" onClick={() => navigate('/location-scanning')}>
                      <span className="text-lg">📍</span>
                      <span className="text-sm">Location Scan</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col gap-1" onClick={() => navigate('/waterproof-tagging')}>
                      <span className="text-lg">🏷️</span>
                      <span className="text-sm">Tagging</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ComprehensiveFarmerDashboard;