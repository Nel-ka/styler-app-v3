import { useState, useEffect } from 'react';
import { Product } from '../types';
import { supabase } from '../lib/supabase';
import { checkColorAvailability } from '../utils/inventory';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) throw supabaseError;

        // Filter out products with no available stock
        const availableProducts = data?.filter(product => {
          if (!product.inventory) return false;
          return Object.keys(product.inventory).some(color => 
            checkColorAvailability(product.inventory, color)
          );
        }) || [];

        setProducts(availableProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}