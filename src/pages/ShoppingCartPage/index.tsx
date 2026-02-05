import AsyncBoundary from '@/components/AsyncBoundary';
import { useCart } from '@/providers/CartProvider';
import CheckoutSection from './components/CheckoutSection';
import DeliveryMethodSection from './components/DeliveryMethodSection';
import EmptyCartSection from './components/EmptyCartSection';
import ShoppingCartSection from './components/ShoppingCartSection';

function ShoppingCartPage() {
  const { cart } = useCart();

  return (
    <AsyncBoundary>
      {Object.keys(cart).length === 0 ? (
        <EmptyCartSection />
      ) : (
        <>
          <ShoppingCartSection />
          <DeliveryMethodSection />
          <CheckoutSection />
        </>
      )}
    </AsyncBoundary>
  );
}

export default ShoppingCartPage;
