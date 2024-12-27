import { useMemo } from 'react';
import { ColorSizeInventory } from '../../../types/inventory';
import { checkColorAvailability, getTotalStockForColor } from '../../../utils/inventory';
import { cn } from '../../../utils/styles';

interface ColorSelectorProps {
  colors: string[];
  inventory: ColorSizeInventory;
  selectedColor: string | null;
  onSelect: (color: string) => void;
  className?: string;
}

export default function ColorSelector({
  colors,
  inventory,
  selectedColor,
  onSelect,
  className
}: ColorSelectorProps) {
  const availableColors = useMemo(() => {
    return colors.filter(color => checkColorAvailability(inventory, color));
  }, [colors, inventory]);

  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-gray-700">
        Color
      </label>
      <div className="flex flex-wrap gap-2">
        {colors.map(color => {
          const isAvailable = availableColors.includes(color);
          const stock = getTotalStockForColor(inventory, color);
          
          return (
            <button
              key={color}
              onClick={() => isAvailable && onSelect(color)}
              disabled={!isAvailable}
              className={cn(
                "w-10 h-10 rounded-full border-2 relative transition-all",
                selectedColor === color && "ring-2 ring-gray-900 ring-offset-2",
                isAvailable ? "hover:scale-110" : "opacity-50 cursor-not-allowed"
              )}
              style={{ backgroundColor: color.toLowerCase() }}
              title={`${color}${!isAvailable ? ' (Out of Stock)' : ''}`}
            >
              {!isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-gray-500 rotate-45" />
                </div>
              )}
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