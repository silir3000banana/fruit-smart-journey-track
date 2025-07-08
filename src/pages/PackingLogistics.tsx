import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Truck, MapPin, CheckCircle, Clock, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const PackingLogistics = () => {
  const [packingData, setPackingData] = useState({
    lotId: "",
    containerType: "crate",
    vehicleId: "",
    destination: ""
  });
  const { toast } = useToast();

  const dummyPackages = [
    {
      id: "PKG001",
      lotId: "LOT001",
      containerType: "Crate",
      weight: "25kg",
      status: "packed",
      packTime: "2024-01-08 10:30:00",
      destination: "Mumbai Distribution Center"
    },
    {
      id: "PKG002", 
      lotId: "LOT002",
      containerType: "Pallet",
      weight: "500kg",
      status: "dispatched",
      packTime: "2024-01-08 09:15:00",
      destination: "Delhi Export Hub"
    },
    {
      id: "PKG003",
      lotId: "LOT003",
      containerType: "Crate",
      weight: "30kg",
      status: "delivered",
      packTime: "2024-01-07 14:00:00",
      destination: "Bangalore Market"
    }
  ];

  const dummyVehicles = [
    {
      id: "VH001",
      type: "Refrigerated Truck",
      driver: "Raj Kumar",
      capacity: "10 Pallets",
      status: "available",
      location: "Punjab Depot"
    },
    {
      id: "VH002",
      type: "Refrigerated Van",
      driver: "Suresh Sharma",
      capacity: "50 Crates",
      status: "en-route",
      location: "En Route to Delhi"
    },
    {
      id: "VH003",
      type: "Cold Storage Truck",
      driver: "Amit Singh",
      capacity: "15 Pallets",
      status: "loading",
      location: "Loading Bay 2"
    }
  ];

  const dummyDeliveries = [
    {
      id: "DEL001",
      packageId: "PKG001",
      vehicle: "VH001",
      status: "in-transit",
      progress: 65,
      eta: "2024-01-08 18:00:00",
      currentLocation: "Highway NH-1, Haryana"
    },
    {
      id: "DEL002",
      packageId: "PKG002", 
      vehicle: "VH002",
      status: "delivered",
      progress: 100,
      eta: "2024-01-08 16:00:00",
      currentLocation: "Delhi Export Hub"
    }
  ];

  const handleCreatePackage = () => {
    toast({
      title: "Package Created",
      description: `Package created for lot ${packingData.lotId}`,
    });
  };

  const handleDispatch = (packageId: string) => {
    toast({
      title: "Package Dispatched",
      description: `Package ${packageId} has been dispatched successfully.`,
    });
  };

  const handleDeliveryConfirm = (deliveryId: string) => {
    toast({
      title: "Delivery Confirmed",
      description: `Delivery ${deliveryId} has been confirmed and completed.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "packed": return "bg-blue-600";
      case "dispatched": return "bg-yellow-600";
      case "delivered": return "bg-green-600";
      case "in-transit": return "bg-orange-600";
      case "available": return "bg-green-600";
      case "en-route": return "bg-yellow-600";
      case "loading": return "bg-blue-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Packing & Logistics</h1>
          <p className="text-muted-foreground">Manage packaging, dispatch, and delivery operations</p>
        </div>

        <Tabs defaultValue="packing" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="packing">Packing</TabsTrigger>
            <TabsTrigger value="dispatch">Dispatch</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
          </TabsList>

          <TabsContent value="packing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Packing Station
                </CardTitle>
                <CardDescription>
                  Create packages and assign containers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lotId">Lot ID</Label>
                    <Select value={packingData.lotId} onValueChange={(value) => setPackingData({...packingData, lotId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select lot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOT001">LOT001 - 500kg Grade A</SelectItem>
                        <SelectItem value="LOT002">LOT002 - 300kg Grade B</SelectItem>
                        <SelectItem value="LOT003">LOT003 - 450kg Grade A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="containerType">Container Type</Label>
                    <Select value={packingData.containerType} onValueChange={(value) => setPackingData({...packingData, containerType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crate">Plastic Crate (25kg)</SelectItem>
                        <SelectItem value="cardboard">Cardboard Box (10kg)</SelectItem>
                        <SelectItem value="pallet">Wooden Pallet (500kg)</SelectItem>
                        <SelectItem value="container">Shipping Container (20,000kg)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      placeholder="Enter destination"
                      value={packingData.destination}
                      onChange={(e) => setPackingData({...packingData, destination: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleId">Assign Vehicle</Label>
                    <Select value={packingData.vehicleId} onValueChange={(value) => setPackingData({...packingData, vehicleId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VH001">VH001 - Refrigerated Truck</SelectItem>
                        <SelectItem value="VH002">VH002 - Refrigerated Van</SelectItem>
                        <SelectItem value="VH003">VH003 - Cold Storage Truck</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleCreatePackage} className="w-full">
                  Create Package
                </Button>

                <div className="space-y-4">
                  <h3 className="font-semibold">Recent Packages</h3>
                  {dummyPackages.slice(0, 3).map((pkg) => (
                    <div key={pkg.id} className="border rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{pkg.id}</h4>
                        <p className="text-sm text-muted-foreground">
                          Lot: {pkg.lotId} • {pkg.containerType} • {pkg.weight}
                        </p>
                        <p className="text-xs text-muted-foreground">{pkg.packTime}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(pkg.status)}>
                          {pkg.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dispatch" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Dispatch Management
                </CardTitle>
                <CardDescription>Schedule and track package dispatches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dummyPackages.map((pkg) => (
                    <div key={pkg.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{pkg.id}</h4>
                          <p className="text-sm text-muted-foreground">
                            Lot: {pkg.lotId} • {pkg.weight}
                          </p>
                        </div>
                        <Badge className={getStatusColor(pkg.status)}>
                          {pkg.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-sm text-muted-foreground">Destination: </span>
                          <span className="text-sm font-medium">{pkg.destination}</span>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Packed: </span>
                          <span className="text-sm">{pkg.packTime}</span>
                        </div>
                      </div>

                      {pkg.status === "packed" && (
                        <Button 
                          onClick={() => handleDispatch(pkg.id)}
                          variant="premium"
                          size="sm"
                        >
                          <Truck className="w-4 h-4 mr-1" />
                          Dispatch Now
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vehicles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Vehicle Fleet
                </CardTitle>
                <CardDescription>Monitor vehicle availability and assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dummyVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{vehicle.id}</h4>
                          <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                        </div>
                        <Badge className={getStatusColor(vehicle.status)}>
                          {vehicle.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Driver: </span>
                          <span className="font-medium">{vehicle.driver}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Capacity: </span>
                          <span>{vehicle.capacity}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Location: </span>
                          <span>{vehicle.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Tracking
                </CardTitle>
                <CardDescription>Track deliveries and confirm completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dummyDeliveries.map((delivery) => (
                    <div key={delivery.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{delivery.id}</h4>
                          <p className="text-sm text-muted-foreground">
                            Package: {delivery.packageId} • Vehicle: {delivery.vehicle}
                          </p>
                        </div>
                        <Badge className={getStatusColor(delivery.status)}>
                          {delivery.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Delivery Progress</span>
                            <span>{delivery.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${delivery.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Current Location: </span>
                            <span className="font-medium">{delivery.currentLocation}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">ETA: </span>
                            <span>{delivery.eta}</span>
                          </div>
                        </div>

                        {delivery.status === "in-transit" && (
                          <Button 
                            onClick={() => handleDeliveryConfirm(delivery.id)}
                            variant="success"
                            size="sm"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Confirm Delivery
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

export default PackingLogistics;