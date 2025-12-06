import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Banknote, Wallet, ArrowLeft, Lock } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { PaymentMethod } from '@/types';
import { toast } from 'sonner';

const paymentMethods = [
  { id: 'credit' as PaymentMethod, name: 'Tarjeta de Crédito', icon: CreditCard },
  { id: 'debit' as PaymentMethod, name: 'Tarjeta de Débito', icon: CreditCard },
  { id: 'cash' as PaymentMethod, name: 'Efectivo', icon: Banknote },
  { id: 'mercadopago' as PaymentMethod, name: 'Mercado Pago', icon: Wallet },
];

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cashAmount, setCashAmount] = useState('');
  const [mercadoPagoEmail, setMercadoPagoEmail] = useState('');
  const [processing, setProcessing] = useState(false);

  const shippingCost = totalPrice >= 1500 ? 0 : 99;
  const finalTotal = totalPrice + shippingCost;

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ').substr(0, 19) : '';
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substr(0, 2) + '/' + cleaned.substr(2, 2);
    }
    return cleaned;
  };

  const isFormValid = (): boolean => {
    if (!selectedMethod) return false;

    if (selectedMethod === 'credit' || selectedMethod === 'debit') {
      const cleanedCard = cardNumber.replace(/\s/g, '');
      return (
        cleanedCard.length === 16 &&
        cardHolder.trim().length >= 3 &&
        expiryDate.length === 5 &&
        cvv.length >= 3
      );
    }

    if (selectedMethod === 'cash') {
      const amount = parseFloat(cashAmount);
      return !isNaN(amount) && amount >= finalTotal;
    }

    if (selectedMethod === 'mercadopago') {
      return mercadoPagoEmail.includes('@') && mercadoPagoEmail.includes('.');
    }

    return false;
  };

  const handlePayment = async () => {
    if (!isFormValid()) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate order ID
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

    // Store order details for receipt
    const orderData = {
      orderId,
      items: items.map(item => ({
        name: item.product.name,
        brand: item.product.brand,
        size: item.selectedSize,
        color: item.selectedColor,
        quantity: item.quantity,
        price: item.product.price,
        subtotal: item.product.price * item.quantity
      })),
      subtotal: totalPrice,
      shipping: shippingCost,
      total: finalTotal,
      paymentMethod: selectedMethod,
      customerName: user?.name,
      customerEmail: user?.email,
      date: new Date().toISOString(),
      change: selectedMethod === 'cash' ? parseFloat(cashAmount) - finalTotal : 0
    };

    localStorage.setItem('shoessyte_last_order', JSON.stringify(orderData));
    clearCart();
    setProcessing(false);

    navigate('/receipt');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Layout>
      <div className="container py-8">
        <Button variant="ghost" onClick={() => navigate('/cart')} className="mb-6">
          <ArrowLeft className="h-4 w-4" />
          Volver al Carrito
        </Button>

        <h1 className="font-display text-4xl text-foreground mb-8">CHECKOUT</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="glass rounded-xl p-6 mb-6">
              <h2 className="font-display text-xl text-foreground mb-6">MÉTODO DE PAGO</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedMethod === method.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <method.icon className={`h-6 w-6 mb-2 ${
                      selectedMethod === method.id ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <p className="font-medium text-foreground">{method.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            {selectedMethod && (
              <div className="glass rounded-xl p-6 animate-slide-up">
                <h2 className="font-display text-xl text-foreground mb-6">
                  {selectedMethod === 'credit' && 'DATOS DE TARJETA DE CRÉDITO'}
                  {selectedMethod === 'debit' && 'DATOS DE TARJETA DE DÉBITO'}
                  {selectedMethod === 'cash' && 'PAGO EN EFECTIVO'}
                  {selectedMethod === 'mercadopago' && 'MERCADO PAGO'}
                </h2>

                {(selectedMethod === 'credit' || selectedMethod === 'debit') && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Número de Tarjeta *
                      </label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Nombre del Titular *
                      </label>
                      <Input
                        placeholder="Como aparece en la tarjeta"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">
                          Fecha de Vencimiento *
                        </label>
                        <Input
                          placeholder="MM/AA"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">
                          CVV *
                        </label>
                        <Input
                          type="password"
                          placeholder="***"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substr(0, 4))}
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === 'cash' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        ¿Con cuánto pagas? *
                      </label>
                      <Input
                        type="number"
                        placeholder="Ingresa el monto"
                        value={cashAmount}
                        onChange={(e) => setCashAmount(e.target.value)}
                      />
                    </div>
                    {parseFloat(cashAmount) >= finalTotal && (
                      <div className="p-4 bg-success/10 rounded-lg">
                        <p className="text-success font-medium">
                          Tu cambio: ${(parseFloat(cashAmount) - finalTotal).toLocaleString()}
                        </p>
                      </div>
                    )}
                    {parseFloat(cashAmount) > 0 && parseFloat(cashAmount) < finalTotal && (
                      <p className="text-destructive text-sm">
                        El monto debe ser mayor o igual a ${finalTotal.toLocaleString()}
                      </p>
                    )}
                  </div>
                )}

                {selectedMethod === 'mercadopago' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Email de Mercado Pago *
                      </label>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        value={mercadoPagoEmail}
                        onChange={(e) => setMercadoPagoEmail(e.target.value)}
                      />
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Serás redirigido a Mercado Pago para completar el pago de forma segura.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 sticky top-24">
              <h2 className="font-display text-xl text-foreground mb-6">RESUMEN</h2>

              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="text-foreground">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Envío</span>
                  <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost}`}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-foreground font-bold text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <Button
                variant="gradient"
                size="lg"
                className="w-full mt-6"
                onClick={handlePayment}
                disabled={!isFormValid() || processing}
              >
                {processing ? (
                  <>Procesando...</>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Realizar Compra
                  </>
                )}
              </Button>

              {!isFormValid() && selectedMethod && (
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Completa todos los campos para continuar
                </p>
              )}

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Pago 100% seguro
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
