import { createContext, useContext, useState } from 'react';

interface CartContextProps {
  cart: Record<number, number>;
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Record<number, number>>({});

  const addToCart = (productId: number) => {
    const existingProduct = cart[productId] ?? 0;
    setCart(prev => ({ ...prev, [productId]: existingProduct + 1 }));
  };

  const removeFromCart = (productId: number) => {
    const existingProduct = cart[productId];
    if (!existingProduct) {
      return;
    }
    if (existingProduct === 1) {
      setCart(prev => {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      });
      return;
    }
    setCart(prev => ({ ...prev, [productId]: existingProduct - 1 }));
  };

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
