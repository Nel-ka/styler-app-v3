import { useState, useEffect } from 'react';
import { Product } from '../../../types';
import { supabase } from '../../../lib/supabase';

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
        
        // If no data, use dummy products
        if (!data || data.length === 0) {
          setProducts(getDummyProducts());
        } else {
          setProducts(data);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        // Fallback to dummy data on error
        setProducts(getDummyProducts());
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}

function getDummyProducts(): Product[] {
  return [
    {
      id: '1',
      name: 'Classic White Tee',
      description: 'Essential cotton t-shirt perfect for everyday wear',
      price: 29.99,
      category: 'Tops',
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80'],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White', 'Black', 'Gray'],
      fabric_type: 'Cotton',
      care_instructions: ['Machine wash cold', 'Tumble dry low'],
      in_stock: true,
      rating: 4.5,
      reviews_count: 128,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Slim Fit Jeans',
      description: 'Modern slim fit jeans with stretch comfort',
      price: 79.99,
      category: 'Bottoms',
      images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80'],
      sizes: ['28', '30', '32', '34'],
      colors: ['Blue', 'Black'],
      fabric_type: 'Denim',
      care_instructions: ['Machine wash cold', 'Line dry'],
      in_stock: true,
      rating: 4.8,
      reviews_count: 95,
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Leather Jacket',
      description: 'Classic leather jacket with modern details',
      price: 199.99,
      category: 'Outerwear',
      images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80'],
      sizes: ['S', 'M', 'L'],
      colors: ['Black', 'Brown'],
      fabric_type: 'Leather',
      care_instructions: ['Professional leather clean only'],
      in_stock: true,
      rating: 4.9,
      reviews_count: 67,
      created_at: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Summer Dress',
      description: 'Light and breezy summer dress with floral pattern',
      price: 89.99,
      category: 'Dresses',
      images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80'],
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Floral Print'],
      fabric_type: 'Cotton Blend',
      care_instructions: ['Hand wash cold', 'Line dry'],
      in_stock: true,
      rating: 4.7,
      reviews_count: 42,
      created_at: new Date().toISOString(),
    }
  ];
}