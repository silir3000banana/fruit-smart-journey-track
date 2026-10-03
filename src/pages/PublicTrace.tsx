import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Leaf, MapPin, Calendar, CheckCircle2, Circle, AlertTriangle, Loader2, ShieldCheck, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPublicTrace, PublicTrace as Trace, STAGE_LABEL, TraceStage } from "@/features/trace/api";
import { BRAND } from "@/lib/brand";

const CONSUMER_STAGES: { label: string; stages: TraceStage[] }[] = [
  { label: "Farm", stages: ["FARM"] },
  { label: "Harvest", stages: ["HARVEST", "COLLECTION"] },
  { label: "Quality", stages: ["QUALITY_CHECK"] },
  { label: "Processing", stages: ["POST_HARVEST"] },
  { label: "Storage", stages: ["RIPENING", "STORAGE"] },
  { label: "Transport", stages: ["TRANSPORT", "DISTRIBUTION"] },
  { label: "Warehouse", stages: ["WAREHOUSE"] },
  { label: "Retail", stages: ["RETAIL", "CONSUMER"] },
];

const fmt = (d?: string | null) => (d ? new Date(d).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "Not available");

export default function PublicTrace() {
  const { batchCode = "" } = useParams();
  const [data, setData] = useState<Trace | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "missing" | "error">("loading");

  useEffect(() => {
    document.title = `Know Your Fruit · ${batchCode}`;
    getPublicTrace(batchCode)
      .then((d) => { setData(d); setState(d ? "ok" : "missing"); })
      .catch(() => setState("error"));
  }, [batchCode]);

  if (state === "loading")
    return <div className="min-h-dvh grid place-items-center bg-background"><Loader2 className="w-8 h-8 animate-spin text-primary" aria-label="Loading" /></div>;

  if (state !== "ok" || !data)
    return (
      <main className="min-h-dvh grid place-items-center bg-background p-6 text-center">
        <div className="max-w-sm space-y-4">
          <AlertTriangle className="w-10 h-10 mx-auto text-warning" />
          <h1 className="text-xl font-bold text-foreground">{state === "error" ? "We couldn't load this batch" : "Invalid or unknown QR code"}</h1>
          <p className="text-muted-foreground text-sm">
            {state === "error" ? "Please check your connection and try again." : `No batch matches "${batchCode}". Check the code printed on the label.`}
          </p>
          <Button asChild><Link to="/know-your-fruit">Search another batch</Link></Button>
        </div>
      </main>
    );

  const done = (s: TraceStage[]) => data.events.filter((e) => s.includes(e.stage));
  const qualityFailed = data.quality.some((q) => q.status === "FAIL");
  const trust = [
    { label: "Origin recorded", ok: !!data.farm && data.events.some((e) => e.stage === "FARM") },
    { label: "Journey recorded", ok: data.events.length > 2 },
    { label: "Quality recorded", ok: data.quality.length > 0 },
    { label: "Supply chain events recorded", ok: data.events.length > 0, extra: `${data.events.length} events` },
  ];

  return (
    <main className="min-h-dvh bg-background">
      <header className="bg-gradient-hero text-white">
        <div className="max-w-xl mx-auto px-5 pt-6 pb-10">
          <p className="text-xs uppercase tracking-widest opacity-80">{BRAND.consumer.name}</p>
          {data.is_demo && <Badge className="mt-2 bg-warning text-black">DEMO JOURNEY</Badge>}
          <h1 className="text-3xl font-bold mt-3">{data.crop} · {data.variety}</h1>
          <p className="font-mono text-sm mt-1 opacity-90 break-all">{data.batch_code}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge className="bg-primary text-primary-foreground">{data.stage ? STAGE_LABEL[data.stage] : "—"}</Badge>
            <Badge variant="outline" className="border-white/40 text-white">{data.status ?? "Not available"}</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-5 -mt-6 space-y-5 pb-12">
        <section className="rounded-2xl bg-card border p-5 shadow-sm grid grid-cols-2 gap-4" aria-label="Origin">
          <Info icon={Leaf} label="Origin farm" value={data.farm?.name ?? "Not available"} />
          <Info icon={MapPin} label="Region" value={[data.farm?.district, data.farm?.state].filter(Boolean).join(", ") || data.farm?.location || "Not available"} />
          <Info icon={Calendar} label="Harvested" value={fmt(data.harvest_date)} />
          <Info icon={Package} label="Batch size" value={`${Number(data.initial_quantity_kg)} kg`} />
        </section>

        {qualityFailed && (
          <div role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            A quality inspection for this batch was recorded as FAIL.
          </div>
        )}

        <section className="rounded-2xl bg-card border p-5 shadow-sm" aria-labelledby="journey">
          <h2 id="journey" className="font-semibold text-foreground mb-4">Journey</h2>
          <ol className="space-y-0">
            {CONSUMER_STAGES.map((s, i) => {
              const ev = done(s.stages);
              const last = ev[ev.length - 1];
              return (
                <li key={s.label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    {last ? <CheckCircle2 className="w-6 h-6 text-success" aria-hidden /> : <Circle className="w-6 h-6 text-muted-foreground/50" aria-hidden />}
                    {i < CONSUMER_STAGES.length - 1 && <div className={`w-0.5 flex-1 min-h-[28px] ${last ? "bg-success/50" : "bg-muted"}`} />}
                  </div>
                  <div className="pb-5 min-w-0">
                    <p className={`font-medium ${last ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</p>
                    {last ? (
                      <p className="text-sm text-muted-foreground">{fmt(last.time)}{last.location ? ` · ${last.location}` : ""}{last.status ? ` · ${last.status}` : ""}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">Pending</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="rounded-2xl bg-card border p-5 shadow-sm" aria-labelledby="trust">
          <h2 id="trust" className="font-semibold text-foreground mb-3 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary-dark" />Traceability verification</h2>
          <ul className="space-y-2">
            {trust.map((t) => (
              <li key={t.label} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{t.label}</span>
                {t.ok ? <Badge className="bg-success text-white">Verified{t.extra ? ` · ${t.extra}` : ""}</Badge> : <Badge variant="outline">Not available</Badge>}
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-3">"Verified" means a record exists in the {BRAND.platform.name} ledger for this batch.</p>
        </section>
      </div>
    </main>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof Leaf; label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground flex items-center gap-1"><Icon className="w-3.5 h-3.5" />{label}</p>
      <p className="font-medium text-foreground break-words">{value}</p>
    </div>
  );
}
