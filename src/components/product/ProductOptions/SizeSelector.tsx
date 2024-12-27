import { useMemo } from 'react';
import { Ruler } from 'lucide-react';
import { ColorSizeInventory } from '../../../types/inventory';
import { getAvailableSizes, getStockQuantity } from '../../../utils/inventory';
import { cn } from '../../../utils/styles';

interface SizeSelectorProps {
  sizes: string[];
  inventory: ColorSizeInventory;
  selectedColor: string | null;
  selectedSize: string | null;
  onSelect: (size: string) => void;
  className?: string;
}

export default function SizeSelector({
  sizes,
  inventory,
  selectedColor,
  selectedSize,
  onSelect,
  className
}: SizeSelectorProps) {
  const availableSizes = useMemo(() => {
    if (!selectedColor) return [];
    return getAvailableSizes(inventory, selectedColor);
  }, [inventory, selectedColor]);

  if (!selectedColor) {
    return (
      <div className={className}>
        <p className="text-sm text-gray-500">Please select a color first</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Size
        </label>
        <button 
          onClick={() => window.open('/size-guide', '_blank')}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
        >
          <Ruler className="w-4 h-4 mr-1" />
          Size Guide
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {sizes.map(size => {
          const stock = getStockQuantity(inventory, selectedColor, size);
          const isAvailable = stock > 0;
          
          return (
            <button
              key={size}
              onClick={() => isAvailable && onSelect(size)}
              disabled={!isAvailable}
              className={cn(
                "py-2 px-4 rounded-md border text-sm font-medium relative",
                selectedSize === size 
                  ? "border-gray-900 bg-gray-900 text-white" 
                  : "border-gray-300 hover:border-gray-900",
                !isAvailable && "opacity-50 cursor-not-allowed"
              )}
            >
              {size}
              {isAvailable && stock <= 5 && (
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-red-500 whitespace-nowrap">
                  {stock} left
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}