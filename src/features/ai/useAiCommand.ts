import { useCallback, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { AiCommandRequest, AiRunState } from "./types";

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-command`;

/**
 * Streams real AI output from the `ai-command` edge function, which reasons over
 * the signed-in user's own supply-chain records. No mock data is ever produced here.
 */
export function useAiCommand() {
  const [state, setState] = useState<AiRunState>({
    text: "",
    streaming: false,
    error: null,
    completedAt: null,
  });
  const controllerRef = useRef<AbortController | null>(null);

  const stop = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    setState((s) => ({ ...s, streaming: false }));
  }, []);

  const run = useCallback(async (request: AiCommandRequest) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setState({ text: "", streaming: true, error: null, completedAt: null });

    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        setState({
          text: "",
          streaming: false,
          error: "Please sign in again to use the AI Command Center.",
          completedAt: null,
        });
        return;
      }

      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify(request),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        let message = "AI could not generate insights right now.";
        try {
          const payload = await res.json();
          if (payload?.error) message = payload.error;
        } catch {
          /* keep default message */
        }
        setState({ text: "", streaming: false, error: message, completedAt: null });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setState({ text, streaming: true, error: null, completedAt: null });
      }
      setState({
        text,
        streaming: false,
        error: null,
        completedAt: new Date().toISOString(),
      });
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return;
      setState({
        text: "",
        streaming: false,
        error: "Connection to the AI service was interrupted. Please try again.",
        completedAt: null,
      });
    } finally {
      controllerRef.current = null;
    }
  }, []);

  return { ...state, run, stop };
}
