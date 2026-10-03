import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Loader2, Sprout, Wheat, PackagePlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { createBatch, createFarm, createHarvest, STAGE_LABEL, TraceStage } from "@/features/trace/api";

type Farm = { id: string; farm_name: string; location: string; is_demo: boolean };
type Harvest = { id: string; farm_id: string; crop: string | null; variety: string | null; quantity_kg: number; harvest_date: string };
type Batch = { id: string; batch_id: string; product_type: string; variety: string; trace_stage: TraceStage | null; current_status: string | null; current_quantity_kg: number; farm_id: string | null; is_demo: boolean; created_at: string };

export default function BatchHub() {
  const nav = useNavigate();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [harvests, setHarvests] = useState<Harvest[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [failedQc, setFailedQc] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadErr, setLoadErr] = useState(false);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<null | "farm" | "harvest" | "batch">(null);

  const load = async () => {
    setLoading(true); setLoadErr(false);
    const [f, h, b, qc] = await Promise.all([
      supabase.from("farms").select("id,farm_name,location,is_demo").order("created_at", { ascending: false }),
      supabase.from("harvest_records").select("id,farm_id,crop,variety,quantity_kg,harvest_date").order("created_at", { ascending: false }),
      supabase.from("batches").select("id,batch_id,product_type,variety,trace_stage,current_status,current_quantity_kg,farm_id,is_demo,created_at").order("created_at", { ascending: false }),
      supabase.from("quality_records").select("id", { count: "exact", head: true }).eq("quality_status", "FAIL"),
    ]);
    if (f.error || h.error || b.error) setLoadErr(true);
    setFarms((f.data as Farm[]) ?? []); setHarvests((h.data as Harvest[]) ?? []); setBatches((b.data as Batch[]) ?? []);
    setFailedQc(qc.count ?? 0); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const farmName = (id: string | null) => farms.find((f) => f.id === id)?.farm_name ?? "—";
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return batches;
    return batches.filter((b) => [b.batch_id, b.product_type, b.variety, b.trace_stage, b.current_status, farmName(b.farm_id)].some((v) => v?.toLowerCase().includes(s)));
  }, [q, batches, farms]);

  const kpis = [
    { label: "Total Farms", v: farms.length },
    { label: "Active Batches", v: batches.filter((b) => !["AT_RETAIL", "QUALITY_FAILED"].includes(b.current_status ?? "")).length },
    { label: "Completed Journeys", v: batches.filter((b) => b.trace_stage === "RETAIL" || b.trace_stage === "CONSUMER").length },
    { label: "In Transit", v: batches.filter((b) => b.trace_stage === "TRANSPORT" || b.trace_stage === "DISTRIBUTION").length },
    { label: "In Storage", v: batches.filter((b) => b.trace_stage === "STORAGE" || b.trace_stage === "RIPENING").length },
    { label: "Quality Alerts", v: batches.filter((b) => b.current_status === "QUALITY_FAILED" || b.current_status === "CONDITIONAL").length },
    { label: "Failed Quality Checks", v: failedQc },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Traceability</h1>
          <p className="text-sm text-muted-foreground">Farms, harvests and batches — one persistent Batch ID from farm to consumer.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setOpen("farm")}><Sprout className="w-4 h-4 mr-1" />Add Farm</Button>
          <Button variant="outline" onClick={() => setOpen("harvest")} disabled={!farms.length}><Wheat className="w-4 h-4 mr-1" />Record Harvest</Button>
          <Button onClick={() => setOpen("batch")}><PackagePlus className="w-4 h-4 mr-1" />Create New Batch</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
        {kpis.map((k) => (
          <Card key={k.label} className="rounded-2xl"><CardContent className="p-4">
            <p className="text-xs text-muted-foreground">{k.label}</p>
            <p className="text-2xl font-bold text-foreground">{loading ? "…" : k.v}</p>
          </CardContent></Card>
        ))}
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input aria-label="Search batches" className="pl-9" placeholder="Search by Batch ID, farm, crop, variety, stage or status" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {loadErr && <p role="alert" className="text-sm text-destructive">We couldn't load your records. Check your connection and refresh.</p>}

      {loading ? (
        <div className="py-16 grid place-items-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <Card className="rounded-2xl"><CardContent className="py-14 text-center space-y-3">
          <p className="text-foreground font-medium">{batches.length ? "No batches match your search." : "No batches created yet."}</p>
          {!batches.length && <Button onClick={() => setOpen(farms.length ? "batch" : "farm")}><Plus className="w-4 h-4 mr-1" />Create First Batch</Button>}
        </CardContent></Card>
      ) : (
        <div className="grid gap-3">
          {filtered.map((b) => (
            <button key={b.id} onClick={() => nav(`/batch/${b.batch_id}`)} className="text-left rounded-2xl border bg-card p-4 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring outline-none transition">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono font-semibold text-foreground">{b.batch_id}</span>
                <div className="flex gap-2">
                  {b.is_demo && <Badge variant="outline">DEMO</Badge>}
                  <Badge>{b.trace_stage ? STAGE_LABEL[b.trace_stage] : "Legacy"}</Badge>
                  <Badge variant={b.current_status === "QUALITY_FAILED" ? "destructive" : "secondary"}>{b.current_status ?? "—"}</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{b.product_type} · {b.variety} · {farmName(b.farm_id)} · {Number(b.current_quantity_kg)} kg</p>
            </button>
          ))}
        </div>
      )}

      <FarmDialog open={open === "farm"} onClose={() => setOpen(null)} onDone={load} />
      <HarvestDialog open={open === "harvest"} farms={farms} onClose={() => setOpen(null)} onDone={load} />
      <BatchDialog open={open === "batch"} farms={farms} harvests={harvests} onClose={() => setOpen(null)} onCreated={(code) => nav(`/batch/${code}`)} />
    </div>
  );
}

