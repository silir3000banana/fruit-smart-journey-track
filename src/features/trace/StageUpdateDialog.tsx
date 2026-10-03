import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { recordEvent, STAGE_LABEL, TraceStage, UPDATABLE_STAGES } from "./api";

/** Stage-specific detail fields; values are stored in the event's details. */
const DETAIL_FIELDS: Partial<Record<TraceStage, { id: string; label: string; type?: string }[]>> = {
  QUALITY_CHECK: [
    { id: "inspector", label: "Inspector" }, { id: "grade", label: "Grade" }, { id: "appearance", label: "Appearance" },
    { id: "size", label: "Size" }, { id: "weight", label: "Avg weight (g)", type: "number" }, { id: "moisture", label: "Moisture %", type: "number" },
    { id: "defects", label: "Defects" }, { id: "temperature", label: "Temperature °C", type: "number" },
  ],
  POST_HARVEST: [{ id: "packing_details", label: "Packing details" }, { id: "operator", label: "Operator" }],
  RIPENING: [{ id: "facility", label: "Facility" }, { id: "chamber", label: "Room / Chamber" }, { id: "start_time", label: "Start", type: "datetime-local" }, { id: "end_time", label: "End", type: "datetime-local" }, { id: "temperature", label: "Temperature °C", type: "number" }, { id: "humidity", label: "Humidity %", type: "number" }, { id: "operator", label: "Operator" }],
  STORAGE: [{ id: "facility", label: "Facility" }, { id: "chamber", label: "Room / Chamber" }, { id: "start_time", label: "Start", type: "datetime-local" }, { id: "end_time", label: "End", type: "datetime-local" }, { id: "temperature", label: "Temperature °C", type: "number" }, { id: "humidity", label: "Humidity %", type: "number" }, { id: "operator", label: "Operator" }],
  TRANSPORT: [{ id: "vehicle_id", label: "Vehicle" }, { id: "driver", label: "Driver" }, { id: "origin", label: "Origin" }, { id: "destination", label: "Destination" }, { id: "dispatch_time", label: "Dispatch time", type: "datetime-local" }, { id: "arrival_time", label: "Arrival time", type: "datetime-local" }, { id: "temperature", label: "Temperature °C", type: "number" }],
  DISTRIBUTION: [{ id: "distributor", label: "Distributor" }, { id: "destination", label: "Destination" }],
  WAREHOUSE: [{ id: "warehouse", label: "Warehouse" }, { id: "received_quantity", label: "Received qty (kg)", type: "number" }, { id: "rejected_quantity", label: "Rejected qty (kg)", type: "number" }, { id: "storage_location", label: "Storage location" }, { id: "quality_status", label: "Quality status" }, { id: "operator", label: "Operator" }],
  RETAIL: [{ id: "retailer", label: "Retailer" }, { id: "retail_location", label: "Retail location" }, { id: "display_date", label: "Display date", type: "date" }],
  COLLECTION: [{ id: "collection_center", label: "Collection center" }, { id: "operator", label: "Operator" }],
  CONSUMER: [{ id: "channel", label: "Sales channel" }],
};

const STATUS_OPTIONS: Partial<Record<TraceStage, string[]>> = {
  QUALITY_CHECK: ["PASS", "CONDITIONAL", "FAIL"],
  TRANSPORT: ["DISPATCHED", "IN_TRANSIT", "ARRIVED"],
  RETAIL: ["RECEIVED", "ON_DISPLAY", "SOLD"],
};

export default function StageUpdateDialog({ open, onClose, batchCode, currentQty, onSaved }: { open: boolean; onClose: () => void; batchCode: string; currentQty: number; onSaved: () => void }) {
  const [stage, setStage] = useState<TraceStage>("QUALITY_CHECK");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const fields = DETAIL_FIELDS[stage] ?? [];
  const statuses = STATUS_OPTIONS[stage];

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const fd = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const details: Record<string, string> = {};
    fields.forEach((f) => { if (fd[f.id]) details[f.id] = fd[f.id]; });
    const payload: Record<string, unknown> = {
      action: fd.action || `${STAGE_LABEL[stage]} recorded`, location: fd.location, quantity: fd.quantity,
      loss_reason: fd.loss_reason, status: fd.status, remarks: fd.remarks, evidence_url: fd.evidence_url, details,
    };
    if (stage === "QUALITY_CHECK") payload.quality_status = fd.status;
    if (stage === "WAREHOUSE" && details.received_quantity) {
      payload.accepted_quantity = Number(details.received_quantity) - Number(details.rejected_quantity || 0);
      details.accepted_quantity = String(payload.accepted_quantity);
    }
    if (fd.evidence_url && !/^https:\/\//i.test(fd.evidence_url)) return setErr("Evidence link must start with https://");
    setBusy(true); setErr(null);
    try {
      await recordEvent(batchCode, stage, payload);
      toast.success(`${STAGE_LABEL[stage]} saved`);
      onSaved(); onClose();
    } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto">
        <DialogHeader><DialogTitle>Update Batch Stage</DialogTitle></DialogHeader>
        <form key={stage} onSubmit={submit} className="grid grid-cols-2 gap-3">
          <div className="col-span-2 space-y-1">
            <Label htmlFor="stage">Stage</Label>
            <select id="stage" value={stage} onChange={(e) => { setStage(e.target.value as TraceStage); setErr(null); }} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
              {UPDATABLE_STAGES.map((s) => <option key={s} value={s}>{STAGE_LABEL[s]}</option>)}
            </select>
          </div>
          {statuses && (
            <div className="col-span-2 space-y-1"><Label htmlFor="status">Status *</Label>
              <select id="status" name="status" required defaultValue="" className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="" disabled>Select status</option>{statuses.map((s) => <option key={s}>{s}</option>)}</select></div>
          )}
          {fields.map((f) => <F key={f.id} id={f.id} label={f.label} type={f.type} step={f.type === "number" ? "any" : undefined} />)}
          <F id="location" label="Location" />
          {stage !== "WAREHOUSE" && <F id="quantity" label={`Quantity (kg) — now ${currentQty}`} type="number" step="any" min="0.01" max={currentQty} defaultValue={currentQty} />}
          {stage !== "WAREHOUSE" && <div className="col-span-2"><F id="loss_reason" label="Loss reason (required if quantity dropped)" /></div>}
          <div className="col-span-2"><F id="remarks" label="Remarks" maxLength={1000} /></div>
          <div className="col-span-2"><F id="evidence_url" label="Evidence link (https://)" type="url" /></div>
          {err && <p role="alert" className="col-span-2 text-sm text-destructive">{err}</p>}
          <DialogFooter className="col-span-2"><Button type="submit" disabled={busy}>{busy && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}Save {STAGE_LABEL[stage]}</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const F = ({ id, label, ...p }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-1"><Label htmlFor={id}>{label}</Label><Input id={id} name={id} {...p} /></div>
);
