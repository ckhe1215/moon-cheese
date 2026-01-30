import type { Product } from '@/api/queryOptions';
import { useCurrency } from '@/providers/CurrencyProvider';
import { formatPrice } from '@/utils/formatPrice';
import { useNavigate } from 'react-router';
import ProductItem from './ProductItem';

export default function SellingProductItem({ item, counter }: { item: Product; counter?: React.ReactNode }) {
  const { currency, exchangeRate } = useCurrency();
  const navigate = useNavigate();

  const handleClickProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

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
      {counter}
    </ProductItem.Root>
  );
}
