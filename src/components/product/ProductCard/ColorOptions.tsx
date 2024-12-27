import { useState } from 'react';
import { cn } from '../../../utils/styles';

interface ColorOptionsProps {
  colors: string[];
  inventory: Record<string, number>;
  onColorSelect: (color: string) => void;
  selectedColor: string | null;
}

export default function ColorOptions({ 
  colors, 
  inventory, 
  onColorSelect, 
  selectedColor 
}: ColorOptionsProps) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {colors.map((color) => {
        const stock = inventory[color] ?? 0;
        const isOutOfStock = stock === 0;
        
        return (
          <button
            key={color}
            onClick={(e) => {
              e.stopPropagation();
              if (!isOutOfStock) onColorSelect(color);
            }}
            disabled={isOutOfStock}
            className={cn(
              "w-6 h-6 rounded-full border relative transition-all",
              selectedColor === color && "ring-2 ring-gray-900 ring-offset-1",
              !isOutOfStock && "hover:scale-110",
              isOutOfStock && "opacity-50 cursor-not-allowed"
            )}
            style={{ backgroundColor: color.toLowerCase() }}
            title={`${color}${isOutOfStock ? ' (Out of Stock)' : ''}`}
          >
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-gray-500 rotate-45 transform origin-center" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}