
-- Bookings table for appointment bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  provider_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  
  -- Booking details
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')) DEFAULT 'pending',
  
  -- Client information (denormalized for historical accuracy)
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  
  -- Service information (denormalized for historical accuracy)
  service_name TEXT NOT NULL,
  service_price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  
  -- Optional fields
  notes TEXT,
  cancellation_reason TEXT,
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')) DEFAULT 'pending',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_booking_time CHECK (end_time > start_time),
  CONSTRAINT valid_booking_date CHECK (booking_date >= CURRENT_DATE)
);

-- Create indexes for better performance
CREATE INDEX idx_bookings_client_id ON bookings(client_id);
CREATE INDEX idx_bookings_provider_id ON bookings(provider_id);
CREATE INDEX idx_bookings_business_id ON bookings(business_id);
CREATE INDEX idx_bookings_service_id ON bookings(service_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);

-- Composite indexes for common queries
CREATE INDEX idx_bookings_provider_date ON bookings(provider_id, booking_date);
CREATE INDEX idx_bookings_client_date ON bookings(client_id, booking_date);

-- Add comments for documentation
COMMENT ON TABLE bookings IS 'Appointment bookings between clients and service providers';
COMMENT ON COLUMN bookings.service_price IS 'Historical service price at time of booking';
