
-- Reviews table for client reviews of services
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  provider_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE NOT NULL,
  
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review_text TEXT,
  is_public BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(booking_id) -- One review per booking
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public reviews are viewable by everyone" ON reviews
  FOR SELECT USING (is_public = true);

CREATE POLICY "Clients can create reviews for their bookings" ON reviews
  FOR INSERT WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update their own reviews" ON reviews
  FOR UPDATE USING (client_id = auth.uid());

CREATE POLICY "Providers can view their business reviews" ON reviews
  FOR SELECT USING (provider_id = auth.uid());
