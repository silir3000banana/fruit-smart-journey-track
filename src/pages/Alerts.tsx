import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Bell,
  AlertTriangle,
  Thermometer,
  Clock,
  CheckCircle,
  X,
  Settings,
  Package,
  Truck,
} from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  type: "temperature" | "delay" | "ripening" | "quality" | "dispatch";
  severity: "critical" | "warning" | "info";
  title: string;
  message: string;
  batchId?: string;
  timestamp: string;
  isRead: boolean;
  isResolved: boolean;
}

const Alerts = () => {
  const { toast } = useToast();

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "temperature",
      severity: "critical",
      title: "Temperature Spike Detected",
      message: "Batch BN-2025-014 experienced temperature spike to 18.5°C in transport vehicle TN-38-AQ-4521",
      batchId: "BN-2025-014",
      timestamp: "2025-12-16 14:32",
      isRead: false,
      isResolved: false,
    },
    {
      id: "2",
      type: "ripening",
      severity: "info",
      title: "Ripening Complete",
      message: "Batch BN-2025-013 has reached optimal ripeness. Ready for dispatch from Chamber RC-003.",
      batchId: "BN-2025-013",
      timestamp: "2025-12-16 12:15",
      isRead: false,
      isResolved: false,
    },
    {
      id: "3",
      type: "delay",
      severity: "warning",
      title: "Transport Delay",
      message: "Shipment from Erode to Chennai delayed by 2 hours due to traffic. New ETA: 18:30",
      batchId: "BN-2025-012",
      timestamp: "2025-12-16 10:45",
      isRead: true,
      isResolved: false,
    },
    {
      id: "4",
      type: "quality",
      severity: "warning",
      title: "Quality Score Below Threshold",
      message: "Batch MG-2025-008 quality score dropped to 72%. Recommend immediate inspection.",
      batchId: "MG-2025-008",
      timestamp: "2025-12-15 16:20",
      isRead: true,
      isResolved: true,
    },
    {
      id: "5",
      type: "dispatch",
      severity: "info",
      title: "Dispatch Ready",
      message: "Batch BN-2025-011 is ready for dispatch. FIFO position: 1. Destination: Fresh Mart, Chennai",
      batchId: "BN-2025-011",
      timestamp: "2025-12-15 09:00",
      isRead: true,
      isResolved: true,
    },
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    temperature: true,
    delay: true,
    ripening: true,
    quality: true,
    dispatch: false,
    emailAlerts: true,
    smsAlerts: false,
  });

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const markAsResolved = (alertId: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === alertId ? { ...alert, isResolved: true } : alert
    ));
    toast({
      title: "Alert Resolved",
      description: "Alert has been marked as resolved.",
    });
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
    toast({
      title: "Alert Dismissed",
      description: "Alert has been removed from the list.",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-blue-500 text-white";
    }
  };

  const getSeverityBorder = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-l-4 border-l-destructive";
      case "warning":
        return "border-l-4 border-l-warning";
      default:
        return "border-l-4 border-l-blue-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "temperature":
        return <Thermometer className="w-5 h-5" />;
      case "delay":
        return <Truck className="w-5 h-5" />;
      case "ripening":
        return <Clock className="w-5 h-5" />;
      case "quality":
        return <AlertTriangle className="w-5 h-5" />;
      case "dispatch":
        return <Package className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const unreadCount = alerts.filter(a => !a.isRead).length;
  const activeAlerts = alerts.filter(a => !a.isResolved);
  const resolvedAlerts = alerts.filter(a => a.isResolved);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-8 mt-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Alerts & Notifications
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage system alerts across the supply chain
            </p>
          </div>
          <div className="flex items-center gap-4">
            {unreadCount > 0 && (
              <Badge className="bg-destructive">{unreadCount} Unread</Badge>
            )}
            <Button
              variant="outline"
              onClick={() => setAlerts(alerts.map(a => ({ ...a, isRead: true })))}
            >
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-destructive/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <span className="text-sm text-muted-foreground">Critical</span>
              </div>
              <p className="text-2xl font-bold text-destructive">
                {alerts.filter(a => a.severity === "critical" && !a.isResolved).length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-warning/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning" />
                <span className="text-sm text-muted-foreground">Warning</span>
              </div>
              <p className="text-2xl font-bold text-warning">
                {alerts.filter(a => a.severity === "warning" && !a.isResolved).length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-blue-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Info</span>
              </div>
              <p className="text-2xl font-bold text-blue-500">
                {alerts.filter(a => a.severity === "info" && !a.isResolved).length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-success/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-sm text-muted-foreground">Resolved</span>
              </div>
              <p className="text-2xl font-bold text-success">
                {resolvedAlerts.length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">
              Active ({activeAlerts.length})
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved ({resolvedAlerts.length})
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Active Alerts */}
          <TabsContent value="active" className="space-y-4">
            {activeAlerts.length === 0 ? (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-success" />
                  <h3 className="text-lg font-semibold mb-2">All Clear!</h3>
                  <p className="text-muted-foreground">No active alerts at the moment.</p>
                </CardContent>
              </Card>
            ) : (
              activeAlerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`${getSeverityBorder(alert.severity)} ${
                    !alert.isRead ? "bg-muted/30" : ""
                  }`}
                >
                  <CardContent className="pt-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex gap-4">
                        <div
                          className={`p-2 rounded-full ${
                            alert.severity === "critical"
                              ? "bg-destructive/10 text-destructive"
                              : alert.severity === "warning"
                              ? "bg-warning/10 text-warning"
                              : "bg-blue-500/10 text-blue-500"
                          }`}
                        >
                          {getTypeIcon(alert.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{alert.title}</h4>
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            {!alert.isRead && (
                              <Badge variant="outline" className="text-xs">New</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {alert.message}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {alert.batchId && (
                              <span className="bg-muted px-2 py-1 rounded">
                                Batch: {alert.batchId}
                              </span>
                            )}
                            <span>{alert.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!alert.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(alert.id)}
                          >
                            Mark Read
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsResolved(alert.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolve
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissAlert(alert.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Resolved Alerts */}
          <TabsContent value="resolved" className="space-y-4">
            {resolvedAlerts.length === 0 ? (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Resolved Alerts</h3>
                  <p className="text-muted-foreground">
                    Resolved alerts will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              resolvedAlerts.map((alert) => (
                <Card key={alert.id} className="opacity-70">
                  <CardContent className="pt-4">
                    <div className="flex gap-4">
                      <div className="p-2 rounded-full bg-muted text-muted-foreground">
                        {getTypeIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{alert.title}</h4>
                          <Badge variant="outline" className="text-success border-success">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Resolved
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {alert.message}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {alert.batchId && (
                            <span>Batch: {alert.batchId}</span>
                          )}
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Alert Types
                </CardTitle>
                <CardDescription>
                  Configure which types of alerts you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Thermometer className="w-5 h-5 text-destructive" />
                    <div>
                      <Label>Temperature Breach Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when temperature exceeds threshold
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.temperature}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, temperature: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-warning" />
                    <div>
                      <Label>Delay Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when shipments are delayed
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.delay}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, delay: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <div>
                      <Label>Ripening Ready Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when batches complete ripening
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.ripening}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, ripening: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <div>
                      <Label>Quality Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when quality score drops
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.quality}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, quality: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-purple-500" />
                    <div>
                      <Label>Dispatch Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when batches are ready for dispatch
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.dispatch}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, dispatch: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Channels</CardTitle>
                <CardDescription>
                  How would you like to receive alerts?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts via email
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive critical alerts via SMS
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, smsAlerts: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Alerts;