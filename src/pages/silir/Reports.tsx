import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

const productionData = [
  { month: "Jan", volume: 120 }, { month: "Feb", volume: 145 },
  { month: "Mar", volume: 165 }, { month: "Apr", volume: 180 },
  { month: "May", volume: 210 }, { month: "Jun", volume: 195 },
];

const qualityData = [
  { name: "Grade A", value: 62, color: "#1E7F5A" },
  { name: "Grade B", value: 28, color: "#38B27B" },
  { name: "Reject", value: 10, color: "#EF4444" },
];

const efficiencyData = [
  { facility: "Chamber 1", efficiency: 92 },
  { facility: "Chamber 2", efficiency: 87 },
  { facility: "Cold A", efficiency: 95 },
  { facility: "Cold B", efficiency: 78 },
  { facility: "Dryer 1", efficiency: 88 },
];

const lossData = [
  { month: "Jan", pre: 15, post: 12 }, { month: "Feb", pre: 14, post: 10 },
  { month: "Mar", pre: 12, post: 8 }, { month: "Apr", pre: 11, post: 6 },
  { month: "May", pre: 10, post: 5 }, { month: "Jun", pre: 9, post: 3 },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500">Analytics and performance dashboards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Production Volume (Tonnes)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <Tooltip />
                <Area type="monotone" dataKey="volume" stroke="#1E7F5A" fill="#1E7F5A" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Quality Grading Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
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
            <div className="flex gap-4 mt-2">
              {qualityData.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name} {d.value}%
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Facility Efficiency (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={efficiencyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <YAxis type="category" dataKey="facility" tick={{ fontSize: 11, fill: "#9ca3af" }} width={80} />
                <Tooltip />
                <Bar dataKey="efficiency" fill="#1E7F5A" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Loss Reduction Trend (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lossData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} />
                <Tooltip />
                <Line type="monotone" dataKey="pre" stroke="#EF4444" name="Pre-Silir" strokeWidth={2} />
                <Line type="monotone" dataKey="post" stroke="#1E7F5A" name="Post-Silir" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
