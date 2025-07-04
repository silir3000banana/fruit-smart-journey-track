import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const ColdStorageDashboard = () => {
  const chambers = [
    { id: "CH-01", temp: "12°C", humidity: "85%", capacity: "80%", status: "Optimal", lots: 25 },
    { id: "CH-02", temp: "14°C", humidity: "82%", capacity: "65%", status: "Optimal", lots: 18 },
    { id: "CH-03", temp: "13°C", humidity: "88%", capacity: "90%", status: "Warning", lots: 32 },
    { id: "CH-04", temp: "11°C", humidity: "84%", capacity: "45%", status: "Optimal", lots: 12 }
  ];

  const alerts = [
    { chamber: "CH-03", message: "Humidity above threshold", severity: "warning", time: "5 mins ago" },
    { chamber: "CH-01", message: "Maintenance due in 2 days", severity: "info", time: "1 hour ago" },
    { chamber: "CH-02", message: "New lot BN-456 received", severity: "success", time: "2 hours ago" }
  ];

  const stats = [
    { label: "Total Capacity", value: "95%", change: "Across all chambers", color: "text-warning" },
    { label: "Active Lots", value: "87", change: "+12 today", color: "text-primary" },
    { label: "Avg Temperature", value: "12.5°C", change: "Within range", color: "text-success" },
    { label: "Energy Usage", value: "85 kWh", change: "-5% vs yesterday", color: "text-success" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Cold Storage Dashboard</h1>
          <p className="text-muted-foreground">Monitor storage conditions and manage inventory</p>
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
              <CardTitle>Chamber Status</CardTitle>
              <CardDescription>Real-time monitoring of storage chambers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chambers.map((chamber) => (
                  <div key={chamber.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{chamber.id}</h4>
                      <Badge variant={chamber.status === 'Optimal' ? 'default' : 'destructive'}>
                        {chamber.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Temperature:</span>
                        <span className="ml-2 font-medium">{chamber.temp}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Humidity:</span>
                        <span className="ml-2 font-medium">{chamber.humidity}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Capacity:</span>
                        <span className="ml-2 font-medium">{chamber.capacity}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Lots:</span>
                        <span className="ml-2 font-medium">{chamber.lots}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Alerts & Notifications</CardTitle>
              <CardDescription>Important updates and system alerts</CardDescription>
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
                        <p className="font-medium text-sm">{alert.chamber}</p>
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
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common storage management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col gap-2">
                <span className="text-lg">📦</span>
                <span>Receive Lot</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">🌡️</span>
                <span>Adjust Temperature</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">📊</span>
                <span>View Reports</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">🚚</span>
                <span>Dispatch Lot</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ColdStorageDashboard;