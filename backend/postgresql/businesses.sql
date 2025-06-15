
-- Businesses table for service providers
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT unique_provider_business UNIQUE(provider_id)
);

-- Create indexes for better performance
CREATE INDEX idx_businesses_provider_id ON businesses(provider_id);
CREATE INDEX idx_businesses_city ON businesses(city);
CREATE INDEX idx_businesses_is_active ON businesses(is_active);

-- Add comments for documentation
COMMENT ON TABLE businesses IS 'Business information for service providers';
COMMENT ON COLUMN businesses.business_hours IS 'JSON object storing weekly opening hours';
