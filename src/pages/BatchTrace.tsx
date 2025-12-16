import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Search, Shield, CheckCircle, Download, Share2 } from "lucide-react";
import Header from "@/components/Header";
import BatchTraceabilityTimeline, { TraceabilityStage } from "@/components/traceability/BatchTraceabilityTimeline";
import StageDetailModal from "@/components/traceability/StageDetailModal";
import { useToast } from "@/hooks/use-toast";

// Sample batch data for demonstration
const sampleBatches: Record<string, {
  batchId: string;
  productType: string;
  variety: string;
  totalQuantityKg: number;
  currentQuantityKg: number;
  qualityGrade: string;
  stages: TraceabilityStage[];
  certifications: Array<{ name: string; issuer: string; verified: boolean }>;
  coldChainCompliance: number;
}> = {
  'BN-2025-014': {
    batchId: 'BN-2025-014',
    productType: 'Banana',
    variety: 'Cavendish',
    totalQuantityKg: 1000,
    currentQuantityKg: 980,
    qualityGrade: 'Grade A',
    stages: [
      {
        id: '1',
        stage: 'harvest',
        stageName: 'Farm & Harvest',
        status: 'completed',
        date: '2025-12-12',
        time: '08:30',
        location: 'Sathyamangalam, Tamil Nadu',
        responsibleRole: 'Farmer',
        responsibleName: 'Anand Kumar',
        qualityScore: 82,
        temperature: 28,
        humidity: 65,
        notes: 'Fresh harvest from certified organic fields. Optimal maturity stage achieved.',
      },
      {
        id: '2',
        stage: 'post_harvest',
        stageName: 'Post-Harvest Handling',
        status: 'completed',
        date: '2025-12-12',
        time: '14:00',
        location: 'ITL Packhouse, Erode',
        responsibleRole: 'Quality Manager',
        responsibleName: 'Priya Sharma',
        qualityScore: 87,
        qualityGrade: 'Grade A',
        temperature: 25,
        notes: 'Sorted: 980kg | Grade A: 820kg | Rejected: 20kg',
        metadata: {
          sorted_quantity_kg: 980,
          grade_a_kg: 820,
          grade_b_kg: 140,
          rejected_kg: 20,
        },
      },
      {
        id: '3',
        stage: 'ripening',
        stageName: 'Ripening Chamber',
        status: 'completed',
        date: '2025-12-13',
        time: '09:00',
        location: 'Ripening Facility, Coimbatore',
        responsibleRole: 'Ripening Manager',
        responsibleName: 'Vijay Rajan',
        qualityScore: 91,
        temperature: 18,
        humidity: 90,
        notes: 'Controlled ethylene ripening. Stage: Turning → Ready',
        metadata: {
          chamber_id: 'RC-003',
          ethylene_ppm: 150,
          days_in_chamber: 3,
          ripening_stage: 'Ready',
        },
      },
      {
        id: '4',
        stage: 'transport',
        stageName: 'Cold Chain Transport',
        status: 'completed',
        date: '2025-12-16',
        time: '06:00',
        location: 'Coimbatore → Chennai',
        responsibleRole: 'Logistics Manager',
        responsibleName: 'Suresh Babu',
        temperature: 14.2,
        notes: 'Refrigerated transport. No temperature breaches detected.',
        metadata: {
          vehicle_id: 'TN-38-AQ-4521',
          driver: 'Murugan',
          distance_km: 505,
          avg_temp: 14.2,
          breaches: 0,
        },
      },
      {
        id: '5',
        stage: 'warehouse',
        stageName: 'Distribution Warehouse',
        status: 'completed',
        date: '2025-12-16',
        time: '14:30',
        location: 'ITL Warehouse, Chennai',
        responsibleRole: 'Warehouse Admin',
        responsibleName: 'Lakshmi Narayanan',
        temperature: 13,
        humidity: 85,
        notes: 'FIFO Position: 3. Ready for retail dispatch.',
        metadata: {
          storage_zone: 'Zone-A',
          fifo_position: 3,
          stored_days: 2,
        },
      },
      {
        id: '6',
        stage: 'retail',
        stageName: 'Retail Shelf',
        status: 'in_progress',
        date: '2025-12-18',
        time: '10:00',
        location: 'Fresh Mart, T. Nagar, Chennai',
        responsibleRole: 'Retail Manager',
        responsibleName: 'Ramesh Kumar',
        qualityScore: 95,
        notes: 'Shelf life remaining: 4 days. Freshness: Excellent',
        metadata: {
          shelf_life_days: 7,
          remaining_days: 4,
          freshness_status: 'Excellent',
        },
      },
    ],
    certifications: [
      { name: 'GLOBALG.A.P Certified', issuer: 'GLOBALG.A.P', verified: true },
      { name: 'HACCP Compliance', issuer: 'Bureau Veritas', verified: true },
      { name: 'ISO 22000:2018', issuer: 'TÜV SÜD', verified: true },
    ],
    coldChainCompliance: 100,
  },
  'BN-2025-015': {
    batchId: 'BN-2025-015',
    productType: 'Banana',
    variety: 'Grand Nain',
    totalQuantityKg: 800,
    currentQuantityKg: 780,
    qualityGrade: 'Grade A',
    stages: [
      {
        id: '1',
        stage: 'harvest',
        stageName: 'Farm & Harvest',
        status: 'completed',
        date: '2025-12-14',
        time: '07:00',
        location: 'Theni District, Tamil Nadu',
        responsibleRole: 'Farmer',
        qualityScore: 85,
        temperature: 26,
        humidity: 70,
        notes: 'Premium quality harvest from hillside plantation.',
      },
      {
        id: '2',
        stage: 'post_harvest',
        stageName: 'Post-Harvest',
        status: 'completed',
        date: '2025-12-14',
        time: '16:00',
        location: 'Theni Processing Center',
        responsibleRole: 'Quality Manager',
        qualityScore: 88,
        qualityGrade: 'Grade A',
        notes: 'Sorted: 780kg usable. High quality maintained.',
      },
      {
        id: '3',
        stage: 'ripening',
        stageName: 'Ripening',
        status: 'in_progress',
        date: '2025-12-15',
        location: 'Ripening Facility, Madurai',
        responsibleRole: 'Ripening Manager',
        temperature: 17,
        humidity: 92,
        notes: 'Currently in ripening chamber. Stage: Turning',
        metadata: {
          chamber_id: 'RC-007',
          days_in_chamber: 1,
          ripening_stage: 'Turning',
        },
      },
    ],
    certifications: [
      { name: 'Organic India', issuer: 'APEDA', verified: true },
    ],
    coldChainCompliance: 100,
  },
};

const BatchTrace = () => {
  const [searchParams] = useSearchParams();
  const initialBatchId = searchParams.get('id') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialBatchId);
  const [selectedBatch, setSelectedBatch] = useState<typeof sampleBatches['BN-2025-014'] | null>(
    initialBatchId ? sampleBatches[initialBatchId] || null : null
  );
  const [selectedStage, setSelectedStage] = useState<TraceabilityStage | null>(null);
  const [stageModalOpen, setStageModalOpen] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    const batch = sampleBatches[searchQuery.toUpperCase()];
    if (batch) {
      setSelectedBatch(batch);
      toast({
        title: "Batch Found",
        description: `Traceability data loaded for ${batch.batchId}`,
      });
    } else {
      toast({
        title: "Batch Not Found",
        description: "Please check the Batch ID and try again.",
        variant: "destructive",
      });
    }
  };

  const handleStageClick = (stage: TraceabilityStage) => {
    setSelectedStage(stage);
    setStageModalOpen(true);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/batch-trace?id=${selectedBatch?.batchId}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied",
      description: "Traceability link copied to clipboard.",
    });
  };

  const completedStages = selectedBatch?.stages.filter(s => s.status === 'completed').length || 0;
  const totalStages = 6;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-8 mt-20">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Trace Your Batch
          </h1>
          <p className="text-muted-foreground">
            Enter a Batch ID or scan QR code to view the complete farm-to-retail journey
          </p>
        </div>

        {/* Search Section */}
        <Card className="max-w-xl mx-auto mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <QrCode className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Enter Batch ID (e.g., BN-2025-014)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                Trace
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="text-xs text-muted-foreground">Try:</span>
              {Object.keys(sampleBatches).map((id) => (
                <Button
                  key={id}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery(id);
                    setSelectedBatch(sampleBatches[id]);
                  }}
                >
                  {id}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Batch Traceability Display */}
        {selectedBatch && (
          <div className="space-y-6">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">🍌</span>
                      {selectedBatch.batchId}
                    </CardTitle>
                    <CardDescription>
                      {selectedBatch.productType} • {selectedBatch.variety} • {selectedBatch.qualityGrade}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Total Quantity</p>
                    <p className="text-xl font-bold">{selectedBatch.totalQuantityKg} kg</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Current Quantity</p>
                    <p className="text-xl font-bold">{selectedBatch.currentQuantityKg} kg</p>
                  </div>
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Progress</p>
                    <p className="text-xl font-bold text-success">{completedStages}/{totalStages}</p>
                  </div>
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Cold Chain</p>
                    <p className="text-xl font-bold text-success">{selectedBatch.coldChainCompliance}%</p>
                  </div>
                </div>

                {/* Compliance Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-success">
                    <Shield className="w-3 h-3 mr-1" />
                    {selectedBatch.coldChainCompliance}% Cold Chain Compliance
                  </Badge>
                  {selectedBatch.certifications.map((cert) => (
                    <Badge key={cert.name} variant="outline" className="border-success text-success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {cert.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Timeline Views */}
            <Tabs defaultValue="vertical" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="vertical">Detailed View</TabsTrigger>
                <TabsTrigger value="horizontal">Timeline View</TabsTrigger>
              </TabsList>

              <TabsContent value="vertical" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Complete Journey</CardTitle>
                    <CardDescription>
                      Click on any stage to view detailed information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BatchTraceabilityTimeline
                      batchId={selectedBatch.batchId}
                      productType={selectedBatch.productType}
                      variety={selectedBatch.variety}
                      stages={selectedBatch.stages}
                      orientation="vertical"
                      onStageClick={handleStageClick}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="horizontal" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Timeline Overview</CardTitle>
                    <CardDescription>
                      Quick view of batch progression through stages
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BatchTraceabilityTimeline
                      batchId={selectedBatch.batchId}
                      productType={selectedBatch.productType}
                      variety={selectedBatch.variety}
                      stages={selectedBatch.stages}
                      orientation="horizontal"
                      compact
                      onStageClick={handleStageClick}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Certifications & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedBatch.certifications.map((cert) => (
                    <div
                      key={cert.name}
                      className="flex items-center gap-3 p-4 border rounded-lg bg-success/5"
                    >
                      <CheckCircle className="w-8 h-8 text-success" />
                      <div>
                        <p className="font-semibold">{cert.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Verified by {cert.issuer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Stage Detail Modal */}
        <StageDetailModal
          stage={selectedStage}
          open={stageModalOpen}
          onOpenChange={setStageModalOpen}
        />
      </div>
    </div>
  );
};

export default BatchTrace;