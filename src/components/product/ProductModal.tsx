import { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { Product } from '../../types';
import ProductGallery from './ProductGallery';
import ProductRating from './ProductRating';
import QuantitySelector from './ProductOptions/QuantitySelector';
import SizeSelector from './ProductOptions/SizeSelector';
import ColorSelector from './ProductOptions/ColorSelector';
import { checkColorAvailability, getStockQuantity } from '../../utils/inventory';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAuthRequired: () => void;
}

export default function ProductModal({ product, onClose, onAuthRequired }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Filter available colors
  const availableColors = useMemo(() => 
    product.colors?.filter(color => checkColorAvailability(product.inventory, color)) || [],
    [product]
  );

  // Calculate max quantity based on selected options
  const maxQuantity = useMemo(() => {
    if (!selectedColor || !selectedSize) return 0;
    return getStockQuantity(product.inventory, selectedColor, selectedSize);
  }, [product.inventory, selectedColor, selectedSize]);

  const canAddToCart = selectedColor && selectedSize && quantity > 0 && quantity <= maxQuantity;

  const totalPrice = product.price * quantity;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex justify-end p-4 border-b">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductGallery images={product.images} alt={product.name} />
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <ProductRating
                  rating={product.rating}
                  reviewsCount={product.reviews_count}
                />
              </div>

              <div>
                <div className="text-3xl font-bold">
                  ${totalPrice.toFixed(2)}
                </div>
                {quantity > 1 && (
                  <div className="text-sm text-gray-600">
                    ${product.price.toFixed(2)} each
                  </div>
                )}
              </div>

              {availableColors.length > 0 && (
                <ColorSelector
                  colors={availableColors}
                  inventory={product.inventory}
                  selectedColor={selectedColor}
                  onSelect={setSelectedColor}
                />
              )}

              {selectedColor && product.sizes && (
                <SizeSelector
                  sizes={product.sizes}
                  inventory={product.inventory}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                  onSelect={setSelectedSize}
                />
              )}

              {selectedColor && selectedSize && (
                <QuantitySelector
                  quantity={quantity}
                  onChange={setQuantity}
                  max={maxQuantity}
                />
              )}

              <button
                onClick={() => canAddToCart && console.log('Add to cart')}
                disabled={!canAddToCart}
                className="w-full py-3 px-4 bg-gray-900 text-white rounded-full
                         disabled:bg-gray-300 disabled:cursor-not-allowed
                         hover:bg-gray-800 transition-colors"
              >
                Add to Cart
              </button>

              <div className="prose prose-sm">
                <h3 className="font-semibold">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}