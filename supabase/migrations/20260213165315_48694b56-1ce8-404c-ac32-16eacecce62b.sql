
-- 1. Fix handle_new_user: remove test logic, ensure proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$$;

-- 2. Fix alerts: the overly permissive INSERT was already replaced with admin-only,
-- but the supabase scanner flagged it as warn. Let's verify the old policy is gone
-- and the new one is in place (idempotent).
DROP POLICY IF EXISTS "System can create alerts" ON public.alerts;
