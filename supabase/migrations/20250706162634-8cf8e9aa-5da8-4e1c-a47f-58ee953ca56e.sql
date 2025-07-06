-- Create test users with auth.users and corresponding profiles
-- This creates proper auth users that can actually sign in

-- First, let's clean up any existing test profiles that don't have corresponding auth users
DELETE FROM public.profiles 
WHERE email IN (
  'admin@smartharvest.in',
  'farmer@smartharvest.in', 
  'supervisor@smartharvest.in',
  'coldstorage@smartharvest.in',
  'ripening@smartharvest.in',
  'retailer@smartharvest.in'
) AND user_id NOT IN (SELECT id FROM auth.users);

-- Update the trigger function to properly handle user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert profile with role based on email domain for test users
  INSERT INTO public.profiles (user_id, email, full_name, role, company_name, location, phone)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    CASE 
      WHEN NEW.email = 'admin@smartharvest.in' THEN 'admin'
      WHEN NEW.email = 'farmer@smartharvest.in' THEN 'farmer'
      WHEN NEW.email = 'supervisor@smartharvest.in' THEN 'supervisor'
      WHEN NEW.email = 'coldstorage@smartharvest.in' THEN 'cold_storage_operator'
      WHEN NEW.email = 'ripening@smartharvest.in' THEN 'ripening_operator'
      WHEN NEW.email = 'retailer@smartharvest.in' THEN 'retailer'
      ELSE 'farmer'
    END,
    CASE 
      WHEN NEW.email = 'admin@smartharvest.in' THEN 'SmartHarvest Technologies'
      WHEN NEW.email = 'farmer@smartharvest.in' THEN 'Kumar Farms'
      WHEN NEW.email = 'supervisor@smartharvest.in' THEN 'Valley Fresh Co-op'
      WHEN NEW.email = 'coldstorage@smartharvest.in' THEN 'ColdChain Solutions'
      WHEN NEW.email = 'ripening@smartharvest.in' THEN 'Fresh Ripening Center'
      WHEN NEW.email = 'retailer@smartharvest.in' THEN 'Metro Fresh Supermarket'
      ELSE null
    END,
    CASE 
      WHEN NEW.email = 'admin@smartharvest.in' THEN 'Mumbai, India'
      WHEN NEW.email = 'farmer@smartharvest.in' THEN 'Punjab, India'
      WHEN NEW.email = 'supervisor@smartharvest.in' THEN 'Haryana, India'
      WHEN NEW.email = 'coldstorage@smartharvest.in' THEN 'Delhi, India'
      WHEN NEW.email = 'ripening@smartharvest.in' THEN 'Gujarat, India'
      WHEN NEW.email = 'retailer@smartharvest.in' THEN 'Bangalore, India'
      ELSE null
    END,
    CASE 
      WHEN NEW.email = 'admin@smartharvest.in' THEN '+91-9876543210'
      WHEN NEW.email = 'farmer@smartharvest.in' THEN '+91-9876543211'
      WHEN NEW.email = 'supervisor@smartharvest.in' THEN '+91-9876543212'
      WHEN NEW.email = 'coldstorage@smartharvest.in' THEN '+91-9876543213'
      WHEN NEW.email = 'ripening@smartharvest.in' THEN '+91-9876543214'
      WHEN NEW.email = 'retailer@smartharvest.in' THEN '+91-9876543215'
      ELSE null
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: The actual auth.users entries need to be created through the signup process
-- Users should sign up at /auth with the test emails and password "Test@123" 
-- The trigger will automatically assign the correct roles based on email