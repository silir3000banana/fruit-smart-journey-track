import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";

const EnhancedRetailerDashboard = () => {
  const inventoryStats = {
    totalStock: "45.2 MT",
    availableForSale: "42.8 MT",
    reserved: "2.4 MT",
    averageQuality: "A",
    supplierCount: 8,
    todaysSales: "₹2,45,000"
  };

  const inventory = [
    { 
      lotId: "BN-2024-001", 
      supplier: "Kumar Farms", 
      quantity: "2.5 MT", 
      quality: "A+", 
      received: "2 days ago",
      expiry: "12 days",
      sellPrice: "₹85/kg",
      status: "Available"
    },
    { 
      lotId: "BN-2024-002", 
      supplier: "Green Valley", 
      quantity: "3.2 MT", 
      quality: "A", 
      received: "1 day ago",
      expiry: "14 days",
      sellPrice: "₹78/kg",
      status: "Reserved"
    },
    { 
      lotId: "BN-2024-003", 
      supplier: "Fresh Farms", 
      quantity: "1.8 MT", 
      quality: "A+", 
      received: "3 hours ago",
      expiry: "15 days",
      sellPrice: "₹88/kg",
      status: "Quality Check"
    },
    { 
      lotId: "BN-2024-004", 
      supplier: "Sunrise Orchards", 
      quantity: "2.1 MT", 
      quality: "A", 
      received: "4 days ago",
      expiry: "8 days",
      sellPrice: "₹75/kg",
      status: "Promoted Sale"
    }
  ];

  const salesAnalytics = [
    { period: "Today", sales: "₹2,45,000", volume: "3.2 MT", avgPrice: "₹76/kg", growth: "+12%" },
    { period: "This Week", sales: "₹15,80,000", volume: "19.8 MT", avgPrice: "₹80/kg", growth: "+18%" },
    { period: "This Month", sales: "₹58,40,000", volume: "74.5 MT", avgPrice: "₹78/kg", growth: "+22%" }
  ];

  const customerInsights = [
    { segment: "Premium Buyers", percentage: 35, revenue: "₹20,44,000", avgOrder: "₹8,500" },
    { segment: "Regular Customers", percentage: 45, revenue: "₹26,28,000", avgOrder: "₹3,200" },
    { segment: "Bulk Buyers", percentage: 20, revenue: "₹11,68,000", avgOrder: "₹15,000" }
  ];

  const recentOrders = [
    { orderId: "ORD-001", customer: "Metro Fresh", quantity: "500 kg", value: "₹42,500", status: "Packed" },
    { orderId: "ORD-002", customer: "Gourmet Stores", quantity: "250 kg", value: "₹22,000", status: "Shipped" },
    { orderId: "ORD-003", customer: "Fresh Mart", quantity: "800 kg", value: "₹64,000", status: "Processing" },
    { orderId: "ORD-004", customer: "Organic Plus", quantity: "300 kg", value: "₹26,400", status: "Delivered" }
  ];

  const alerts = [
    { type: "warning", message: "Lot BN-2024-004 expires in 8 days", action: "Promote sale" },
    { type: "info", message: "New premium lot available from Kumar Farms", action: "Review pricing" },
    { type: "success", message: "Customer satisfaction rating improved to 4.8/5", action: "View feedback" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Retailer Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive retail management and sales analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Inventory</CardDescription>
              <CardTitle className="text-2xl text-primary">{inventoryStats.totalStock}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Available: {inventoryStats.availableForSale}</p>
              <p className="text-sm text-muted-foreground">Reserved: {inventoryStats.reserved}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Today's Sales</CardDescription>
              <CardTitle className="text-2xl text-success">{inventoryStats.todaysSales}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="text-success border-success">
                +12% vs yesterday
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Average Quality</CardDescription>
              <CardTitle className="text-2xl text-primary">{inventoryStats.averageQuality}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Premium lots: 68%</p>
              <p className="text-sm text-muted-foreground">Export grade: 35%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Suppliers</CardDescription>
              <CardTitle className="text-2xl text-foreground">{inventoryStats.supplierCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Certified: 100%</p>
              <p className="text-sm text-success">All traceable</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="insights">Customer Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory">
            <div className="space-y-6">
              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Alerts</CardTitle>
                  <CardDescription>Important notifications and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alerts.map((alert, index) => (
                      <div key={index} className={`p-3 rounded-lg border-l-4 ${
                        alert.type === 'warning' ? 'border-warning bg-warning/10' :
                        alert.type === 'success' ? 'border-success bg-success/10' :
                        'border-primary bg-primary/10'
                      }`}>
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">{alert.message}</p>
                          <Button size="sm" variant="outline">
                            {alert.action}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Inventory</CardTitle>
                  <CardDescription>All available lots with traceability information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inventory.map((item) => (
                      <div key={item.lotId} className="p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold">{item.lotId}</h4>
                            <Badge variant={item.quality === 'A+' ? 'default' : 'outline'}>
                              Grade {item.quality}
                            </Badge>
                            <Badge 
                              variant={
                                item.status === 'Available' ? 'default' : 
                                item.status === 'Reserved' ? 'secondary' : 'outline'
                              }
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">{item.sellPrice}</p>
                            <p className="text-sm text-muted-foreground">per kg</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Supplier:</span>
                            <p className="font-medium">{item.supplier}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Quantity:</span>
                            <p className="font-medium">{item.quantity}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Received:</span>
                            <p className="font-medium">{item.received}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Expires in:</span>
                            <p className={`font-medium ${parseInt(item.expiry) < 10 ? 'text-warning' : 'text-foreground'}`}>
                              {item.expiry}
                            </p>
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
            </div>
          </TabsContent>

          <TabsContent value="sales">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                  <CardDescription>Revenue and volume analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesAnalytics.map((period) => (
                      <div key={period.period} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">{period.period}</h4>
                          <Badge variant="outline" className="text-success border-success">
                            {period.growth}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Sales:</span>
                            <p className="font-bold text-primary">{period.sales}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Volume:</span>
                            <p className="font-medium">{period.volume}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Avg Price:</span>
                            <p className="font-medium">{period.avgPrice}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Essential retail operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="h-16 flex flex-col gap-1">
                      <span className="text-lg">📦</span>
                      <span className="text-sm">New Order</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col gap-1">
                      <span className="text-lg">🏷️</span>
                      <span className="text-sm">Update Prices</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col gap-1">
                      <span className="text-lg">📊</span>
                      <span className="text-sm">Sales Report</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col gap-1">
                      <span className="text-lg">🚚</span>
                      <span className="text-sm">Track Delivery</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders and fulfillment status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.orderId} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <div>
                          <h4 className="font-semibold">{order.orderId}</h4>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{order.quantity}</p>
                          <p className="text-sm text-muted-foreground">Quantity</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-primary">{order.value}</p>
                          <p className="text-sm text-muted-foreground">Value</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={
                            order.status === 'Delivered' ? 'default' :
                            order.status === 'Shipped' ? 'outline' : 'secondary'
                          }
                        >
                          {order.status}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Segments</CardTitle>
                  <CardDescription>Revenue breakdown by customer type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customerInsights.map((segment) => (
                      <div key={segment.segment} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{segment.segment}</span>
                          <div className="text-right">
                            <span className="font-bold text-primary">{segment.revenue}</span>
                            <span className="text-sm text-muted-foreground ml-2">({segment.percentage}%)</span>
                          </div>
                        </div>
                        <Progress value={segment.percentage} className="h-2" />
                        <p className="text-sm text-muted-foreground">Avg order: {segment.avgOrder}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Intelligence</CardTitle>
                  <CardDescription>Key insights and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                      <h4 className="font-semibold text-success mb-2">💡 Top Insight</h4>
                      <p className="text-sm">Premium customers (A+ grade preference) generate 35% of revenue but represent only 20% of volume. Consider targeted marketing for A+ grade lots.</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <h4 className="font-semibold text-primary mb-2">📈 Growth Opportunity</h4>
                      <p className="text-sm">Bulk buyers show 22% growth potential. Offering volume discounts on B-grade lots could capture larger market share.</p>
                    </div>
                    <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                      <h4 className="font-semibold text-warning mb-2">⚠️ Action Required</h4>
                      <p className="text-sm">2.4 MT inventory expires within 10 days. Consider promotional pricing or bulk sales to minimize waste.</p>
                    </div>
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

export default EnhancedRetailerDashboard;