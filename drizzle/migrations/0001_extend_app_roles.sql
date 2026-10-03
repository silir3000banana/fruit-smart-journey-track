ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'super_admin';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'farm_admin';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'packhouse_operator';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'storage_operator';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'warehouse_operator';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'retailer';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'auditor';