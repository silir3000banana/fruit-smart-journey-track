import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const RipeningDashboard = () => {
  const chambers = [
    { id: "RC-01", ethylene: "100 ppm", temp: "18°C", humidity: "90%", cycle: "Day 3/5", status: "Active", lots: 12 },
    { id: "RC-02", ethylene: "150 ppm", temp: "17°C", humidity: "92%", cycle: "Day 2/4", status: "Active", lots: 8 },
    { id: "RC-03", ethylene: "0 ppm", temp: "16°C", humidity: "85%", cycle: "Complete", status: "Ready", lots: 15 },
    { id: "RC-04", ethylene: "80 ppm", temp: "19°C", humidity: "88%", cycle: "Day 1/5", status: "Starting", lots: 10 }
  ];

  const stats = [
    { label: "Active Chambers", value: "3", change: "1 ready for dispatch", color: "text-primary" },
    { label: "Ripening Cycles", value: "4", change: "2 completing today", color: "text-success" },
    { label: "Ready Lots", value: "15", change: "From RC-03", color: "text-success" },
    { label: "Ethylene Usage", value: "330 ppm", change: "Within optimal range", color: "text-primary" }
  ];

  const ripeningProgress = [
    { lot: "BN-789", chamber: "RC-01", stage: "60%", color: "Turning", readiness: "2 days", quality: "A+" },
    { lot: "BN-890", chamber: "RC-02", stage: "40%", color: "Green", readiness: "3 days", quality: "A" },
    { lot: "BN-567", chamber: "RC-03", stage: "100%", color: "Yellow", readiness: "Ready", quality: "A+" },
    { lot: "BN-234", chamber: "RC-04", stage: "20%", color: "Green", readiness: "4 days", quality: "A" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Ripening Dashboard</h1>
          <p className="text-muted-foreground">Monitor ripening chambers and ethylene cycles</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle className={`text-2xl ${stat.color}`}>{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Chamber Status */}
          <Card>
            <CardHeader>
              <CardTitle>Ripening Chambers</CardTitle>
              <CardDescription>Real-time chamber conditions and cycles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chambers.map((chamber) => (
                  <div key={chamber.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{chamber.id}</h4>
                      <Badge variant={
                        chamber.status === 'Ready' ? 'premium' : 
                        chamber.status === 'Active' ? 'default' : 'secondary'
                      }>
                        {chamber.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Ethylene:</span>
                        <span className="ml-2 font-medium">{chamber.ethylene}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Temperature:</span>
                        <span className="ml-2 font-medium">{chamber.temp}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Humidity:</span>
                        <span className="ml-2 font-medium">{chamber.humidity}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cycle:</span>
                        <span className="ml-2 font-medium">{chamber.cycle}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ripening Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Lot Progress</CardTitle>
              <CardDescription>Individual lot ripening status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ripeningProgress.map((lot, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{lot.lot}</h4>
                        <p className="text-sm text-muted-foreground">{lot.chamber}</p>
                      </div>
                      <Badge variant={lot.readiness === 'Ready' ? 'premium' : 'outline'}>
                        {lot.quality}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Ripening Progress:</span>
                        <span className="font-medium">{lot.stage}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: lot.stage }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Color: <span className="font-medium">{lot.color}</span></span>
                        <span>Ready in: <span className="font-medium">{lot.readiness}</span></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ripening Controls</CardTitle>
            <CardDescription>Manage ripening processes and cycles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col gap-2">
                <span className="text-lg">⚡</span>
                <span>Start Ethylene</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">🌡️</span>
                <span>Adjust Conditions</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">📊</span>
                <span>Ripening Reports</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">✅</span>
                <span>Quality Check</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RipeningDashboard;