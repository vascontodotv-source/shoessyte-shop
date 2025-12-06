import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Download, Home, Printer } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

interface OrderItem {
  name: string;
  brand: string;
  size: number;
  color: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface OrderData {
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  customerName: string;
  customerEmail: string;
  date: string;
  change: number;
}

const paymentMethodNames: Record<string, string> = {
  credit: 'Tarjeta de Crédito',
  debit: 'Tarjeta de Débito',
  cash: 'Efectivo',
  mercadopago: 'Mercado Pago'
};

export default function Receipt() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = localStorage.getItem('shoessyte_last_order');
    if (orderData) {
      setOrder(JSON.parse(orderData));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handlePrint = () => {
    window.print();
  };

  if (!order) return null;

  const orderDate = new Date(order.date);

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-md mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8 animate-scale-in">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
              <Check className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl text-foreground mb-2">¡COMPRA EXITOSA!</h1>
            <p className="text-muted-foreground">Gracias por tu compra</p>
          </div>

          {/* Receipt */}
          <div className="bg-card rounded-2xl overflow-hidden shadow-xl print:shadow-none animate-slide-up" id="receipt">
            {/* Header */}
            <div className="gradient-primary p-6 text-center">
              <h2 className="font-display text-3xl text-primary-foreground">SHOESSYTE</h2>
              <p className="text-primary-foreground/80 text-sm mt-1">Ticket de Compra</p>
            </div>

            {/* Order Info */}
            <div className="p-6">
              <div className="text-center border-b border-border pb-4 mb-4">
                <p className="text-xs text-muted-foreground">ORDEN</p>
                <p className="font-display text-xl text-foreground">{order.orderId}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {orderDate.toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              {/* Customer Info */}
              <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground">Cliente</p>
                <p className="font-medium text-foreground">{order.customerName}</p>
                <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
              </div>

              {/* Items */}
              <div className="space-y-3 mb-4">
                <p className="text-sm font-semibold text-foreground">Productos</p>
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm py-2 border-b border-border/50">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.brand} {item.name}</p>
                      <p className="text-muted-foreground text-xs">
                        Talla: {item.size} | Color: {item.color} | Cant: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-foreground">${item.subtotal.toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Envío</span>
                  <span>{order.shipping === 0 ? 'Gratis' : `$${order.shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-foreground pt-2 border-t border-border">
                  <span>TOTAL</span>
                  <span className="text-primary">${order.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Método de pago</span>
                  <span className="font-medium text-foreground">
                    {paymentMethodNames[order.paymentMethod]}
                  </span>
                </div>
                {order.paymentMethod === 'cash' && order.change > 0 && (
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">Cambio</span>
                    <span className="font-medium text-success">${order.change.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="text-center mt-6 pt-4 border-t border-dashed border-border">
                <p className="text-primary font-display text-lg">¡GRACIAS POR TU COMPRA!</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Este es tu comprobante de compra.<br />
                  Guárdalo para cualquier aclaración.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6 print:hidden">
            <Button variant="outline" className="flex-1" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="gradient" className="flex-1" onClick={() => navigate('/')}>
              <Home className="h-4 w-4" />
              Inicio
            </Button>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </Layout>
  );
}
