import { supabase } from "@/integrations/supabase/client";

export const TRACE_STAGES = [
  "FARM", "HARVEST", "COLLECTION", "POST_HARVEST", "QUALITY_CHECK", "RIPENING",
  "STORAGE", "TRANSPORT", "WAREHOUSE", "DISTRIBUTION", "RETAIL", "CONSUMER",
] as const;
export type TraceStage = (typeof TRACE_STAGES)[number];

export const STAGE_LABEL: Record<TraceStage, string> = {
  FARM: "Farm", HARVEST: "Harvest", COLLECTION: "Collection", POST_HARVEST: "Post-Harvest",
  QUALITY_CHECK: "Quality Check", RIPENING: "Ripening", STORAGE: "Storage", TRANSPORT: "Transport",
  WAREHOUSE: "Warehouse", DISTRIBUTION: "Distribution", RETAIL: "Retail", CONSUMER: "Consumer",
};

/** Stages an operator can record after batch creation. */
export const UPDATABLE_STAGES = TRACE_STAGES.filter((s) => s !== "FARM" && s !== "HARVEST");

const MESSAGES: Record<string, string> = {
  UNAUTHORIZED: "You don't have permission to do this for this stage.",
  MISSING_FARM: "Please select a farm.",
  MISSING_FARM_NAME: "Farm name is required.",
  MISSING_LOCATION: "Farm location is required.",
  MISSING_HARVEST: "Please select a harvest from this farm.",
  MISSING_CROP: "Please choose a crop.",
  INVALID_QUANTITY: "Quantity must be greater than zero.",
  QUANTITY_EXCEEDS_HARVEST: "Batch quantity can't exceed the harvested quantity.",
  QUANTITY_EXCEEDS_CURRENT: "Quantity can't be more than the batch currently holds.",
  LOSS_REASON_REQUIRED: "Quantity dropped — please enter a reason for the loss.",
  DUPLICATE_BATCH: "A batch with this ID already exists.",
  BATCH_NOT_FOUND: "Batch not found.",
  INVALID_STAGE: "This stage can't be updated manually.",
  INVALID_QUALITY_STATUS: "Choose PASS, CONDITIONAL or FAIL.",
};

export function friendlyError(err: unknown): string {
  const msg = (err as { message?: string })?.message ?? "";
  for (const key of Object.keys(MESSAGES)) if (msg.includes(key)) return MESSAGES[key];
  if (/fetch|network/i.test(msg)) return "Network problem — check your connection and try again.";
  return "Something went wrong saving your data. Please try again.";
}

const rpc = async <T,>(fn: string, args: Record<string, unknown>): Promise<T> => {
  const { data, error } = await (supabase.rpc as any)(fn, args);
  if (error) throw new Error(friendlyError(error));
  return data as T;
};

export const createFarm = (p: Record<string, unknown>) => rpc<string>("trace_create_farm", { p });
export const createHarvest = (p: Record<string, unknown>) => rpc<string>("trace_create_harvest", { p });
export const createBatch = (p: Record<string, unknown>) => rpc<string>("trace_create_batch", { p });
export const recordEvent = (code: string, stage: TraceStage, p: Record<string, unknown>) =>
  rpc<string>("trace_record_event", { p_batch_code: code, p_stage: stage, p });
export const getPublicTrace = (code: string) => rpc<PublicTrace | null>("get_public_trace", { p_code: code });

export const traceUrl = (code: string) => `${window.location.origin}/trace/${encodeURIComponent(code)}`;

export interface PublicTrace {
  batch_code: string; crop: string; variety: string; stage: TraceStage | null; status: string | null;
  quantity_kg: number; initial_quantity_kg: number; grade: string | null; is_demo: boolean; created_at: string;
  farm: { name: string; location: string; district: string | null; state: string | null; cultivation_method: string | null; certification_status: string | null } | null;
  harvest_date: string | null;
  events: { stage: TraceStage; action: string; time: string; location: string | null; quantity: number | null; status: string | null }[];
  quality: { date: string; grade: string | null; status: string }[];
}
