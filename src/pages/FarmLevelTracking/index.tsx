import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  QrCode, 
  MapPin, 
  Camera, 
  CheckCircle, 
  Tractor,
  Package,
  BarChart3,
  Leaf,
  Users,
  FileText
} from "lucide-react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

const FarmLevelTracking = () => {
  const modules = [
    {
      id: "harvest-entry",
      title: "Harvest Data Entry",
      description: "Record harvest details and generate lot IDs",
      icon: Leaf,
      status: "active",
      route: "/farm-tracking/harvest-entry"
    },
    {
      id: "lot-management",
      title: "Lot Management",
      description: "Track and manage harvest lots",
      icon: Package,
      status: "active",
      route: "/farm-tracking/lot-management"
    },
    {
      id: "qr-generation",
      title: "QR Code Generation",
      description: "Generate QR codes for traceability",
      icon: QrCode,
      status: "active",
      route: "/farm-tracking/qr-generation"
    },
    {
      id: "field-mapping",
      title: "Field Mapping",
      description: "GPS mapping and field boundaries",
      icon: MapPin,
      status: "active",
      route: "/farm-tracking/field-mapping"
    },
    {
      id: "worker-management",
      title: "Worker Management",
      description: "Track field workers and assignments",
      icon: Users,
      status: "active",
      route: "/farm-tracking/worker-management"
    },
    {
      id: "equipment-tracking",
      title: "Equipment Tracking",
      description: "Monitor farm equipment usage",
      icon: Tractor,
      status: "active",
      route: "/farm-tracking/equipment-tracking"
    },
    {
      id: "analytics",
      title: "Farm Analytics",
      description: "Yield analysis and performance metrics",
      icon: BarChart3,
      status: "active",
      route: "/farm-tracking/analytics"
    },
    {
      id: "documentation",
      title: "Farm Documentation",
      description: "Certificates, compliance records",
      icon: FileText,
      status: "active",
      route: "/farm-tracking/documentation"
    }
  ];

  const recentActivity = [
    { id: 1, action: "Harvest recorded", lot: "LOT001", time: "2 hours ago", status: "completed" },
    { id: 2, action: "QR code generated", lot: "LOT002", time: "4 hours ago", status: "completed" },
    { id: 3, action: "Field mapping updated", lot: "Field-A", time: "6 hours ago", status: "completed" },
    { id: 4, action: "Worker assigned", lot: "LOT003", time: "8 hours ago", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Farm Level Tracking</h1>
          <p className="text-muted-foreground">Comprehensive farm management and traceability system</p>
        </div>

        <Tabs defaultValue="modules" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="modules">Tracking Modules</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {modules.map((module) => (
                <Card key={module.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <module.icon className="w-8 h-8 text-primary" />
                      <Badge variant={module.status === "active" ? "default" : "secondary"}>
                        {module.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={module.route}>
                      <Button className="w-full" variant="outline">
                        Access Module
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">42</CardTitle>
                  <CardDescription>Active Lots</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">15.2K kg</CardTitle>
                  <CardDescription>Total Harvest</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">8</CardTitle>
                  <CardDescription>Active Workers</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest farm tracking activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.lot} • {activity.time}
                        </p>
                      </div>
                      <Badge variant={activity.status === "completed" ? "default" : "secondary"}>
                        {activity.status}
                      </Badge>
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

export default FarmLevelTracking;