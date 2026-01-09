-- ARUTPERUNJOTHI JAVULI KADAI Database Schema
-- Supabase PostgreSQL Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(active);

-- =====================================================
-- PRODUCTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  sale_price DECIMAL(10, 2),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  images JSONB DEFAULT '[]'::jsonb, -- Array of image URLs
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  stock_status TEXT DEFAULT 'in_stock', -- in_stock, out_of_stock, pre_order
  sku TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- =====================================================
-- FESTIVAL OFFERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS festival_offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  offer_name TEXT NOT NULL,
  description TEXT,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'flat')),
  discount_value DECIMAL(10, 2) NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  active BOOLEAN DEFAULT true,
  applicable_category_ids JSONB DEFAULT '[]'::jsonb, -- Array of category UUIDs
  banner_text TEXT,
  banner_image_url TEXT,
  banner_mobile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for date range queries
CREATE INDEX idx_festival_offers_dates ON festival_offers(start_date, end_date);
CREATE INDEX idx_festival_offers_active ON festival_offers(active);

-- =====================================================
-- PAYMENT SETTINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS payment_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider TEXT NOT NULL UNIQUE, -- upi, pinelabs, razorpay, etc.
  display_name TEXT NOT NULL,
  upi_id TEXT,
  merchant_id TEXT,
  api_key TEXT, -- Encrypted in production
  api_secret TEXT, -- Encrypted in production
  active BOOLEAN DEFAULT false,
  config JSONB DEFAULT '{}'::jsonb, -- Additional configuration
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- SITE SETTINGS TABLE (Key-Value Store)
-- =====================================================
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ADMIN USERS TABLE
-- =====================================================
-- Note: Using Supabase Auth for authentication
-- This table stores additional admin metadata
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_festival_offers_updated_at BEFORE UPDATE ON festival_offers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_settings_updated_at BEFORE UPDATE ON payment_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- COMMENTS
-- =====================================================
COMMENT ON TABLE categories IS 'Product categories (Women, Men, Kids, etc.)';
COMMENT ON TABLE products IS 'Product catalog with pricing and images';
COMMENT ON TABLE festival_offers IS 'Time-bound promotional offers';
COMMENT ON TABLE payment_settings IS 'Configurable payment gateway settings';
COMMENT ON TABLE site_settings IS 'Dynamic site content and configuration';
COMMENT ON TABLE admin_users IS 'Admin user metadata';
