import type { Product } from '@/api/queryOptions';
import CartCounter from '@/components/CartCounter';
import PriceDisplay from '@/components/PriceDisplay';
import { Link } from 'react-router';
import ProductItem from './ProductItem';

function SellingProductItem({ product, bottomAddOn }: { product: Product; bottomAddOn?: React.ReactNode }) {
  return (
    <Link to={`/product/${product.id}`}>
      <ProductItem.Root key={product.id}>
        <ProductItem.Image src={product.images[0]} alt={product.name} />
        <ProductItem.Info title={product.name} description={product.description} />
        <ProductItem.Meta>
          <ProductItem.MetaLeft>
            <ProductItem.Rating rating={product.rating} />
            <ProductItem.Price>
              <PriceDisplay price={product.price} />
            </ProductItem.Price>
          </ProductItem.MetaLeft>
          {bottomAddOn}
        </ProductItem.Meta>
        <CartCounter product={product} />
      </ProductItem.Root>
    </Link>
  );
}

export function CheeseItem({ product }: { product: Product }) {
  return <SellingProductItem product={product} />;
}

export function CrackerItem({ product }: { product: Product }) {
  return (
    <SellingProductItem product={product} bottomAddOn={product.isGlutenFree && <ProductItem.FreeTag type="gluten" />} />
  );
}

export function TeaItem({ product }: { product: Product }) {
  return (
    <SellingProductItem
      product={product}
      bottomAddOn={product.isCaffeineFree && <ProductItem.FreeTag type="caffeine" />}
    />
  );
}
