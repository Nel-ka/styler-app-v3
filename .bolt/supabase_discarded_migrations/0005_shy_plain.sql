/*
  # Add inventory management to products table
  
  1. Changes
    - Add stock_quantity column to products table
    - Add inventory tracking per color and size
    - Update existing in_stock column to be computed
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add inventory columns
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS inventory JSONB DEFAULT '{}'::jsonb;

-- Update in_stock to be computed based on stock_quantity
CREATE OR REPLACE FUNCTION update_in_stock()
RETURNS TRIGGER AS $$
BEGIN
  NEW.in_stock = NEW.stock_quantity > 0;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_product_stock_status
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_in_stock();