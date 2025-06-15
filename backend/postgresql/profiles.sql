
-- Profiles table for both providers and clients
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  user_type TEXT CHECK (user_type IN ('provider', 'client')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_user_type ON profiles(user_type);

-- Add comments for documentation
COMMENT ON TABLE profiles IS 'User accounts for both service providers and clients';
COMMENT ON COLUMN profiles.user_type IS 'Determines if user is a service provider or client';
