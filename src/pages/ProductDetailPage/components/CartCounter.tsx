import { useCart } from '@/providers/CartProvider';
import { Counter } from '@/ui-lib';

export default function CartCounter({
  productId,
  stock,
  count,
  handleCountPlus,
  handleCountMinus,
}: {
  productId: number;
  stock: number;
  count: number;
  handleCountPlus: () => void;
  handleCountMinus: () => void;
}) {
  const { cart } = useCart();

  const isCounterDisable = cart[productId] > 0;
  const isEmptyCart = count === 0;
  const isMaxStock = count >= stock;
  return (
    <Counter.Root>
      <Counter.Minus onClick={handleCountMinus} disabled={isCounterDisable || isEmptyCart} />
      <Counter.Display value={count} />
      <Counter.Plus onClick={handleCountPlus} disabled={isCounterDisable || isMaxStock} />
    </Counter.Root>
  );
}
