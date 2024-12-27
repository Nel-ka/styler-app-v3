import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import { cn } from '../../utils/styles';

interface ProductCardProps {
  product: Product;
  onAuthRequired: () => void;
}

export default function ProductCard({ product, onAuthRequired }: ProductCardProps) {
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);

  const handleWishlistClick = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    setIsWishlistLoading(true);
    try {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product.id);
      }
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const handleCartClick = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    setIsCartLoading(true);
    try {
      await addToCart(product.id);
    } finally {
      setIsCartLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative pb-[100%]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleWishlistClick}
              disabled={isWishlistLoading}
              className={cn(
                "p-2 rounded-full transition-colors",
                isWishlistLoading ? "opacity-50 cursor-wait" : "hover:bg-gray-100",
                isInWishlist(product.id) ? "text-red-500" : "text-gray-500"
              )}
            >
              <Heart
                className="w-6 h-6"
                fill={isInWishlist(product.id) ? "currentColor" : "none"}
              />
            </button>
            
            <button
              onClick={handleCartClick}
              disabled={isCartLoading || isInCart(product.id)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full transition-colors",
                isInCart(product.id)
                  ? "bg-green-500 text-white"
                  : "bg-gray-900 text-white hover:bg-gray-800",
                (isCartLoading || isInCart(product.id)) && "opacity-50 cursor-not-allowed"
              )}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{isInCart(product.id) ? 'In Cart' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}