import type { Product } from '@/api/queryOptions';
import { useCart } from '@/providers/CartProvider';
import { Button, Counter } from '@/ui-lib';
import { createContext, useContext, useState } from 'react';

interface CartActionContextType {
  count: number;
  handleCountMinus: () => void;
  handleCountPlus: (stock: number) => void;
}

const CartActionContext = createContext<CartActionContextType>({
  count: 0,
  handleCountMinus: () => {},
  handleCountPlus: () => {},
});

export const CartActionProvider = ({ productId, children }: { productId: number; children: React.ReactNode }) => {
  const { getItemQuantity } = useCart();
  const cartItemCount = getItemQuantity(productId);
  const [count, setCount] = useState(cartItemCount);

  const handleCountMinus = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
    }
  };

  const handleCountPlus = (stock: number) => {
    if (count < stock) {
      setCount(prev => prev + 1);
    }
  };

  return (
    <CartActionContext.Provider value={{ count, handleCountMinus, handleCountPlus }}>
      {children}
    </CartActionContext.Provider>
  );
};

function CartButton({ product }: { product: Product }) {
  const { count } = useContext(CartActionContext);
  const { addToCartWithCount, removeAllFromCart, getItemQuantity } = useCart();

  const handleAddToCart = (product: Product, count: number) => {
    addToCartWithCount(product, count);
  };

  const handleRemoveFromCart = (product: Product) => {
    removeAllFromCart(product);
  };

  const cartItemCount = getItemQuantity(product.id);

  if (cartItemCount > 0) {
    return (
      <Button fullWidth color="primary" size="lg" onClick={() => handleRemoveFromCart(product)}>
        장바구니에서 제거
      </Button>
    );
  }

  return (
    <Button fullWidth color="primary" size="lg" onClick={() => handleAddToCart(product, count)}>
      장바구니 담기
    </Button>
  );
}

function CartCounter({ product }: { product: Product }) {
  const { count, handleCountMinus, handleCountPlus } = useContext(CartActionContext);
  const { getItemQuantity } = useCart();

  const isCounterDisable = getItemQuantity(product.id) > 0;
  const isEmptyCart = count === 0;
  const isMaxStock = count >= product.stock;

  return (
    <Counter.Root>
      <Counter.Minus onClick={handleCountMinus} disabled={isCounterDisable || isEmptyCart} />
      <Counter.Display value={count} />
      <Counter.Plus onClick={() => handleCountPlus(product.stock)} disabled={isCounterDisable || isMaxStock} />
    </Counter.Root>
  );
}

CartActionProvider.Counter = CartCounter;
CartActionProvider.Button = CartButton;
