
-- =============================================
-- FIX 1: profiles table - fix policy types
-- All policies are currently RESTRICTIVE, causing default deny for everyone.
-- Make user-specific policies PERMISSIVE and drop redundant "Deny anonymous" policy.
-- =============================================

-- Drop all existing SELECT policies on profiles
DROP POLICY IF EXISTS "Deny anonymous access to profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Drop existing INSERT and UPDATE policies (they're also RESTRICTIVE)
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Recreate as PERMISSIVE policies (default type)
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- =============================================
-- FIX 2: batch_stage_logs - restrict public SELECT
-- Replace USING(true) with authenticated role-based access
-- =============================================

DROP POLICY IF EXISTS "Anyone can view batch stage logs" ON public.batch_stage_logs;

CREATE POLICY "Authenticated users can view batch stage logs"
  ON public.batch_stage_logs FOR SELECT
  TO authenticated
  USING (
    auth.uid() = responsible_user_id
    OR has_role(auth.uid(), 'farmer'::app_role)
    OR has_role(auth.uid(), 'packhouse_manager'::app_role)
    OR has_role(auth.uid(), 'ripening_manager'::app_role)
    OR has_role(auth.uid(), 'logistics_manager'::app_role)
    OR has_role(auth.uid(), 'warehouse_admin'::app_role)
    OR has_role(auth.uid(), 'retail_manager'::app_role)
    OR has_role(auth.uid(), 'quality_manager'::app_role)
    OR has_role(auth.uid(), 'admin'::app_role)
  );
