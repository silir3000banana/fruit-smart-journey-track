import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScanLine, Upload, Search, Leaf, ArrowRight, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const KnowYourFruit = () => {
  const [batchInput, setBatchInput] = useState("");
  const [scanning, setScanning] = useState(false);
  const [mode, setMode] = useState<"idle" | "scan" | "upload">("idle");
  const navigate = useNavigate();
  const { toast } = useToast();

  const sampleBatches = [
    { id: "FRUIT-2026-TN-000145", fruit: "🍌 Banana" },
    { id: "FRUIT-2026-KL-000082", fruit: "🥭 Mango" },
    { id: "FRUIT-2026-AP-000233", fruit: "🍎 Apple" },
  ];

  const validateBatchId = (id: string): boolean => /^[A-Za-z0-9\-]{1,50}$/.test(id);

  const handleSearch = () => {
    const trimmed = batchInput.trim();
    if (!trimmed) {
      toast({ title: "Enter a Batch ID", description: "Please enter a fruit batch ID to trace.", variant: "destructive" });
      return;
    }
    if (!validateBatchId(trimmed)) {
      toast({ title: "Invalid Batch ID", description: "Use letters, numbers, and hyphens only (max 50 chars).", variant: "destructive" });
      return;
    }
    navigate(`/fruit-journey/${encodeURIComponent(trimmed)}`);
  };

  const handleScan = () => {
    setMode("scan");
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      toast({ title: "QR Code Detected!", description: "Batch FRUIT-2026-TN-000145 found." });
      navigate("/fruit-journey/FRUIT-2026-TN-000145");
    }, 2500);
  };

  const handleUpload = () => {
    setMode("upload");
    setTimeout(() => {
      toast({ title: "Fruit Identified!", description: "AI detected: Cavendish Banana — Batch matched." });
      navigate("/fruit-journey/FRUIT-2026-TN-000145");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(140,30%,97%)] to-[hsl(140,20%,93%)]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#1E7F5A] flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-[#1E7F5A] text-sm tracking-tight">SILIR Trace</span>
        </div>
      </div>

      {/* Hero */}
      <div className="px-5 pt-6 pb-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E7F5A]/10 text-[#1E7F5A] text-xs font-medium mb-4">
          <Leaf className="w-3 h-3" /> Farm-to-Consumer Traceability
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[hsl(210,18%,12%)] mb-3 leading-tight">
          Know Your Fruit
        </h1>
        <p className="text-[hsl(210,8%,50%)] text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Scan a QR code or upload a photo to discover the complete journey of your fruit — from farm to your hands.
        </p>
      </div>

      {/* Scan / Upload Actions */}
      <div className="px-5 space-y-3 max-w-md mx-auto">
        {mode === "idle" && (
          <>
            <button
              onClick={handleScan}
              className="w-full group relative overflow-hidden rounded-2xl bg-[#1E7F5A] p-5 text-white transition-all hover:shadow-lg hover:shadow-[#1E7F5A]/20 active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <ScanLine className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-base">Scan Fruit QR Code</p>
                  <p className="text-white/70 text-xs mt-0.5">Point your camera at the fruit label</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto opacity-60 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={handleUpload}
              className="w-full group relative overflow-hidden rounded-2xl border-2 border-dashed border-[#1E7F5A]/30 bg-white p-5 transition-all hover:border-[#1E7F5A]/60 hover:shadow-md active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1E7F5A]/10 flex items-center justify-center shrink-0">
                  <Upload className="w-6 h-6 text-[#1E7F5A]" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-base text-[hsl(210,18%,12%)]">Upload Fruit Image</p>
                  <p className="text-[hsl(210,8%,50%)] text-xs mt-0.5">AI will identify and trace your fruit</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto text-[hsl(210,8%,50%)] opacity-60 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </>
        )}

        {/* Scanning animation */}
        {mode === "scan" && scanning && (
          <div className="rounded-2xl bg-[hsl(210,18%,10%)] aspect-[3/4] max-h-[360px] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-4 border-2 border-white/30 rounded-xl" />
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-[#38B27B] animate-[scan_2s_ease-in-out_infinite]" />
            <Camera className="w-10 h-10 text-white/40 mb-3" />
            <p className="text-white/60 text-sm">Scanning for QR code...</p>
            <p className="text-white/40 text-xs mt-1">Hold steady</p>
          </div>
        )}

        {mode === "upload" && (
          <div className="rounded-2xl bg-white border border-[hsl(210,16%,90%)] aspect-square max-h-[300px] flex flex-col items-center justify-center gap-3 animate-pulse">
            <Upload className="w-8 h-8 text-[#1E7F5A]" />
            <p className="text-sm text-[hsl(210,8%,50%)]">Analyzing fruit image...</p>
          </div>
        )}
      </div>

      {/* Manual Batch Search */}
      <div className="px-5 mt-6 max-w-md mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-px bg-[hsl(210,16%,90%)]" />
          <span className="text-xs text-[hsl(210,8%,50%)] px-2">or search by Batch ID</span>
          <div className="flex-1 h-px bg-[hsl(210,16%,90%)]" />
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. FRUIT-2026-TN-000145"
            value={batchInput}
            onChange={(e) => setBatchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="bg-white border-[hsl(210,16%,90%)] text-sm"
          />
          <Button onClick={handleSearch} size="icon" className="bg-[#1E7F5A] hover:bg-[#1E7F5A]/90 shrink-0">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Sample Batches */}
      <div className="px-5 mt-6 pb-10 max-w-md mx-auto">
        <p className="text-xs text-[hsl(210,8%,50%)] mb-2">Try a sample batch:</p>
        <div className="flex flex-wrap gap-2">
          {sampleBatches.map((b) => (
            <button
              key={b.id}
              onClick={() => navigate(`/fruit-journey/${encodeURIComponent(b.id)}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[hsl(210,16%,90%)] text-xs hover:border-[#1E7F5A]/40 hover:bg-[#1E7F5A]/5 transition-colors"
            >
              <span>{b.fruit}</span>
              <span className="text-[hsl(210,8%,50%)] font-mono">{b.id.split("-").slice(-1)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-[hsl(210,16%,90%)]">
        <p className="text-[10px] text-[hsl(210,8%,50%)]">Powered by <span className="font-semibold text-[#1E7F5A]">iYarKai Tech Lab</span></p>
        <p className="text-[10px] text-[hsl(210,8%,60%)]">AIoT Post-Harvest Intelligence</p>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 1rem; }
          50% { top: calc(100% - 1rem); }
        }
      `}</style>
    </div>
  );
};

export default KnowYourFruit;
