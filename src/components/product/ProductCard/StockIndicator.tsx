interface StockIndicatorProps {
  quantity: number;
}

export default function StockIndicator({ quantity }: StockIndicatorProps) {
  if (quantity === 0) {
    return <span className="text-red-600 text-sm font-medium">Out of Stock</span>;
  }
  
  if (quantity <= 5) {
    return (
      <span className="text-orange-600 text-sm font-medium">
        Only {quantity} left
      </span>
    );
  }
  
  return <span className="text-green-600 text-sm font-medium">In Stock</span>;
}