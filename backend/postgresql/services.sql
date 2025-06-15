
-- Services table for services offered by businesses
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  currency TEXT DEFAULT 'ZAR',
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_services_business_id ON services(business_id);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_is_active ON services(is_active);
CREATE INDEX idx_services_price ON services(price);

-- Add comments for documentation
COMMENT ON TABLE services IS 'Services offered by businesses';
COMMENT ON COLUMN services.price IS 'Service price in decimal format (e.g., 25.00 for R25)';
COMMENT ON COLUMN services.duration_minutes IS 'Service duration in minutes';
