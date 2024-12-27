import { Heart, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

interface ProductActionsProps {
  productId: string;
  onAuthRequired: () => void;
}

export default function ProductActions({ productId, onAuthRequired }: ProductActionsProps) {
  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleCartClick = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    await addToCart(productId);
  };

  const handleWishlistClick = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    
    const inWishlist = isInWishlist(productId);
    if (inWishlist) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleWishlistClick}
        className={`p-2 rounded-full ${
          isInWishlist(productId) ? 'text-red-500' : 'text-gray-500'
        } hover:bg-gray-100`}
      >
        <Heart className="w-6 h-6" fill={isInWishlist(productId) ? 'currentColor' : 'none'} />
      </button>
      
      <button
        onClick={handleCartClick}
        disabled={isInCart(productId)}
        className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 disabled:opacity-50"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>{isInCart(productId) ? 'In Cart' : 'Add to Cart'}</span>
      </button>
    </div>
  );
}