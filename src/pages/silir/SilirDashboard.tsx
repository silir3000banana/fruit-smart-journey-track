import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Thermometer, Droplets, Activity, Package, AlertTriangle,
  TrendingUp, TrendingDown, Zap, Timer, ArrowRight
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

const batchVolumeData = [
  { day: "Mon", batches: 12 }, { day: "Tue", batches: 18 },
  { day: "Wed", batches: 15 }, { day: "Thu", batches: 22 },
  { day: "Fri", batches: 20 }, { day: "Sat", batches: 8 },
  { day: "Sun", batches: 5 },
];

const qualityData = [
  { name: "Grade A", value: 65, color: "#1E7F5A" },
  { name: "Grade B", value: 25, color: "#38B27B" },
  { name: "Reject", value: 10, color: "#EF4444" },
];

const lossData = [
  { month: "Jan", loss: 12 }, { month: "Feb", loss: 10 },
  { month: "Mar", loss: 8 }, { month: "Apr", loss: 6 },
  { month: "May", loss: 5 }, { month: "Jun", loss: 3 },
];

interface ChamberData {
  id: number;
  name: string;
  temp: number;
  humidity: number;
  ripeness: number;
  status: "active" | "idle" | "alert";
}

export default function SilirDashboard() {
  const [chambers, setChambers] = useState<ChamberData[]>([
    { id: 1, name: "Chamber 1", temp: 18, humidity: 90, ripeness: 72, status: "active" },
    { id: 2, name: "Chamber 2", temp: 19, humidity: 88, ripeness: 45, status: "active" },
    { id: 3, name: "Chamber 3", temp: 5, humidity: 85, ripeness: 0, status: "idle" },
    { id: 4, name: "Cold Store A", temp: 2, humidity: 92, ripeness: 0, status: "active" },
  ]);

  // Simulate live sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChambers(prev =>
        prev.map(c => ({
          ...c,
          temp: +(c.temp + (Math.random() - 0.5) * 0.4).toFixed(1),
          humidity: Math.min(99, Math.max(70, +(c.humidity + (Math.random() - 0.5) * 1).toFixed(0))),
          ripeness: c.status === "active" && c.ripeness > 0
            ? Math.min(100, c.ripeness + Math.random() * 0.3)
            : c.ripeness,
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const kpis = [
    { label: "Active Chambers", value: "4", trend: "+1", up: true, icon: Thermometer },
    { label: "Active Batches", value: "23", trend: "+3", up: true, icon: Package },
    { label: "AI Alerts", value: "2", trend: "-1", up: false, icon: AlertTriangle },
    { label: "Throughput (T/day)", value: "18.5", trend: "+2.1", up: true, icon: Activity },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Real-time facility overview</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-[#1E7F5A] border-[#1E7F5A]/20 gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#38B27B] animate-pulse" />
          Live
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#1E7F5A]/10 flex items-center justify-center">
                  <kpi.icon className="w-4.5 h-4.5 text-[#1E7F5A]" />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-medium ${kpi.up ? "text-[#1E7F5A]" : "text-[#EF4444]"}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.trend}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chamber Cards */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">IoT Chamber Monitoring</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {chambers.map((chamber) => (
            <Card key={chamber.id} className="border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-800 text-sm">{chamber.name}</h3>
                  <Badge
                    variant="outline"
                    className={
                      chamber.status === "active"
                        ? "bg-green-50 text-[#1E7F5A] border-[#1E7F5A]/20 text-xs"
                        : chamber.status === "alert"
                        ? "bg-red-50 text-[#EF4444] border-[#EF4444]/20 text-xs"
                        : "bg-gray-50 text-gray-500 border-gray-200 text-xs"
                    }
                  >
                    {chamber.status}
                  </Badge>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Thermometer className="w-3.5 h-3.5" /> Temp
                    </span>
                    <span className="text-sm font-semibold text-gray-800 tabular-nums">
                      {chamber.temp}°C
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Droplets className="w-3.5 h-3.5" /> Humidity
                    </span>
                    <span className="text-sm font-semibold text-gray-800 tabular-nums">
                      {chamber.humidity}%
                    </span>
                  </div>
                  {chamber.ripeness > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Ripeness</span>
                        <span className="text-xs font-medium text-[#1E7F5A]">{Math.round(chamber.ripeness)}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#1E7F5A] to-[#38B27B] rounded-full transition-all duration-1000"
                          style={{ width: `${chamber.ripeness}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1 border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Batch Processing Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={batchVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <Tooltip />
                <Bar dataKey="batches" fill="#1E7F5A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Quality Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={qualityData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                  {qualityData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <div className="px-6 pb-4 flex gap-4 justify-center">
            {qualityData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name} {d.value}%
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Loss Reduction Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={lossData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} unit="%" />
                <Tooltip />
                <Area type="monotone" dataKey="loss" stroke="#1E7F5A" fill="#1E7F5A" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#F59E0B]" /> AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { msg: "Batch BAN2403A predicted +10% value at optimal dispatch", type: "success" },
              { msg: "Optimal dispatch window for Chamber 1 in 18 hrs", type: "info" },
              { msg: "Delay in Chamber 2 may reduce value by ₹3/kg", type: "warning" },
            ].map((insight, i) => (
              <div
                key={i}
                className={`rounded-lg p-3 text-sm ${
                  insight.type === "success" ? "bg-green-50 text-[#1E7F5A] border border-[#1E7F5A]/10" :
                  insight.type === "warning" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                  "bg-blue-50 text-blue-700 border border-blue-200"
                }`}
              >
                {insight.msg}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lifecycle */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">Batch Lifecycle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between overflow-x-auto py-2">
            {["Farm", "AI Grading", "Cold Storage", "Ripening", "Retail"].map((stage, i, arr) => (
              <div key={stage} className="flex items-center">
                <div className={`flex flex-col items-center ${i <= 3 ? "text-[#1E7F5A]" : "text-gray-400"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    i <= 3 ? "bg-[#1E7F5A] text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                    {i + 1}
                  </div>
                  <span className="text-xs mt-1.5 whitespace-nowrap">{stage}</span>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className={`w-5 h-5 mx-3 ${i < 3 ? "text-[#1E7F5A]" : "text-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
