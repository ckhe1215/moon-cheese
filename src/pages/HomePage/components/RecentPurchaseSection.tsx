import { type RecentProduct, recentProductListQueryOptions } from '@/api/queryOptions';
import ErrorSection from '@/components/ErrorSection';
import { useCurrency } from '@/providers/CurrencyProvider';
import { Spacing, Text } from '@/ui-lib';
import { ErrorBoundary } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { Flex, styled } from 'styled-system/jsx';

function RecentPurchaseSection() {
  const { currency, exchangeRate } = useCurrency();

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
              const result = [
                ...data.recentProducts
                  .reduce((map: Map<number, RecentProduct>, product: RecentProduct) => {
                    const existing = map.get(product.id);

                    if (existing) {
                      existing.price += product.price;
                    } else {
                      map.set(product.id, { ...product });
                    }

                    return map;
                  }, new Map<number, RecentProduct>())
                  .values(),
              ];
              return (
                <>
                  {result.map((item: RecentProduct) => (
                    <Flex
                      css={{
                        gap: 4,
                      }}
                      key={item.id}
                    >
                      <styled.img
                        src={item.thumbnail}
                        alt="item"
                        css={{
                          w: '60px',
                          h: '60px',
                          objectFit: 'cover',
                          rounded: 'xl',
                        }}
                      />
                      <Flex flexDir="column" gap={1}>
                        <Text variant="B2_Medium">{item.name}</Text>
                        <Text variant="H1_Bold">
                          {(() => {
                            if (currency === 'USD') {
                              return `$${item.price.toLocaleString('en-US')}`;
                            }

                            return `${Math.round(item.price * exchangeRate).toLocaleString('ko-KR')}원`;
                          })()}
                        </Text>
                      </Flex>
                    </Flex>
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

export default RecentPurchaseSection;