function useSubmit() {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const run = async (fn: () => Promise<void>) => {
    if (busy) return;
    setBusy(true); setErr(null);
    try { await fn(); } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  };
  return { busy, err, run, setErr };
}

const Field = ({ id, label, ...p }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-1"><Label htmlFor={id}>{label}</Label><Input id={id} name={id} {...p} /></div>
);
const Select = ({ id, label, children, ...p }: { id: string; label: string } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className="space-y-1"><Label htmlFor={id}>{label}</Label>
    <select id={id} name={id} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" {...p}>{children}</select></div>
);
const formObj = (e: React.FormEvent<HTMLFormElement>) => Object.fromEntries(new FormData(e.currentTarget).entries());

function FarmDialog({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
  const s = useSubmit();
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto">
        <DialogHeader><DialogTitle>Add Farm</DialogTitle></DialogHeader>
        <form className="grid grid-cols-2 gap-3" onSubmit={(e) => { e.preventDefault(); const d = formObj(e); s.run(async () => { await createFarm(d); toast.success("Farm saved"); onDone(); onClose(); }); }}>
          <div className="col-span-2"><Field id="farm_name" label="Farm name *" required maxLength={120} /></div>
          <Field id="farmer_name" label="Farmer name" maxLength={120} />
          <Field id="contact" label="Contact" maxLength={60} />
          <div className="col-span-2"><Field id="location" label="Location *" required maxLength={200} /></div>
          <Field id="district" label="District" /><Field id="state" label="State" />
          <Field id="latitude" label="Latitude" type="number" step="any" /><Field id="longitude" label="Longitude" type="number" step="any" />
          <Field id="crop" label="Main crop" /><Field id="cultivation_method" label="Cultivation method" />
          <div className="col-span-2"><Field id="certification_status" label="Certification status" /></div>
          {s.err && <p role="alert" className="col-span-2 text-sm text-destructive">{s.err}</p>}
          <DialogFooter className="col-span-2"><Button type="submit" disabled={s.busy}>{s.busy && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}Save farm</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function HarvestDialog({ open, farms, onClose, onDone }: { open: boolean; farms: Farm[]; onClose: () => void; onDone: () => void }) {
  const s = useSubmit();
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>Record Harvest</DialogTitle></DialogHeader>
        <form className="grid grid-cols-2 gap-3" onSubmit={(e) => { e.preventDefault(); const d = formObj(e); s.run(async () => { await createHarvest(d); toast.success("Harvest saved"); onDone(); onClose(); }); }}>
          <div className="col-span-2"><Select id="farm_id" label="Farm *" required defaultValue="">
            <option value="" disabled>Select farm</option>{farms.map((f) => <option key={f.id} value={f.id}>{f.farm_name}</option>)}</Select></div>
          <Field id="crop" label="Crop *" required defaultValue="Banana" /><Field id="variety" label="Variety" />
          <Field id="harvest_date" label="Harvest date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
          <Field id="quantity" label="Quantity (kg) *" type="number" min="0.01" step="any" required />
          <Field id="grade" label="Grade" /><Field id="operator" label="Operator" />
          <div className="col-span-2"><Field id="remarks" label="Remarks" /></div>
          {s.err && <p role="alert" className="col-span-2 text-sm text-destructive">{s.err}</p>}
          <DialogFooter className="col-span-2"><Button type="submit" disabled={s.busy}>{s.busy && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}Save harvest</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function BatchDialog({ open, farms, harvests, onClose, onCreated }: { open: boolean; farms: Farm[]; harvests: Harvest[]; onClose: () => void; onCreated: (c: string) => void }) {
  const s = useSubmit();
  const [farmId, setFarmId] = useState("");
  const [harvestId, setHarvestId] = useState("");
  const fh = harvests.filter((h) => h.farm_id === farmId);
  const h = fh.find((x) => x.id === harvestId);
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>Create New Batch</DialogTitle></DialogHeader>
        {!farms.length ? <p className="text-sm text-muted-foreground">Add a farm and record a harvest first.</p> : (
        <form className="grid grid-cols-2 gap-3" onSubmit={(e) => { e.preventDefault(); const d = formObj(e); s.run(async () => { const code = await createBatch(d); toast.success(`Batch ${code} created`); onCreated(code); }); }}>
          <div className="col-span-2"><Select id="farm_id" label="Farm *" required value={farmId} onChange={(e) => { setFarmId(e.target.value); setHarvestId(""); }}>
            <option value="" disabled>Select farm</option>{farms.map((f) => <option key={f.id} value={f.id}>{f.farm_name}</option>)}</Select></div>
          <div className="col-span-2"><Select id="harvest_id" label="Harvest *" required value={harvestId} onChange={(e) => setHarvestId(e.target.value)} disabled={!farmId}>
            <option value="" disabled>{farmId && !fh.length ? "No harvests for this farm" : "Select harvest"}</option>
            {fh.map((x) => <option key={x.id} value={x.id}>{x.harvest_date} · {x.crop ?? "Crop"} · {Number(x.quantity_kg)} kg</option>)}</Select></div>
          <Field key={`c${harvestId}`} id="crop" label="Crop *" required defaultValue={h?.crop ?? ""} />
          <Field key={`v${harvestId}`} id="variety" label="Variety" defaultValue={h?.variety ?? ""} />
          <div className="col-span-2"><Field key={`q${harvestId}`} id="quantity" label="Quantity (kg) *" type="number" min="0.01" step="any" max={h?.quantity_kg} required defaultValue={h?.quantity_kg ?? ""} /></div>
          <p className="col-span-2 text-xs text-muted-foreground">A unique Batch ID (e.g. SILIR3-BAN-YYYYMMDD-00001) and QR code are generated on save.</p>
          {s.err && <p role="alert" className="col-span-2 text-sm text-destructive">{s.err}</p>}
          <DialogFooter className="col-span-2"><Button type="submit" disabled={s.busy}>{s.busy && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}Create batch</Button></DialogFooter>
        </form>)}
      </DialogContent>
    </Dialog>
  );
}
