import type { Product } from '@/api/queryOptions';
import { useCart } from '@/providers/CartProvider';
import { useCurrency } from '@/providers/CurrencyProvider';
import { Counter } from '@/ui-lib';
import { formatPrice } from '@/utils/formatPrice';
import { useNavigate } from 'react-router';
import ProductItem from './ProductItem';

export default function SellingProductItem({ item }: { item: Product }) {
  const { currency, exchangeRate } = useCurrency();
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleClickProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (productId: number) => {
    addToCart(productId);
  };

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
  };

  const cartItemCount = cart[item.id] ?? 0;
  const isEmptyCart = cartItemCount === 0;
  const isMaxStock = cartItemCount >= item.stock;

  return (
    <ProductItem.Root key={item.id} onClick={() => handleClickProduct(item.id)}>
      <ProductItem.Image src={item.images[0]} alt={item.name} />
      <ProductItem.Info title={item.name} description={item.description} />
      <ProductItem.Meta>
        <ProductItem.MetaLeft>
          <ProductItem.Rating rating={item.rating} />
          <ProductItem.Price>{formatPrice(item.price, currency, exchangeRate)}</ProductItem.Price>
        </ProductItem.MetaLeft>
        {item.isGlutenFree && <ProductItem.FreeTag type="gluten" />}
        {item.isCaffeineFree && <ProductItem.FreeTag type="caffeine" />}
      </ProductItem.Meta>
      <Counter.Root>
        <Counter.Minus onClick={() => handleRemoveFromCart(item.id)} disabled={isEmptyCart} />
        <Counter.Display value={cartItemCount} />
        <Counter.Plus onClick={() => handleAddToCart(item.id)} disabled={isMaxStock} />
      </Counter.Root>
    </ProductItem.Root>
  );
}
