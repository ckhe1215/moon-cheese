import { productIdQueryOptions, productRecommendIdQueryOptions } from '@/api/queryOptions';
import ErrorSection from '@/components/ErrorSection';
import PriceDisplay from '@/components/PriceDisplay';
import { Spacing, Text } from '@/ui-lib';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { HStack, styled } from 'styled-system/jsx';
import RecommendationProductItem from './RecommendationProductItem';

function RecommendationSection({ productId }: { productId: number }) {
  const navigate = useNavigate();

  const handleClickProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const { data: recommendedProducts } = useSuspenseQuery(productRecommendIdQueryOptions(productId));

  return (
    <ErrorBoundary fallback={({ reset }) => <ErrorSection onRetry={reset} />}>
      <Suspense fallback={<>Loading...</>}>
        <styled.section css={{ bg: 'background.01_white', px: 5, pt: 5, pb: 6 }}>
          <Text variant="H2_Bold">추천 제품</Text>

          <Spacing size={4} />

          <HStack gap={1.5} overflowX="auto">
            {recommendedProducts.recommendProductIds.map(id => (
              <SuspenseQuery {...productIdQueryOptions(id)}>
                {({ data: product }) => (
                  <RecommendationProductItem.Root key={id} onClick={() => handleClickProduct(id)}>
                    <RecommendationProductItem.Image src={product.images[0]} alt={product.name} />
                    <RecommendationProductItem.Info name={product.name} rating={product.rating} />
                    <RecommendationProductItem.Price>
                      <PriceDisplay price={product.price} />
                    </RecommendationProductItem.Price>
                  </RecommendationProductItem.Root>
                )}
              </SuspenseQuery>
            ))}
          </HStack>
        </styled.section>
      </Suspense>
    </ErrorBoundary>
  );
}

export default RecommendationSection;
