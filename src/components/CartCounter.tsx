import { useCart } from '@/providers/CartProvider';
import type { Product } from '@/server/data';
import { Counter } from '@/ui-lib';

export default function CartCounter({ product, min, max }: { product: Product; min?: number; max?: number }) {
  const { cart, addToCart, removeFromCart } = useCart();

  const handleAddToCart = (productId: number) => {
    addToCart(productId);
  };

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
  };

  const cartItemCount = cart[product.id] ?? 0;
  const isEmptyCart = cartItemCount === (min ?? 0);
  const isMaxStock = cartItemCount >= (max ?? product.stock);

  return (
    <Counter.Root>
      <Counter.Minus onClick={() => handleRemoveFromCart(product.id)} disabled={isEmptyCart} />
      <Counter.Display value={cartItemCount} />
      <Counter.Plus onClick={() => handleAddToCart(product.id)} disabled={isMaxStock} />
    </Counter.Root>
  );
}
