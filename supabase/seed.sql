-- Seed Data for ARUTPERUNJOTHI JAVULI KADAI
-- Sample data for testing and initial setup

-- =====================================================
-- CATEGORIES
-- =====================================================
INSERT INTO categories (name, slug, description, display_order, active) VALUES
('Sarees', 'sarees', 'Traditional and designer sarees for all occasions', 1, true),
('Shirts', 'shirts', 'Formal and casual shirts for men', 2, true),
('T-Shirts', 't-shirts', 'Comfortable t-shirts for daily wear', 3, true),
('Kids Wear', 'kids-wear', 'Clothing for children of all ages', 4, true),
('Combo Offers', 'combo-offers', 'Special combo deals and packages', 5, true),
('Daily Wear', 'daily-wear', 'Comfortable everyday clothing', 6, true);

-- =====================================================
-- PRODUCTS
-- =====================================================
-- Sarees
INSERT INTO products (name, slug, description, price, sale_price, category_id, images, featured, active, stock_status) VALUES
(
  'Kanchipuram Silk Saree - Red',
  'kanchipuram-silk-saree-red',
  'Pure Kanchipuram silk saree with traditional zari work. Perfect for weddings and festivals.',
  8500.00,
  7500.00,
  (SELECT id FROM categories WHERE slug = 'sarees'),
  '["https://placehold.co/600x800/ef4444/ffffff?text=Red+Silk+Saree"]'::jsonb,
  true,
  true,
  'in_stock'
),
(
  'Cotton Saree - Blue',
  'cotton-saree-blue',
  'Lightweight cotton saree ideal for daily wear. Comfortable and elegant.',
  1200.00,
  NULL,
  (SELECT id FROM categories WHERE slug = 'sarees'),
  '["https://placehold.co/600x800/3b82f6/ffffff?text=Blue+Cotton+Saree"]'::jsonb,
  false,
  true,
  'in_stock'
),
(
  'Designer Saree - Green',
  'designer-saree-green',
  'Modern designer saree with contemporary patterns.',
  3500.00,
  2999.00,
  (SELECT id FROM categories WHERE slug = 'sarees'),
  '["https://placehold.co/600x800/22c55e/ffffff?text=Green+Designer+Saree"]'::jsonb,
  true,
  true,
  'in_stock'
);

-- Shirts
INSERT INTO products (name, slug, description, price, sale_price, category_id, images, featured, active) VALUES
(
  'Formal White Shirt',
  'formal-white-shirt',
  'Classic white formal shirt for office and events.',
  899.00,
  NULL,
  (SELECT id FROM categories WHERE slug = 'shirts'),
  '["https://placehold.co/600x800/ffffff/000000?text=White+Shirt"]'::jsonb,
  false,
  true
),
(
  'Casual Check Shirt - Blue',
  'casual-check-shirt-blue',
  'Comfortable check pattern shirt for casual wear.',
  699.00,
  599.00,
  (SELECT id FROM categories WHERE slug = 'shirts'),
  '["https://placehold.co/600x800/3b82f6/ffffff?text=Check+Shirt"]'::jsonb,
  false,
  true
);

-- T-Shirts
INSERT INTO products (name, slug, description, price, sale_price, category_id, images, featured, active) VALUES
(
  'Cotton T-Shirt - Black',
  'cotton-tshirt-black',
  'Premium cotton t-shirt for everyday comfort.',
  399.00,
  299.00,
  (SELECT id FROM categories WHERE slug = 't-shirts'),
  '["https://placehold.co/600x800/000000/ffffff?text=Black+T-Shirt"]'::jsonb,
  true,
  true
),
(
  'Polo T-Shirt - Navy',
  'polo-tshirt-navy',
  'Classic polo t-shirt with collar.',
  599.00,
  NULL,
  (SELECT id FROM categories WHERE slug = 't-shirts'),
  '["https://placehold.co/600x800/1e3a8a/ffffff?text=Navy+Polo"]'::jsonb,
  false,
  true
);

