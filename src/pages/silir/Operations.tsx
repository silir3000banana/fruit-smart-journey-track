import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, ScanLine, Factory, Play, CheckCircle2, Loader2 } from "lucide-react";

export default function Operations() {
  const [showForm, setShowForm] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [batchCreated, setBatchCreated] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
      setTimeout(() => setScanComplete(false), 3000);
    }, 2000);
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    setBatchCreated(true);
    setShowForm(false);
    setTimeout(() => setBatchCreated(false), 3000);
  };

  const actions = [
    { label: "Create Batch", icon: Package, onClick: () => setShowForm(true), color: "bg-[#1E7F5A]" },
    { label: "Scan Crate", icon: ScanLine, onClick: handleScan, color: "bg-blue-600" },
    { label: "Assign Chamber", icon: Factory, onClick: () => {}, color: "bg-purple-600" },
    { label: "Start Ripening", icon: Play, onClick: () => {}, color: "bg-amber-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Operations</h1>
        <p className="text-sm text-gray-500">Manage batch intake and chamber workflows</p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Button
            key={action.label}
            onClick={action.onClick}
            className={`${action.color} text-white h-20 flex flex-col gap-2 hover:opacity-90 transition-opacity`}
          >
            <action.icon className="w-5 h-5" />
            <span className="text-sm">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Scan animation */}
      {(scanning || scanComplete) && (
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6 flex items-center justify-center">
            {scanning ? (
              <div className="flex items-center gap-3 text-blue-600">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-lg font-medium">Scanning barcode...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-[#1E7F5A] animate-fade-in">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-lg font-medium">✔ Batch Registered — BAN2403A</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Batch created notification */}
      {batchCreated && (
        <Card className="border-[#1E7F5A]/20 bg-green-50 shadow-sm animate-fade-in">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#1E7F5A]" />
            <span className="text-[#1E7F5A] font-medium">Batch created successfully</span>
          </CardContent>
        </Card>
      )}

      {/* Create Batch Form */}
      {showForm && (
        <Card className="border-gray-200 shadow-sm animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Create New Batch</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateBatch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fruit Type</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select fruit" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="mango">Mango</SelectItem>
                    <SelectItem value="papaya">Papaya</SelectItem>
                    <SelectItem value="avocado">Avocado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Batch ID</Label>
                <Input placeholder="BAN2403A" />
              </div>
              <div className="space-y-2">
                <Label>Harvest Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Quantity (Tonnes)</Label>
                <Input type="number" placeholder="6" />
              </div>
              <div className="md:col-span-2 flex gap-3 pt-2">
                <Button type="submit" className="bg-[#1E7F5A] text-white hover:bg-[#1E7F5A]/90">
                  Create Batch
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Recent batches */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Recent Batches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2.5 px-3 text-gray-500 font-medium">Batch ID</th>
                  <th className="text-left py-2.5 px-3 text-gray-500 font-medium">Fruit</th>
                  <th className="text-left py-2.5 px-3 text-gray-500 font-medium">Quantity</th>
                  <th className="text-left py-2.5 px-3 text-gray-500 font-medium">Stage</th>
                  <th className="text-left py-2.5 px-3 text-gray-500 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "BAN2403A", fruit: "Banana", qty: "6T", stage: "Ripening", status: "active" },
                  { id: "MAN2403B", fruit: "Mango", qty: "4T", stage: "Cold Storage", status: "active" },
                  { id: "PAP2403C", fruit: "Papaya", qty: "3T", stage: "Grading", status: "pending" },
                ].map((row) => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-gray-900">{row.id}</td>
                    <td className="py-2.5 px-3 text-gray-600">{row.fruit}</td>
                    <td className="py-2.5 px-3 text-gray-600">{row.qty}</td>
                    <td className="py-2.5 px-3 text-gray-600">{row.stage}</td>
                    <td className="py-2.5 px-3">
                      <Badge variant="outline" className={
                        row.status === "active"
                          ? "bg-green-50 text-[#1E7F5A] border-[#1E7F5A]/20 text-xs"
                          : "bg-amber-50 text-amber-700 border-amber-200 text-xs"
                      }>
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
