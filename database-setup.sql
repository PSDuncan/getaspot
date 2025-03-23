-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL CHECK (role IN ('user', 'agent', 'agency_admin', 'super_admin')),
    agency_id UUID,
    phone TEXT,
    bio TEXT,
    email TEXT,
    is_verified BOOLEAN DEFAULT FALSE
);

-- Create agencies table
CREATE TABLE IF NOT EXISTS agencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    logo_url TEXT,
    description TEXT,
    website TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'standard', 'premium')),
    subscription_status TEXT NOT NULL DEFAULT 'trial' CHECK (subscription_status IN ('active', 'inactive', 'trial')),
    subscription_end_date TIMESTAMP WITH TIME ZONE,
    owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL
);

-- Add foreign key constraint to profiles for agency_id
ALTER TABLE profiles ADD CONSTRAINT fk_profiles_agency_id FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE SET NULL;

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC NOT NULL,
    property_type TEXT NOT NULL,
    listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent')),
    bedrooms INTEGER,
    bathrooms NUMERIC,
    garages INTEGER,
    size NUMERIC,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    province TEXT NOT NULL,
    postal_code TEXT,
    latitude NUMERIC,
    longitude NUMERIC,
    features TEXT[] DEFAULT '{}',
    images TEXT[] DEFAULT '{}',
    is_featured BOOLEAN DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'sold', 'rented')),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    agency_id UUID REFERENCES agencies(id) ON DELETE SET NULL,
    agent_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    views INTEGER DEFAULT 0,
    inquiries INTEGER DEFAULT 0
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
    tier TEXT NOT NULL CHECK (tier IN ('free', 'standard', 'premium')),
    status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'trial')),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    payment_id TEXT,
    amount NUMERIC NOT NULL,
    currency TEXT NOT NULL DEFAULT 'ZAR',
    is_recurring BOOLEAN DEFAULT FALSE
);

-- Create saved_properties table
CREATE TABLE IF NOT EXISTS saved_properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    UNIQUE(user_id, property_id)
);

-- Create agent_invitations table
CREATE TABLE IF NOT EXISTS agent_invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    token TEXT NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '7 days')
);

-- Create property_views table
CREATE TABLE IF NOT EXISTS property_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    ip_address TEXT,
    user_agent TEXT
);

-- Create RLS policies

-- Profiles policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Agencies policies
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agencies are viewable by everyone"
ON agencies FOR SELECT
USING (true);

CREATE POLICY "Agency admins can update their agency"
ON agencies FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.agency_id = agencies.id
        AND profiles.role = 'agency_admin'
    )
);

CREATE POLICY "Super admins can update any agency"
ON agencies FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'super_admin'
    )
);

CREATE POLICY "Agency admins can insert agencies"
ON agencies FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('agency_admin', 'super_admin')
    )
);

-- Properties policies
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Properties are viewable by everyone"
ON properties FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own properties"
ON properties FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own properties"
ON properties FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Agents can update properties they manage"
ON properties FOR UPDATE
USING (
    auth.uid() = agent_id OR
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.agency_id = properties.agency_id
        AND profiles.role IN ('agency_admin', 'super_admin')
    )
);

CREATE POLICY "Users can delete their own properties"
ON properties FOR DELETE
USING (auth.uid() = user_id);

-- Inquiries policies
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own inquiries"
ON inquiries FOR SELECT
USING (
    auth.uid() = user_id OR
    EXISTS (
        SELECT 1 FROM properties
        WHERE properties.id = inquiries.property_id
        AND (
            properties.user_id = auth.uid() OR
            properties.agent_id = auth.uid() OR
            EXISTS (
                SELECT 1 FROM profiles
                WHERE profiles.id = auth.uid()
                AND profiles.agency_id = properties.agency_id
                AND profiles.role IN ('agency_admin', 'super_admin')
            )
        )
    )
);

CREATE POLICY "Anyone can insert inquiries"
ON inquiries FOR INSERT
WITH CHECK (true);

CREATE POLICY "Property owners and agents can update inquiries"
ON inquiries FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM properties
        WHERE properties.id = inquiries.property_id
        AND (
            properties.user_id = auth.uid() OR
            properties.agent_id = auth.uid() OR
            EXISTS (
                SELECT 1 FROM profiles
                WHERE profiles.id = auth.uid()
                AND profiles.agency_id = properties.agency_id
                AND profiles.role IN ('agency_admin', 'super_admin')
            )
        )
    )
);

-- Saved properties policies
ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their saved properties"
ON saved_properties FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can save properties"
ON saved_properties FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove saved properties"
ON saved_properties FOR DELETE
USING (auth.uid() = user_id);

-- Create functions and triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agencies_updated_at
BEFORE UPDATE ON agencies
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON properties
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Function to increment property views
CREATE OR REPLACE FUNCTION increment_property_views()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE properties
    SET views = views + 1
    WHERE id = NEW.property_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for property views
CREATE TRIGGER increment_views_on_property_view
AFTER INSERT ON property_views
FOR EACH ROW
EXECUTE FUNCTION increment_property_views();

-- Function to increment property inquiries
CREATE OR REPLACE FUNCTION increment_property_inquiries()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE properties
    SET inquiries = inquiries + 1
    WHERE id = NEW.property_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for property inquiries
CREATE TRIGGER increment_inquiries_on_inquiry
AFTER INSERT ON inquiries
FOR EACH ROW
EXECUTE FUNCTION increment_property_inquiries();

-- Create super admin user if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM profiles
        WHERE role = 'super_admin'
    ) THEN
        -- You'll need to manually create a user in Supabase Auth and then update their profile
        -- This is just a placeholder to remind you to create a super admin
        RAISE NOTICE 'Remember to create a super admin user in Supabase Auth and update their profile';
    END IF;
END
$$;

