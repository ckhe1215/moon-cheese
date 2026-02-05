import AsyncBoundary from '@/components/AsyncBoundary';
import { useCart } from '@/providers/CartProvider';
import CheckoutSection from './components/CheckoutSection';
import DeliveryMethodSection from './components/DeliveryMethodSection';
import EmptyCartSection from './components/EmptyCartSection';
import ShoppingCartSection from './components/ShoppingCartSection';

function ShoppingCartPage() {
  return (
    <AsyncBoundary>
      <EmptyCartGuard>
        <ShoppingCartSection />
        <DeliveryMethodSection />
        <CheckoutSection />
      </EmptyCartGuard>
    </AsyncBoundary>
  );
}

function EmptyCartGuard({ children }: { children: React.ReactNode }) {
  const { cart } = useCart();
  const isEmpty = Object.keys(cart).length === 0;

  return isEmpty ? <EmptyCartSection /> : children;
}

export default ShoppingCartPage;
