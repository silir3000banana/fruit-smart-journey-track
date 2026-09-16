import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkle, AlertTriangle, Square } from "lucide-react";
import { useAiCommand } from "./useAiCommand";
import AiText from "./AiText";

const SUGGESTIONS = [
  "Which batches are at highest spoilage risk right now?",
  "Summarise cold storage temperature compliance today.",
  "What should my team do first this shift?",
  "Which records are missing for a full farm-to-shelf trace?",
];

/** Ask-anything console: one question, one real AI answer over live records. */
export default function AiAskConsole() {
  const [question, setQuestion] = useState("");
  const { text, streaming, error, run, stop } = useAiCommand();

  const submit = (q: string) => {
    const value = q.trim();
    if (!value || streaming) return;
    setQuestion(value);
    run({ mode: "ask", question: value });
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(question);
          }}
          className="space-y-3"
        >
          <label htmlFor="ai-question" className="text-sm font-medium text-foreground">
            Ask the AI Command Center
          </label>
          <Textarea
            id="ai-question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(question);
              }
            }}
            placeholder="e.g. Which chambers are drifting out of their target temperature?"
            rows={3}
            className="resize-none rounded-xl"
          />
          <div className="flex flex-wrap items-center gap-2">
            <Button type="submit" disabled={streaming || !question.trim()} className="rounded-xl">
              <Sparkle className="mr-2 h-4 w-4" aria-hidden />
              {streaming ? "Analysing…" : "Get answer"}
            </Button>
            {streaming && (
              <Button type="button" variant="outline" onClick={stop} className="rounded-xl">
                <Square className="mr-2 h-3.5 w-3.5" aria-hidden />
                Stop
              </Button>
            )}
          </div>
        </form>

        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => submit(s)}
              disabled={streaming}
              className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <p>{error}</p>
          </div>
        )}

        {(text || streaming) && !error && (
          <div className="rounded-xl border border-border bg-muted/20 p-4" aria-live="polite">
            {text ? <AiText text={text} /> : <p className="text-sm text-muted-foreground">Thinking…</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
