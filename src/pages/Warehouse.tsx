import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Warehouse as WarehouseIcon, 
  Package, 
  ScanLine, 
  ArrowDownToLine, 
  ArrowUpFromLine,
  Thermometer,
  Droplets,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search
} from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const Warehouse = () => {
  const [scanInput, setScanInput] = useState("");
  const { toast } = useToast();

  // Sample warehouse data
  const warehouseStats = {
    totalCapacity: 50000,
    currentStock: 32500,
    inboundToday: 8,
    outboundToday: 5,
    temperature: 13.2,
    humidity: 85,
  };

  const inventoryBatches = [
    {
      id: "BN-2025-014",
      product: "Banana - Cavendish",
      quantity: 980,
      zone: "Zone-A",
      fifoPosition: 1,
      inboundDate: "2025-12-16",
      daysStored: 2,
      status: "ready_dispatch",
      temperature: 13.0,
      freshness: "Excellent",
    },
    {
      id: "BN-2025-013",
      product: "Banana - Grand Nain",
      quantity: 1200,
      zone: "Zone-A",
      fifoPosition: 2,
      inboundDate: "2025-12-15",
      daysStored: 3,
      status: "stored",
      temperature: 12.8,
      freshness: "Good",
    },
    {
      id: "BN-2025-012",
      product: "Banana - Robusta",
      quantity: 850,
      zone: "Zone-B",
      fifoPosition: 3,
      inboundDate: "2025-12-14",
      daysStored: 4,
      status: "stored",
      temperature: 13.1,
      freshness: "Good",
    },
    {
      id: "MG-2025-008",
      product: "Mango - Alphonso",
      quantity: 500,
      zone: "Zone-C",
      fifoPosition: 4,
      inboundDate: "2025-12-13",
      daysStored: 5,
      status: "attention",
      temperature: 11.5,
      freshness: "Fair",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "inbound",
      batchId: "BN-2025-014",
      quantity: 980,
      time: "14:30",
      zone: "Zone-A",
    },
    {
      id: 2,
      type: "outbound",
      batchId: "BN-2025-011",
      quantity: 750,
      time: "12:15",
      destination: "Fresh Mart, Chennai",
    },
    {
      id: 3,
      type: "inbound",
      batchId: "BN-2025-013",
      quantity: 1200,
      time: "10:00",
      zone: "Zone-A",
    },
    {
      id: 4,
      type: "outbound",
      batchId: "BN-2025-010",
      quantity: 600,
      time: "09:30",
      destination: "Metro Hypermarket, Bangalore",
    },
  ];

  const handleInboundScan = () => {
    if (scanInput) {
      toast({
        title: "Inbound Scan Recorded",
        description: `Batch ${scanInput} has been received and logged.`,
      });
      setScanInput("");
    }
  };

  const handleOutboundScan = () => {
    if (scanInput) {
      toast({
        title: "Outbound Scan Recorded",
        description: `Batch ${scanInput} has been dispatched.`,
      });
      setScanInput("");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready_dispatch":
        return <Badge className="bg-success">Ready for Dispatch</Badge>;
      case "stored":
        return <Badge variant="secondary">Stored</Badge>;
      case "attention":
        return <Badge className="bg-warning">Needs Attention</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getFreshnessBadge = (freshness: string) => {
    switch (freshness) {
      case "Excellent":
        return <Badge className="bg-success">{freshness}</Badge>;
      case "Good":
        return <Badge className="bg-blue-500">{freshness}</Badge>;
      case "Fair":
        return <Badge className="bg-warning">{freshness}</Badge>;
      default:
        return <Badge variant="outline">{freshness}</Badge>;
    }
  };

  const utilizationPercent = Math.round((warehouseStats.currentStock / warehouseStats.totalCapacity) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Warehouse & Distribution</h1>
          <p className="text-muted-foreground">Manage inventory, inbound/outbound scanning, and FIFO dispatch</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <WarehouseIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Capacity</span>
              </div>
              <p className="text-2xl font-bold">{utilizationPercent}%</p>
              <Progress value={utilizationPercent} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Stock (kg)</span>
              </div>
              <p className="text-2xl font-bold">{warehouseStats.currentStock.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <ArrowDownToLine className="w-4 h-4 text-success" />
                <span className="text-xs text-muted-foreground">Inbound</span>
              </div>
              <p className="text-2xl font-bold text-success">{warehouseStats.inboundToday}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUpFromLine className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-muted-foreground">Outbound</span>
              </div>
              <p className="text-2xl font-bold text-blue-500">{warehouseStats.outboundToday}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="w-4 h-4 text-orange-500" />
                <span className="text-xs text-muted-foreground">Temp</span>
              </div>
              <p className="text-2xl font-bold">{warehouseStats.temperature}°C</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-muted-foreground">Humidity</span>
              </div>
              <p className="text-2xl font-bold">{warehouseStats.humidity}%</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="scanning">Scan In/Out</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
            <TabsTrigger value="dispatch">Dispatch Queue</TabsTrigger>
          </TabsList>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Current Inventory
                </CardTitle>
                <CardDescription>
                  All batches currently stored in warehouse (FIFO order)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search by Batch ID or Product..." className="pl-10" />
                  </div>
                </div>

                <div className="space-y-4">
                  {inventoryBatches.map((batch, index) => (
                    <div
                      key={batch.id}
                      className={`border rounded-lg p-4 ${
                        batch.status === "attention" ? "border-warning bg-warning/5" : ""
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-muted w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                            {batch.fifoPosition}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{batch.id}</h4>
                              {getStatusBadge(batch.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">{batch.product}</p>
                            <div className="flex flex-wrap gap-2 mt-2 text-xs">
                              <span className="bg-muted px-2 py-1 rounded">Zone: {batch.zone}</span>
                              <span className="bg-muted px-2 py-1 rounded">Qty: {batch.quantity} kg</span>
                              <span className="bg-muted px-2 py-1 rounded">
                                <Clock className="w-3 h-3 inline mr-1" />
                                {batch.daysStored} days
                              </span>
                              <span className="bg-muted px-2 py-1 rounded">
                                <Thermometer className="w-3 h-3 inline mr-1" />
                                {batch.temperature}°C
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {getFreshnessBadge(batch.freshness)}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {batch.fifoPosition === 1 && (
                            <Button size="sm" className="bg-success hover:bg-success/90">
                              Dispatch
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scanning Tab */}
          <TabsContent value="scanning" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-success">
                    <ArrowDownToLine className="w-5 h-5" />
                    Inbound Scan
                  </CardTitle>
                  <CardDescription>
                    Scan or enter Batch ID for receiving goods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Scan QR / Enter Batch ID"
                      value={scanInput}
                      onChange={(e) => setScanInput(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button onClick={handleInboundScan} className="w-full bg-success hover:bg-success/90">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Record Inbound
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-500">
                    <ArrowUpFromLine className="w-5 h-5" />
                    Outbound Scan
                  </CardTitle>
                  <CardDescription>
                    Scan or enter Batch ID for dispatching goods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Scan QR / Enter Batch ID"
                      value={scanInput}
                      onChange={(e) => setScanInput(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button onClick={handleOutboundScan} className="w-full bg-blue-500 hover:bg-blue-600">
                    <ArrowUpFromLine className="w-4 h-4 mr-2" />
                    Record Outbound
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Scan Simulation</CardTitle>
                <CardDescription>Click to simulate scanning a batch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["BN-2025-014", "BN-2025-015", "BN-2025-016", "MG-2025-008"].map((id) => (
                    <Button key={id} variant="outline" onClick={() => setScanInput(id)}>
                      {id}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Log Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Activity</CardTitle>
                <CardDescription>
                  Recent inbound and outbound transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-3 border rounded-lg"
                    >
                      <div
                        className={`p-2 rounded-full ${
                          activity.type === "inbound"
                            ? "bg-success/10 text-success"
                            : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        {activity.type === "inbound" ? (
                          <ArrowDownToLine className="w-4 h-4" />
                        ) : (
                          <ArrowUpFromLine className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{activity.batchId}</span>
                          <Badge variant="outline">{activity.quantity} kg</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {activity.type === "inbound"
                            ? `Received to ${activity.zone}`
                            : `Dispatched to ${activity.destination}`}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dispatch Queue Tab */}
          <TabsContent value="dispatch" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  FIFO Dispatch Queue
                </CardTitle>
                <CardDescription>
                  Batches ordered by First-In-First-Out priority
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryBatches
                    .sort((a, b) => a.fifoPosition - b.fifoPosition)
                    .map((batch, index) => (
                      <div
                        key={batch.id}
                        className={`flex items-center justify-between p-4 border rounded-lg ${
                          index === 0 ? "border-success bg-success/5" : ""
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0
                                ? "bg-success text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold">{batch.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {batch.product} • {batch.quantity} kg
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            Stored: {batch.daysStored} days
                          </span>
                          {index === 0 ? (
                            <Button size="sm" className="bg-success hover:bg-success/90">
                              Next Dispatch
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" disabled>
                              Waiting
                            </Button>
                          )}
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

export default Warehouse;