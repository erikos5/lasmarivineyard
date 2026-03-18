-- Lasmari Vineyard Booking System Tables
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/vxtvrxepfteadwthnufc/sql

-- Experiences table
CREATE TABLE IF NOT EXISTS vineyard_experiences (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  duration INTEGER NOT NULL, -- minutes
  price INTEGER NOT NULL, -- EUR cents
  max_guests INTEGER NOT NULL DEFAULT 8,
  min_guests INTEGER NOT NULL DEFAULT 1,
  image TEXT NOT NULL DEFAULT '',
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Business settings table (single row)
CREATE TABLE IF NOT EXISTS vineyard_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- enforce single row
  schedule JSONB NOT NULL DEFAULT '{}'::jsonb,
  blocked_dates JSONB NOT NULL DEFAULT '[]'::jsonb,
  blocked_time_slots JSONB NOT NULL DEFAULT '[]'::jsonb,
  buffer_minutes INTEGER NOT NULL DEFAULT 15,
  advance_booking_days INTEGER NOT NULL DEFAULT 90,
  timezone TEXT NOT NULL DEFAULT 'Europe/Athens',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS vineyard_bookings (
  id TEXT PRIMARY KEY,
  experience_id TEXT NOT NULL REFERENCES vineyard_experiences(id),
  experience_name TEXT NOT NULL,
  date TEXT NOT NULL, -- YYYY-MM-DD
  time_slot TEXT NOT NULL, -- HH:mm
  guests INTEGER NOT NULL,
  total_price INTEGER NOT NULL, -- EUR cents
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL DEFAULT '',
  special_requests TEXT NOT NULL DEFAULT '',
  stripe_session_id TEXT NOT NULL DEFAULT '',
  stripe_payment_intent_id TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_bookings_date ON vineyard_bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON vineyard_bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_stripe_session ON vineyard_bookings(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_experiences_active ON vineyard_experiences(active);

-- Enable RLS (Row Level Security)
ALTER TABLE vineyard_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE vineyard_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE vineyard_bookings ENABLE ROW LEVEL SECURITY;

-- Policies: Allow read for everyone (public site needs to read experiences)
CREATE POLICY "Public read experiences" ON vineyard_experiences FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON vineyard_settings FOR SELECT USING (true);

-- Policies: Service role (server-side) can do everything
CREATE POLICY "Service role full access experiences" ON vineyard_experiences FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access settings" ON vineyard_settings FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access bookings" ON vineyard_bookings FOR ALL USING (auth.role() = 'service_role');

-- Bookings: anon can insert (for creating bookings from frontend via API)
CREATE POLICY "Anon read bookings" ON vineyard_bookings FOR SELECT USING (true);
CREATE POLICY "Anon insert bookings" ON vineyard_bookings FOR INSERT WITH CHECK (true);

-- Seed initial experiences
INSERT INTO vineyard_experiences (id, name, description, duration, price, max_guests, min_guests, image, features, active, sort_order) VALUES
  ('historic-winemaking', 'Historic Winemaking Discovery', 'Begin your journey exploring the authentic locations where our family has crafted wine for generations. Walk through our original stone cellars, witness traditional fermentation vessels, and discover the secrets of Corfiot winemaking techniques passed down through five generations.', 45, 3500, 8, 1, '/images/experiences/old-iron-door.jpeg', '["Original stone cellars tour", "Traditional fermentation vessels", "Family winemaking secrets", "Historical artifacts and tools", "Stories of five generations"]'::jsonb, true, 1),
  ('wine-tasting-terroir', 'Wine Tasting & Terroir Experience', 'Settle into our intimate tasting space where you''ll experience the unique character of our estate wines. Each glass tells the story of our Mediterranean terroir.', 60, 4500, 8, 1, '/images/experiences/dining-table-close.jpeg', '["5 signature wine tastings", "Terroir education & explanation", "Flavor profile exploration", "Vintage comparison experience", "Personal tasting notes guidance"]'::jsonb, true, 2),
  ('culinary-journey', 'Authentic Corfiot Culinary Journey', 'Savor the authentic flavors of Corfu with traditional bites prepared using recipes from our family kitchen, paired with our estate wines.', 45, 4000, 8, 1, '/images/experiences/dining-wide-hills.jpeg', '["Traditional Corfiot appetizers", "Family recipe specialties", "Wine and food pairing guidance", "Local ingredient stories", "Seasonal delicacies"]'::jsonb, true, 3),
  ('estate-heritage-tour', 'Estate Grounds & Heritage Tour', 'Discover the vineyards where it all began, learn about our sustainable farming practices, and see firsthand the landscape that shapes every bottle we create.', 30, 2500, 10, 1, '/images/experiences/tree-basket-vineyard.jpeg', '["Vineyard rows exploration", "Sustainable farming showcase", "Landscape and terroir explanation", "Photo opportunities", "Seasonal highlights"]'::jsonb, true, 4),
  ('complete-experience', 'The Complete Lasmari Experience', 'Our signature 3-hour journey through five generations of Corfiot winemaking heritage. Includes cellar tour, wine tasting, culinary pairing, and estate walk with a complimentary bottle.', 180, 9500, 8, 2, '/images/experiences/dining-circle-above.jpeg', '["All four experience segments", "5 premium wine tastings", "Traditional Corfiot food pairing", "Full estate grounds tour", "Complimentary bottle to take home"]'::jsonb, true, 5)
ON CONFLICT (id) DO NOTHING;

-- Seed initial settings
INSERT INTO vineyard_settings (id, schedule, blocked_dates, blocked_time_slots, buffer_minutes, advance_booking_days, timezone) VALUES (
  1,
  '{
    "0": {"enabled": true, "slots": [{"start": "10:00", "end": "18:00"}], "breaks": [{"start": "13:00", "end": "14:00"}]},
    "1": {"enabled": true, "slots": [{"start": "10:00", "end": "18:00"}], "breaks": [{"start": "13:00", "end": "14:00"}]},
    "2": {"enabled": true, "slots": [{"start": "10:00", "end": "18:00"}], "breaks": [{"start": "13:00", "end": "14:00"}]},
    "3": {"enabled": true, "slots": [{"start": "10:00", "end": "18:00"}], "breaks": [{"start": "13:00", "end": "14:00"}]},
    "4": {"enabled": true, "slots": [{"start": "10:00", "end": "18:00"}], "breaks": [{"start": "13:00", "end": "14:00"}]},
    "5": {"enabled": true, "slots": [{"start": "10:00", "end": "18:00"}], "breaks": [{"start": "13:00", "end": "14:00"}]},
    "6": {"enabled": false, "slots": [], "breaks": []}
  }'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  15,
  90,
  'Europe/Athens'
) ON CONFLICT (id) DO NOTHING;
