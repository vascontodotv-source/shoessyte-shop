import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative bg-card rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10">
        {discount > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-md">
            -{discount}%
          </div>
        )}
        
        <div className="relative aspect-square overflow-hidden bg-secondary/50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-4">
          <p className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
            {product.brand}
          </p>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{product.category}</p>

          <div className="flex items-center gap-1 mt-2">
            <Star className="h-3 w-3 fill-warning text-warning" />
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-lg font-bold text-foreground">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
