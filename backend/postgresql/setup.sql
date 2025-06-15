
-- PostgreSQL setup script to create all tables in correct order
-- Run this file to set up the complete database schema

-- Enable UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Create profiles table (no dependencies)
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

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_businesses_updated_at 
    BEFORE UPDATE ON businesses 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at 
    BEFORE UPDATE ON services 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at 
    BEFORE UPDATE ON bookings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_hours_updated_at 
    BEFORE UPDATE ON business_hours 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at 
    BEFORE UPDATE ON reviews 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create views for common queries
CREATE VIEW business_summary AS
SELECT 
    b.id,
    b.business_name,
    b.city,
    b.province,
    b.is_active,
    p.name as provider_name,
    p.email as provider_email,
    COUNT(s.id) as service_count,
    AVG(r.rating) as average_rating,
    COUNT(r.id) as review_count
FROM businesses b
LEFT JOIN profiles p ON b.provider_id = p.id
LEFT JOIN services s ON b.id = s.business_id AND s.is_active = true
LEFT JOIN reviews r ON b.id = r.business_id AND r.is_public = true
WHERE b.is_active = true
GROUP BY b.id, b.business_name, b.city, b.province, b.is_active, p.name, p.email;

-- Create view for booking summary
CREATE VIEW booking_summary AS
SELECT 
    bk.id,
    bk.booking_date,
    bk.start_time,
    bk.end_time,
    bk.status,
    bk.client_name,
    bk.service_name,
    bk.service_price,
    b.business_name,
    p.name as provider_name
FROM bookings bk
JOIN businesses b ON bk.business_id = b.id
JOIN profiles p ON bk.provider_id = p.id;

-- Add comments for views
COMMENT ON VIEW business_summary IS 'Summary view of businesses with aggregated stats';
COMMENT ON VIEW booking_summary IS 'Detailed view of bookings with related information';

-- Success message
SELECT 'PostgreSQL schema setup completed successfully!' as status;
