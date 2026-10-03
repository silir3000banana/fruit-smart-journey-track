CREATE TYPE public.trace_stage AS ENUM ('FARM','HARVEST','COLLECTION','POST_HARVEST','QUALITY_CHECK','RIPENING','STORAGE','TRANSPORT','WAREHOUSE','DISTRIBUTION','RETAIL','CONSUMER');

ALTER TABLE public.farms
  ADD COLUMN IF NOT EXISTS farmer_name text,
  ADD COLUMN IF NOT EXISTS district text,
  ADD COLUMN IF NOT EXISTS state text,
  ADD COLUMN IF NOT EXISTS contact text,
  ADD COLUMN IF NOT EXISTS cultivation_method text,
  ADD COLUMN IF NOT EXISTS certification_status text,
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS is_demo boolean NOT NULL DEFAULT false;

ALTER TABLE public.harvest_records
  ADD COLUMN IF NOT EXISTS crop text,
  ADD COLUMN IF NOT EXISTS variety text,
  ADD COLUMN IF NOT EXISTS unit text DEFAULT 'kg',
  ADD COLUMN IF NOT EXISTS grade text,
  ADD COLUMN IF NOT EXISTS operator text,
  ADD COLUMN IF NOT EXISTS is_demo boolean NOT NULL DEFAULT false;
ALTER TABLE public.harvest_records ALTER COLUMN batch_id DROP NOT NULL;

ALTER TABLE public.batches
  ADD COLUMN IF NOT EXISTS harvest_id uuid REFERENCES public.harvest_records(id),
  ADD COLUMN IF NOT EXISTS trace_stage public.trace_stage,
  ADD COLUMN IF NOT EXISTS current_status text DEFAULT 'ACTIVE',
  ADD COLUMN IF NOT EXISTS is_demo boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS created_by uuid;

CREATE SEQUENCE IF NOT EXISTS public.batch_code_seq;

CREATE TABLE public.traceability_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id uuid NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  stage public.trace_stage NOT NULL,
  action text NOT NULL,
  actor_id uuid,
  actor_name text,
  actor_role text,
  organization_id uuid,
  event_time timestamptz NOT NULL DEFAULT now(),
  location text,
  previous_quantity numeric,
  quantity numeric,
  loss_quantity numeric,
  loss_reason text,
  unit text NOT NULL DEFAULT 'kg',
  status text,
  remarks text,
  evidence_url text,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.traceability_events TO authenticated;
GRANT ALL ON public.traceability_events TO service_role;
ALTER TABLE public.traceability_events ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.quality_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id uuid NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  event_id uuid REFERENCES public.traceability_events(id),
  inspection_date timestamptz NOT NULL DEFAULT now(),
  inspector text,
  grade text,
  appearance text,
  size text,
  weight numeric,
  moisture numeric,
  defects text,
  temperature numeric,
  quality_status text NOT NULL CHECK (quality_status IN ('PASS','CONDITIONAL','FAIL')),
  remarks text,
  evidence_url text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.quality_records TO authenticated;
GRANT ALL ON public.quality_records TO service_role;
ALTER TABLE public.quality_records ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  user_name text,
  action text NOT NULL,
  batch_id uuid REFERENCES public.batches(id) ON DELETE SET NULL,
  batch_code text,
  previous_state jsonb,
  new_state jsonb,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_internal_user(_uid uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _uid AND role <> 'consumer')
$$;

CREATE OR REPLACE FUNCTION public.is_trace_admin(_uid uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _uid AND role IN ('admin','super_admin'))
$$;

