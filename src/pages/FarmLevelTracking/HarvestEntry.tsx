import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { Leaf, Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const HarvestEntry = () => {
  const [harvestData, setHarvestData] = useState({
    farmerName: "",
    farmLocation: "",
    fieldId: "",
    cropType: "Banana",
    variety: "",
    harvestDate: new Date().toISOString().split('T')[0],
    quantity: "",
    qualityGrade: "",
    moistureContent: "",
    temperature: "",
    notes: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate lot ID
    const lotId = `LOT${Date.now()}`;
    
    toast({
      title: "Harvest Recorded Successfully",
      description: `Lot ID: ${lotId} has been created and QR code generated.`,
    });

    // Reset form
    setHarvestData({
      ...harvestData,
      farmerName: "",
      farmLocation: "",
      fieldId: "",
      variety: "",
      quantity: "",
      qualityGrade: "",
      moistureContent: "",
      temperature: "",
      notes: ""
    });
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Harvest Data Entry</h1>
          <p className="text-muted-foreground">Record detailed harvest information</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              New Harvest Entry
            </CardTitle>
            <CardDescription>
              Enter comprehensive harvest details for traceability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmerName">Farmer Name</Label>
                  <Input
                    id="farmerName"
                    value={harvestData.farmerName}
                    onChange={(e) => setHarvestData({...harvestData, farmerName: e.target.value})}
                    placeholder="Enter farmer name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmLocation">Farm Location</Label>
                  <Input
                    id="farmLocation"
                    value={harvestData.farmLocation}
                    onChange={(e) => setHarvestData({...harvestData, farmLocation: e.target.value})}
                    placeholder="Enter farm location"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fieldId">Field ID</Label>
                  <Input
                    id="fieldId"
                    value={harvestData.fieldId}
                    onChange={(e) => setHarvestData({...harvestData, fieldId: e.target.value})}
                    placeholder="e.g., Field-A-01"
                    required
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
                      <SelectItem value="Grapes">Grapes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variety">Variety</Label>
                  <Input
                    id="variety"
                    value={harvestData.variety}
                    onChange={(e) => setHarvestData({...harvestData, variety: e.target.value})}
                    placeholder="e.g., Cavendish"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="harvestDate">Harvest Date</Label>
                  <Input
                    id="harvestDate"
                    type="date"
                    value={harvestData.harvestDate}
                    onChange={(e) => setHarvestData({...harvestData, harvestDate: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (kg)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={harvestData.quantity}
                    onChange={(e) => setHarvestData({...harvestData, quantity: e.target.value})}
                    placeholder="Enter quantity in kg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualityGrade">Quality Grade</Label>
                  <Select value={harvestData.qualityGrade} onValueChange={(value) => setHarvestData({...harvestData, qualityGrade: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade A">Grade A</SelectItem>
                      <SelectItem value="Grade B">Grade B</SelectItem>
                      <SelectItem value="Grade C">Grade C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moistureContent">Moisture Content (%)</Label>
                  <Input
                    id="moistureContent"
                    type="number"
                    step="0.1"
                    value={harvestData.moistureContent}
                    onChange={(e) => setHarvestData({...harvestData, moistureContent: e.target.value})}
                    placeholder="e.g., 12.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={harvestData.temperature}
                    onChange={(e) => setHarvestData({...harvestData, temperature: e.target.value})}
                    placeholder="e.g., 25.0"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={harvestData.notes}
                  onChange={(e) => setHarvestData({...harvestData, notes: e.target.value})}
                  placeholder="Any additional notes about the harvest..."
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Save className="w-4 h-4 mr-2" />
                Record Harvest & Generate Lot ID
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HarvestEntry;