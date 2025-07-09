-- Clean up the test function since we can't pre-create profiles without auth users
DROP FUNCTION IF EXISTS public.ensure_test_profiles();