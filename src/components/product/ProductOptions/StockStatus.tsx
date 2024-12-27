interface StockStatusProps {
  quantity: number;
}

export default function StockStatus({ quantity }: StockStatusProps) {
  let status = 'In Stock';
  let colorClass = 'text-green-600';

  if (quantity === 0) {
    status = 'Out of Stock';
    colorClass = 'text-red-600';
  } else if (quantity <= 5) {
    status = 'Low Stock';
    colorClass = 'text-orange-600';
  }

  return (
    <div className={`text-sm font-medium ${colorClass}`}>
      {status}
      {quantity > 0 && quantity <= 5 && ` (${quantity} left)`}
    </div>
  );
}