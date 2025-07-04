import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const FarmerDashboard = () => {
  const stats = [
    { label: "Active Lots", value: "12", change: "+2 this week", color: "text-primary" },
    { label: "Total Harvest", value: "2.5 MT", change: "+0.3 MT this week", color: "text-success" },
    { label: "Quality Grade", value: "A+", change: "Improved from A", color: "text-primary" },
    { label: "Revenue", value: "₹1,25,000", change: "+12% this month", color: "text-success" }
  ];

  const recentLots = [
    { id: "BN-001", variety: "Cavendish", quantity: "200 kg", status: "In Cold Storage", qr: "Generated" },
    { id: "BN-002", variety: "Robusta", quantity: "150 kg", status: "In Transit", qr: "Generated" },
    { id: "BN-003", variety: "Red Banana", quantity: "100 kg", status: "Grading", qr: "Generated" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Farmer Dashboard</h1>
          <p className="text-muted-foreground">Track your harvest, monitor quality, and manage your produce journey</p>
        </div>

        {/* Stats Grid */}
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

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for harvest management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col gap-2">
                <span className="text-lg">🌾</span>
                <span>New Harvest Entry</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">📱</span>
                <span>Scan QR Code</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">📊</span>
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Lots */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Lots</CardTitle>
            <CardDescription>Your latest harvest entries and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Lot ID</th>
                    <th className="text-left p-2">Variety</th>
                    <th className="text-left p-2">Quantity</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">QR Code</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLots.map((lot) => (
                    <tr key={lot.id} className="border-b">
                      <td className="p-2 font-medium">{lot.id}</td>
                      <td className="p-2">{lot.variety}</td>
                      <td className="p-2">{lot.quantity}</td>
                      <td className="p-2">
                        <Badge variant="outline">{lot.status}</Badge>
                      </td>
                      <td className="p-2">
                        <Badge variant="premium">{lot.qr}</Badge>
                      </td>
                      <td className="p-2">
                        <Button variant="ghost" size="sm">Track</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FarmerDashboard;