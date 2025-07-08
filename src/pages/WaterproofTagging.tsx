import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Printer, Tag, QrCode, CheckCircle, Package } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const WaterproofTagging = () => {
  const [tagData, setTagData] = useState({
    lotId: "",
    tagType: "waterproof",
    quantity: 1,
    tagFormat: "qr"
  });
  const [generatedTags, setGeneratedTags] = useState<any[]>([]);
  const { toast } = useToast();

  const dummyTags = [
    {
      id: "TAG001",
      lotId: "LOT001",
      type: "Waterproof QR",
      status: "printed",
      printTime: "2024-01-08 10:30:00",
      assignedTo: "Crate #C001"
    },
    {
      id: "TAG002", 
      lotId: "LOT002",
      type: "Waterproof Barcode",
      status: "assigned",
      printTime: "2024-01-08 11:15:00",
      assignedTo: "Pallet #P001"
    },
    {
      id: "TAG003",
      lotId: "LOT003",
      type: "Waterproof QR",
      status: "ready",
      printTime: "2024-01-08 12:00:00",
      assignedTo: "Pending"
    }
  ];

  const handleGenerateTag = () => {
    const newTag = {
      id: "TAG" + String(Math.floor(Math.random() * 1000)).padStart(3, '0'),
      lotId: tagData.lotId,
      type: `Waterproof ${tagData.tagFormat.toUpperCase()}`,
      status: "generated",
      printTime: new Date().toLocaleString(),
      assignedTo: "Pending"
    };
    
    setGeneratedTags([...generatedTags, newTag]);
    toast({
      title: "Tag Generated",
      description: `Tag ${newTag.id} has been generated successfully.`,
    });
  };

  const handlePrintTag = (tagId: string) => {
    toast({
      title: "Printing Tag",
      description: `Sending tag ${tagId} to waterproof printer...`,
    });
  };

  const handleAssignTag = (tagId: string) => {
    toast({
      title: "Tag Assigned",
      description: `Tag ${tagId} has been assigned to container.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "printed": return "bg-green-600";
      case "assigned": return "bg-blue-600";
      case "ready": return "bg-yellow-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Waterproof Tagging System</h1>
          <p className="text-muted-foreground">Generate and manage waterproof tags for traceability</p>
        </div>

        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="generate">Generate Tags</TabsTrigger>
            <TabsTrigger value="print">Print Queue</TabsTrigger>
            <TabsTrigger value="assign">Assign Tags</TabsTrigger>
            <TabsTrigger value="tracking">Tag Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Tag Generation
                </CardTitle>
                <CardDescription>
                  Create waterproof tags for lot identification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lotId">Lot ID</Label>
                    <Input
                      id="lotId"
                      placeholder="Enter lot ID"
                      value={tagData.lotId}
                      onChange={(e) => setTagData({...tagData, lotId: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagType">Tag Type</Label>
                    <Select value={tagData.tagType} onValueChange={(value) => setTagData({...tagData, tagType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="waterproof">Waterproof Standard</SelectItem>
                        <SelectItem value="weatherproof">Weather Resistant</SelectItem>
                        <SelectItem value="heavy-duty">Heavy Duty Marine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagFormat">Tag Format</Label>
                    <Select value={tagData.tagFormat} onValueChange={(value) => setTagData({...tagData, tagFormat: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="qr">QR Code</SelectItem>
                        <SelectItem value="barcode">Barcode</SelectItem>
                        <SelectItem value="nfc">NFC Tag</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      max="100"
                      value={tagData.quantity}
                      onChange={(e) => setTagData({...tagData, quantity: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-muted/20">
                  <h3 className="font-semibold mb-2">Tag Preview</h3>
                  <div className="flex items-center gap-4">
                    <div className="border-2 border-dashed border-muted-foreground rounded p-4 w-32 h-20 flex items-center justify-center">
                      {tagData.tagFormat === "qr" && <QrCode className="w-8 h-8" />}
                      {tagData.tagFormat === "barcode" && <div className="text-xs">|||||||</div>}
                      {tagData.tagFormat === "nfc" && <div className="text-xs">NFC</div>}
                    </div>
                    <div className="text-sm">
                      <p><strong>Lot:</strong> {tagData.lotId || "Not specified"}</p>
                      <p><strong>Type:</strong> {tagData.tagType}</p>
                      <p><strong>Format:</strong> {tagData.tagFormat.toUpperCase()}</p>
                      <p><strong>Waterproof Rating:</strong> IP68</p>
                    </div>
                  </div>
                </div>

                <Button onClick={handleGenerateTag} className="w-full" disabled={!tagData.lotId}>
                  Generate {tagData.quantity} Tag{tagData.quantity > 1 ? 's' : ''}
                </Button>

                {generatedTags.length > 0 && (
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-green-800 mb-2">Recently Generated Tags</h3>
                      {generatedTags.map((tag) => (
                        <div key={tag.id} className="flex items-center justify-between py-2">
                          <span className="text-green-700">{tag.id} - {tag.lotId}</span>
                          <Badge className="bg-green-600">Generated</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="print" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Printer className="w-5 h-5" />
                  Print Queue
                </CardTitle>
                <CardDescription>Manage waterproof tag printing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...dummyTags, ...generatedTags].map((tag) => (
                    <div key={tag.id} className="border rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{tag.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          Lot: {tag.lotId} • Type: {tag.type}
                        </p>
                        <p className="text-xs text-muted-foreground">{tag.printTime}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(tag.status)}>
                          {tag.status}
                        </Badge>
                        {tag.status !== "printed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePrintTag(tag.id)}
                          >
                            <Printer className="w-4 h-4 mr-1" />
                            Print
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assign" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Tag Assignment
                </CardTitle>
                <CardDescription>Assign tags to containers and packages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dummyTags.filter(tag => tag.status === "printed" || tag.status === "ready").map((tag) => (
                    <div key={tag.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{tag.id}</h3>
                          <p className="text-sm text-muted-foreground">Lot: {tag.lotId}</p>
                        </div>
                        <Badge className={getStatusColor(tag.status)}>
                          {tag.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Assign to Container</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select container" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="crate1">Crate #C001</SelectItem>
                              <SelectItem value="crate2">Crate #C002</SelectItem>
                              <SelectItem value="pallet1">Pallet #P001</SelectItem>
                              <SelectItem value="pallet2">Pallet #P002</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-end">
                          <Button onClick={() => handleAssignTag(tag.id)} className="w-full">
                            Assign Tag
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tag Tracking Dashboard</CardTitle>
                <CardDescription>Monitor tag status and assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">24</div>
                      <div className="text-sm text-muted-foreground">Total Tags</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">18</div>
                      <div className="text-sm text-muted-foreground">Assigned</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">4</div>
                      <div className="text-sm text-muted-foreground">Ready</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">2</div>
                      <div className="text-sm text-muted-foreground">Damaged</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  {dummyTags.map((tag) => (
                    <div key={tag.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold">{tag.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              Lot: {tag.lotId} • {tag.type}
                            </p>
                          </div>
                          <Badge className={getStatusColor(tag.status)}>
                            {tag.status}
                          </Badge>
                        </div>
                        <div className="text-right text-sm">
                          <p className="text-muted-foreground">Assigned to:</p>
                          <p className="font-medium">{tag.assignedTo}</p>
                        </div>
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

export default WaterproofTagging;