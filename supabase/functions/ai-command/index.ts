// AI Command Center — real AI insights over the caller's own supply-chain data.
// Streams plain text (SSE-free) chunks to the browser.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Snapshot = Record<string, unknown>;

async function buildSnapshot(authHeader: string): Promise<Snapshot> {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );

  const [batches, alerts, stageLogs, warehouse, ripening, farms] = await Promise.all([
    supabase.from("batches").select("batch_id, product_type, variety, current_stage, total_quantity_kg, current_quantity_kg, quality_grade, is_active, created_at").order("created_at", { ascending: false }).limit(60),
    supabase.from("alerts").select("alert_type, severity, title, message, is_resolved, created_at").order("created_at", { ascending: false }).limit(40),
    supabase.from("batch_stage_logs").select("stage, location, temperature_celsius, humidity_percent, quality_score, quality_grade, completed_at").order("created_at", { ascending: false }).limit(80),
    supabase.from("warehouse_records").select("warehouse_name, storage_zone, temperature_celsius, humidity_percent, quantity_kg, status, inbound_date, outbound_date").order("created_at", { ascending: false }).limit(40),
    supabase.from("ripening_records").select("chamber_id, ripening_method, ethylene_ppm, temperature_celsius, humidity_percent, current_stage, days_in_chamber").order("created_at", { ascending: false }).limit(40),
    supabase.from("farms").select("farm_name, location, acreage, crop_types, certifications").limit(30),
  ]);

  const errors = [batches, alerts, stageLogs, warehouse, ripening, farms]
    .map((r) => r.error?.message)
    .filter(Boolean);

  return {
    generated_at: new Date().toISOString(),
    read_errors: errors,
    counts: {
      batches: batches.data?.length ?? 0,
      alerts: alerts.data?.length ?? 0,
      stage_logs: stageLogs.data?.length ?? 0,
      warehouse_records: warehouse.data?.length ?? 0,
      ripening_records: ripening.data?.length ?? 0,
      farms: farms.data?.length ?? 0,
    },
    batches: batches.data ?? [],
    alerts: alerts.data ?? [],
    stage_logs: stageLogs.data ?? [],
    warehouse_records: warehouse.data ?? [],
    ripening_records: ripening.data ?? [],
    farms: farms.data ?? [],
  };
}

const SYSTEM = `You are the AI Command Center for SILIR3000 / Fruit Smart Journey Track, an AI + IoT fruit supply chain platform.
You analyse ONLY the JSON operational snapshot provided in the message. Rules:
- Never invent batches, temperatures, alerts, revenue, or percentages that are not derivable from the snapshot.
- If the snapshot is empty or a section has no rows, say plainly that there is no data yet for that area and state what the operator should record first.
- Be concise and operational: short markdown with bold labels, no long essays, no code fences.
- Prefer specific, actionable next steps over generic advice. Quantify only from real numbers in the snapshot.`;

const BRIEFING_PROMPT = `Produce today's operations briefing with these sections:
**Status** (one or two lines), **Risks** (bullets, highest impact first), **Recommended actions** (bullets, each starting with a verb), **Data gaps** (bullets naming missing records that limit analysis). Keep the whole answer under 250 words.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Sign in required." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "AI is not configured." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const mode: string = body.mode === "ask" ? "ask" : "briefing";
    const question: string = typeof body.question === "string" ? body.question.slice(0, 1000) : "";
    if (mode === "ask" && !question.trim()) {
      return new Response(JSON.stringify({ error: "Ask a question first." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const snapshot = await buildSnapshot(authHeader);
    const task = mode === "ask"
      ? `Operator question: ${question}\n\nAnswer using only the snapshot. If the snapshot cannot answer it, say so and name the records needed.`
      : BRIEFING_PROMPT;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        stream: true,
        store: false,
        reasoning: { effort: "low", summary: "auto" },
        instructions: SYSTEM,
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: `Operational snapshot:\n${JSON.stringify(snapshot)}` },
              { type: "input_text", text: task },
            ],
          },
        ],
      }),
    });

    if (!aiRes.ok || !aiRes.body) {
      const detail = await aiRes.text().catch(() => "");
      const status = aiRes.status === 429 || aiRes.status === 402 ? aiRes.status : 502;
      console.error("AI gateway error", aiRes.status, detail.slice(0, 500));
      const message = aiRes.status === 429
        ? "AI is busy right now — try again in a moment."
        : aiRes.status === 402
        ? "AI credits are exhausted. Add credits to continue."
        : "AI could not generate insights right now.";
      return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Translate the Responses SSE stream into plain text deltas for the browser.
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    let buffer = "";
    let sawText = false;
    let reasoning = "";

    const stream = new ReadableStream({
      async start(controller) {
        const reader = aiRes.body!.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
              if (!line.startsWith("data:")) continue;
              const payload = line.slice(5).trim();
              if (!payload || payload === "[DONE]") continue;
              try {
                const evt = JSON.parse(payload);
                if (evt.type === "response.output_text.delta" && typeof evt.delta === "string") {
                  sawText = true;
                  controller.enqueue(encoder.encode(evt.delta));
                } else if (evt.type === "response.reasoning_summary_text.delta" && typeof evt.delta === "string") {
                  reasoning += evt.delta;
                }
              } catch {
                // ignore keep-alive / partial frames
              }
            }
          }
          if (!sawText) {
            controller.enqueue(
              encoder.encode(reasoning.trim() || "No insight could be generated for this data yet."),
            );
          }
          controller.close();
        } catch (err) {
          console.error("stream error", err);
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("ai-command failure", err);
    return new Response(JSON.stringify({ error: "Something went wrong generating insights." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
