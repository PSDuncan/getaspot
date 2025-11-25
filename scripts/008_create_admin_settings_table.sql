-- Create admin settings table (for super admin)
CREATE TABLE IF NOT EXISTS public.admin_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Only super admins can access (we'll create admin check function)
CREATE POLICY "Only admins can access settings" 
  ON public.admin_settings FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND user_type = 'super_admin'
    )
  );

-- Insert default settings
INSERT INTO public.admin_settings (key, value, description) VALUES
  ('platform_commission', '{"percentage": 2.5}', 'Platform commission percentage'),
  ('featured_listing_price', '{"amount": 499, "currency": "ZAR"}', 'Price for featured listings'),
  ('max_free_listings', '{"count": 3}', 'Maximum free listings per user')
ON CONFLICT (key) DO NOTHING;
