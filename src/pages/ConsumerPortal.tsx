import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, MapPin, Truck, Leaf, Shield, Star, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const ConsumerPortal = () => {
  const [qrCode, setQrCode] = useState("");
  const [journeyData, setJourneyData] = useState<any>(null);
  const { toast } = useToast();

  const mockJourneyData = {
    product: {
      name: "Premium Organic Bananas",
      variety: "Cavendish",
      grade: "Grade A+",
      weight: "25kg",
      harvestDate: "2024-01-05"
    },
    farmer: {
      name: "Kumar Singh",
      farm: "Green Valley Organic Farm",
      location: "Punjab, India",
      experience: "15 years",
      certifications: ["Organic", "Fair Trade"]
    },
    journey: [
      {
        stage: "Harvest",
        date: "2024-01-05 08:00:00",
        location: "Green Valley Farm, Punjab",
        status: "completed",
        quality: "Grade A+",
        temperature: "28°C",
        details: "Fresh harvest from certified organic fields"
      },
      {
        stage: "Quality Assessment",
        date: "2024-01-05 10:30:00", 
        location: "Farm Processing Center",
        status: "completed",
        quality: "AI Verified - 96/100",
        temperature: "25°C",
        details: "AI analysis confirmed premium quality, no defects detected"
      },
      {
        stage: "Packing",
        date: "2024-01-05 14:00:00",
        location: "Packing Station #2",
        status: "completed",
        quality: "Grade A+",
        temperature: "22°C",
        details: "Packed in eco-friendly containers with waterproof tags"
      },
      {
        stage: "Cold Storage",
        date: "2024-01-05 16:00:00",
        location: "ColdChain Solutions, Delhi",
        status: "completed",
        quality: "Optimal",
        temperature: "13°C",
        details: "Stored in controlled atmosphere for freshness preservation"
      },
      {
        stage: "Transportation",
        date: "2024-01-06 06:00:00",
        location: "En Route to Mumbai",
        status: "in-transit",
        quality: "Monitored",
        temperature: "12°C",
        details: "Refrigerated transport maintaining optimal conditions"
      },
      {
        stage: "Retail Delivery",
        date: "2024-01-06 18:00:00",
        location: "Metro Fresh Supermarket, Mumbai",
        status: "pending",
        quality: "-",
        temperature: "-",
        details: "Expected delivery to retail outlet"
      }
    ],
    certifications: [
      {
        name: "Organic Certification",
        issuer: "India Organic Certification Agency",
        validUntil: "2024-12-31",
        verified: true
      },
      {
        name: "Export Quality Certificate",
        issuer: "Agricultural Export Board", 
        validUntil: "2024-06-30",
        verified: true
      }
    ],
    blockchain: {
      hash: "0x1a2b3c4d5e6f7g8h9i0j",
      verified: true,
      network: "Polygon",
      timestamp: "2024-01-05 08:00:00"
    }
  };

  const handleScanQR = () => {
    if (qrCode.trim()) {
      setJourneyData(mockJourneyData);
      toast({
        title: "Product Found!",
        description: "Journey information loaded successfully.",
      });
    } else {
      toast({
        title: "Enter QR Code",
        description: "Please enter a QR code to trace the product journey.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-600";
      case "in-transit": return "bg-blue-600";
      case "pending": return "bg-yellow-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusIcon = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "harvest": return <Leaf className="w-4 h-4" />;
      case "quality assessment": return <Star className="w-4 h-4" />;
      case "packing": return <QrCode className="w-4 h-4" />;
      case "cold storage": return <MapPin className="w-4 h-4" />;
      case "transportation": return <Truck className="w-4 h-4" />;
      case "retail delivery": return <CheckCircle className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 mt-20">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Trace Your Product Journey</h1>
          <p className="text-muted-foreground">Scan the QR code on your product to see its complete farm-to-fork journey</p>
        </div>

        {!journeyData && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-center">
                <QrCode className="w-5 h-5" />
                Scan Product QR Code
              </CardTitle>
              <CardDescription className="text-center">
                Enter the QR code from your product packaging
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Enter QR code (e.g., LOT001)"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                className="text-center"
              />
              <Button onClick={handleScanQR} className="w-full" variant="hero">
                Trace Journey
              </Button>
              
              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground mb-2">Try these sample codes:</p>
                <div className="flex gap-2 justify-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQrCode("LOT001")}
                  >
                    LOT001
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQrCode("LOT002")}
                  >
                    LOT002
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {journeyData && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  {journeyData.product.name}
                </CardTitle>
                <CardDescription>
                  From {journeyData.farmer.farm} • Harvested on {journeyData.product.harvestDate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Variety</span>
                    <p className="font-semibold">{journeyData.product.variety}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Grade</span>
                    <Badge className="bg-green-600">{journeyData.product.grade}</Badge>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Weight</span>
                    <p className="font-semibold">{journeyData.product.weight}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Farmer</span>
                    <p className="font-semibold">{journeyData.farmer.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="journey" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="journey">Journey</TabsTrigger>
                <TabsTrigger value="farmer">Farmer Story</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
                <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
              </TabsList>

              <TabsContent value="journey" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Farm-to-Fork Journey</CardTitle>
                    <CardDescription>Track every step of your product's journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {journeyData.journey.map((step: any, index: number) => (
                        <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className={`p-2 rounded-full ${getStatusColor(step.status)}`}>
                            {getStatusIcon(step.stage)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold">{step.stage}</h3>
                              <Badge className={getStatusColor(step.status)}>
                                {step.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{step.details}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                              <div>
                                <span className="text-muted-foreground">Date: </span>
                                <span>{step.date}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Location: </span>
                                <span>{step.location}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Quality: </span>
                                <span>{step.quality}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Temperature: </span>
                                <span>{step.temperature}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="farmer" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Meet Your Farmer</CardTitle>
                    <CardDescription>Learn about the farmer who grew your produce</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Leaf className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold">{journeyData.farmer.name}</h3>
                        <p className="text-muted-foreground">{journeyData.farmer.farm}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <span className="text-sm text-muted-foreground">Location</span>
                          <p className="font-semibold">{journeyData.farmer.location}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Experience</span>
                          <p className="font-semibold">{journeyData.farmer.experience}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Certifications</span>
                          <div className="flex gap-1 justify-center mt-1">
                            {journeyData.farmer.certifications.map((cert: string) => (
                              <Badge key={cert} variant="secondary">{cert}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/20 p-4 rounded-lg">
                        <p className="text-sm">
                          "I've been growing organic bananas for over 15 years using sustainable farming practices. 
                          Our farm is committed to providing the highest quality produce while taking care of our environment 
                          and supporting our local community."
                        </p>
                        <p className="text-right text-sm text-muted-foreground mt-2">- {journeyData.farmer.name}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Quality Certifications
                    </CardTitle>
                    <CardDescription>Verified quality and safety standards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {journeyData.certifications.map((cert: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{cert.name}</h3>
                            {cert.verified && (
                              <Badge className="bg-green-600">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Issuer: </span>
                              <span>{cert.issuer}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Valid Until: </span>
                              <span>{cert.validUntil}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="blockchain" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Blockchain Verification
                    </CardTitle>
                    <CardDescription>Immutable record of your product's journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
                      <h3 className="text-xl font-semibold mb-2">Blockchain Verified</h3>
                      <p className="text-muted-foreground mb-6">
                        This product's journey has been recorded on the blockchain for complete transparency and trust.
                      </p>
                      
                      <div className="bg-muted/20 p-4 rounded-lg text-left max-w-md mx-auto">
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Blockchain Hash: </span>
                            <span className="font-mono text-xs">{journeyData.blockchain.hash}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Network: </span>
                            <span>{journeyData.blockchain.network}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Recorded: </span>
                            <span>{journeyData.blockchain.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="text-center">
              <Button 
                onClick={() => {
                  setJourneyData(null);
                  setQrCode("");
                }}
                variant="outline"
              >
                Trace Another Product
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsumerPortal;