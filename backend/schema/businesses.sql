
-- Businesses table for service providers
CREATE TABLE businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  business_name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  city TEXT,
  province TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'South Africa',
  phone TEXT,
  email TEXT,
  website TEXT,
  logo_url TEXT,
  business_hours JSONB, -- Store opening hours as JSON
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Businesses are viewable by everyone" ON businesses
  FOR SELECT USING (is_active = true);

CREATE POLICY "Providers can manage their own business" ON businesses
  FOR ALL USING (provider_id = auth.uid());
