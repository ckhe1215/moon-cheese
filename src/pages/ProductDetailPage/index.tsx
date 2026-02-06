import { productIdQueryOptions } from '@/api/queryOptions';
import AsyncBoundary from '@/components/AsyncBoundary';
import { Spacing, Text } from '@/ui-lib';
import { SuspenseQuery } from '@suspensive/react-query';
import { useParams } from 'react-router';
import { HStack, styled } from 'styled-system/jsx';
import { CartActionProvider } from './components/CartActionProvider';
import GetRecommendedProducts from './components/GetRecommendedProducts';
import ProductInfoSection from './components/ProductInfoSection';
import RecommendationItem from './components/RecommendationItem';
import ThumbnailSection from './components/ThumbnailSection';

function ProductDetailPage() {
  const { id } = useParams();

  return (
    <>
      <AsyncBoundary>
        <SuspenseQuery {...productIdQueryOptions(Number(id))}>
          {({ data: product }) => (
            <>
              <ThumbnailSection images={product.images} />
              <CartActionProvider key={product.id} productId={product.id}>
                <ProductInfoSection
                  product={product}
                  counter={<CartActionProvider.Counter product={product} />}
                  addToCartButton={<CartActionProvider.Button product={product} />}
                />
              </CartActionProvider>
              <Spacing size={2.5} />
              <styled.section css={{ bg: 'background.01_white', px: 5, pt: 5, pb: 6 }}>
                <Text variant="H2_Bold">상세 정보</Text>
                <Spacing size={4} />
                <Text variant="B2_Regular" color="neutral.02_gray">
                  {product.description}
                </Text>
              </styled.section>
            </>
          )}
        </SuspenseQuery>
      </AsyncBoundary>
      <Spacing size={2.5} />

      <AsyncBoundary>
        <styled.section css={{ bg: 'background.01_white', px: 5, pt: 5, pb: 6 }}>
          <Text variant="H2_Bold">추천 제품</Text>
          <Spacing size={4} />
          <HStack gap={1.5} overflowX="auto">
            <GetRecommendedProducts productId={Number(id)}>
              {product => <RecommendationItem product={product} />}
            </GetRecommendedProducts>
          </HStack>
        </styled.section>
      </AsyncBoundary>
    </>
  );
}

export default ProductDetailPage;
