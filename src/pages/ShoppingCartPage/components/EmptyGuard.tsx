import { useCart } from '@/providers/CartProvider';
import EmptyCartSection from './EmptyCartSection';

export default function EmptyCartGuard({ children }: { children: React.ReactNode }) {
  const { cart } = useCart();
  const isEmpty = cart.length === 0;

  return isEmpty ? <EmptyCartSection /> : children;
}
