import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, MapPin, Camera, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const FarmLevelTracking = () => {
  const [selectedLot, setSelectedLot] = useState<string | null>(null);
  const [harvestData, setHarvestData] = useState({
    farmerName: "Kumar Singh",
    farmLocation: "Punjab, India",
    cropType: "Banana",
    variety: "Cavendish",
    harvestDate: new Date().toISOString().split('T')[0],
    lotId: "",
    quantity: "",
    quality: ""
  });
  const { toast } = useToast();

  const dummyLots = [
    { id: "LOT001", status: "harvested", quantity: "500kg", quality: "Grade A", qrGenerated: true },
    { id: "LOT002", status: "processing", quantity: "300kg", quality: "Grade B", qrGenerated: false },
    { id: "LOT003", status: "ready", quantity: "450kg", quality: "Grade A", qrGenerated: true },
  ];

  const handleHarvestSubmit = () => {
    toast({
      title: "Harvest Recorded",
      description: "Lot data has been successfully recorded and QR code generated.",
    });
  };

  const generateQR = (lotId: string) => {
    toast({
      title: "QR Code Generated",
      description: `QR code generated for lot ${lotId}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Farm Level Tracking</h1>
          <p className="text-muted-foreground">Track harvest data from field to first processing point</p>
        </div>

        <Tabs defaultValue="harvest" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="harvest">Harvest Entry</TabsTrigger>
            <TabsTrigger value="lots">Lot Management</TabsTrigger>
            <TabsTrigger value="qr">QR Generation</TabsTrigger>
          </TabsList>

          <TabsContent value="harvest" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Harvest Data Entry
                </CardTitle>
                <CardDescription>
                  Record harvest details and generate lot IDs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="farmerName">Farmer Name</Label>
                    <Input
                      id="farmerName"
                      value={harvestData.farmerName}
                      onChange={(e) => setHarvestData({...harvestData, farmerName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmLocation">Farm Location</Label>
                    <Input
                      id="farmLocation"
                      value={harvestData.farmLocation}
                      onChange={(e) => setHarvestData({...harvestData, farmLocation: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cropType">Crop Type</Label>
                    <Select value={harvestData.cropType} onValueChange={(value) => setHarvestData({...harvestData, cropType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Banana">Banana</SelectItem>
                        <SelectItem value="Mango">Mango</SelectItem>
                        <SelectItem value="Apple">Apple</SelectItem>
                        <SelectItem value="Orange">Orange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="variety">Variety</Label>
                    <Input
                      id="variety"
                      value={harvestData.variety}
                      onChange={(e) => setHarvestData({...harvestData, variety: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="harvestDate">Harvest Date</Label>
                    <Input
                      id="harvestDate"
                      type="date"
                      value={harvestData.harvestDate}
                      onChange={(e) => setHarvestData({...harvestData, harvestDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (kg)</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Enter quantity"
                      value={harvestData.quantity}
                      onChange={(e) => setHarvestData({...harvestData, quantity: e.target.value})}
                    />
                  </div>
                </div>
                <Button onClick={handleHarvestSubmit} className="w-full">
                  Record Harvest Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lots" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Lots</CardTitle>
                <CardDescription>Manage and track harvest lots</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dummyLots.map((lot) => (
                    <div key={lot.id} className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-semibold">{lot.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            {lot.quantity} • {lot.quality}
                          </p>
                        </div>
                        <Badge variant={lot.status === "ready" ? "default" : "secondary"}>
                          {lot.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {lot.qrGenerated && <CheckCircle className="w-5 h-5 text-green-500" />}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedLot(lot.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qr" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  QR Code Generation
                </CardTitle>
                <CardDescription>
                  Generate QR codes for traceability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dummyLots.map((lot) => (
                    <div key={lot.id} className="border rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{lot.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          {lot.quantity} • {lot.quality}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {lot.qrGenerated ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">QR Generated</span>
                          </div>
                        ) : (
                          <Button
                            variant="premium"
                            size="sm"
                            onClick={() => generateQR(lot.id)}
                          >
                            Generate QR
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FarmLevelTracking;