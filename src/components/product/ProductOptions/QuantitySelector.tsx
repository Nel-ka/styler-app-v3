import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  max?: number;
}

export default function QuantitySelector({ quantity, onChange, max = 99 }: QuantitySelectorProps) {
  const increment = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={decrement}
        disabled={quantity <= 1}
        className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
      >
        <Minus className="w-4 h-4" />
      </button>
      <input
        type="number"
        min="1"
        max={max}
        value={quantity}
        onChange={(e) => onChange(Math.min(Math.max(1, parseInt(e.target.value) || 1), max))}
        className="w-16 text-center border rounded-md py-2"
      />
      <button
        onClick={increment}
        disabled={quantity >= max}
        className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}