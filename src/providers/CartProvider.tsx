import type { Product } from '@/api/queryOptions';
import { createContext, useContext, useState } from 'react';

type CartItem = {
  quantity: number;
} & Product;

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  addToCartWithCount: (product: Product, count: number) => void;
  removeFromCart: (product: Product) => void;
  removeAllFromCart: (product: Product) => void;
  emptyCart: () => void;
  getItemQuantity: (productId: number) => number;
}

const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existingProduct = cart.find(cartItem => cartItem.id === product.id);
    const quantity = existingProduct?.quantity ?? 0;
    addToCartWithCount(product, quantity + 1);
  };

  const addToCartWithCount = (product: Product, count: number) => {
    setCart(prev => {
      const newCartItem = {
        ...product,
        quantity: count,
      };
      return [...prev.filter(cartItem => cartItem.id !== product.id), newCartItem];
    });
  };

  const removeFromCart = (product: Product) => {
    const quantity = getItemQuantity(product.id);
    if (quantity === 0) {
      return;
    }
    if (quantity === 1) {
      removeAllFromCart(product);
      return;
    }

    setCart(prev => {
      const newCartItem = {
        ...product,
        quantity: quantity - 1,
      };
      return [...prev.filter(cartItem => cartItem.id !== product.id), newCartItem];
    });
  };

  const removeAllFromCart = (product: Product) => {
    setCart(prev => prev.filter(cartItem => cartItem.id !== product.id));
  };

  const getItemQuantity = (productId: number) => {
    return cart.find(cartItem => cartItem.id === productId)?.quantity ?? 0;
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, addToCartWithCount, removeFromCart, removeAllFromCart, emptyCart, getItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
