
-- 1. Fix alerts: restrict INSERT to admins only
DROP POLICY IF EXISTS "System can create alerts" ON public.alerts;

CREATE POLICY "Admins can create alerts"
  ON public.alerts FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 2. Fix batches: restrict SELECT to involved users
DROP POLICY IF EXISTS "Authenticated users can view batches" ON public.batches;

CREATE POLICY "Users can view relevant batches"
  ON public.batches FOR SELECT
  TO authenticated
  USING (
    -- Farm owner
    EXISTS (SELECT 1 FROM public.farms WHERE farms.id = batches.farm_id AND farms.user_id = auth.uid())
    OR
    -- Handled the batch in any stage
    EXISTS (SELECT 1 FROM public.batch_stage_logs WHERE batch_stage_logs.batch_id = batches.id AND batch_stage_logs.responsible_user_id = auth.uid())
    OR
    -- Any supply chain role (needed for traceability)
    public.has_role(auth.uid(), 'packhouse_manager')
    OR public.has_role(auth.uid(), 'ripening_manager')
    OR public.has_role(auth.uid(), 'logistics_manager')
    OR public.has_role(auth.uid(), 'warehouse_admin')
    OR public.has_role(auth.uid(), 'retail_manager')
    OR public.has_role(auth.uid(), 'quality_manager')
    OR public.has_role(auth.uid(), 'admin')
  );

-- 3. Profiles already has RLS with user_id = auth.uid() policies, 
-- but add explicit authenticated-only guard
CREATE POLICY "Deny anonymous access to profiles"
  ON public.profiles FOR SELECT
  TO anon
  USING (false);

-- 4. Farms - add explicit anonymous denial
CREATE POLICY "Deny anonymous access to farms"
  ON public.farms FOR SELECT
  TO anon
  USING (false);
