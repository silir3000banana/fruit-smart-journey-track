import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, RefreshCw, AlertTriangle } from "lucide-react";
import { useAiCommand } from "./useAiCommand";
import AiText from "./AiText";

interface AiInsightPanelProps {
  title?: string;
  /** Generate the briefing as soon as the panel mounts. */
  autoRun?: boolean;
  className?: string;
}

/** Live AI operations briefing generated from the signed-in user's real records. */
export default function AiInsightPanel({
  title = "AI Operations Briefing",
  autoRun = true,
  className,
}: AiInsightPanelProps) {
  const { text, streaming, error, completedAt, run } = useAiCommand();

  useEffect(() => {
    if (autoRun) run({ mode: "briefing" });
  }, [autoRun, run]);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <Brain className="h-4 w-4 text-primary" aria-hidden />
            {title}
          </CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            {streaming
              ? "Analysing your live records…"
              : completedAt
                ? `Updated ${new Date(completedAt).toLocaleTimeString()}`
                : "Generated from your own batch, storage and alert records."}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => run({ mode: "briefing" })}
          disabled={streaming}
          aria-label="Regenerate AI briefing"
          className="rounded-xl"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${streaming ? "animate-spin" : ""}`} aria-hidden />
          <span className="ml-2 hidden sm:inline">Refresh</span>
        </Button>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <div>
              <p>{error}</p>
              <Button variant="link" size="sm" className="h-auto p-0 text-destructive" onClick={() => run({ mode: "briefing" })}>
                Try again
              </Button>
            </div>
          </div>
        ) : text ? (
          <>
            <AiText text={text} />
            {streaming && (
              <Badge variant="secondary" className="mt-3 rounded-full text-[10px] uppercase tracking-wider">
                Streaming
              </Badge>
            )}
          </>
        ) : (
          <div className="space-y-2" aria-live="polite">
            <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
            <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
            <p className="pt-2 text-xs text-muted-foreground">Thinking…</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
