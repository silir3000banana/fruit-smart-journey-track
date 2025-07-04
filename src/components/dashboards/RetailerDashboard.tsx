import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const RetailerDashboard = () => {
  const incomingLots = [
    { id: "BN-789", variety: "Cavendish", quantity: "500 kg", eta: "2 hours", quality: "A+", supplier: "Green Valley" },
    { id: "BN-890", variety: "Robusta", quantity: "300 kg", eta: "Tomorrow", quality: "A", supplier: "Sunrise Orchards" },
    { id: "BN-567", variety: "Red Banana", quantity: "200 kg", eta: "Today", quality: "A+", supplier: "Fresh Farms" }
  ];

  const inventory = [
    { variety: "Cavendish", stock: "1.2 MT", quality: "A+", shelfLife: "5 days", location: "Aisle 3" },
    { variety: "Robusta", stock: "800 kg", quality: "A", shelfLife: "3 days", location: "Aisle 3" },
    { variety: "Red Banana", stock: "400 kg", quality: "A+", shelfLife: "4 days", location: "Aisle 4" }
  ];

  const stats = [
    { label: "Total Inventory", value: "2.4 MT", change: "+300 kg today", color: "text-primary" },
    { label: "Quality Average", value: "A+", change: "Excellent quality", color: "text-success" },
    { label: "Shelf Life", value: "4.2 days", change: "Above average", color: "text-success" },
    { label: "Traceability", value: "100%", change: "Fully tracked", color: "text-primary" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Retailer Dashboard</h1>
          <p className="text-muted-foreground">Manage inventory and track incoming shipments</p>
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
          {/* Incoming Shipments */}
          <Card>
            <CardHeader>
              <CardTitle>Incoming Shipments</CardTitle>
              <CardDescription>Track expected deliveries and quality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomingLots.map((lot) => (
                  <div key={lot.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{lot.id}</h4>
                        <p className="text-sm text-muted-foreground">{lot.supplier}</p>
                      </div>
                      <Badge variant="premium">{lot.quality}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Variety:</span>
                        <span className="ml-2 font-medium">{lot.variety}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Quantity:</span>
                        <span className="ml-2 font-medium">{lot.quantity}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">ETA:</span>
                        <span className="ml-2 font-medium text-primary">{lot.eta}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Inventory */}
          <Card>
            <CardHeader>
              <CardTitle>Current Inventory</CardTitle>
              <CardDescription>Stock levels and quality status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{item.variety}</h4>
                      <Badge variant="outline">{item.quality}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Stock:</span>
                        <span className="ml-2 font-medium">{item.stock}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <span className="ml-2 font-medium">{item.location}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Shelf Life:</span>
                        <span className="ml-2 font-medium">{item.shelfLife}</span>
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
            <CardTitle>Retail Operations</CardTitle>
            <CardDescription>Manage store operations and customer service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col gap-2">
                <span className="text-lg">📦</span>
                <span>Receive Shipment</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">📱</span>
                <span>Scan QR Code</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">📊</span>
                <span>Sales Reports</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">🔍</span>
                <span>Trace Origin</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RetailerDashboard;