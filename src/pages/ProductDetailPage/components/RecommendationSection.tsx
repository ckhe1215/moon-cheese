import { productIdQueryOptions, productRecommendIdQueryOptions } from '@/api/queryOptions';
import { useCurrency } from '@/providers/CurrencyProvider';
import { Spacing, Text } from '@/ui-lib';
import { formatPrice } from '@/utils/formatPrice';
import { SuspenseQuery } from '@suspensive/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { HStack, styled } from 'styled-system/jsx';
import RecommendationProductItem from './RecommendationProductItem';

function RecommendationSection({ productId }: { productId: number }) {
  const navigate = useNavigate();
  const { currency, exchangeRate } = useCurrency();

  const { data: recommendedProducts } = useSuspenseQuery(productRecommendIdQueryOptions(productId));

  const handleClickProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
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
                  {formatPrice(product.price, currency, exchangeRate)}
                </RecommendationProductItem.Price>
              </RecommendationProductItem.Root>
            )}
          </SuspenseQuery>
        ))}
      </HStack>
    </styled.section>
  );
}

export default RecommendationSection;