CREATE OR REPLACE FUNCTION public.can_update_stage(_uid uuid, _stage public.trace_stage) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.is_trace_admin(_uid) OR EXISTS (
    SELECT 1 FROM public.user_roles r WHERE r.user_id = _uid AND (
      (_stage IN ('FARM','HARVEST','COLLECTION') AND r.role IN ('farmer','farm_admin'))
      OR (_stage = 'POST_HARVEST' AND r.role IN ('packhouse_manager','packhouse_operator','farm_admin'))
      OR (_stage = 'QUALITY_CHECK' AND r.role IN ('quality_manager','packhouse_manager'))
      OR (_stage IN ('RIPENING','STORAGE') AND r.role IN ('ripening_manager','storage_operator','warehouse_admin'))
      OR (_stage IN ('TRANSPORT','DISTRIBUTION') AND r.role IN ('logistics_manager'))
      OR (_stage = 'WAREHOUSE' AND r.role IN ('warehouse_admin','warehouse_operator'))
      OR (_stage IN ('RETAIL','CONSUMER') AND r.role IN ('retail_manager','retailer'))
    ))
$$;

CREATE POLICY "Internal users view events" ON public.traceability_events FOR SELECT TO authenticated USING (public.is_internal_user(auth.uid()));
CREATE POLICY "Internal users view quality" ON public.quality_records FOR SELECT TO authenticated USING (public.is_internal_user(auth.uid()));
CREATE POLICY "Admins and auditors view audit" ON public.audit_logs FOR SELECT TO authenticated USING (public.is_internal_user(auth.uid()));
CREATE POLICY "Internal users view batches" ON public.batches FOR SELECT TO authenticated USING (public.is_internal_user(auth.uid()));
CREATE POLICY "Internal users view farms" ON public.farms FOR SELECT TO authenticated USING (public.is_internal_user(auth.uid()));
CREATE POLICY "Internal users view harvests" ON public.harvest_records FOR SELECT TO authenticated USING (public.is_internal_user(auth.uid()));

CREATE OR REPLACE FUNCTION public.actor_name(_uid uuid) RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE((SELECT full_name FROM public.profiles WHERE user_id = _uid), 'User')
$$;

CREATE OR REPLACE FUNCTION public.trace_create_farm(p jsonb) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid := auth.uid(); fid uuid;
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'UNAUTHORIZED'; END IF;
  IF NOT public.can_update_stage(uid, 'FARM') THEN RAISE EXCEPTION 'UNAUTHORIZED'; END IF;
  IF COALESCE(trim(p->>'farm_name'),'') = '' THEN RAISE EXCEPTION 'MISSING_FARM_NAME'; END IF;
  IF COALESCE(trim(p->>'location'),'') = '' THEN RAISE EXCEPTION 'MISSING_LOCATION'; END IF;
  INSERT INTO public.farms (user_id, farm_name, farmer_name, location, district, state, geo_lat, geo_lng, contact, crop_types, cultivation_method, certification_status, status, is_demo)
  VALUES (uid, left(trim(p->>'farm_name'),120), left(p->>'farmer_name',120), left(trim(p->>'location'),200), p->>'district', p->>'state',
    NULLIF(p->>'latitude','')::numeric, NULLIF(p->>'longitude','')::numeric, left(p->>'contact',60),
    CASE WHEN COALESCE(p->>'crop','')<>'' THEN ARRAY[p->>'crop'] END, p->>'cultivation_method', p->>'certification_status', 'active', COALESCE((p->>'is_demo')::boolean,false))
  RETURNING id INTO fid;
  INSERT INTO public.audit_logs(user_id,user_name,action,new_state,metadata) VALUES (uid, public.actor_name(uid), 'FARM_CREATED', jsonb_build_object('farm_id',fid,'farm_name',p->>'farm_name'), '{}'::jsonb);
  RETURN fid;
END $$;

