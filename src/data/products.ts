import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Air Max Velocity',
    brand: 'Nike',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    category: 'Running',
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ['Rojo', 'Negro', 'Blanco'],
    description: 'Experimenta la máxima comodidad con la tecnología Air Max. Diseñados para corredores que buscan rendimiento y estilo.',
    rating: 4.8,
    reviews: 234
  },
  {
    id: '2',
    name: 'Ultra Boost Pro',
    brand: 'Adidas',
    price: 2899,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
    category: 'Running',
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    colors: ['Negro', 'Gris', 'Blanco'],
    description: 'Boost tu energía con cada paso. La espuma Boost proporciona retorno de energía inigualable.',
    rating: 4.9,
    reviews: 189
  },
  {
    id: '3',
    name: 'Classic Leather',
    brand: 'Reebok',
    price: 1599,
    originalPrice: 1899,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
    category: 'Casual',
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
    colors: ['Blanco', 'Beige', 'Negro'],
    description: 'El clásico que nunca pasa de moda. Piel genuina y comodidad durante todo el día.',
    rating: 4.6,
    reviews: 312
  },
  {
    id: '4',
    name: 'Jordan Retro High',
    brand: 'Nike',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800',
    category: 'Basketball',
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: ['Rojo/Negro', 'Azul/Blanco', 'Negro/Oro'],
    description: 'El icónico diseño que revolucionó el baloncesto. Estilo y rendimiento en la cancha.',
    rating: 4.9,
    reviews: 567
  },
  {
    id: '5',
    name: 'Suede Classic',
    brand: 'Puma',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=800',
    category: 'Casual',
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
    colors: ['Azul', 'Verde', 'Negro'],
    description: 'El legendario Suede que ha definido generaciones. Gamuza premium y suela de goma.',
    rating: 4.5,
    reviews: 198
  },
  {
    id: '6',
    name: 'Chuck Taylor All Star',
    brand: 'Converse',
    price: 999,
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800',
    category: 'Casual',
    sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
    colors: ['Negro', 'Blanco', 'Rojo'],
    description: 'El ícono americano que ha conquistado al mundo. Canvas duradero y estilo atemporal.',
    rating: 4.7,
    reviews: 892
  },
  {
    id: '7',
    name: 'RS-X Reinvention',
    brand: 'Puma',
    price: 1899,
    originalPrice: 2199,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
    category: 'Lifestyle',
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5],
    colors: ['Multicolor', 'Negro/Rojo', 'Blanco/Azul'],
    description: 'Diseño retro con tecnología moderna. La reinvención del running system.',
    rating: 4.4,
    reviews: 156
  },
  {
    id: '8',
    name: 'Gel-Kayano 28',
    brand: 'Asics',
    price: 2699,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800',
    category: 'Running',
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
    colors: ['Azul', 'Negro', 'Gris'],
    description: 'Soporte y estabilidad premium para tus carreras más largas. Gel technology.',
    rating: 4.8,
    reviews: 423
  }
];

export const categories = ['Todos', 'Running', 'Casual', 'Basketball', 'Lifestyle'];

export const brands = ['Todas', 'Nike', 'Adidas', 'Reebok', 'Puma', 'Converse', 'Asics'];
