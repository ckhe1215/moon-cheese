import { useCart } from '@/providers/CartProvider';
import type { Product } from '@/server/data';
import { Counter } from '@/ui-lib';

export default function CartCounter({ product, min, max }: { product: Product; min?: number; max?: number }) {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleRemoveFromCart = (product: Product) => {
    removeFromCart(product);
  };

  const cartItemCount = getItemQuantity(product.id);
  const isEmptyCart = cartItemCount === (min ?? 0);
  const isMaxStock = cartItemCount >= (max ?? product.stock);

  return (
    <Counter.Root
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Counter.Minus onClick={() => handleRemoveFromCart(product)} disabled={isEmptyCart} />
      <Counter.Display value={cartItemCount} />
      <Counter.Plus onClick={() => handleAddToCart(product)} disabled={isMaxStock} />
    </Counter.Root>
  );
}
