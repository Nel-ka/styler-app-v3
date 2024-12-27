import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../types';
import ColorOptions from './ColorOptions';
import WishlistButton from './WishlistButton';
import ProductRating from '../ProductRating';
import { checkColorAvailability, getAvailableSizes } from '../../../utils/inventory';

interface ProductCardProps {
  product: Product;
  onAuthRequired: () => void;
}

export default function ProductCard({ product, onAuthRequired }: ProductCardProps) {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  // Only show colors with available stock
  const availableColors = product.colors?.filter(color => 
    checkColorAvailability(product.inventory, color)
  ) || [];

  if (availableColors.length === 0) return null;

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-lg shadow-md overflow-hidden 
                 transition-transform hover:scale-[1.02] cursor-pointer"
    >
      <div className="relative pb-[100%]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <WishlistButton
          productId={product.id}
          onAuthRequired={onAuthRequired}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 group-hover:text-gray-700">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold">
            ${product.price.toFixed(2)}
          </span>
          <ProductRating
            rating={product.rating}
            reviewsCount={product.reviews_count}
          />
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {availableColors.length > 0 && (
          <ColorOptions
            colors={availableColors}
            inventory={product.inventory}
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
          />
        )}
      </div>
    </div>
  );
}