CREATE OR REPLACE FUNCTION public.trace_create_harvest(p jsonb) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid := auth.uid(); hid uuid; q numeric;
BEGIN
  IF uid IS NULL OR NOT public.can_update_stage(uid, 'HARVEST') THEN RAISE EXCEPTION 'UNAUTHORIZED'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.farms WHERE id = (p->>'farm_id')::uuid) THEN RAISE EXCEPTION 'MISSING_FARM'; END IF;
  IF COALESCE(trim(p->>'crop'),'') = '' THEN RAISE EXCEPTION 'MISSING_CROP'; END IF;
  q := NULLIF(p->>'quantity','')::numeric;
  IF q IS NULL OR q <= 0 THEN RAISE EXCEPTION 'INVALID_QUANTITY'; END IF;
  INSERT INTO public.harvest_records (farm_id, farmer_user_id, harvest_date, crop, variety, quantity_kg, unit, grade, operator, notes, is_demo)
  VALUES ((p->>'farm_id')::uuid, uid, COALESCE(NULLIF(p->>'harvest_date','')::date, current_date), p->>'crop', p->>'variety', q, COALESCE(p->>'unit','kg'), p->>'grade', p->>'operator', p->>'remarks', COALESCE((p->>'is_demo')::boolean,false))
  RETURNING id INTO hid;
  INSERT INTO public.audit_logs(user_id,user_name,action,new_state) VALUES (uid, public.actor_name(uid), 'HARVEST_CREATED', jsonb_build_object('harvest_id',hid,'quantity',q));
  RETURN hid;
END $$;

CREATE OR REPLACE FUNCTION public.trace_create_batch(p jsonb) RETURNS text
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid := auth.uid(); h public.harvest_records; f public.farms; q numeric; code text; bid uuid; crop text;
BEGIN
  IF uid IS NULL OR NOT public.can_update_stage(uid, 'HARVEST') THEN RAISE EXCEPTION 'UNAUTHORIZED'; END IF;
  SELECT * INTO f FROM public.farms WHERE id = NULLIF(p->>'farm_id','')::uuid;
  IF f.id IS NULL THEN RAISE EXCEPTION 'MISSING_FARM'; END IF;
  SELECT * INTO h FROM public.harvest_records WHERE id = NULLIF(p->>'harvest_id','')::uuid AND farm_id = f.id;
  IF h.id IS NULL THEN RAISE EXCEPTION 'MISSING_HARVEST'; END IF;
  crop := COALESCE(NULLIF(trim(p->>'crop'),''), h.crop);
  IF crop IS NULL THEN RAISE EXCEPTION 'MISSING_CROP'; END IF;
  q := NULLIF(p->>'quantity','')::numeric;
  IF q IS NULL OR q <= 0 THEN RAISE EXCEPTION 'INVALID_QUANTITY'; END IF;
  IF q > h.quantity_kg THEN RAISE EXCEPTION 'QUANTITY_EXCEEDS_HARVEST'; END IF;
  code := NULLIF(trim(p->>'batch_code'),'');
  IF code IS NULL THEN
    code := 'SILIR3-' || upper(left(regexp_replace(crop,'[^A-Za-z]','','g'),3)) || '-' || to_char(now(),'YYYYMMDD') || '-' || lpad(nextval('public.batch_code_seq')::text,5,'0');
  END IF;
  IF EXISTS (SELECT 1 FROM public.batches WHERE batch_id = code) THEN RAISE EXCEPTION 'DUPLICATE_BATCH'; END IF;
  INSERT INTO public.batches (batch_id, farm_id, harvest_id, product_type, variety, current_stage, trace_stage, current_status, total_quantity_kg, current_quantity_kg, quality_grade, is_active, is_demo, created_by)
  VALUES (code, f.id, h.id, crop, COALESCE(NULLIF(p->>'variety',''), h.variety, 'Unspecified'), 'harvest', 'HARVEST', 'ACTIVE', q, q, h.grade, true, f.is_demo OR COALESCE((p->>'is_demo')::boolean,false), uid)
  RETURNING id INTO bid;
  INSERT INTO public.traceability_events (batch_id, stage, action, actor_id, actor_name, event_time, location, quantity, status, remarks, details)
  VALUES (bid, 'FARM', 'Origin recorded', uid, public.actor_name(uid), h.created_at, f.location, NULL, 'COMPLETED', NULL, jsonb_build_object('farm_name', f.farm_name)),
         (bid, 'HARVEST', 'Batch created from harvest', uid, public.actor_name(uid), now(), f.location, q, 'COMPLETED', h.notes, jsonb_build_object('harvest_date', h.harvest_date, 'grade', h.grade));
  INSERT INTO public.audit_logs(user_id,user_name,action,batch_id,batch_code,new_state) VALUES (uid, public.actor_name(uid), 'BATCH_CREATED', bid, code, jsonb_build_object('stage','HARVEST','quantity',q));
  RETURN code;
