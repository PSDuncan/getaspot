-- Insert a sample agency
INSERT INTO agencies (name, description, subscription_tier, subscription_status)
VALUES ('Sample Agency', 'A sample real estate agency', 'premium', 'active');

-- Get the agency ID
DO $$
DECLARE
    agency_id UUID;
BEGIN
    SELECT id INTO agency_id FROM agencies WHERE name = 'Sample Agency';
    
    -- Insert sample properties
    INSERT INTO properties (
        title, 
        description, 
        price, 
        property_type, 
        listing_type, 
        bedrooms, 
        bathrooms, 
        address, 
        city, 
        province, 
        user_id,
        agency_id,
        status
    )
    VALUES 
    (
        'Modern Apartment in Sandton', 
        'This beautiful modern apartment is located in the heart of Sandton, Johannesburg. It features 2 spacious bedrooms, 2 bathrooms, an open-plan kitchen and living area, and a balcony with city views.', 
        2450000, 
        'Apartment', 
        'sale', 
        2, 
        2, 
        '123 Main St, Sandton', 
        'Johannesburg', 
        'Gauteng', 
        -- Replace with an actual user ID from your auth.users table
        (SELECT id FROM profiles LIMIT 1),
        agency_id,
        'published'
    ),
    (
        'Family Home in Cape Town', 
        'Spacious family home in a quiet neighborhood in Cape Town. Features 4 bedrooms, 3 bathrooms, a large garden, and a swimming pool.', 
        5950000, 
        'House', 
        'sale', 
        4, 
        3, 
        '456 Beach Rd, Camps Bay', 
        'Cape Town', 
        'Western Cape', 
        -- Replace with an actual user ID from your auth.users table
        (SELECT id FROM profiles LIMIT 1),
        agency_id,
        'published'
    ),
    (
        'Luxury Villa in Umhlanga', 
        'Stunning luxury villa with ocean views in Umhlanga. Features 5 bedrooms, 4.5 bathrooms, a private pool, and a home theater.', 
        8200000, 
        'Villa', 
        'sale', 
        5, 
        4.5, 
        '789 Ocean View, Umhlanga', 
        'Durban', 
        'KwaZulu-Natal', 
        -- Replace with an actual user ID from your auth.users table
        (SELECT id FROM profiles LIMIT 1),
        agency_id,
        'published'
    );
END $$;

