
-- Main setup script to create all tables in order
-- Run this file to set up the complete database schema

-- 1. Create profiles table (depends on auth.users from Supabase Auth)
\i profiles.sql

-- 2. Create businesses table (depends on profiles)
\i businesses.sql

-- 3. Create services table (depends on businesses)
\i services.sql

-- 4. Create business_hours table (depends on businesses)
\i business_hours.sql

-- 5. Create bookings table (depends on services, profiles, businesses)
\i bookings.sql

-- 6. Create reviews table (depends on bookings and all other tables)
\i reviews.sql

-- Create indexes for better performance
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_provider ON bookings(provider_id);
CREATE INDEX idx_bookings_client ON bookings(client_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_services_business ON services(business_id);
CREATE INDEX idx_businesses_provider ON businesses(provider_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_business_hours_day ON business_hours(business_id, day_of_week);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON businesses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_business_hours_updated_at BEFORE UPDATE ON business_hours FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
