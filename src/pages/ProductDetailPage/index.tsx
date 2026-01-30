import { productIdQueryOptions } from '@/api/queryOptions';
import { Spacing, type TagType } from '@/ui-lib';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { CartActionProvider } from './components/CartActionProvider';
import ProductDetailSection from './components/ProductDetailSection';
import ProductInfoSection from './components/ProductInfoSection';
import RecommendationSection from './components/RecommendationSection';
import ThumbnailSection from './components/ThumbnailSection';

export const TAG_TYPES: TagType[] = ['cheese', 'cracker', 'tea'];

export const isTagType = (type: string): type is TagType => {
  return TAG_TYPES.includes(type as TagType);
};

function ProductDetailPage() {
  const { id } = useParams();
  const { data: product } = useSuspenseQuery(productIdQueryOptions(Number(id)));

  const category = product.category.toLowerCase();
  const safeCategory: TagType = isTagType(category) ? category : 'cheese';

  return (
    <>
      <ThumbnailSection images={product.images} />
      <CartActionProvider>
        <ProductInfoSection
          name={product.name}
          category={safeCategory}
          rating={product.rating}
          price={product.price}
          quantity={product.stock}
          counter={<CartActionProvider.Counter productId={product.id} stock={product.stock} />}
          addToCartButton={<CartActionProvider.Button productId={product.id} />}
        />
      </CartActionProvider>

      <Spacing size={2.5} />

      <ProductDetailSection description={product.description} />

      <Spacing size={2.5} />

      <RecommendationSection productId={product.id} />
    </>
  );
}

export default ProductDetailPage;
