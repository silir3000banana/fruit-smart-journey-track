import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { QrCode, Download, CheckCircle, Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const QRGeneration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const lots = [
    {
      id: "LOT001",
      cropType: "Banana",
      quantity: "500kg",
      quality: "Grade A",
      qrGenerated: true,
      generatedDate: "2024-01-15",
      farmer: "Kumar Singh"
    },
    {
      id: "LOT002",
      cropType: "Mango",
      quantity: "300kg",
      quality: "Grade A",
      qrGenerated: false,
      generatedDate: null,
      farmer: "Raj Patel"
    },
    {
      id: "LOT003",
      cropType: "Apple",
      quantity: "450kg",
      quality: "Grade B",
      qrGenerated: true,
      generatedDate: "2024-01-13",
      farmer: "Amit Sharma"
    },
    {
      id: "LOT004",
      cropType: "Orange",
      quantity: "600kg",
      quality: "Grade A",
      qrGenerated: false,
      generatedDate: null,
      farmer: "Suresh Kumar"
    }
  ];

  const generateQR = (lotId: string) => {
    toast({
      title: "QR Code Generated",
      description: `QR code successfully generated for ${lotId}`,
    });
  };

  const downloadQR = (lotId: string) => {
    toast({
      title: "QR Code Downloaded",
      description: `QR code for ${lotId} has been downloaded`,
    });
  };

  const filteredLots = lots.filter(lot =>
    lot.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lot.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lot.cropType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 mt-20">
        <div className="mb-6">
          <Link to="/farm-tracking" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Farm Tracking
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">QR Code Generation</h1>
          <p className="text-muted-foreground">Generate and manage QR codes for lot traceability</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QR Code Management
            </CardTitle>
            <CardDescription>
              Generate unique QR codes for each harvest lot
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search lots..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* QR Generation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLots.map((lot) => (
                <Card key={lot.id} className="border-2">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{lot.id}</CardTitle>
                        <CardDescription>
                          {lot.cropType} • {lot.quantity}
                        </CardDescription>
                      </div>
                      {lot.qrGenerated && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Farmer:</span>
                        <span>{lot.farmer}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Quality:</span>
                        <Badge variant="outline">{lot.quality}</Badge>
                      </div>
                      {lot.generatedDate && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Generated:</span>
                          <span>{lot.generatedDate}</span>
                        </div>
                      )}

                      {/* QR Code Preview Area */}
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                        {lot.qrGenerated ? (
                          <div className="text-center">
                            <QrCode className="w-12 h-12 mx-auto mb-2 text-primary" />
                            <p className="text-sm text-muted-foreground">QR Code Generated</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <QrCode className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">No QR Code</p>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {lot.qrGenerated ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => downloadQR(lot.id)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1"
                            onClick={() => generateQR(lot.id)}
                          >
                            <QrCode className="w-4 h-4 mr-2" />
                            Generate QR
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredLots.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No lots found matching your search.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRGeneration;