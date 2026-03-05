import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScanBarcode, QrCode, Camera, Check, ArrowRight, Printer, Tag } from "lucide-react";

const ScanCenterSection = () => {
  const [scanned, setScanned] = useState(false);
  const [creating, setCreating] = useState(false);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4 text-xs tracking-wider uppercase px-4 py-1">Scan & Create</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Barcode / QR Batch Operations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Create new batches, scan barcodes, and run AI camera inspections from one unified panel.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Batch Creation */}
          <Card className="border-border/50 hover:shadow-elegant transition-all">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary" /> Create Batch
              </h3>
              {!creating ? (
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Farm Name", placeholder: "Theni Organics" },
                    { label: "Farmer ID", placeholder: "FRM-0042" },
                    { label: "Fruit Type", placeholder: "Banana" },
                    { label: "Harvest Date", placeholder: "2026-03-04" },
                    { label: "Weight (kg)", placeholder: "6000" },
                    { label: "Lot Number", placeholder: "LOT-2026-014" },
                  ].map((f, i) => (
                    <div key={i}>
                      <Label className="text-xs text-muted-foreground">{f.label}</Label>
                      <Input placeholder={f.placeholder} className="mt-1 text-sm" />
                    </div>
                  ))}
                  <div className="col-span-2 mt-3">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-glow" onClick={() => setCreating(true)}>
                      Generate Batch ID & Labels
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7 text-success" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Batch ID Generated</div>
                    <div className="text-xl font-bold text-foreground mt-1 font-mono">FRUIT-2026-TN-000245</div>
                  </div>
                  <div className="flex items-center justify-center gap-8 py-3">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center mb-1">
                        <QrCode className="w-12 h-12 text-foreground/30" />
                      </div>
                      <span className="text-[10px] text-muted-foreground">QR Code</span>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center mb-1">
                        <ScanBarcode className="w-12 h-12 text-foreground/30" />
                      </div>
                      <span className="text-[10px] text-muted-foreground">Barcode</span>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" size="sm"><Printer className="w-3.5 h-3.5 mr-1.5" /> Print Label</Button>
                    <Button variant="outline" size="sm"><Tag className="w-3.5 h-3.5 mr-1.5" /> Attach to Crate</Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs" onClick={() => setCreating(false)}>Create Another</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Scan Center */}
          <Card className="border-border/50 hover:shadow-elegant transition-all">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                <ScanBarcode className="w-5 h-5 text-primary" /> Scan Center
              </h3>
              {!scanned ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: ScanBarcode, label: "Scan Barcode" },
                      { icon: QrCode, label: "Scan QR Code" },
                      { icon: Camera, label: "AI Camera Scan" },
                    ].map((btn, i) => (
                      <Button key={i} variant="outline" className="h-20 flex-col gap-2 text-xs hover:border-primary hover:text-primary transition-colors" onClick={() => setScanned(true)}>
                        <btn.icon className="w-6 h-6" />
                        {btn.label}
                      </Button>
                    ))}
                  </div>
                  <div className="bg-muted/50 rounded-xl p-8 text-center border border-border/30">
                    <ScanBarcode className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Point scanner at barcode or QR code</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-success/5 border border-success/20">
                    <Check className="w-5 h-5 text-success" />
                    <span className="text-sm font-medium text-success">Batch Detected</span>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-5 border border-border/30 space-y-3">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Batch ID</span><span className="font-semibold font-mono text-foreground">BN-245</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Origin Farm</span><span className="font-medium text-foreground">Theni</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Harvest Date</span><span className="font-medium text-foreground">3 Mar 2026</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Quality Score</span><span className="font-bold text-primary">92%</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["Move to Sorting", "Move to Ripening", "Move to Cold Storage", "Dispatch"].map((action, i) => (
                      <Button key={i} variant="outline" size="sm" className="text-xs">{action}</Button>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => setScanned(false)}>Scan Another</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ScanCenterSection;
