-- ============================================
-- TCHIBO COFFEE SERVICE — SUPABASE SQL SCHEMA
-- ============================================
-- Run this in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste & Run


-- ============================================
-- 1. PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('espresso', 'cappuccino', 'latte', 'filter', 'beans', 'machines', 'accessories')),
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  items JSONB NOT NULL,         -- [{ product_id, name, quantity, price }]
  total DECIMAL(10, 2) NOT NULL,
  delivery_type VARCHAR(20) NOT NULL CHECK (delivery_type IN ('delivery', 'pickup')),
  address TEXT,                 -- required if delivery_type = 'delivery'
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. RESERVATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  date DATE NOT NULL,
  time TIME NOT NULL,
  party_size INTEGER NOT NULL CHECK (party_size >= 1 AND party_size <= 20),
  notes TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- ============================================
-- 4. AUTO-UPDATE updated_at TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Products: anyone can read
CREATE POLICY "Public can view products"
  ON products FOR SELECT
  USING (TRUE);

-- Orders: anyone can insert, only service role can read/update
CREATE POLICY "Anyone can place an order"
  ON orders FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Service role can manage orders"
  ON orders FOR ALL
  USING (auth.role() = 'service_role');

-- Reservations: anyone can insert, only service role can read/update
CREATE POLICY "Anyone can make a reservation"
  ON reservations FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Service role can manage reservations"
  ON reservations FOR ALL
  USING (auth.role() = 'service_role');


-- ============================================
-- 6. SEED — SAMPLE PRODUCTS DATA
-- ============================================

-- Drinks
INSERT INTO products (name, category, description, price, in_stock) VALUES
  ('Espresso', 'espresso', 'Rich and bold single shot of our signature Tchibo blend.', 2.50, TRUE),
  ('Double Espresso', 'espresso', 'Double shot for those who need an extra kick.', 3.50, TRUE),
  ('Cappuccino', 'cappuccino', 'Velvety steamed milk with a perfect espresso base and thick foam.', 4.00, TRUE),
  ('Iced Cappuccino', 'cappuccino', 'Chilled cappuccino over ice, perfect for warm days.', 4.50, TRUE),
  ('Latte', 'latte', 'Smooth espresso with creamy steamed milk, lightly topped with foam.', 4.50, TRUE),
  ('Vanilla Latte', 'latte', 'Classic latte with a hint of sweet vanilla syrup.', 5.00, TRUE),
  ('Filter Coffee', 'filter', 'Slow-brewed, smooth and aromatic drip coffee.', 3.00, TRUE),
  ('Cold Brew', 'filter', '12-hour cold steeped coffee, served over ice.', 4.50, TRUE);

-- Beans & Blends
INSERT INTO products (name, category, description, price, in_stock) VALUES
  ('Tchibo Espresso Blend 250g', 'beans', 'Our signature medium-dark roast espresso blend. Rich, smooth, with notes of chocolate.', 12.99, TRUE),
  ('Tchibo Gold Selection 500g', 'beans', 'Mild and balanced filter coffee blend with a smooth finish.', 18.99, TRUE),
  ('Single Origin Ethiopia 250g', 'beans', 'Light roast with bright fruity notes of blueberry and jasmine.', 15.99, TRUE),
  ('Dark Roast Colombia 250g', 'beans', 'Bold and full-bodied with caramel sweetness and low acidity.', 14.99, TRUE);

-- Machines & Accessories
INSERT INTO products (name, category, description, price, in_stock) VALUES
  ('Tchibo Esperto Barista Machine', 'machines', 'Semi-automatic espresso machine with professional steam wand. Perfect for home baristas.', 299.99, TRUE),
  ('Tchibo Fully Automatic Coffee Machine', 'machines', 'One-touch coffee experience — grinds, brews and froths automatically.', 499.99, TRUE),
  ('Tchibo Cafissimo Capsule Machine', 'machines', 'Compact capsule machine compatible with Tchibo Cafissimo capsules.', 89.99, TRUE),
  ('Stainless Steel Milk Frother', 'accessories', 'Electric frother for perfect foam every time.', 24.99, TRUE),
  ('Tchibo Ceramic Mug Set (2x)', 'accessories', 'Elegant ceramic mugs with Tchibo branding. 350ml capacity.', 19.99, TRUE),
  ('Coffee Grinder — Burr Mill', 'accessories', 'Precision burr grinder with 15 grind settings for the perfect cup.', 79.99, TRUE);
