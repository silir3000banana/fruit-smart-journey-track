import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { MapPin, Navigation, Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const FieldMapping = () => {
  const [newField, setNewField] = useState({
    fieldId: "",
    fieldName: "",
    area: "",
    cropType: "",
    latitude: "",
    longitude: ""
  });
  const { toast } = useToast();

  const fields = [
    {
      id: "Field-A-01",
      name: "North Banana Field",
      area: "2.5 acres",
      cropType: "Banana",
      coordinates: { lat: "28.7041", lng: "77.1025" },
      status: "active",
      lastUpdated: "2024-01-15"
    },
    {
      id: "Field-B-02",
      name: "South Mango Grove",
      area: "3.2 acres",
      cropType: "Mango",
      coordinates: { lat: "28.7051", lng: "77.1035" },
      status: "active",
      lastUpdated: "2024-01-14"
    },
    {
      id: "Field-C-01",
      name: "East Apple Orchard",
      area: "1.8 acres",
      cropType: "Apple",
      coordinates: { lat: "28.7061", lng: "77.1045" },
      status: "inactive",
      lastUpdated: "2024-01-10"
    }
  ];

  const handleAddField = () => {
    if (!newField.fieldId || !newField.fieldName || !newField.area) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Field Added Successfully",
      description: `Field ${newField.fieldId} has been mapped and saved`,
    });

    setNewField({
      fieldId: "",
      fieldName: "",
      area: "",
      cropType: "",
      latitude: "",
      longitude: ""
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNewField({
            ...newField,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
          toast({
            title: "Location Captured",
            description: "GPS coordinates have been automatically filled",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get current location",
            variant: "destructive"
          });
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 mt-20">
        <div className="mb-6">
          <Link to="/farm-tracking" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Farm Tracking
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Field Mapping</h1>
          <p className="text-muted-foreground">GPS mapping and field boundary management</p>
        </div>

        <Tabs defaultValue="fields" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="fields">Field List</TabsTrigger>
            <TabsTrigger value="add">Add New Field</TabsTrigger>
          </TabsList>

          <TabsContent value="fields" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Mapped Fields
                </CardTitle>
                <CardDescription>
                  View and manage all mapped fields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fields.map((field) => (
                    <Card key={field.id} className="border">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{field.name}</CardTitle>
                            <CardDescription>{field.id}</CardDescription>
                          </div>
                          <Badge variant={field.status === "active" ? "default" : "secondary"}>
                            {field.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Area:</span>
                            <span>{field.area}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Crop:</span>
                            <span>{field.cropType}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">GPS:</span>
                            <div className="text-xs font-mono mt-1">
                              {field.coordinates.lat}, {field.coordinates.lng}
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Updated:</span>
                            <span>{field.lastUpdated}</span>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Field
                </CardTitle>
                <CardDescription>
                  Map a new field with GPS coordinates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fieldId">Field ID *</Label>
                      <Input
                        id="fieldId"
                        value={newField.fieldId}
                        onChange={(e) => setNewField({...newField, fieldId: e.target.value})}
                        placeholder="e.g., Field-D-01"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fieldName">Field Name *</Label>
                      <Input
                        id="fieldName"
                        value={newField.fieldName}
                        onChange={(e) => setNewField({...newField, fieldName: e.target.value})}
                        placeholder="e.g., West Vegetable Plot"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Area (acres) *</Label>
                      <Input
                        id="area"
                        type="number"
                        step="0.1"
                        value={newField.area}
                        onChange={(e) => setNewField({...newField, area: e.target.value})}
                        placeholder="e.g., 2.5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cropType">Crop Type</Label>
                      <Input
                        id="cropType"
                        value={newField.cropType}
                        onChange={(e) => setNewField({...newField, cropType: e.target.value})}
                        placeholder="e.g., Tomato"
                      />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">GPS Coordinates</h3>
                      <Button variant="outline" size="sm" onClick={getCurrentLocation}>
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Current Location
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input
                          id="latitude"
                          value={newField.latitude}
                          onChange={(e) => setNewField({...newField, latitude: e.target.value})}
                          placeholder="e.g., 28.7041"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input
                          id="longitude"
                          value={newField.longitude}
                          onChange={(e) => setNewField({...newField, longitude: e.target.value})}
                          placeholder="e.g., 77.1025"
                        />
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleAddField} className="w-full" size="lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Field
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FieldMapping;