-- Kids Wear
INSERT INTO products (name, slug, description, price, sale_price, category_id, images, featured, active) VALUES
(
  'Kids Ethnic Wear Set',
  'kids-ethnic-wear-set',
  'Traditional ethnic wear set for kids.',
  1299.00,
  999.00,
  (SELECT id FROM categories WHERE slug = 'kids-wear'),
  '["https://placehold.co/600x800/f59e0b/ffffff?text=Kids+Ethnic"]'::jsonb,
  true,
  true
),
(
  'Kids Casual Dress',
  'kids-casual-dress',
  'Comfortable casual dress for girls.',
  599.00,
  NULL,
  (SELECT id FROM categories WHERE slug = 'kids-wear'),
  '["https://placehold.co/600x800/ec4899/ffffff?text=Kids+Dress"]'::jsonb,
  false,
  true
);

-- =====================================================
-- FESTIVAL OFFER (Sample)
-- =====================================================
INSERT INTO festival_offers (
  offer_name,
  description,
  discount_type,
  discount_value,
  start_date,
  end_date,
  active,
  applicable_category_ids,
  banner_text,
  banner_image_url
) VALUES (
  'Pongal Festival Sale 2026',
  'Special discount for Pongal festival celebration',
  'percentage',
  15.00,
  '2026-01-14 00:00:00+05:30',
  '2026-01-20 23:59:59+05:30',
  true,
  (SELECT jsonb_agg(id) FROM categories WHERE slug IN ('sarees', 'kids-wear')),
  'Pongal Special - 15% OFF on Sarees & Kids Wear',
  'https://placehold.co/1200x400/ef4444/ffffff?text=Pongal+Festival+Sale'
);

-- =====================================================
-- PAYMENT SETTINGS
-- =====================================================
INSERT INTO payment_settings (provider, display_name, upi_id, active) VALUES
('upi', 'UPI Payment', 'sakhti.textiles@upi', true),
('whatsapp', 'WhatsApp Order', NULL, true),
('enquire', 'Enquire Now', NULL, true);

-- Placeholder for future payment gateways
INSERT INTO payment_settings (provider, display_name, active, config) VALUES
('pinelabs', 'PineLabs', false, '{"merchant_id": "", "api_key": ""}'::jsonb),
('razorpay', 'Razorpay', false, '{"key_id": "", "key_secret": ""}'::jsonb);

-- =====================================================
-- SITE SETTINGS
-- =====================================================
INSERT INTO site_settings (key, value, description) VALUES
(
  'business_info',
  '{
    "name": "ARUTPERUNJOTHI JAVULI KADAI",
    "brand": "SAKTHI TEXTILES",
    "address": "2ND FLOOR, NO: 19,\nELLORA COMPLEX,\nBROUGH ROAD,\nERODE – 638001,\nTAMIL NADU, INDIA",
    "phone": ["+91 97509 96633", "+91 95666 09636"],
    "gstin": "33DGMPS4403N1ZZ",
    "email": "info@arutperunjothijavulikadai.in",
    "domain": "www.arutperunjothijavulikadai.in"
  }'::jsonb,
  'Business contact information'
),
(
  'social_links',
  '{
    "facebook": "",
    "instagram": "",
    "twitter": "",
    "whatsapp": "919750996633"
  }'::jsonb,
  'Social media links'
),
(
  'about_content',
  '{
    "title": "About SAKTHI TEXTILES",
    "content": "ARUTPERUNJOTHI JAVULI KADAI, operating under the brand name SAKTHI TEXTILES, is a trusted name in quality garments in Erode. We specialize in traditional sarees, modern clothing, and kids wear, offering the best products at competitive prices."
  }'::jsonb,
  'About page content'
),
(
  'seo_settings',
  '{
    "site_title": "SAKTHI TEXTILES - Quality Garments in Erode",
    "site_description": "Shop traditional sarees, shirts, t-shirts, and kids wear at SAKTHI TEXTILES. Quality garments with great prices in Erode, Tamil Nadu.",
    "keywords": "sarees, textiles, garments, Erode, Tamil Nadu, kids wear, shirts, traditional wear"
  }'::jsonb,
  'SEO metadata'
);

-- =====================================================
-- ADMIN USER (Example - Create via Supabase Auth UI)
-- =====================================================
-- Note: Admin users should be created via Supabase Auth
-- After creating auth user, insert into admin_users table:
-- 
-- INSERT INTO admin_users (id, email, full_name, role, active) VALUES
-- ('auth-user-uuid-here', 'admin@arutperunjothijavulikadai.in', 'Admin User', 'admin', true);
