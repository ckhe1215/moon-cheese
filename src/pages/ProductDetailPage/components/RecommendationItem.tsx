import { type Product } from '@/api/queryOptions';
import PriceDisplay from '@/components/PriceDisplay';
import { Link } from 'react-router';
import RecommendationProductItem from './RecommendationProductItem';

export default function RecommendationItem({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} key={product.id}>
      <RecommendationProductItem.Root>
        <RecommendationProductItem.Image src={product.images[0]} alt={product.name} />
        <RecommendationProductItem.Info name={product.name} rating={product.rating} />
        <RecommendationProductItem.Price>
          <PriceDisplay price={product.price} />
        </RecommendationProductItem.Price>
      </RecommendationProductItem.Root>
    </Link>
  );
}
