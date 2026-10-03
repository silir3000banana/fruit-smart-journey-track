import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { ArrowLeft, CheckCircle2, Circle, Download, ExternalLink, Loader2, Printer, XCircle, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { STAGE_LABEL, TRACE_STAGES, TraceStage, traceUrl } from "@/features/trace/api";
import StageUpdateDialog from "@/features/trace/StageUpdateDialog";

type Ev = { id: string; stage: TraceStage; action: string; actor_name: string | null; event_time: string; location: string | null; previous_quantity: number | null; quantity: number | null; loss_quantity: number | null; loss_reason: string | null; status: string | null; remarks: string | null; evidence_url: string | null; details: Record<string, any> };
type Audit = { id: string; action: string; user_name: string | null; previous_state: any; new_state: any; created_at: string };
type QC = { id: string; inspection_date: string; inspector: string | null; grade: string | null; quality_status: string; defects: string | null; remarks: string | null };

const dt = (d: string) => new Date(d).toLocaleString();

export default function BatchJourney() {
  const { batchCode = "" } = useParams();
  const [batch, setBatch] = useState<any>(null);
  const [farm, setFarm] = useState<any>(null);
  const [harvestDate, setHarvestDate] = useState<string | null>(null);
  const [events, setEvents] = useState<Ev[]>([]);
  const [audit, setAudit] = useState<Audit[]>([]);
  const [qc, setQc] = useState<QC[]>([]);
  const [state, setState] = useState<"loading" | "ok" | "missing" | "error">("loading");
  const [dialog, setDialog] = useState(false);

  const load = async () => {
    const { data: b, error } = await supabase.from("batches").select("*").eq("batch_id", batchCode).maybeSingle();
    if (error) return setState("error");
    if (!b) return setState("missing");
    setBatch(b);
    const [f, h, e, a, q] = await Promise.all([
      b.farm_id ? supabase.from("farms").select("farm_name,location").eq("id", b.farm_id).maybeSingle() : Promise.resolve({ data: null }),
      (b as any).harvest_id ? supabase.from("harvest_records").select("harvest_date").eq("id", (b as any).harvest_id).maybeSingle() : Promise.resolve({ data: null }),
      supabase.from("traceability_events").select("*").eq("batch_id", b.id).order("event_time").order("created_at"),
      supabase.from("audit_logs").select("id,action,user_name,previous_state,new_state,created_at").eq("batch_id", b.id).order("created_at", { ascending: false }),
      supabase.from("quality_records").select("id,inspection_date,inspector,grade,quality_status,defects,remarks").eq("batch_id", b.id).order("inspection_date"),
    ]);
    setFarm((f as any).data); setHarvestDate((h as any).data?.harvest_date ?? null);
    setEvents(((e as any).data as Ev[]) ?? []); setAudit(((a as any).data as Audit[]) ?? []); setQc(((q as any).data as QC[]) ?? []);
    setState("ok");
  };
  useEffect(() => { load(); }, [batchCode]);

  const downloadQr = () => {
    const c = document.getElementById("batch-qr") as HTMLCanvasElement | null;
    if (!c) return;
    const a = document.createElement("a"); a.href = c.toDataURL("image/png"); a.download = `${batchCode}.png`; a.click();
  };

  if (state === "loading") return <div className="py-24 grid place-items-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  if (state !== "ok") return (
    <Card className="rounded-2xl"><CardContent className="py-14 text-center space-y-3">
      <AlertTriangle className="w-8 h-8 mx-auto text-warning" />
      <p className="font-medium text-foreground">{state === "missing" ? `Batch ${batchCode} not found, or you don't have access.` : "We couldn't load this batch. Please try again."}</p>
      <Button asChild variant="outline"><Link to="/silir/traceability">Back to batches</Link></Button>
    </CardContent></Card>
  );

  const qtyRows = events.filter((e) => e.quantity != null);

  return (
    <div className="space-y-6">
      <Link to="/silir/traceability" className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-foreground"><ArrowLeft className="w-4 h-4" />All batches</Link>

      <Card className="rounded-2xl">
        <CardContent className="p-5 flex flex-col md:flex-row gap-6">
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-mono text-xl font-bold text-foreground break-all">{batch.batch_id}</h1>
              {batch.is_demo && <Badge variant="outline">DEMO</Badge>}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <Kv k="Crop" v={batch.product_type} /><Kv k="Variety" v={batch.variety} />
              <Kv k="Current stage" v={batch.trace_stage ? STAGE_LABEL[batch.trace_stage as TraceStage] : "—"} />
              <Kv k="Status" v={batch.current_status ?? "—"} />
              <Kv k="Current qty" v={`${Number(batch.current_quantity_kg)} kg`} /><Kv k="Initial qty" v={`${Number(batch.total_quantity_kg)} kg`} />
              <Kv k="Origin farm" v={farm?.farm_name ?? "—"} /><Kv k="Harvest date" v={harvestDate ?? "—"} />
              <Kv k="Created" v={dt(batch.created_at)} />
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button onClick={() => setDialog(true)}>Update Batch Stage</Button>
              <Button variant="outline" asChild><a href={`/trace/${batch.batch_id}`} target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4 mr-1" />Public trace</a></Button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-white p-3 rounded-xl border"><QRCodeCanvas id="batch-qr" value={traceUrl(batch.batch_id)} size={156} level="M" /></div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={downloadQr}><Download className="w-4 h-4 mr-1" />PNG</Button>
              <Button size="sm" variant="outline" onClick={() => window.print()}><Printer className="w-4 h-4 mr-1" />Print</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader><CardTitle className="text-lg">Journey timeline</CardTitle></CardHeader>
          <CardContent>
            <ol>
              {TRACE_STAGES.map((s, i) => {
                const ev = events.filter((e) => e.stage === s);
                const failed = ev.some((e) => e.status === "FAIL");
                return (
                  <li key={s} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      {failed ? <XCircle className="w-6 h-6 text-destructive" /> : ev.length ? <CheckCircle2 className="w-6 h-6 text-success" /> : <Circle className="w-6 h-6 text-muted-foreground/40" />}
                      {i < TRACE_STAGES.length - 1 && <div className="w-0.5 flex-1 min-h-[24px] bg-muted" />}
                    </div>
                    <div className="pb-5 min-w-0 flex-1">
                      <p className={`font-medium ${ev.length ? "text-foreground" : "text-muted-foreground"}`}>{STAGE_LABEL[s]} {!ev.length && <span className="text-xs font-normal">· Pending</span>}</p>
                      {ev.map((e) => (
                        <div key={e.id} className="mt-1 rounded-lg bg-muted/40 p-3 text-sm space-y-1">
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="font-medium text-foreground">{e.action}</span>
                            {e.status && <Badge variant={e.status === "FAIL" ? "destructive" : "secondary"}>{e.status}</Badge>}
                          </div>
                          <p className="text-muted-foreground">{dt(e.event_time)}{e.location ? ` · ${e.location}` : ""}{e.actor_name ? ` · by ${e.actor_name}` : ""}{e.quantity != null ? ` · ${Number(e.quantity)} kg` : ""}</p>
                          {Object.entries(e.details ?? {}).filter(([, v]) => v !== "" && v != null).length > 0 && (
                            <p className="text-xs text-muted-foreground">{Object.entries(e.details).filter(([, v]) => v !== "" && v != null).map(([k, v]) => `${k.replace(/_/g, " ")}: ${v}`).join(" · ")}</p>
                          )}
                          {(s === "STORAGE" || s === "RIPENING" || s === "TRANSPORT") && <p className="text-xs text-muted-foreground italic">IoT: Waiting for IoT data</p>}
                          {e.remarks && <p className="text-foreground/80">{e.remarks}</p>}
                          {e.evidence_url && <a className="text-xs underline" href={e.evidence_url} target="_blank" rel="noreferrer">Evidence</a>}
                        </div>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ol>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader><CardTitle className="text-lg">Quantity history</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              {qtyRows.length === 0 ? <p className="text-muted-foreground">No quantity records yet.</p> : qtyRows.map((e) => (
                <div key={e.id} className="flex justify-between gap-2 border-b last:border-0 pb-2">
                  <span className="text-foreground">{STAGE_LABEL[e.stage]}</span>
                  <span className="text-right">
                    <span className="font-medium text-foreground">{Number(e.quantity)} kg</span>
                    {e.loss_quantity ? <span className="block text-xs text-destructive">−{Number(e.loss_quantity)} kg · {e.loss_reason}</span> : null}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader><CardTitle className="text-lg">Quality inspections</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              {qc.length === 0 ? <p className="text-muted-foreground">No inspections recorded.</p> : qc.map((r) => (
                <div key={r.id} className="border-b last:border-0 pb-2">
                  <div className="flex justify-between"><span>{new Date(r.inspection_date).toLocaleDateString()}</span>
                    <Badge variant={r.quality_status === "FAIL" ? "destructive" : r.quality_status === "PASS" ? "default" : "secondary"}>{r.quality_status}</Badge></div>
                  <p className="text-xs text-muted-foreground">Grade {r.grade ?? "—"} · {r.inspector ?? "—"}{r.defects ? ` · ${r.defects}` : ""}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader><CardTitle className="text-lg">Audit trail</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-xs max-h-96 overflow-y-auto">
              {audit.map((a) => (
                <div key={a.id} className="border-b last:border-0 pb-2">
                  <p className="font-medium text-foreground text-sm">{a.action.replace(/_/g, " ")}</p>
                  {a.previous_state?.stage && <p className="text-muted-foreground">{a.previous_state.stage} → {a.new_state?.stage}</p>}
                  <p className="text-muted-foreground">{a.user_name ?? "—"} · {dt(a.created_at)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <StageUpdateDialog open={dialog} onClose={() => setDialog(false)} batchCode={batch.batch_id} currentQty={Number(batch.current_quantity_kg)} onSaved={load} />
    </div>
  );
}

const Kv = ({ k, v }: { k: string; v: string }) => (
  <div className="min-w-0"><p className="text-xs text-muted-foreground">{k}</p><p className="font-medium text-foreground break-words">{v}</p></div>
);
