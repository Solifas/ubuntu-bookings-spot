
-- Bookings table for appointment bookings
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  provider_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  
  -- Booking details
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')) DEFAULT 'pending',
  
  -- Client information
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  
  -- Booking details
  service_name TEXT NOT NULL,
  service_price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  
  -- Optional fields
  notes TEXT,
  cancellation_reason TEXT,
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')) DEFAULT 'pending',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Clients can view their own bookings" ON bookings
  FOR SELECT USING (client_id = auth.uid());

CREATE POLICY "Providers can view their business bookings" ON bookings
  FOR SELECT USING (provider_id = auth.uid());

CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Clients can update their own bookings" ON bookings
  FOR UPDATE USING (client_id = auth.uid());

CREATE POLICY "Providers can update their business bookings" ON bookings
  FOR UPDATE USING (provider_id = auth.uid());
