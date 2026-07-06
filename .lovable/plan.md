
# SILIR3000 Phase 1 — Platform Foundation Refactor

This is a large, architecture-level refactor. To keep it safe (no regressions to your current working flows), I'll deliver it in **6 sequential sub-phases**, each shippable on its own. You approve this plan once, then I execute sub-phase 1 and check in before moving on.

Nothing existing gets deleted. Pages, routes, dashboards, Supabase logic, and consumer flows stay intact — they get re-organized under the new IA and re-skinned with the standardized design system.

---

## Sub-phase 1 — Branding & Metadata Standardization
- Introduce canonical brand constants (`SILIR3000`, solution: `Fruit Smart Journey Track`, consumer: `Know Your Fruit`) in `src/lib/brand.ts`.
- Update `index.html` title + meta description + OG/Twitter tags.
- Replace mixed names ("FruitFlow AI", "Silir", "SILIR 3000™") across Header, Footer, SilirLayout, HeroSection, dashboards, and page titles with the canonical hierarchy.
- Keep the banana-yellow visual identity from the existing design system.

## Sub-phase 2 — Information Architecture / Navigation
- Refactor `Header.tsx` into the enterprise primary nav: **Platform, Solutions, Industries, Pricing, Resources, Company, Know Your Fruit, Sign In**.
- Introduce a `navigation.ts` config so nav is data-driven and reusable across desktop mega-menu and mobile drawer.
- Map current pages into the new IA (no route deletions; add redirects/aliases where labels change). Example mapping:
  - Platform → Executive Dashboard, IoT Monitoring, AI Inspection, Traceability Engine
  - Solutions → Fruit Smart Journey Track (current landing sections)
  - Industries → placeholder page listing target segments
  - Pricing → existing `/pricing`
  - Resources → placeholder (docs, blueprint, UAT guide links)
  - Company → placeholder (about/contact)
  - Know Your Fruit → existing `/know-your-fruit`
- Footer restructured to mirror this IA.

## Sub-phase 3 — Design System Standardization
- Audit tokens in `index.css` + `tailwind.config.ts`; consolidate spacing (8px scale), radius, elevation, and status colors already present.
- Create `src/components/ui-kit/` re-export layer for canonical primitives: `PageHeader`, `SectionHeader`, `StatCard`, `StatusBadge`, `EmptyState`, `LoadingState`, `ErrorState`, `Timeline`, `Stepper`.
- Refactor 2–3 highest-duplication offenders (dashboard cards, section headings, stat tiles) to use the new primitives. Remaining screens migrate opportunistically in later sub-phases.
- Chart tokens: standard color mapping via CSS vars (already in place — just enforce usage).

## Sub-phase 4 — AI-First Shell (placeholders only, no fake responses)
- Add global **AI Command Bar** (Cmd/Ctrl+K) via `AICommandCenter.tsx` — opens a Dialog with a natural-language input and empty state "AI copilot coming online". No mock LLM output.
- Add `AIInsightPanel` reusable card (used on Traceability & Executive Dashboard) with an "Explain this" affordance wired to a stub.
- Add `AIApprovalQueue` placeholder page under Platform → AI Operations.
- Reserve `src/features/ai/` folder with typed interfaces (`AiInsight`, `AiRecommendation`, `AiApproval`) so Phase 2 wiring to Lovable AI Gateway is a drop-in.

## Sub-phase 5 — Traceability & Know-Your-Fruit UX Polish
- Traceability page: add tabbed timelines (Journey, Sensors, Temperature, Quality, Certification) using the new `Timeline` primitive; add sticky **Journey Summary** + **AI Insight Panel** side rail; wire "Download Report / Share / Print QR / Export PDF" buttons to stub handlers with toast confirmation.
- Know Your Fruit: mobile-first restructure — hero scan CTA, placeholder cards for AI Fruit ID, Camera Scan, Voice Query, Nutrition, Storage, Origin Story, Farmer Profile, Carbon Footprint, Authenticity, Certification, AI Quality Explanation. Each card renders `EmptyState` with "Available in Phase 2" instead of fake data.

## Sub-phase 6 — Enterprise/IoT Scaffolding + QA Sweep
- Create typed scaffolds (no UI surfacing yet in primary nav): `src/features/tenancy/` (Organization, Workspace, Membership, Role types + `useTenant` hook stub), `src/features/iot/` (Device, Sensor, Gateway, Telemetry types + `useDevices` stub), `src/features/audit/` (AuditEvent type + logger stub), `src/features/feature-flags/` (`useFeatureFlag` reading from a static config).
- Accessibility pass on Header, Footer, HeroSection, Traceability, Know Your Fruit, and SilirLayout: aria-labels on icon buttons, focus rings, `<main>` landmark on each route, contrast check on banana-yellow surfaces, `prefers-reduced-motion` guard for hero animations, 44px tap targets.
- Responsive pass at 360 / 768 / 1024 / 1440 / 1920 with Playwright screenshots.
- QA: run typecheck, click through every route, capture console/network errors.

---

## Technical Details

- **No route removal.** `App.tsx` routes stay; new IA is a labeling/grouping layer plus optional redirects (e.g., `/platform/traceability` → `/silir/traceability`).
- **No backend changes** this phase — no Supabase migrations, no new tables, no edge functions. Tenancy/IoT/audit are TypeScript scaffolds only.
- **No AI calls** this phase — the Command Bar and Insight Panel are UI shells with typed contracts ready for Phase 2 integration with Lovable AI Gateway (`openai/gpt-5.5` default).
- **Brand constants** live in `src/lib/brand.ts` and are imported everywhere — no hardcoded product names in components.
- **Design tokens** stay HSL-in-CSS-vars; no hex literals in components (enforced by the ui-kit refactor).
- **Folder additions:** `src/features/{ai,tenancy,iot,audit,feature-flags}/`, `src/components/ui-kit/`, `src/config/navigation.ts`, `src/lib/brand.ts`.
- **Sub-phase 1 alone** touches ~15 files (Header, Footer, index.html, HeroSection, SilirLayout, dashboards) — small, verifiable, reversible.

---

## Suggested execution order

1. Approve this plan.
2. I execute **Sub-phase 1 (Branding & Metadata)** and report back with a screenshot.
3. You give a go/no-go on each subsequent sub-phase.

If you'd rather I collapse this into fewer, larger drops (e.g., ship 1+2 together, then 3+4, then 5+6), say so and I'll batch them.
