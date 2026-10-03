# Sprint 8 — End-to-End Traceability with One Persistent Batch ID

Goal: one real batch moves Farm → Retail → Consumer. Every step is saved, and the same batch shows up behind a public QR page. Existing pages and design stay as they are; new screens use the current SILIR3000 shell and banana theme.

## What you will be able to do
1. **Farms & Harvests**: add a farm, then record a harvest against it (in the operations area).
2. **Create New Batch**: a guided form (Farm → Harvest → Crop/Variety → Quantity) that creates an ID like `SILIR3-BAN-20261002-00001`, makes a real QR code, and opens the batch journey.
3. **Batch Journey page** (`/batch/{id}`, sign-in required): header with a QR you can download or print, a 12-stage timeline (done and pending stages), quantity history with losses, quality inspections (PASS/CONDITIONAL/FAIL stays visible), and the audit trail.
4. **Update Stage**: one reusable dialog, with fields that change by stage (quality, storage/ripening, transport DISPATCHED→IN TRANSIT→ARRIVED, warehouse received/rejected/accepted, retail).
5. **Public trace** (`/trace/{id}`, no login, mobile-first "Know Your Fruit"): origin, harvest date, current stage, timeline, and a trust section. "Verified" only appears when real records back it up; otherwise it says "Not available". No private contact details, user IDs, or internal notes are shown.
6. **Search** by batch ID, farm, crop, variety, stage, or status. Each result opens the right journey.
7. **Dashboard KPIs** on the SILIR dashboard come from real data. Each starts at zero, with a "Create First Batch" button.
8. **IoT**: storage and transport show "Waiting for IoT data" until a real sensor reading exists. No readings are made up.
9. **Demo journey**: one clearly labelled demo (ITL Demo Farm, Banana, `SILIR3-BAN-DEMO-001`), flagged as demo so it never mixes with real data.

## Roles
The current role list is extended with: super admin, farm admin, packhouse/storage/warehouse operators, retailer, and auditor. The existing roles are kept, so nothing breaks. Each stage has a set of allowed roles. The database itself enforces this, so it doesn't rely on hiding buttons. Consumers are read-only, through the public page only.

## Technical details
- Batches stay in the existing tables. Additive migration:
  - `batches`: add `batch_code` (unique), `harvest_id`, `current_status`, `is_demo`, `qr_url`.
  - `farms`: add `farmer_name`, `district`, `state`, `contact`, `cultivation_method`, `status`, `is_demo`.
  - `harvest_records`: add `variety`, `unit`, `grade`, `operator`.
  - New tables: `traceability_events` (all event fields from the brief, plus previous/new quantity, loss, reason), `quality_records`, `storage_records` (covers ripening and storage), and `audit_logs`. Existing transport/warehouse/retail tables get the missing columns.
  - New 12-value stage enum `trace_stage`. The old `batch_stage` is left as is.
- A `SECURITY DEFINER` function `record_batch_event(batch, stage, payload)` runs the stage update as one transaction. It checks the user's role for that stage, checks the quantity (must be > 0 and no more than the current quantity), adds the event and the stage's own record, updates the batch's stage, status and quantity, and writes the audit log. `create_batch(...)` makes the ID from a sequence and blocks duplicates.
- Public `get_public_trace(code)` function: anyone can call it, but it returns only consumer-safe JSON. Direct table reads stay locked for the public.
- Friendly error messages for each failure case (duplicate, bad quantity, unauthorised, not found, invalid QR, network). Raw database errors are never shown.
- QR codes come from the `qrcode.react` library and point to `${origin}/trace/{code}`.
- QA: a Playwright run walks the full 21-step acceptance test (signed in as the QA user, given admin for the test), plus an unauthorised test and a consumer read-only test, then reloads to confirm everything was saved. Results go in `SPRINT8_QA_REPORT.md`, with each item marked PASS/PARTIAL/FAIL and a completion % based only on what was actually tested.
