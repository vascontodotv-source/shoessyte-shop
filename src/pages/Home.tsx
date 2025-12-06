import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/data/products';

const features = [
  { icon: Truck, title: 'Envío Gratis', description: 'En compras mayores a $1,500' },
  { icon: Shield, title: 'Pago Seguro', description: 'Transacciones protegidas' },
  { icon: RotateCcw, title: 'Devoluciones', description: '30 días para cambios' },
  { icon: Headphones, title: 'Soporte 24/7', description: 'Siempre disponibles' },
];

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-50" />
        
        <div className="container relative z-10">
          <div className="max-w-2xl animate-slide-up">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
              Nueva Colección 2024
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-foreground leading-tight mb-6">
              ELEVA TU <span className="text-gradient">ESTILO</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Descubre la colección más exclusiva de sneakers. Diseño, comodidad y tecnología en cada paso.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button variant="gradient" size="xl">
                  Ver Catálogo
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="xl">
                Ofertas Especiales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-y border-border bg-card/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-4 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
                PRODUCTOS DESTACADOS
              </h2>
              <p className="text-muted-foreground">Los favoritos de nuestros clientes</p>
            </div>
            <Link to="/products" className="hidden md:block">
              <Button variant="ghost">
                Ver todos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/products">
              <Button variant="outline">
                Ver todos los productos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="relative rounded-2xl overflow-hidden gradient-primary p-8 md:p-16 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtMmgtMnYtMmgydi0ySDJ2MmgydjJIMnYyaDJ2NGgtMnYyaDJ2MmgtMnYyaDJ2MmgtMnYyaDR2LTJoMnYyaDJ2LTJoMnYyaDJ2LTJoMnYyaDJ2LTJoMnYyaDJ2LTJoMnYyaDJ2LTJoMnYtMmgydi0yaC0ydi0yaDJ2LTJoLTJ2LTRoMnYtMmgtMnYtMmgydi0ySDM2djJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-5xl text-primary-foreground mb-4">
                ¿LISTO PARA EL CAMBIO?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
                Regístrate ahora y obtén un 10% de descuento en tu primera compra
              </p>
              <Link to="/register">
                <Button variant="secondary" size="xl">
                  Únete Ahora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container text-center">
          <p className="font-display text-2xl text-gradient mb-2">SHOESSYTE</p>
          <p className="text-sm text-muted-foreground">
            © 2024 ShoesSyte App. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </Layout>
  );
}
