
-- Business hours table for provider availability
CREATE TABLE business_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6) NOT NULL, -- 0 = Sunday, 6 = Saturday
  is_open BOOLEAN DEFAULT true,
  open_time TIME,
  close_time TIME,
  break_start_time TIME,
  break_end_time TIME,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT unique_business_day UNIQUE(business_id, day_of_week),
  CONSTRAINT valid_hours CHECK (
    (NOT is_open) OR 
    (is_open AND open_time IS NOT NULL AND close_time IS NOT NULL AND close_time > open_time)
  ),
  CONSTRAINT valid_break CHECK (
    (break_start_time IS NULL AND break_end_time IS NULL) OR
    (break_start_time IS NOT NULL AND break_end_time IS NOT NULL AND break_end_time > break_start_time)
  )
);

-- Create indexes for better performance
CREATE INDEX idx_business_hours_business_id ON business_hours(business_id);
CREATE INDEX idx_business_hours_day_of_week ON business_hours(day_of_week);

-- Composite index for common queries
CREATE INDEX idx_business_hours_business_day ON business_hours(business_id, day_of_week);

-- Add comments for documentation
COMMENT ON TABLE business_hours IS 'Weekly availability schedule for businesses';
COMMENT ON COLUMN business_hours.day_of_week IS '0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday';
