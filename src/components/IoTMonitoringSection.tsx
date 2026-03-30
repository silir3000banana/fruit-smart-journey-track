import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Wind, AlertTriangle, Timer } from "lucide-react";

interface SensorData { temp: number; humidity: number; ethylene: number; status: string; }

const IoTMonitoringSection = () => {
  const [sensors, setSensors] = useState<SensorData[]>([
    { temp: 18.2, humidity: 90, ethylene: 12, status: "active" },
    { temp: 19.1, humidity: 88, ethylene: 8, status: "active" },
    { temp: 5.3, humidity: 92, ethylene: 0, status: "cold" },
    { temp: 19.5, humidity: 85, ethylene: 15, status: "alert" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => prev.map(s => ({
        ...s,
        temp: +(s.temp + (Math.random() - 0.5) * 0.3).toFixed(1),
        humidity: Math.min(99, Math.max(75, Math.round(s.humidity + (Math.random() - 0.5) * 1))),
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const chambers = ["Chamber 1", "Chamber 2", "Cold Store A", "Chamber 3"];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4 text-xs tracking-wider uppercase px-4 py-1.5 rounded-full">IoT Monitoring</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Sensor & Chamber Monitoring</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Live IoT sensor feeds from ripening chambers and cold storage units.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {sensors.map((s, i) => (
            <Card key={i} className={`border-border/40 hover:shadow-elegant hover:-translate-y-0.5 transition-all duration-300 rounded-2xl ${s.status === "alert" ? "border-warning/40" : ""}`}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-foreground">{chambers[i]}</span>
                  <Badge variant="outline" className={`text-[10px] rounded-full ${
                    s.status === "active" ? "bg-success/10 text-success border-success/20" :
                    s.status === "cold" ? "bg-info/10 text-info border-info/20" :
                    "bg-warning/10 text-warning border-warning/20"
                  }`}>{s.status}</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Thermometer className="w-3.5 h-3.5" />Temp</span>
                    <span className="text-sm font-bold text-foreground tabular-nums">{s.temp}°C</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Droplets className="w-3.5 h-3.5" />Humidity</span>
                    <span className="text-sm font-bold text-foreground tabular-nums">{s.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Wind className="w-3.5 h-3.5" />Ethylene</span>
                    <span className="text-sm font-bold text-foreground tabular-nums">{s.ethylene} ppm</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alert */}
        <Card className="border-warning/30 max-w-2xl mx-auto rounded-2xl" style={{ background: 'hsl(30 92% 50% / 0.04)' }}>
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">Temperature Deviation — Chamber 3</h4>
                <Badge variant="outline" className="text-[10px] bg-warning/10 text-warning border-warning/20 rounded-full">Urgent</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Current: 19.5°C • Required: 15°C</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-warning font-medium">
                <Timer className="w-3 h-3" /> Action required within 20 minutes
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default IoTMonitoringSection;
