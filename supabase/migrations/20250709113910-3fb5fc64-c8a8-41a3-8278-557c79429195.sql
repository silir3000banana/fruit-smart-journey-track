-- Create test users for UAT validation
-- Update the handle_new_user function to include the new test credentials

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  -- Insert profile with role based on email domain for test users
  INSERT INTO public.profiles (user_id, email, full_name, role, company_name, location, phone)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    CASE 
      -- Original test users
      WHEN NEW.email = 'admin@smartharvest.in' THEN 'admin'
      WHEN NEW.email = 'farmer@smartharvest.in' THEN 'farmer'
      WHEN NEW.email = 'supervisor@smartharvest.in' THEN 'supervisor'
      WHEN NEW.email = 'coldstorage@smartharvest.in' THEN 'cold_storage_operator'
      WHEN NEW.email = 'ripening@smartharvest.in' THEN 'ripening_operator'
      WHEN NEW.email = 'retailer@smartharvest.in' THEN 'retailer'
      -- New UAT test users
      WHEN NEW.email = 'admin@fruittrack.com' THEN 'admin'
      WHEN NEW.email = 'supervisor@fruittrack.com' THEN 'supervisor'
      WHEN NEW.email = 'farmer@fruittrack.com' THEN 'farmer'
      WHEN NEW.email = 'consumer@fruittrack.com' THEN 'farmer'
      ELSE 'farmer'
    END,
    CASE 
      -- Original test users
      WHEN NEW.email = 'admin@smartharvest.in' THEN 'SmartHarvest Technologies'
      WHEN NEW.email = 'farmer@smartharvest.in' THEN 'Kumar Farms'
      WHEN NEW.email = 'supervisor@smartharvest.in' THEN 'Valley Fresh Co-op'
      WHEN NEW.email = 'coldstorage@smartharvest.in' THEN 'ColdChain Solutions'
      WHEN NEW.email = 'ripening@smartharvest.in' THEN 'Fresh Ripening Center'
      WHEN NEW.email = 'retailer@smartharvest.in' THEN 'Metro Fresh Supermarket'
      -- New UAT test users
      WHEN NEW.email = 'admin@fruittrack.com' THEN 'FruitTrack Admin'
      WHEN NEW.email = 'supervisor@fruittrack.com' THEN 'FruitTrack Supervisor'
      WHEN NEW.email = 'farmer@fruittrack.com' THEN 'FruitTrack Farm'
      WHEN NEW.email = 'consumer@fruittrack.com' THEN 'FruitTrack Consumer'
      ELSE null
    END,
    CASE 
      -- Original test users
      WHEN NEW.email = 'admin@smartharvest.in' THEN 'Mumbai, India'
      WHEN NEW.email = 'farmer@smartharvest.in' THEN 'Punjab, India'
      WHEN NEW.email = 'supervisor@smartharvest.in' THEN 'Haryana, India'
      WHEN NEW.email = 'coldstorage@smartharvest.in' THEN 'Delhi, India'
      WHEN NEW.email = 'ripening@smartharvest.in' THEN 'Gujarat, India'
      WHEN NEW.email = 'retailer@smartharvest.in' THEN 'Bangalore, India'
      -- New UAT test users
      WHEN NEW.email = 'admin@fruittrack.com' THEN 'Maharashtra, India'
      WHEN NEW.email = 'supervisor@fruittrack.com' THEN 'Punjab, India'
      WHEN NEW.email = 'farmer@fruittrack.com' THEN 'Gujarat, India'
      WHEN NEW.email = 'consumer@fruittrack.com' THEN 'Delhi, India'
      ELSE null
    END,
    CASE 
      -- Original test users
      WHEN NEW.email = 'admin@smartharvest.in' THEN '+91-9876543210'
      WHEN NEW.email = 'farmer@smartharvest.in' THEN '+91-9876543211'
      WHEN NEW.email = 'supervisor@smartharvest.in' THEN '+91-9876543212'
      WHEN NEW.email = 'coldstorage@smartharvest.in' THEN '+91-9876543213'
      WHEN NEW.email = 'ripening@smartharvest.in' THEN '+91-9876543214'
      WHEN NEW.email = 'retailer@smartharvest.in' THEN '+91-9876543215'
      -- New UAT test users
      WHEN NEW.email = 'admin@fruittrack.com' THEN '+91-9876543220'
      WHEN NEW.email = 'supervisor@fruittrack.com' THEN '+91-9876543221'
      WHEN NEW.email = 'farmer@fruittrack.com' THEN '+91-9876543222'
      WHEN NEW.email = 'consumer@fruittrack.com' THEN '+91-9876543223'
      ELSE null
    END
  );
  RETURN NEW;
END;
$function$;