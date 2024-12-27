/*
  # Update Product Inventory System
  
  1. Changes
    - Add inventory JSONB column for color/size combinations
    - Add function to check product availability
    - Add function to update stock status
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add inventory management columns
ALTER TABLE products
ADD COLUMN IF NOT EXISTS inventory JSONB DEFAULT '{}'::jsonb;

-- Create function to check if product has any available stock
CREATE OR REPLACE FUNCTION check_product_availability(product_inventory JSONB)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM jsonb_each(product_inventory) color_data
    WHERE EXISTS (
      SELECT 1
      FROM jsonb_each_text(color_data.value) size_data
      WHERE size_data.value::integer > 0
    )
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;