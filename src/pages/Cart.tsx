import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-3xl text-foreground mb-4">TU CARRITO ESTÁ VACÍO</h1>
            <p className="text-muted-foreground mb-8">
              Parece que aún no has agregado ningún producto a tu carrito
            </p>
            <Link to="/products">
              <Button variant="gradient" size="lg">
                Explorar Productos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="font-display text-4xl text-foreground mb-8">MI CARRITO</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                className="glass rounded-xl p-4 flex gap-4 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-primary font-medium uppercase">
                        {item.product.brand}
                      </p>
                      <h3 className="font-semibold text-foreground line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Talla: {item.selectedSize} | Color: {item.selectedColor}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="font-bold text-foreground">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 sticky top-24">
              <h2 className="font-display text-xl text-foreground mb-6">RESUMEN DEL PEDIDO</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Envío</span>
                  <span>{totalPrice >= 1500 ? 'Gratis' : '$99'}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-foreground font-bold text-lg">
                  <span>Total</span>
                  <span>${(totalPrice >= 1500 ? totalPrice : totalPrice + 99).toLocaleString()}</span>
                </div>
              </div>

              {totalPrice < 1500 && (
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Agrega ${(1500 - totalPrice).toLocaleString()} más para envío gratis
                </p>
              )}

              <Button
                variant="gradient"
                size="lg"
                className="w-full"
                onClick={() => navigate('/checkout')}
              >
                Proceder al Pago
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Link to="/products" className="block mt-4">
                <Button variant="ghost" className="w-full">
                  Seguir Comprando
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
