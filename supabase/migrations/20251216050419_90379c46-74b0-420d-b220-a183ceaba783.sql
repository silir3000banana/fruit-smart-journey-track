-- Silir3000 End-to-End Traceability Database Schema

-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM (
  'farmer',
  'packhouse_manager',
  'ripening_manager',
  'logistics_manager',
  'warehouse_admin',
  'retail_manager',
  'quality_manager',
  'admin',
  'consumer'
);

-- Create batch_stage enum for tracking stages
CREATE TYPE public.batch_stage AS ENUM (
  'harvest',
  'post_harvest',
  'ripening',
  'transport',
  'warehouse',
  'retail'
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  company_name TEXT,
  location TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create farms table
CREATE TABLE public.farms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  farm_name TEXT NOT NULL,
  location TEXT NOT NULL,
  geo_lat DECIMAL(10, 8),
  geo_lng DECIMAL(11, 8),
  acreage DECIMAL(10, 2),
  crop_types TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create batches table - THE CENTRAL TRACEABILITY ENTITY
CREATE TABLE public.batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id TEXT NOT NULL UNIQUE,
  farm_id UUID REFERENCES public.farms(id),
  product_type TEXT NOT NULL DEFAULT 'Banana',
  variety TEXT NOT NULL,
  current_stage batch_stage NOT NULL DEFAULT 'harvest',
  total_quantity_kg DECIMAL(10, 2) NOT NULL,
  current_quantity_kg DECIMAL(10, 2) NOT NULL,
  quality_grade TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create batch_stage_logs - Records each stage transition
CREATE TABLE public.batch_stage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  stage batch_stage NOT NULL,
  responsible_user_id UUID REFERENCES auth.users(id),
  responsible_role app_role,
  location TEXT,
  geo_lat DECIMAL(10, 8),
  geo_lng DECIMAL(11, 8),
  temperature_celsius DECIMAL(5, 2),
  humidity_percent DECIMAL(5, 2),
  quality_score INTEGER,
  quality_grade TEXT,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create harvest_records table
CREATE TABLE public.harvest_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  farm_id UUID NOT NULL REFERENCES public.farms(id),
  farmer_user_id UUID NOT NULL REFERENCES auth.users(id),
  harvest_date DATE NOT NULL,
  field_id TEXT,
  quantity_kg DECIMAL(10, 2) NOT NULL,
  initial_quality_score INTEGER,
  moisture_content DECIMAL(5, 2),
  temperature_celsius DECIMAL(5, 2),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create post_harvest_records table
CREATE TABLE public.post_harvest_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  processed_by_user_id UUID REFERENCES auth.users(id),
  processed_date DATE NOT NULL,
  sorted_quantity_kg DECIMAL(10, 2),
  grade_a_kg DECIMAL(10, 2),
  grade_b_kg DECIMAL(10, 2),
  grade_c_kg DECIMAL(10, 2),
  rejected_kg DECIMAL(10, 2),
  packing_details TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create ripening_records table
CREATE TABLE public.ripening_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  chamber_id TEXT,
  manager_user_id UUID REFERENCES auth.users(id),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  ripening_method TEXT DEFAULT 'Controlled Ethylene',
  ethylene_ppm DECIMAL(6, 2),
  temperature_celsius DECIMAL(5, 2),
  humidity_percent DECIMAL(5, 2),
  current_stage TEXT DEFAULT 'Unripe',
  days_in_chamber INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create transport_records table
CREATE TABLE public.transport_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  vehicle_id TEXT,
  driver_name TEXT,
  logistics_user_id UUID REFERENCES auth.users(id),
  origin_location TEXT NOT NULL,
  destination_location TEXT NOT NULL,
  departure_time TIMESTAMPTZ,
  arrival_time TIMESTAMPTZ,
  estimated_arrival TIMESTAMPTZ,
  avg_temperature_celsius DECIMAL(5, 2),
  temperature_breaches INTEGER DEFAULT 0,
  route_distance_km DECIMAL(10, 2),
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create warehouse_records table
CREATE TABLE public.warehouse_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  warehouse_name TEXT NOT NULL,
  warehouse_location TEXT,
  admin_user_id UUID REFERENCES auth.users(id),
  inbound_date TIMESTAMPTZ NOT NULL,
  outbound_date TIMESTAMPTZ,
  storage_zone TEXT,
  fifo_position INTEGER,
  temperature_celsius DECIMAL(5, 2),
  humidity_percent DECIMAL(5, 2),
  quantity_kg DECIMAL(10, 2),
  status TEXT DEFAULT 'stored',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create retail_records table
CREATE TABLE public.retail_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  store_name TEXT NOT NULL,
  store_location TEXT,
  retail_user_id UUID REFERENCES auth.users(id),
  received_date TIMESTAMPTZ NOT NULL,
  shelf_date TIMESTAMPTZ,
  shelf_life_days INTEGER DEFAULT 7,
  remaining_shelf_life_days INTEGER,
  freshness_status TEXT DEFAULT 'Excellent',
  quantity_kg DECIMAL(10, 2),
  sold_kg DECIMAL(10, 2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'warning',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  is_resolved BOOLEAN DEFAULT false,
  target_user_id UUID REFERENCES auth.users(id),
  target_role app_role,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batch_stage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.harvest_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_harvest_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ripening_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.warehouse_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.retail_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Create has_role function for RLS
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create handle_new_user function
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

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_farms_updated_at
  BEFORE UPDATE ON public.farms
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_batches_updated_at
  BEFORE UPDATE ON public.batches
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ripening_records_updated_at
  BEFORE UPDATE ON public.ripening_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_transport_records_updated_at
  BEFORE UPDATE ON public.transport_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_warehouse_records_updated_at
  BEFORE UPDATE ON public.warehouse_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_retail_records_updated_at
  BEFORE UPDATE ON public.retail_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage user roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for farms
CREATE POLICY "Farmers can view their own farms"
  ON public.farms FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Farmers can manage their own farms"
  ON public.farms FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all farms"
  ON public.farms FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for batches (everyone authenticated can view for traceability)
CREATE POLICY "Authenticated users can view batches"
  ON public.batches FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Farmers and admins can create batches"
  ON public.batches FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'farmer') OR 
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Authorized roles can update batches"
  ON public.batches FOR UPDATE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'farmer') OR
    public.has_role(auth.uid(), 'packhouse_manager') OR
    public.has_role(auth.uid(), 'ripening_manager') OR
    public.has_role(auth.uid(), 'logistics_manager') OR
    public.has_role(auth.uid(), 'warehouse_admin') OR
    public.has_role(auth.uid(), 'retail_manager') OR
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for batch_stage_logs (public read for traceability)
CREATE POLICY "Anyone can view batch stage logs"
  ON public.batch_stage_logs FOR SELECT
  USING (true);

