import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

export default function NavIcons() {
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <div className="flex items-center space-x-4">
      <Link to="/wishlist" className="relative p-2">
        <Heart className="w-6 h-6 text-gray-700" />
        {wishlistItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {wishlistItems.length}
          </span>
        )}
      </Link>
      
      <Link to="/cart" className="relative p-2">
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartItems.length}
          </span>
        )}
      </Link>
    </div>
  );
}