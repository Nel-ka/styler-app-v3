import { useState, useEffect } from 'react';
import { ProductStockStatus, checkProductStockStatus } from '../../utils/product-status';

export default function ProductStockIndicator() {
  const [stockStatus, setStockStatus] = useState<ProductStockStatus[]>([]);

  useEffect(() => {
    async function loadStockStatus() {
      const status = await checkProductStockStatus();
      setStockStatus(status);
    }
    loadStockStatus();
  }, []);

  if (stockStatus.length === 0) return null;

  return (
    <div className="space-y-2">
      {stockStatus.map(status => (
        <div 
          key={status.productId}
          className={`p-2 rounded-md ${
            status.isResolved ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          <p className="text-sm">
            Product {status.productId}: {status.message}
          </p>
        </div>
      ))}
    </div>
  );
}