CREATE POLICY "Authorized roles can create stage logs"
  ON public.batch_stage_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = responsible_user_id);

-- RLS Policies for harvest_records
CREATE POLICY "Anyone can view harvest records"
  ON public.harvest_records FOR SELECT
  USING (true);

CREATE POLICY "Farmers can create harvest records"
  ON public.harvest_records FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = farmer_user_id);

-- RLS Policies for post_harvest_records
CREATE POLICY "Anyone can view post harvest records"
  ON public.post_harvest_records FOR SELECT
  USING (true);

CREATE POLICY "Packhouse managers can create post harvest records"
  ON public.post_harvest_records FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'packhouse_manager') OR
    public.has_role(auth.uid(), 'quality_manager') OR
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for ripening_records
CREATE POLICY "Anyone can view ripening records"
  ON public.ripening_records FOR SELECT
  USING (true);

CREATE POLICY "Ripening managers can manage ripening records"
  ON public.ripening_records FOR ALL
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'ripening_manager') OR
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for transport_records
CREATE POLICY "Anyone can view transport records"
  ON public.transport_records FOR SELECT
  USING (true);

CREATE POLICY "Logistics managers can manage transport records"
  ON public.transport_records FOR ALL
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'logistics_manager') OR
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for warehouse_records
CREATE POLICY "Anyone can view warehouse records"
  ON public.warehouse_records FOR SELECT
  USING (true);

CREATE POLICY "Warehouse admins can manage warehouse records"
  ON public.warehouse_records FOR ALL
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'warehouse_admin') OR
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for retail_records
CREATE POLICY "Anyone can view retail records"
  ON public.retail_records FOR SELECT
  USING (true);

CREATE POLICY "Retail managers can manage retail records"
  ON public.retail_records FOR ALL
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'retail_manager') OR
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for alerts
CREATE POLICY "Users can view their own alerts"
  ON public.alerts FOR SELECT
  TO authenticated
  USING (
    target_user_id = auth.uid() OR
    public.has_role(auth.uid(), target_role) OR
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "System can create alerts"
  ON public.alerts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own alerts"
  ON public.alerts FOR UPDATE
  TO authenticated
  USING (
    target_user_id = auth.uid() OR
    public.has_role(auth.uid(), 'admin')
  );