
-- Services table for services offered by businesses
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'ZAR',
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Active services are viewable by everyone" ON services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Providers can manage their business services" ON services
  FOR ALL USING (
    business_id IN (
      SELECT id FROM businesses WHERE provider_id = auth.uid()
    )
  );
