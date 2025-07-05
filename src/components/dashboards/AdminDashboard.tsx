import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const AdminDashboard = () => {
  const systemStats = [
    { label: "Total Users", value: "1,247", change: "+23 this week", color: "text-primary" },
    { label: "Active Lots", value: "3,456", change: "+156 today", color: "text-success" },
    { label: "Revenue", value: "₹12.5L", change: "+18% this month", color: "text-success" },
    { label: "System Health", value: "99.8%", change: "All systems operational", color: "text-primary" }
  ];

  const recentActivity = [
    { user: "Farmer: Raj Kumar", action: "Created new lot BN-456", time: "2 mins ago", type: "create" },
    { user: "Cold Storage: FreshCold", action: "Updated storage conditions", time: "5 mins ago", type: "update" },
    { user: "Retailer: SuperMart", action: "Received lot BN-123", time: "10 mins ago", type: "receive" },
    { user: "System", action: "AI grading completed for 25 lots", time: "15 mins ago", type: "system" }
  ];

  const usersByRole = [
    { role: "Farmers", count: 856, percentage: 69 },
    { role: "Cold Storage", count: 45, percentage: 4 },
    { role: "Retailers", count: 298, percentage: 24 },
    { role: "Supervisors", count: 38, percentage: 3 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management controls</p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => (
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
          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>Active users by role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usersByRole.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-primary`} style={{ opacity: 1 - (index * 0.2) }}></div>
                      <span className="font-medium">{user.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{user.count}</span>
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${user.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system events and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'create' ? 'bg-success' :
                      activity.type === 'update' ? 'bg-warning' :
                      activity.type === 'receive' ? 'bg-primary' : 'bg-muted-foreground'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Actions */}
        <Card>
          <CardHeader>
            <CardTitle>System Management</CardTitle>
            <CardDescription>Administrative tools and system controls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Button className="h-20 flex flex-col gap-2">
                <span className="text-lg">👥</span>
                <span>Manage Users</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => window.location.href = '/harvest'}>
                <span className="text-lg">🌾</span>
                <span>Harvest Module</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">📊</span>
                <span>Analytics</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">⚙️</span>
                <span>System Settings</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <span className="text-lg">📋</span>
                <span>Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;