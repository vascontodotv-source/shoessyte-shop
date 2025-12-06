export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  sizes: number[];
  colors: string[];
  description: string;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: number;
  selectedColor: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export type PaymentMethod = 'credit' | 'debit' | 'cash' | 'mercadopago';

export interface PaymentDetails {
  method: PaymentMethod;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
  cashAmount?: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  date: Date;
  status: 'completed' | 'pending' | 'cancelled';
}
