import { recentProductListQueryOptions, type RecentProduct } from '@/api/queryOptions';
import ErrorSection from '@/components/ErrorSection';
import { Spacing, Text } from '@/ui-lib';
import { ErrorBoundary } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { groupBy } from 'es-toolkit';
import { Flex, styled } from 'styled-system/jsx';
import RecentPurchasedItem from './RecentPurchasedItem';

export default function RecentPurchasedProductList() {
  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>
      <Spacing size={4} />
      <Flex
        css={{
          bg: 'background.01_white',
          px: 5,
          py: 4,
          gap: 4,
          rounded: '2xl',
        }}
        direction={'column'}
      >
        <ErrorBoundary fallback={<ErrorSection />}>
          <SuspenseQuery {...recentProductListQueryOptions()}>
            {({ data }) => {
              const result = reducePriceById(data.recentProducts);
              return (
                <>
                  {result.map((item: RecentProduct) => (
                    <RecentPurchasedItem key={item.id} item={item} />
                  ))}
                </>
              );
            }}
          </SuspenseQuery>
        </ErrorBoundary>
      </Flex>
    </styled.section>
  );
}

const reducePriceById = (recentProducts: RecentProduct[]) => {
  const productsById = Object.values(groupBy(recentProducts, product => product.id));
  return productsById.map(products => ({
    ...products[0],
    price: products.reduce((acc, item) => acc + item.price, 0),
  }));
};
