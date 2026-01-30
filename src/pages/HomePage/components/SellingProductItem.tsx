import type { Product } from '@/api/queryOptions';
import PriceDisplay from '@/components/PriceDisplay';
import { useNavigate } from 'react-router';
import ProductItem from './ProductItem';

export default function SellingProductItem({ item, counter }: { item: Product; counter?: React.ReactNode }) {
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
          <ProductItem.Price>
            <PriceDisplay price={item.price} />
          </ProductItem.Price>
        </ProductItem.MetaLeft>
        {item.isGlutenFree && <ProductItem.FreeTag type="gluten" />}
        {item.isCaffeineFree && <ProductItem.FreeTag type="caffeine" />}
      </ProductItem.Meta>
      {counter}
    </ProductItem.Root>
  );
}
