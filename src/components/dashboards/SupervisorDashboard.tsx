import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const SupervisorDashboard = () => {
  const farmStats = [
    { farm: "Green Valley Farm", lots: 45, quality: "A+", status: "Active", harvest: "2.1 MT" },
    { farm: "Sunrise Orchards", lots: 32, quality: "A", status: "Active", harvest: "1.8 MT" },
    { farm: "Golden Fields", lots: 28, quality: "A+", status: "Maintenance", harvest: "1.5 MT" },
    { farm: "Fresh Farms Co.", lots: 51, quality: "A", status: "Active", harvest: "2.4 MT" }
  ];

  const alerts = [
    { farm: "Golden Fields", message: "Equipment maintenance required", severity: "warning", time: "30 mins ago" },
    { farm: "Green Valley", message: "Quality grade improved to A+", severity: "success", time: "1 hour ago" },
    { farm: "Sunrise Orchards", message: "New harvest batch ready", severity: "info", time: "2 hours ago" }
  ];

  const overallStats = [
    { label: "Total Farms", value: "24", change: "+2 this month", color: "text-primary" },
    { label: "Active Lots", value: "156", change: "+23 today", color: "text-success" },
    { label: "Avg Quality", value: "A+", change: "Improved from A", color: "text-primary" },
    { label: "Total Harvest", value: "8.2 MT", change: "+1.1 MT this week", color: "text-success" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Supervisor Dashboard</h1>
          <p className="text-muted-foreground">Monitor multiple farms and oversee quality control</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overallStats.map((stat, index) => (
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
          {/* Farm Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Farm Overview</CardTitle>
              <CardDescription>Status and performance of supervised farms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {farmStats.map((farm, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{farm.farm}</h4>
                      <Badge variant={farm.status === 'Active' ? 'default' : 'destructive'}>
                        {farm.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Active Lots:</span>
                        <span className="ml-2 font-medium">{farm.lots}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Quality:</span>
                        <span className="ml-2 font-medium">{farm.quality}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Total Harvest:</span>
                        <span className="ml-2 font-medium">{farm.harvest}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts & Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Farm Alerts</CardTitle>
              <CardDescription>Important updates from supervised farms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${
                    alert.severity === 'warning' ? 'border-warning bg-warning/10' :
                    alert.severity === 'success' ? 'border-success bg-success/10' :
                    'border-primary bg-primary/10'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{alert.farm}</p>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
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
            <CardTitle>Supervision Tools</CardTitle>
            <CardDescription>Manage and monitor farm operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col gap-2">
                <span className="text-lg">🌾</span>
                <span>Farm Inspection</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">📊</span>
                <span>Quality Reports</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">📋</span>
                <span>Compliance Check</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">📱</span>
                <span>Farm Communication</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SupervisorDashboard;