END $$;

CREATE OR REPLACE FUNCTION public.trace_record_event(p_batch_code text, p_stage public.trace_stage, p jsonb) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid := auth.uid(); b public.batches; q numeric; eid uuid; st text; loss numeric;
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'UNAUTHORIZED'; END IF;
  SELECT * INTO b FROM public.batches WHERE batch_id = p_batch_code FOR UPDATE;
  IF b.id IS NULL THEN RAISE EXCEPTION 'BATCH_NOT_FOUND'; END IF;
  IF NOT public.can_update_stage(uid, p_stage) THEN RAISE EXCEPTION 'UNAUTHORIZED'; END IF;
  IF p_stage IN ('FARM','HARVEST') THEN RAISE EXCEPTION 'INVALID_STAGE'; END IF;
  q := COALESCE(NULLIF(p->>'quantity','')::numeric, b.current_quantity_kg);
  IF p_stage = 'WAREHOUSE' AND NULLIF(p->>'accepted_quantity','') IS NOT NULL THEN q := (p->>'accepted_quantity')::numeric; END IF;
  IF q IS NULL OR q <= 0 THEN RAISE EXCEPTION 'INVALID_QUANTITY'; END IF;
  IF q > b.current_quantity_kg THEN RAISE EXCEPTION 'QUANTITY_EXCEEDS_CURRENT'; END IF;
  loss := b.current_quantity_kg - q;
  IF loss > 0 AND COALESCE(trim(p->>'loss_reason'),'') = '' AND p_stage <> 'WAREHOUSE' THEN RAISE EXCEPTION 'LOSS_REASON_REQUIRED'; END IF;
  st := upper(COALESCE(NULLIF(p->>'status',''), CASE WHEN p_stage='QUALITY_CHECK' THEN p->>'quality_status' ELSE 'COMPLETED' END));
  IF p_stage = 'QUALITY_CHECK' AND COALESCE(p->>'quality_status','') NOT IN ('PASS','CONDITIONAL','FAIL') THEN RAISE EXCEPTION 'INVALID_QUALITY_STATUS'; END IF;
  INSERT INTO public.traceability_events (batch_id, stage, action, actor_id, actor_name, actor_role, event_time, location, previous_quantity, quantity, loss_quantity, loss_reason, status, remarks, evidence_url, details)
  VALUES (b.id, p_stage, COALESCE(NULLIF(p->>'action',''), 'Stage updated'), uid, public.actor_name(uid),
    (SELECT string_agg(role::text, ',') FROM public.user_roles WHERE user_id = uid),
    COALESCE(NULLIF(p->>'event_time','')::timestamptz, now()), left(p->>'location',200), b.current_quantity_kg, q, NULLIF(loss,0),
    COALESCE(NULLIF(p->>'loss_reason',''), CASE WHEN p_stage='WAREHOUSE' AND loss>0 THEN 'Rejected at warehouse' END),
    st, left(p->>'remarks',1000), NULLIF(p->>'evidence_url',''), COALESCE(p->'details','{}'::jsonb))
  RETURNING id INTO eid;
  IF p_stage = 'QUALITY_CHECK' THEN
    INSERT INTO public.quality_records (batch_id, event_id, inspection_date, inspector, grade, appearance, size, weight, moisture, defects, temperature, quality_status, remarks, evidence_url, created_by)
    VALUES (b.id, eid, COALESCE(NULLIF(p->>'event_time','')::timestamptz, now()), p->'details'->>'inspector', p->'details'->>'grade', p->'details'->>'appearance', p->'details'->>'size',
      NULLIF(p->'details'->>'weight','')::numeric, NULLIF(p->'details'->>'moisture','')::numeric, p->'details'->>'defects', NULLIF(p->'details'->>'temperature','')::numeric,
      p->>'quality_status', p->>'remarks', NULLIF(p->>'evidence_url',''), uid);
  END IF;
  UPDATE public.batches SET trace_stage = p_stage, current_quantity_kg = q,
    current_status = CASE WHEN p_stage='QUALITY_CHECK' AND p->>'quality_status'='FAIL' THEN 'QUALITY_FAILED' WHEN p_stage IN ('RETAIL','CONSUMER') THEN 'AT_RETAIL' ELSE st END,
    quality_grade = CASE WHEN p_stage='QUALITY_CHECK' THEN COALESCE(p->'details'->>'grade', quality_grade) ELSE quality_grade END
  WHERE id = b.id;
  INSERT INTO public.audit_logs(user_id,user_name,action,batch_id,batch_code,previous_state,new_state,metadata)
  VALUES (uid, public.actor_name(uid), 'BATCH_STAGE_UPDATED', b.id, b.batch_id,
    jsonb_build_object('stage', b.trace_stage, 'status', b.current_status, 'quantity', b.current_quantity_kg),
    jsonb_build_object('stage', p_stage, 'status', st, 'quantity', q), jsonb_build_object('event_id', eid));
  RETURN eid;
