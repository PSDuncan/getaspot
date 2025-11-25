-- Create agency_agents junction table
CREATE TABLE IF NOT EXISTS public.agency_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'agent' CHECK (role IN ('agent', 'manager')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  joined_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(agency_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.agency_agents ENABLE ROW LEVEL SECURITY;

-- Agency owners can manage their agents
CREATE POLICY "Agency owners can manage agents" 
  ON public.agency_agents FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.agencies 
      WHERE id = agency_id AND owner_id = auth.uid()
    )
  );

-- Agents can view their own agency relationships
CREATE POLICY "Agents can view own relationships" 
  ON public.agency_agents FOR SELECT 
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_agency_agents_agency_id ON public.agency_agents(agency_id);
CREATE INDEX IF NOT EXISTS idx_agency_agents_user_id ON public.agency_agents(user_id);
