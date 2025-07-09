-- Create test users in the profiles table for immediate UAT testing
-- These will work with existing auth users or be created when they sign up

-- Insert test users into profiles (will be created automatically when they sign up via the trigger)
-- But let's ensure they exist with proper data for testing

-- Note: We can't directly insert into auth.users, but we can ensure profiles exist
-- The handle_new_user() function will create these when users sign up

-- For immediate testing, let's create a test data setup function
CREATE OR REPLACE FUNCTION public.ensure_test_profiles()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert test profiles if they don't exist (for manual testing)
  INSERT INTO public.profiles (user_id, email, full_name, role, company_name, location, phone)
  VALUES 
    -- Generate placeholder UUIDs for testing (will be replaced by real auth.users when they sign up)
    ('00000000-0000-0000-0000-000000000001', 'admin@fruittrack.com', 'Admin User', 'admin', 'FruitTrack Admin', 'Maharashtra, India', '+91-9876543220'),
    ('00000000-0000-0000-0000-000000000002', 'supervisor@fruittrack.com', 'Supervisor User', 'supervisor', 'FruitTrack Supervisor', 'Punjab, India', '+91-9876543221'),
    ('00000000-0000-0000-0000-000000000003', 'farmer@fruittrack.com', 'Farmer User', 'farmer', 'FruitTrack Farm', 'Gujarat, India', '+91-9876543222'),
    ('00000000-0000-0000-0000-000000000004', 'consumer@fruittrack.com', 'Consumer User', 'farmer', 'FruitTrack Consumer', 'Delhi, India', '+91-9876543223')
  ON CONFLICT (user_id) DO NOTHING;
END;
$$;

-- Run the function to ensure test profiles exist
SELECT public.ensure_test_profiles();