END $$;

CREATE OR REPLACE FUNCTION public.get_public_trace(p_code text) RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE b public.batches; r jsonb;
BEGIN
  IF p_code IS NULL OR length(p_code) > 60 OR p_code !~ '^[A-Za-z0-9-]+$' THEN RETURN NULL; END IF;
  SELECT * INTO b FROM public.batches WHERE batch_id = upper(p_code);
  IF b.id IS NULL THEN RETURN NULL; END IF;
  SELECT jsonb_build_object(
    'batch_code', b.batch_id, 'crop', b.product_type, 'variety', b.variety, 'stage', b.trace_stage, 'status', b.current_status,
    'quantity_kg', b.current_quantity_kg, 'initial_quantity_kg', b.total_quantity_kg, 'grade', b.quality_grade, 'is_demo', b.is_demo, 'created_at', b.created_at,
    'farm', (SELECT jsonb_build_object('name', f.farm_name, 'location', f.location, 'district', f.district, 'state', f.state, 'cultivation_method', f.cultivation_method, 'certification_status', f.certification_status) FROM public.farms f WHERE f.id = b.farm_id),
    'harvest_date', (SELECT h.harvest_date FROM public.harvest_records h WHERE h.id = b.harvest_id),
    'events', COALESCE((SELECT jsonb_agg(jsonb_build_object('stage', e.stage, 'action', e.action, 'time', e.event_time, 'location', e.location, 'quantity', e.quantity, 'status', e.status) ORDER BY e.event_time, e.created_at) FROM public.traceability_events e WHERE e.batch_id = b.id), '[]'::jsonb),
    'quality', COALESCE((SELECT jsonb_agg(jsonb_build_object('date', q.inspection_date, 'grade', q.grade, 'status', q.quality_status) ORDER BY q.inspection_date) FROM public.quality_records q WHERE q.batch_id = b.id), '[]'::jsonb)
  ) INTO r;
  RETURN r;
END $$;

REVOKE ALL ON FUNCTION public.trace_create_farm(jsonb), public.trace_create_harvest(jsonb), public.trace_create_batch(jsonb), public.trace_record_event(text, public.trace_stage, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.trace_create_farm(jsonb), public.trace_create_harvest(jsonb), public.trace_create_batch(jsonb), public.trace_record_event(text, public.trace_stage, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_trace(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.can_update_stage(uuid, public.trace_stage) TO authenticated;