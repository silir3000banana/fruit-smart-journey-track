-- Insert test users with profiles for all roles
-- Note: In production, users would sign up normally through the UI

-- Insert profiles for test users (assuming auth.users will be created through signup)
-- These will be referenced when users sign up with these specific emails

INSERT INTO public.profiles (user_id, email, full_name, role, company_name, location, phone) VALUES
-- Note: user_id will be generated when actual auth users are created
-- For now, we'll create placeholder profiles that will be updated by the trigger

-- Admin user
(gen_random_uuid(), 'admin@smartharvest.in', 'Admin User', 'admin', 'SmartHarvest Technologies', 'Mumbai, India', '+91-9876543210'),

-- Farmer user  
(gen_random_uuid(), 'farmer@smartharvest.in', 'Rajesh Kumar', 'farmer', 'Kumar Farms', 'Punjab, India', '+91-9876543211'),

-- Supervisor user
(gen_random_uuid(), 'supervisor@smartharvest.in', 'Priya Sharma', 'supervisor', 'Valley Fresh Co-op', 'Haryana, India', '+91-9876543212'),

-- Cold Storage Operator
(gen_random_uuid(), 'coldstorage@smartharvest.in', 'Amit Singh', 'cold_storage_operator', 'ColdChain Solutions', 'Delhi, India', '+91-9876543213'),

-- Ripening Operator  
(gen_random_uuid(), 'ripening@smartharvest.in', 'Meera Patel', 'ripening_operator', 'Fresh Ripening Center', 'Gujarat, India', '+91-9876543214'),

-- Retailer
(gen_random_uuid(), 'retailer@smartharvest.in', 'Suresh Reddy', 'retailer', 'Metro Fresh Supermarket', 'Bangalore, India', '+91-9876543215');