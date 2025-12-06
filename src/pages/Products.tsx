import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products, categories, brands } from '@/data/products';

export default function Products() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'Todas' || product.brand === selectedBrand;
      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [search, selectedCategory, selectedBrand]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('Todos');
    setSelectedBrand('Todas');
  };

  const hasActiveFilters = search || selectedCategory !== 'Todos' || selectedBrand !== 'Todas';

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-2">
            NUESTROS PRODUCTOS
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} productos disponibles
          </p>
        </div>

        {/* Search and Filters Toggle */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={showFilters ? 'default' : 'outline'}
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters}>
              <X className="h-4 w-4" />
              Limpiar
            </Button>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="glass rounded-xl p-6 mb-8 animate-slide-up">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Categoría</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Marca</h3>
                <div className="flex flex-wrap gap-2">
                  {brands.map(brand => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        selectedBrand === brand
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              No encontramos productos con esos criterios
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Ver todos los productos
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
