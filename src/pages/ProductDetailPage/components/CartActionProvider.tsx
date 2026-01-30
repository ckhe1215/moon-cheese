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

export const CartActionProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

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

function CartButton({ productId }: { productId: number }) {
  const { count } = useContext(CartActionContext);
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

function CartCounter({ productId, stock }: { productId: number; stock: number }) {
  const { count, handleCountMinus, handleCountPlus } = useContext(CartActionContext);
  const { cart } = useCart();

  const isCounterDisable = cart[productId] > 0;
  const isEmptyCart = count === 0;
  const isMaxStock = count >= stock;

  return (
    <Counter.Root>
      <Counter.Minus onClick={handleCountMinus} disabled={isCounterDisable || isEmptyCart} />
      <Counter.Display value={count} />
      <Counter.Plus onClick={() => handleCountPlus(stock)} disabled={isCounterDisable || isMaxStock} />
    </Counter.Root>
  );
}

CartActionProvider.Counter = CartCounter;
CartActionProvider.Button = CartButton;
