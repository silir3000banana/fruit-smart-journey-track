import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowUpDown } from "lucide-react";

const inventoryData = [
  { id: "BAN2403A", commodity: "Banana", grade: "A", quantity: "6T", status: "Ready" },
  { id: "MAN2403B", commodity: "Mango", grade: "B", quantity: "4T", status: "Ripening" },
  { id: "PAP2403C", commodity: "Papaya", grade: "A", quantity: "3T", status: "Cold Storage" },
  { id: "BAN2403D", commodity: "Banana", grade: "A", quantity: "8T", status: "Ready" },
  { id: "AVO2403E", commodity: "Avocado", grade: "B", quantity: "2T", status: "Grading" },
  { id: "MAN2403F", commodity: "Mango", grade: "A", quantity: "5T", status: "Ready" },
];

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);

  const filtered = inventoryData.filter(
    (row) =>
      row.id.toLowerCase().includes(search.toLowerCase()) ||
      row.commodity.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (status: string) =>
    status === "Ready" ? "bg-green-50 text-[#1E7F5A] border-[#1E7F5A]/20" :
    status === "Ripening" ? "bg-amber-50 text-amber-700 border-amber-200" :
    status === "Cold Storage" ? "bg-blue-50 text-blue-700 border-blue-200" :
    "bg-purple-50 text-purple-700 border-purple-200";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
        <p className="text-sm text-gray-500">Warehouse inventory management</p>
      </div>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg">Warehouse Stock</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search batches..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Batch ID", "Commodity", "Grade", "Quantity", "Status"].map((h) => (
                    <th
                      key={h}
                      className="text-left py-3 px-3 text-gray-500 font-medium cursor-pointer hover:text-gray-700 select-none"
                      onClick={() => setSortField(h)}
                    >
                      <span className="flex items-center gap-1">
                        {h}
                        <ArrowUpDown className="w-3 h-3" />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-3 font-medium text-gray-900">{row.id}</td>
                    <td className="py-3 px-3 text-gray-600">{row.commodity}</td>
                    <td className="py-3 px-3">
                      <Badge variant="outline" className={
                        row.grade === "A"
                          ? "bg-green-50 text-[#1E7F5A] border-[#1E7F5A]/20 text-xs"
                          : "bg-amber-50 text-amber-700 border-amber-200 text-xs"
                      }>
                        Grade {row.grade}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-gray-600">{row.quantity}</td>
                    <td className="py-3 px-3">
                      <Badge variant="outline" className={`text-xs ${statusColor(row.status)}`}>
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
