import { supabase } from '../lib/supabase';

export interface ProductStockStatus {
  productId: string;
  isResolved: boolean;
  message: string;
}

export async function checkProductStockStatus(): Promise<ProductStockStatus[]> {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('id, in_stock')
      .order('id');

    if (error) throw error;

    return products.map(product => ({
      productId: product.id,
      isResolved: product.in_stock === true,
      message: product.in_stock ? 'Product is in stock' : 'Product is out of stock'
    }));
  } catch (error) {
    console.error('Error checking product stock status:', error);
    return [];
  }
}