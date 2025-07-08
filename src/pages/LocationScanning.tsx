import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, QrCode, CheckCircle, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const LocationScanning = () => {
  const [scanResult, setScanResult] = useState<string>("");
  const [locationData, setLocationData] = useState({
    latitude: "30.7333",
    longitude: "76.7794",
    altitude: "247m",
    accuracy: "±3m"
  });
  const { toast } = useToast();

  const dummyScannedLots = [
    { 
      id: "LOT001", 
      location: "Punjab, India", 
      scanTime: "2024-01-08 10:30:00",
      status: "verified",
      coordinates: "30.7333, 76.7794"
    },
    { 
      id: "LOT002", 
      location: "Punjab, India", 
      scanTime: "2024-01-08 11:15:00",
      status: "pending",
      coordinates: "30.7340, 76.7800"
    },
    { 
      id: "LOT003", 
      location: "Punjab, India", 
      scanTime: "2024-01-08 12:00:00",
      status: "verified",
      coordinates: "30.7350, 76.7810"
    },
  ];

  const handleScan = () => {
    const mockLotId = "LOT" + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    setScanResult(mockLotId);
    toast({
      title: "Lot Scanned Successfully",
      description: `Lot ${mockLotId} has been scanned and location recorded.`,
    });
  };

  const handleLocationUpdate = () => {
    toast({
      title: "Location Updated",
      description: "GPS coordinates have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Location & Lot ID Scanning</h1>
          <p className="text-muted-foreground">Scan lot IDs and record precise location data</p>
        </div>

        <Tabs defaultValue="scanner" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scanner">QR Scanner</TabsTrigger>
            <TabsTrigger value="history">Scan History</TabsTrigger>
            <TabsTrigger value="location">Location Map</TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  QR Code Scanner
                </CardTitle>
                <CardDescription>
                  Scan lot QR codes to record location and update status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-muted-foreground rounded-lg p-8 text-center">
                  <QrCode className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">Position QR code within the frame</p>
                  <Button onClick={handleScan} variant="hero" size="lg">
                    Simulate Scan
                  </Button>
                </div>

                {scanResult && (
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">Scan Successful</span>
                      </div>
                      <p className="text-green-700">Lot ID: {scanResult}</p>
                      <p className="text-sm text-green-600">
                        Location: {locationData.latitude}, {locationData.longitude}
                      </p>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Current Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Latitude</Label>
                        <Input
                          value={locationData.latitude}
                          onChange={(e) => setLocationData({...locationData, latitude: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Longitude</Label>
                        <Input
                          value={locationData.longitude}
                          onChange={(e) => setLocationData({...locationData, longitude: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Altitude</Label>
                        <Input
                          value={locationData.altitude}
                          onChange={(e) => setLocationData({...locationData, altitude: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Accuracy</Label>
                        <Input
                          value={locationData.accuracy}
                          onChange={(e) => setLocationData({...locationData, accuracy: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button onClick={handleLocationUpdate} className="w-full">
                      Update Location
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scan History</CardTitle>
                <CardDescription>Recent lot scans and location records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dummyScannedLots.map((scan) => (
                    <div key={scan.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{scan.id}</h3>
                          <Badge variant={scan.status === "verified" ? "default" : "secondary"}>
                            {scan.status}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{scan.scanTime}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Location: </span>
                          <span>{scan.location}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Coordinates: </span>
                          <span>{scan.coordinates}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location Map
                </CardTitle>
                <CardDescription>
                  Visual representation of scanned locations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-8 bg-muted/20 min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-2">Interactive Map View</p>
                    <p className="text-sm text-muted-foreground">
                      Shows all scanned lot locations on Punjab farm
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Verified Locations</span>
                      </div>
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Pending Verification</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LocationScanning;