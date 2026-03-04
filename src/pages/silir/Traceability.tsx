import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { QrCode, ScanLine, Loader2, CheckCircle2, MapPin, Calendar, Award, Truck } from "lucide-react";

interface TraceData {
  batchId: string;
  farm: string;
  harvestDate: string;
  facility: string;
  grade: string;
  dispatches: { destination: string; date: string; qty: string }[];
}

export default function Traceability() {
  const [scanning, setScanning] = useState(false);
  const [traceData, setTraceData] = useState<TraceData | null>(null);
  const [batchInput, setBatchInput] = useState("");

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setTraceData({
        batchId: "BAN2403A",
        farm: "Green Valley Farm, Theni District",
        harvestDate: "2026-02-28",
        facility: "Main Facility — Chamber 1",
        grade: "A",
        dispatches: [
          { destination: "Chennai Koyambedu", date: "2026-03-03", qty: "3T" },
          { destination: "Bangalore APMC", date: "2026-03-04", qty: "3T" },
        ],
      });
    }, 2000);
  };

  const handleSearch = () => {
    if (batchInput) handleScan();
  };

  const stages = [
    { label: "Farm Origin", icon: MapPin, detail: traceData?.farm, done: true },
    { label: "Harvest", icon: Calendar, detail: traceData?.harvestDate, done: true },
    { label: "Facility", icon: ScanLine, detail: traceData?.facility, done: true },
    { label: "Quality Grade", icon: Award, detail: `Grade ${traceData?.grade}`, done: true },
    { label: "Dispatch", icon: Truck, detail: `${traceData?.dispatches?.length} shipments`, done: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Traceability</h1>
        <p className="text-sm text-gray-500">QR scan or search batch for full journey</p>
      </div>

      {/* Scan / Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1E7F5A]/10 flex items-center justify-center">
              <QrCode className="w-8 h-8 text-[#1E7F5A]" />
            </div>
            <Button onClick={handleScan} disabled={scanning} className="bg-[#1E7F5A] text-white hover:bg-[#1E7F5A]/90">
              {scanning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ScanLine className="w-4 h-4 mr-2" />}
              {scanning ? "Scanning..." : "Scan QR Code"}
            </Button>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <Input
              placeholder="Enter Batch ID (e.g. BAN2403A)"
              value={batchInput}
              onChange={(e) => setBatchInput(e.target.value)}
              className="text-center"
            />
            <Button onClick={handleSearch} variant="outline">Search Batch</Button>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {traceData && (
        <Card className="border-gray-200 shadow-sm animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Batch {traceData.batchId} Journey</CardTitle>
              <Badge className="bg-green-50 text-[#1E7F5A] border-[#1E7F5A]/20">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {stages.map((stage, i) => (
                <div key={stage.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#1E7F5A] text-white flex items-center justify-center">
                      <stage.icon className="w-4 h-4" />
                    </div>
                    {i < stages.length - 1 && <div className="w-0.5 h-12 bg-[#1E7F5A]/20" />}
                  </div>
                  <div className="pt-1 pb-6">
                    <p className="text-sm font-medium text-gray-900">{stage.label}</p>
                    <p className="text-sm text-gray-500">{stage.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Dispatch History</p>
              {traceData.dispatches.map((d, i) => (
                <div key={i} className="flex items-center justify-between py-2 text-sm">
                  <span className="text-gray-700">{d.destination}</span>
                  <span className="text-gray-400">{d.date} • {d.qty}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
