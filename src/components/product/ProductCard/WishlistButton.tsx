import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useWishlist } from '../../../hooks/useWishlist';
import { useAuth } from '../../../context/AuthContext';

interface WishlistButtonProps {
  productId: string;
  onAuthRequired: () => void;
}

export default function WishlistButton({ productId, onAuthRequired }: WishlistButtonProps) {
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    
    if (!user) {
      onAuthRequired();
      return;
    }

    setIsLoading(true);
    try {
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="absolute top-2 right-2 p-2 rounded-full bg-white/90 
                 hover:bg-white transition-colors shadow-sm
                 disabled:opacity-50 disabled:cursor-wait"
    >
      <Heart
        className={`w-5 h-5 ${
          isInWishlist(productId) ? 'fill-red-500 text-red-500' : 'text-gray-600'
        }`}
      />
    </button>
  );
}