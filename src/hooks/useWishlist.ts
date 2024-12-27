import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { WishlistItem } from '../types';
import { useAuth } from '../context/AuthContext';

export function useWishlist() {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [user]);

  async function fetchWishlist() {
    try {
      const { data } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', user?.id);
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  }

  async function addToWishlist(productId: string) {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('wishlists')
        .upsert({ user_id: user.id, product_id: productId });
      
      if (!error) {
        await fetchWishlist();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return false;
    }
  }

  async function removeFromWishlist(productId: string) {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (!error) {
        await fetchWishlist();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return false;
    }
  }

  return {
    items,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist: (productId: string) => items.some(item => item.product_id === productId)
  };
}