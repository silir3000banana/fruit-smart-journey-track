import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";

const HarvestModule = () => {
  const harvestStats = [
    { label: "Today's Harvest", value: "850 kg", change: "+15% vs yesterday", color: "text-success" },
    { label: "Active Fields", value: "8", change: "2 ready for harvest", color: "text-primary" },
    { label: "Quality Grade", value: "A+", change: "Consistent quality", color: "text-success" },
    { label: "Temperature", value: "12°C", change: "Optimal range", color: "text-primary" }
  ];

  const recentHarvests = [
    { id: "H-001", field: "Field A-12", variety: "Cavendish", quantity: "300 kg", quality: "Grade A+", timestamp: "09:30 AM", temperature: "12°C" },
    { id: "H-002", field: "Field B-08", variety: "Robusta", quantity: "250 kg", quality: "Grade A", timestamp: "08:45 AM", temperature: "13°C" },
    { id: "H-003", field: "Field C-05", variety: "Red Banana", quantity: "200 kg", quality: "Grade A+", timestamp: "07:15 AM", temperature: "11°C" },
    { id: "H-004", field: "Field A-09", variety: "Cavendish", quantity: "400 kg", quality: "Grade A", timestamp: "06:30 AM", temperature: "12°C" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Harvest Management</h1>
          <p className="text-muted-foreground">Track harvest activities, quality control, and field management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {harvestStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle className={`text-2xl ${stat.color}`}>{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* New Harvest Entry */}
          <Card>
            <CardHeader>
              <CardTitle>New Harvest Entry</CardTitle>
              <CardDescription>Record new harvest data with quality metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="field">Field</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="field-a12">Field A-12</SelectItem>
                      <SelectItem value="field-b08">Field B-08</SelectItem>
                      <SelectItem value="field-c05">Field C-05</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="variety">Variety</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select variety" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cavendish">Cavendish</SelectItem>
                      <SelectItem value="robusta">Robusta</SelectItem>
                      <SelectItem value="red-banana">Red Banana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity (kg)</Label>
                  <Input id="quantity" placeholder="Enter quantity" />
                </div>
                <div>
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input id="temperature" placeholder="Current temp" />
                </div>
              </div>
              <Button className="w-full">Record Harvest</Button>
            </CardContent>
          </Card>

          {/* Field Status */}
          <Card>
            <CardHeader>
              <CardTitle>Field Status Overview</CardTitle>
              <CardDescription>Monitor field conditions and readiness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <h4 className="font-medium">Field A-12</h4>
                    <p className="text-sm text-muted-foreground">Cavendish - Ready for harvest</p>
                  </div>
                  <Badge variant="premium">Ready</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <h4 className="font-medium">Field B-08</h4>
                    <p className="text-sm text-muted-foreground">Robusta - 5 days remaining</p>
                  </div>
                  <Badge variant="outline">Pending</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <h4 className="font-medium">Field C-05</h4>
                    <p className="text-sm text-muted-foreground">Red Banana - Ready for harvest</p>
                  </div>
                  <Badge variant="premium">Ready</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Harvests */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Harvest Records</CardTitle>
            <CardDescription>Complete harvest history with quality tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Harvest ID</th>
                    <th className="text-left p-2">Field</th>
                    <th className="text-left p-2">Variety</th>
                    <th className="text-left p-2">Quantity</th>
                    <th className="text-left p-2">Quality</th>
                    <th className="text-left p-2">Time</th>
                    <th className="text-left p-2">Temperature</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentHarvests.map((harvest) => (
                    <tr key={harvest.id} className="border-b">
                      <td className="p-2 font-medium">{harvest.id}</td>
                      <td className="p-2">{harvest.field}</td>
                      <td className="p-2">{harvest.variety}</td>
                      <td className="p-2">{harvest.quantity}</td>
                      <td className="p-2">
                        <Badge variant="premium">{harvest.quality}</Badge>
                      </td>
                      <td className="p-2">{harvest.timestamp}</td>
                      <td className="p-2">{harvest.temperature}</td>
                      <td className="p-2">
                        <Button variant="ghost" size="sm">Generate QR</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HarvestModule;