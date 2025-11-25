-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT NOT NULL CHECK (property_type IN ('house', 'apartment', 'townhouse', 'land', 'farm', 'commercial', 'industrial')),
  listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent')),
  price DECIMAL(15,2) NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  garages INTEGER,
  floor_size INTEGER, -- in square meters
  land_size INTEGER, -- in square meters
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  features TEXT[], -- array of features like 'pool', 'garden', 'security', etc.
  images TEXT[], -- array of image URLs
  video_url TEXT,
  virtual_tour_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'pending', 'sold', 'rented', 'inactive')),
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  agency_id UUID REFERENCES public.agencies(id) ON DELETE SET NULL,
  views_count INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Property owners can manage their properties
CREATE POLICY "Property owners can manage own properties" 
  ON public.properties FOR ALL 
  USING (auth.uid() = owner_id);

-- Agents can manage properties for their agency
CREATE POLICY "Agents can manage agency properties" 
  ON public.properties FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.agency_agents 
      WHERE agency_id = properties.agency_id 
        AND user_id = auth.uid() 
        AND status = 'active'
    )
  );

-- Anyone can view active properties
CREATE POLICY "Anyone can view active properties" 
  ON public.properties FOR SELECT 
  USING (status = 'active');

-- Create indexes for search optimization
CREATE INDEX IF NOT EXISTS idx_properties_owner_id ON public.properties(owner_id);
CREATE INDEX IF NOT EXISTS idx_properties_agency_id ON public.properties(agency_id);
CREATE INDEX IF NOT EXISTS idx_properties_city ON public.properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_province ON public.properties(province);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON public.properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_listing_type ON public.properties(listing_type);
CREATE INDEX IF NOT EXISTS idx_properties_price ON public.properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON public.properties(created_at DESC);
