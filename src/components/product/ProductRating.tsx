import { Star } from 'lucide-react';

interface ProductRatingProps {
  rating: number;
  reviewsCount: number;
}

export default function ProductRating({ rating, reviewsCount }: ProductRatingProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">
        ({reviewsCount} reviews)
      </span>
    </div>
  );
}