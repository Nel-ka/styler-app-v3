// Add to existing types
export interface CartItem {
  id: string;
  product_id: string;
  user_id: string;
  quantity: number;
  created_at: string;
}

export interface WishlistItem {
  id: string;
  product_id: string;
  user_id: string;
  created_at: string;
}