-- Supabase schema initial migration based on docs/spec.md

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Profiles (user meta, separate from auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  name text,
  tax_mode text CHECK (tax_mode IN ('kleinunternehmer', 'regelbesteuerung')) DEFAULT 'regelbesteuerung',
  income_tax_rate numeric DEFAULT 0.25,
  created_at timestamptz DEFAULT now()
);

-- Incomes
CREATE TABLE IF NOT EXISTS public.incomes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  date date NOT NULL,
  description text,
  category text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS incomes_user_id_idx ON public.incomes(user_id);
CREATE INDEX IF NOT EXISTS incomes_date_idx ON public.incomes(date);

-- Settings
CREATE TABLE IF NOT EXISTS public.settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  notification_enabled boolean DEFAULT true,
  preferred_currency text DEFAULT 'EUR'
);

-- Exports / Backups
CREATE TABLE IF NOT EXISTS public.exports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  type text CHECK (type IN ('csv', 'pdf')),
  download_url text,
  created_at timestamptz DEFAULT now()
);

-- Helper function: calculate_tax_reserve(income, income_tax_rate, tax_mode)
CREATE OR REPLACE FUNCTION public.calculate_tax_reserve(income numeric, income_tax_rate numeric DEFAULT 0.25, tax_mode text DEFAULT 'regelbesteuerung')
RETURNS numeric LANGUAGE sql IMMUTABLE AS $$
  SELECT (
    (COALESCE(income, 0) * COALESCE(income_tax_rate, 0.25))
    + CASE WHEN COALESCE(tax_mode, 'regelbesteuerung') = 'regelbesteuerung' THEN COALESCE(income, 0) * 0.19 ELSE 0 END
  );
$$;

-- Example: grant select to anon/public if needed (commented)
-- GRANT SELECT ON public.profiles TO anon;