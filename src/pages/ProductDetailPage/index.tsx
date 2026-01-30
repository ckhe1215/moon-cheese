import { productIdQueryOptions } from '@/api/queryOptions';
import { Spacing, type TagType } from '@/ui-lib';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import CartButton from './components/CartButton';
import CartCounter from './components/CartCounter';
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

  const [count, setCount] = useState(0);

  const handleCountPlus = () => {
    if (count < product.stock) {
      setCount(prev => prev + 1);
    }
  };

  const handleCountMinus = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
    }
  };

  return (
    <>
      <ThumbnailSection images={product.images} />
      <ProductInfoSection
        name={product.name}
        category={safeCategory}
        rating={product.rating}
        price={product.price}
        quantity={product.stock}
        counter={
          <CartCounter
            productId={product.id}
            stock={product.stock}
            count={count}
            handleCountPlus={handleCountPlus}
            handleCountMinus={handleCountMinus}
          />
        }
        addToCartButton={<CartButton productId={product.id} count={count} />}
      />

      <Spacing size={2.5} />

      <ProductDetailSection description={product.description} />

      <Spacing size={2.5} />

      <RecommendationSection productId={product.id} />
    </>
  );
}

export default ProductDetailPage;
