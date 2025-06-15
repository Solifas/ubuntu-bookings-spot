
-- Business hours table for provider availability
CREATE TABLE business_hours (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6) NOT NULL, -- 0 = Sunday, 6 = Saturday
  is_open BOOLEAN DEFAULT true,
  open_time TIME,
  close_time TIME,
  break_start_time TIME,
  break_end_time TIME,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(business_id, day_of_week)
);

-- Enable RLS
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Business hours are viewable by everyone" ON business_hours
  FOR SELECT USING (true);

CREATE POLICY "Providers can manage their business hours" ON business_hours
  FOR ALL USING (
    business_id IN (
      SELECT id FROM businesses WHERE provider_id = auth.uid()
    )
  );
