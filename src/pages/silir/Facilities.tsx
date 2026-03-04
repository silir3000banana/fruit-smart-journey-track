import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Thermometer, Droplets, Wind, Zap, Play, Settings, Fan } from "lucide-react";

interface Chamber {
  id: number;
  name: string;
  type: "ripening" | "cold" | "drying";
  temp: number;
  targetTemp: number;
  humidity: number;
  ethylene: string;
  ripeness: number;
  status: "running" | "idle" | "alert";
  batch: string | null;
}

export default function Facilities() {
  const [chambers, setChambers] = useState<Chamber[]>([
    { id: 1, name: "Ripening Chamber 1", type: "ripening", temp: 18.2, targetTemp: 18, humidity: 90, ethylene: "Normal", ripeness: 72, status: "running", batch: "BAN2403A" },
    { id: 2, name: "Ripening Chamber 2", type: "ripening", temp: 19.1, targetTemp: 19, humidity: 88, ethylene: "High", ripeness: 45, status: "running", batch: "MAN2403B" },
    { id: 3, name: "Cold Store A", type: "cold", temp: 2.1, targetTemp: 2, humidity: 92, ethylene: "N/A", ripeness: 0, status: "running", batch: "PAP2403C" },
    { id: 4, name: "Cold Store B", type: "cold", temp: 3.0, targetTemp: 3, humidity: 85, ethylene: "N/A", ripeness: 0, status: "idle", batch: null },
    { id: 5, name: "Solar Dryer 1", type: "drying", temp: 45.2, targetTemp: 45, humidity: 30, ethylene: "N/A", ripeness: 0, status: "running", batch: "BAN2403D" },
  ]);

  const [cycleStarted, setCycleStarted] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setChambers(prev => prev.map(c => ({
        ...c,
        temp: +(c.temp + (Math.random() - 0.5) * 0.3).toFixed(1),
        humidity: Math.min(99, Math.max(20, +(c.humidity + (Math.random() - 0.5) * 0.8).toFixed(0))),
        ripeness: c.type === "ripening" && c.status === "running"
          ? Math.min(100, +(c.ripeness + Math.random() * 0.2).toFixed(1))
          : c.ripeness,
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const startCycle = (id: number) => {
    setCycleStarted(id);
    setChambers(prev => prev.map(c => c.id === id ? { ...c, status: "running" } : c));
    setTimeout(() => setCycleStarted(null), 3000);
  };

  const typeColor = (type: string) =>
    type === "ripening" ? "bg-amber-50 text-amber-700 border-amber-200" :
    type === "cold" ? "bg-blue-50 text-blue-700 border-blue-200" :
    "bg-orange-50 text-orange-700 border-orange-200";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Facilities</h1>
        <p className="text-sm text-gray-500">Tesla-style chamber control panels</p>
      </div>

      {cycleStarted && (
        <Card className="border-[#1E7F5A]/20 bg-green-50 shadow-sm animate-fade-in">
          <CardContent className="p-4 flex items-center gap-3">
            <Play className="w-5 h-5 text-[#1E7F5A]" />
            <span className="text-[#1E7F5A] font-medium">
              Ripening Cycle Started — Chamber {cycleStarted}
            </span>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {chambers.map((chamber) => (
          <Card key={chamber.id} className="border-gray-200 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{chamber.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs ${typeColor(chamber.type)}`}>
                    {chamber.type}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      chamber.status === "running" ? "bg-green-50 text-[#1E7F5A] border-[#1E7F5A]/20" :
                      chamber.status === "alert" ? "bg-red-50 text-[#EF4444] border-[#EF4444]/20" :
                      "bg-gray-50 text-gray-500 border-gray-200"
                    }`}
                  >
                    {chamber.status}
                  </Badge>
                </div>
              </div>
              {chamber.batch && <p className="text-xs text-gray-400 mt-1">Batch: {chamber.batch}</p>}
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Gauges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <Thermometer className="w-4 h-4 mx-auto text-[#EF4444] mb-1" />
                  <p className="text-xl font-bold text-gray-900 tabular-nums">{chamber.temp}°C</p>
                  <p className="text-[10px] text-gray-400">Target: {chamber.targetTemp}°C</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <Droplets className="w-4 h-4 mx-auto text-blue-500 mb-1" />
                  <p className="text-xl font-bold text-gray-900 tabular-nums">{chamber.humidity}%</p>
                  <p className="text-[10px] text-gray-400">Humidity</p>
                </div>
              </div>

              {/* Ethylene */}
              {chamber.type === "ripening" && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> Ethylene
                  </span>
                  <Badge variant="outline" className={
                    chamber.ethylene === "Normal" ? "text-[#1E7F5A] bg-green-50 border-[#1E7F5A]/20 text-xs" :
                    "text-amber-700 bg-amber-50 border-amber-200 text-xs"
                  }>
                    {chamber.ethylene}
                  </Badge>
                </div>
              )}

              {/* Ripening progress */}
              {chamber.type === "ripening" && (
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500">Ripening Progress</span>
                    <span className="font-medium text-[#1E7F5A]">{Math.round(chamber.ripeness)}%</span>
                  </div>
                  <Progress value={chamber.ripeness} className="h-2 bg-gray-100" />
                </div>
              )}

              {/* Controls */}
              <div className="flex gap-2 pt-1">
                {chamber.status === "idle" ? (
                  <Button
                    size="sm"
                    className="bg-[#1E7F5A] text-white hover:bg-[#1E7F5A]/90 flex-1"
                    onClick={() => startCycle(chamber.id)}
                  >
                    <Play className="w-3.5 h-3.5 mr-1.5" /> Start Cycle
                  </Button>
                ) : (
                  <>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Settings className="w-3.5 h-3.5 mr-1" /> Adjust
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Fan className="w-3.5 h-3.5 mr-1" /> Ventilation
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
