-- Create agencies table
CREATE TABLE IF NOT EXISTS public.agencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  banner_url TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  province TEXT,
  postal_code TEXT,
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  subscription_plan TEXT DEFAULT 'basic' CHECK (subscription_plan IN ('basic', 'premium', 'enterprise')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('inactive', 'active', 'cancelled', 'past_due')),
  max_agents INTEGER DEFAULT 5,
  max_listings INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;

-- Agency owners can read their own agencies
CREATE POLICY "Agency owners can view own agency" 
  ON public.agencies FOR SELECT 
  USING (auth.uid() = owner_id);

-- Agency owners can update their own agencies
CREATE POLICY "Agency owners can update own agency" 
  ON public.agencies FOR UPDATE 
  USING (auth.uid() = owner_id);

-- Agents can view their agency
CREATE POLICY "Agents can view their agency" 
  ON public.agencies FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.agency_agents 
      WHERE agency_id = agencies.id AND user_id = auth.uid()
    )
  );

-- Anyone can view agencies (for public listings)
CREATE POLICY "Anyone can view agencies" 
  ON public.agencies FOR SELECT 
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_agencies_owner_id ON public.agencies(owner_id);
CREATE INDEX IF NOT EXISTS idx_agencies_city ON public.agencies(city);
