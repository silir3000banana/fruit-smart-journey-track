/** Typed contracts for the SILIR3000 AI Command Center. */

export type AiCommandMode = "briefing" | "ask";

export interface AiCommandRequest {
  mode: AiCommandMode;
  question?: string;
}

export interface AiRunState {
  /** Streamed markdown-ish text produced so far. */
  text: string;
  streaming: boolean;
  error: string | null;
  /** ISO timestamp of the last completed run. */
  completedAt: string | null;
}
