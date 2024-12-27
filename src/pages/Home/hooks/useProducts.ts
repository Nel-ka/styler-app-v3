import { useState, useEffect } from 'react';
import { Product } from '../../../types';
import { supabase } from '../../../lib/supabase';

interface UseProductsOptions {
  featured?: boolean;
  limit?: number;
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let query = supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (options.featured) {
          query = query.eq('featured', true);
        }

        if (options.limit) {
          query = query.limit(options.limit);
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) throw supabaseError;
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [options.featured, options.limit]);

  return { products, loading, error };
}