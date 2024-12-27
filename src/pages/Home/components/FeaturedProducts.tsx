import { useProducts } from '../hooks/useProducts';
import ProductCard from '../../NewArrivals/components/ProductCard';

export default function FeaturedProducts() {
  const { products, loading, error } = useProducts({ featured: true, limit: 4 });

  if (loading || error) return null;

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}