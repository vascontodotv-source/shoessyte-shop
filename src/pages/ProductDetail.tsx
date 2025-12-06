import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart, Check } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const product = products.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Producto no encontrado</h1>
          <Button variant="outline" onClick={() => navigate('/products')}>
            <ArrowLeft className="h-4 w-4" />
            Volver a productos
          </Button>
        </div>
      </Layout>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Inicia sesión para agregar productos al carrito');
      navigate('/login');
      return;
    }

    if (!selectedSize) {
      toast.error('Por favor selecciona una talla');
      return;
    }

    if (!selectedColor) {
      toast.error('Por favor selecciona un color');
      return;
    }

    addToCart(product, selectedSize, selectedColor);
    setAddedToCart(true);
    toast.success('¡Producto agregado al carrito!');

    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative">
            {discount > 0 && (
              <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-lg">
                -{discount}% OFF
              </div>
            )}
            <div className="aspect-square rounded-2xl overflow-hidden bg-card animate-fade-in">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-slide-up">
            <p className="text-primary font-medium uppercase tracking-wider mb-2">
              {product.brand}
            </p>
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-medium text-foreground">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">({product.reviews} reseñas)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-muted-foreground mb-8">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Talla</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedColor === color
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                variant={addedToCart ? 'secondary' : 'gradient'}
                size="xl"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5" />
                    ¡Agregado!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Agregar al Carrito
                  </>
                )}
              </Button>
              <Button variant="outline" size="icon" className="h-14 w-14">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Category Tag */}
            <div className="mt-8 pt-6 border-t border-border">
              <span className="text-sm text-muted-foreground">Categoría: </span>
              <span className="text-sm font-medium text-foreground">{product.category}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
