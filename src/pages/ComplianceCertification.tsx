import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Shield, CheckCircle, Upload } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const ComplianceCertification = () => {
  const { toast } = useToast();

  const dummyCertifications = [
    {
      id: "CERT001",
      type: "Organic Certification",
      issuer: "India Organic Certification Agency",
      status: "active",
      validUntil: "2024-12-31",
      lotsCovered: ["LOT001", "LOT002", "LOT003"]
    },
    {
      id: "CERT002", 
      type: "Export Quality Certificate",
      issuer: "Agricultural Export Board",
      status: "pending",
      validUntil: "2024-06-30",
      lotsCovered: ["LOT001"]
    }
  ];

  const handleUpload = () => {
    toast({
      title: "Certificate Uploaded",
      description: "Certificate has been uploaded and blockchain record created.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Compliance & Certification</h1>
          <p className="text-muted-foreground">Manage certifications and compliance records</p>
        </div>

        <Tabs defaultValue="certificates" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain Records</TabsTrigger>
          </TabsList>

          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Active Certifications
                </CardTitle>
                <CardDescription>View and manage compliance certificates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dummyCertifications.map((cert) => (
                    <div key={cert.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{cert.type}</h4>
                          <p className="text-sm text-muted-foreground">ID: {cert.id}</p>
                        </div>
                        <Badge className={cert.status === "active" ? "bg-green-600" : "bg-yellow-600"}>
                          {cert.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Issuer: </span>
                          <span className="font-medium">{cert.issuer}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Valid Until: </span>
                          <span>{cert.validUntil}</span>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-muted-foreground">Covers Lots: </span>
                          <span>{cert.lotsCovered.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Certificate
                </CardTitle>
                <CardDescription>Upload new compliance certificates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Certificate Type</Label>
                    <Input placeholder="e.g., Organic Certificate" />
                  </div>
                  <div className="space-y-2">
                    <Label>Issuing Authority</Label>
                    <Input placeholder="e.g., Certification Agency" />
                  </div>
                </div>
                
                <div className="border-2 border-dashed border-muted-foreground rounded-lg p-8 text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">Drop certificate files here or click to upload</p>
                  <Button onClick={handleUpload} variant="outline">
                    Select Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Blockchain Records
                </CardTitle>
                <CardDescription>Immutable certification records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
                  <p className="text-lg font-semibold mb-2">Blockchain Integration Active</p>
                  <p className="text-muted-foreground">All certificates are automatically recorded on blockchain for immutable verification</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComplianceCertification;