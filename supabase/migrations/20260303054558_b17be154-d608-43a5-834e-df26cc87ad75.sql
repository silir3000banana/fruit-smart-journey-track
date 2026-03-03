
-- =============================================
-- Fix 6 supply chain tables: replace public USING(true) SELECT
-- with authenticated role-based access
-- =============================================

-- 1. harvest_records
DROP POLICY IF EXISTS "Anyone can view harvest records" ON public.harvest_records;
CREATE POLICY "Authenticated users can view harvest records"
  ON public.harvest_records FOR SELECT
  TO authenticated
  USING (
    auth.uid() = farmer_user_id
    OR has_role(auth.uid(), 'packhouse_manager'::app_role)
    OR has_role(auth.uid(), 'quality_manager'::app_role)
    OR has_role(auth.uid(), 'logistics_manager'::app_role)
    OR has_role(auth.uid(), 'warehouse_admin'::app_role)
    OR has_role(auth.uid(), 'retail_manager'::app_role)
    OR has_role(auth.uid(), 'admin'::app_role)
  );

-- 2. post_harvest_records
DROP POLICY IF EXISTS "Anyone can view post harvest records" ON public.post_harvest_records;
CREATE POLICY "Authenticated users can view post harvest records"
  ON public.post_harvest_records FOR SELECT
  TO authenticated
  USING (
    auth.uid() = processed_by_user_id
    OR has_role(auth.uid(), 'farmer'::app_role)
    OR has_role(auth.uid(), 'packhouse_manager'::app_role)
    OR has_role(auth.uid(), 'quality_manager'::app_role)
    OR has_role(auth.uid(), 'logistics_manager'::app_role)
    OR has_role(auth.uid(), 'warehouse_admin'::app_role)
    OR has_role(auth.uid(), 'retail_manager'::app_role)
    OR has_role(auth.uid(), 'admin'::app_role)
  );

-- 3. ripening_records
DROP POLICY IF EXISTS "Anyone can view ripening records" ON public.ripening_records;
CREATE POLICY "Authenticated users can view ripening records"
  ON public.ripening_records FOR SELECT
  TO authenticated
  USING (
    auth.uid() = manager_user_id
    OR has_role(auth.uid(), 'farmer'::app_role)
    OR has_role(auth.uid(), 'packhouse_manager'::app_role)
    OR has_role(auth.uid(), 'ripening_manager'::app_role)
    OR has_role(auth.uid(), 'quality_manager'::app_role)
    OR has_role(auth.uid(), 'logistics_manager'::app_role)
    OR has_role(auth.uid(), 'warehouse_admin'::app_role)
    OR has_role(auth.uid(), 'retail_manager'::app_role)
    OR has_role(auth.uid(), 'admin'::app_role)
  );

-- 4. transport_records
DROP POLICY IF EXISTS "Anyone can view transport records" ON public.transport_records;
CREATE POLICY "Authenticated users can view transport records"
  ON public.transport_records FOR SELECT
  TO authenticated
  USING (
    auth.uid() = logistics_user_id
    OR has_role(auth.uid(), 'farmer'::app_role)
    OR has_role(auth.uid(), 'packhouse_manager'::app_role)
    OR has_role(auth.uid(), 'ripening_manager'::app_role)
    OR has_role(auth.uid(), 'quality_manager'::app_role)
    OR has_role(auth.uid(), 'logistics_manager'::app_role)
    OR has_role(auth.uid(), 'warehouse_admin'::app_role)
    OR has_role(auth.uid(), 'retail_manager'::app_role)
    OR has_role(auth.uid(), 'admin'::app_role)
  );

-- 5. warehouse_records
DROP POLICY IF EXISTS "Anyone can view warehouse records" ON public.warehouse_records;
CREATE POLICY "Authenticated users can view warehouse records"
  ON public.warehouse_records FOR SELECT
  TO authenticated
  USING (
    auth.uid() = admin_user_id
    OR has_role(auth.uid(), 'farmer'::app_role)
    OR has_role(auth.uid(), 'packhouse_manager'::app_role)
    OR has_role(auth.uid(), 'ripening_manager'::app_role)
    OR has_role(auth.uid(), 'quality_manager'::app_role)
    OR has_role(auth.uid(), 'logistics_manager'::app_role)
    OR has_role(auth.uid(), 'warehouse_admin'::app_role)
    OR has_role(auth.uid(), 'retail_manager'::app_role)
    OR has_role(auth.uid(), 'admin'::app_role)
  );

-- 6. retail_records
DROP POLICY IF EXISTS "Anyone can view retail records" ON public.retail_records;
CREATE POLICY "Authenticated users can view retail records"
  ON public.retail_records FOR SELECT
  TO authenticated
  USING (
    auth.uid() = retail_user_id
    OR has_role(auth.uid(), 'farmer'::app_role)
    OR has_role(auth.uid(), 'packhouse_manager'::app_role)
    OR has_role(auth.uid(), 'ripening_manager'::app_role)
    OR has_role(auth.uid(), 'quality_manager'::app_role)
    OR has_role(auth.uid(), 'logistics_manager'::app_role)
    OR has_role(auth.uid(), 'warehouse_admin'::app_role)
    OR has_role(auth.uid(), 'retail_manager'::app_role)
    OR has_role(auth.uid(), 'admin'::app_role)
  );
