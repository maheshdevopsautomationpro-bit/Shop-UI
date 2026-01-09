-- Row Level Security (RLS) Policies
-- ARUTPERUNJOTHI JAVULI KADAI

-- =====================================================
-- ENABLE RLS ON ALL TABLES
-- =====================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE festival_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- HELPER FUNCTION: Check if user is admin
-- =====================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = auth.uid() AND active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- CATEGORIES POLICIES
-- =====================================================
-- Public: Read active categories
CREATE POLICY "Public can view active categories"
  ON categories FOR SELECT
  USING (active = true);

-- Admin: Full access
CREATE POLICY "Admins can do everything with categories"
  ON categories FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- =====================================================
-- PRODUCTS POLICIES
-- =====================================================
-- Public: Read active products
CREATE POLICY "Public can view active products"
  ON products FOR SELECT
  USING (active = true);

-- Admin: Full access
CREATE POLICY "Admins can do everything with products"
  ON products FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- =====================================================
-- FESTIVAL OFFERS POLICIES
-- =====================================================
-- Public: Read active offers within date range
CREATE POLICY "Public can view active festival offers"
  ON festival_offers FOR SELECT
  USING (
    active = true 
    AND start_date <= NOW() 
    AND end_date >= NOW()
  );

-- Admin: Full access
CREATE POLICY "Admins can do everything with festival offers"
  ON festival_offers FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- =====================================================
-- PAYMENT SETTINGS POLICIES
-- =====================================================
-- Public: Read active payment methods (excluding sensitive data)
-- Note: Frontend should filter sensitive fields
CREATE POLICY "Public can view active payment settings"
  ON payment_settings FOR SELECT
  USING (active = true);

-- Admin: Full access
CREATE POLICY "Admins can do everything with payment settings"
  ON payment_settings FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- =====================================================
-- SITE SETTINGS POLICIES
-- =====================================================
-- Public: Read all site settings
CREATE POLICY "Public can view site settings"
  ON site_settings FOR SELECT
  USING (true);

-- Admin: Full access
CREATE POLICY "Admins can do everything with site settings"
  ON site_settings FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- =====================================================
-- ADMIN USERS POLICIES
-- =====================================================
-- Admin: Can view all admin users
CREATE POLICY "Admins can view admin users"
  ON admin_users FOR SELECT
  USING (is_admin());

-- Admin: Can update their own profile
CREATE POLICY "Admins can update their own profile"
  ON admin_users FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Only super admin can insert/delete (handled via service role)
-- No public INSERT/DELETE policies

-- =====================================================
-- STORAGE POLICIES (for Supabase Storage)
-- =====================================================
-- Note: These are applied in Supabase Dashboard under Storage > Policies

-- Bucket: product-images
-- Public: Read access
-- Admin: Full access

-- Bucket: banners
-- Public: Read access
-- Admin: Full access
