import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, CheckCircle2, Star, TrendingUp, Gauge } from "lucide-react";

export default function Dispatch() {
  const [dispatched, setDispatched] = useState(false);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setDispatched(true);
    setTimeout(() => setDispatched(false), 4000);
  };

  const readinessMetrics = [
    { label: "Maturity", value: "Stage 5", score: 88, color: "#1E7F5A" },
    { label: "Quality Grade", value: "A", score: 95, color: "#1E7F5A" },
    { label: "Suggested MRP", value: "₹48/kg", score: 0, color: "" },
    { label: "Expected Margin", value: "32%", score: 0, color: "" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dispatch</h1>
        <p className="text-sm text-gray-500">Shipment planning and retail readiness</p>
      </div>

      {dispatched && (
        <Card className="border-[#1E7F5A]/20 bg-green-50 shadow-sm animate-fade-in">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#1E7F5A]" />
            <span className="text-[#1E7F5A] font-medium">Dispatch note generated successfully</span>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dispatch form */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="w-5 h-5" /> Create Dispatch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDispatch} className="space-y-4">
              <div className="space-y-2">
                <Label>Select Batch</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Choose batch" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BAN2403A">BAN2403A — Banana — 6T</SelectItem>
                    <SelectItem value="MAN2403F">MAN2403F — Mango — 5T</SelectItem>
                    <SelectItem value="BAN2403D">BAN2403D — Banana — 8T</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Destination Market</Label>
                <Input placeholder="e.g. Chennai Koyambedu Market" />
              </div>
              <div className="space-y-2">
                <Label>Quantity (Tonnes)</Label>
                <Input type="number" placeholder="6" />
              </div>
              <Button type="submit" className="w-full bg-[#1E7F5A] text-white hover:bg-[#1E7F5A]/90">
                <Truck className="w-4 h-4 mr-2" /> Generate Dispatch Note
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Retail Readiness Score */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Gauge className="w-5 h-5" /> Retail Readiness Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Score circle */}
            <div className="flex items-center justify-center">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40" fill="none" stroke="#1E7F5A" strokeWidth="8"
                    strokeDasharray="220 251" strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">88</span>
                  <span className="text-[10px] text-gray-500">/ 100</span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-3">
              {readinessMetrics.map((m) => (
                <div key={m.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-600">{m.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{m.value}</span>
                </div>
              ))}
            </div>

            <Badge className="w-full justify-center bg-green-50 text-[#1E7F5A] border-[#1E7F5A]/20 py-2">
              <Star className="w-3.5 h-3.5 mr-1.5" /> Market Ready — Optimal Window
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
