import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkle, ArrowRight, AlertTriangle } from "lucide-react";
import { useAiCommand } from "./useAiCommand";
import AiText from "./AiText";

/** Global Cmd/Ctrl+K AI command bar with real streamed answers. */
export default function AiCommandBar() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const { text, streaming, error, run } = useAiCommand();
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="rounded-xl"
        aria-label="Open AI command bar"
      >
        <Sparkle className="h-4 w-4" aria-hidden />
        <span className="ml-2 hidden md:inline">Ask AI</span>
        <kbd className="ml-2 hidden rounded border border-border px-1.5 text-[10px] text-muted-foreground lg:inline">
          ⌘K
        </kbd>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Sparkle className="h-4 w-4 text-primary" aria-hidden />
              AI Command Center
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (question.trim() && !streaming) run({ mode: "ask", question });
            }}
            className="flex gap-2"
          >
            <Input
              autoFocus
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about batches, chambers, alerts or next actions…"
              className="rounded-xl"
            />
            <Button type="submit" disabled={streaming || !question.trim()} className="rounded-xl" aria-label="Send question">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </form>

          <div className="max-h-[45vh] overflow-y-auto" aria-live="polite">
            {error ? (
              <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <p>{error}</p>
              </div>
            ) : text ? (
              <AiText text={text} />
            ) : streaming ? (
              <p className="text-sm text-muted-foreground">Thinking…</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Answers come from your own live records — nothing is simulated.
              </p>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="justify-start px-0 text-xs text-muted-foreground"
            onClick={() => {
              setOpen(false);
              navigate("/silir/ai");
            }}
          >
            Open the full AI Command Center →
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
