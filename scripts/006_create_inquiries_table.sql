-- Create inquiries table (messages from buyers to sellers)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  sender_phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Property owners can view inquiries for their properties
CREATE POLICY "Property owners can view inquiries" 
  ON public.inquiries FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.properties 
      WHERE id = property_id AND owner_id = auth.uid()
    )
  );

-- Property owners can update inquiry status
CREATE POLICY "Property owners can update inquiries" 
  ON public.inquiries FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.properties 
      WHERE id = property_id AND owner_id = auth.uid()
    )
  );

-- Anyone can create inquiries (logged in or not)
CREATE POLICY "Anyone can create inquiries" 
  ON public.inquiries FOR INSERT 
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_inquiries_property_id ON public.inquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_sender_id ON public.inquiries(sender_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
