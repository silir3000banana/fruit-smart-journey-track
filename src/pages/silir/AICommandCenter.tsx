import AiInsightPanel from "@/features/ai/AiInsightPanel";
import AiAskConsole from "@/features/ai/AiAskConsole";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, ShieldCheck, Database } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function AICommandCenter() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-foreground">
            <Brain className="h-6 w-6 text-primary" aria-hidden />
            AI Command Center
          </h1>
          <p className="text-sm text-muted-foreground">
            Live supply-chain intelligence for {BRAND.solution.name}
          </p>
        </div>
        <Badge variant="secondary" className="rounded-full">Live AI</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <AiAskConsole />
        </div>
        <div className="space-y-6 lg:col-span-2">
          <AiInsightPanel />
          <Card>
            <CardContent className="space-y-3 p-5 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <Database className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                Insights are generated from your own batches, stage logs, cold storage, ripening and alert records.
              </p>
              <p className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                Only records your account is allowed to see are used, and nothing is simulated — if data is missing, the AI says so.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
