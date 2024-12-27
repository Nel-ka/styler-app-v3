import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CartItem } from '../types';
import { useAuth } from '../context/AuthContext';

export function useCart() {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [user]);

  async function fetchCart() {
    try {
      const { data } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user?.id);
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }

  async function addToCart(productId: string, quantity: number = 1) {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('cart_items')
        .upsert({ 
          user_id: user.id, 
          product_id: productId,
          quantity
        });
      
      if (!error) {
        await fetchCart();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  }

  async function removeFromCart(productId: string) {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (!error) {
        await fetchCart();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  }

  return {
    items,
    loading,
    addToCart,
    removeFromCart,
    isInCart: (productId: string) => items.some(item => item.product_id === productId),
    getQuantity: (productId: string) => items.find(item => item.product_id === productId)?.quantity || 0
  };
}