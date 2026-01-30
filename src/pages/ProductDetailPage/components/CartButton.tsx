import { useCart } from '@/providers/CartProvider';
import { Button } from '@/ui-lib';

export default function CartButton({ productId, count }: { productId: number; count: number }) {
  const { cart, addToCartWithCount, removeAllFromCart } = useCart();

  const handleAddToCart = (productId: number, count: number) => {
    addToCartWithCount(productId, count);
  };

  const handleRemoveFromCart = (productId: number) => {
    removeAllFromCart(productId);
  };

  const cartItemCount = cart[productId] ?? 0;

  if (cartItemCount > 0) {
    return (
      <Button fullWidth color="primary" size="lg" onClick={() => handleRemoveFromCart(productId)}>
        장바구니에서 제거
      </Button>
    );
  }

  return (
    <Button fullWidth color="primary" size="lg" onClick={() => handleAddToCart(productId, count)}>
      장바구니 담기
    </Button>
  );
}
