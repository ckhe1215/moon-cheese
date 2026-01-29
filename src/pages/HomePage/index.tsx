import {
  gradePointQueryOptions,
  meQueryOptions,
  recentProductListQueryOptions,
  type GradePoint,
  type RecentProduct,
} from '@/api/queryOptions';
import ErrorSection from '@/components/ErrorSection';
import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { ErrorBoundary } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { groupBy } from 'es-toolkit';
import { Box, Flex, styled } from 'styled-system/jsx';
import BannerSection from './components/BannerSection';
import ProductListSection from './components/ProductListSection';
import RecentPurchasedItem from './components/RecentPurchasedItem';

function HomePage() {
  return (
    <>
      <BannerSection />
      <styled.section css={{ px: 5, py: 4 }}>
        <Text variant="H1_Bold">현재 등급</Text>
        <Spacing size={4} />
        <ErrorBoundary fallback={<ErrorSection />}>
          <SuspenseQuery {...meQueryOptions()}>
            {({ data: meData }) => (
              <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
                <Flex flexDir="column" gap={2}>
                  <Text variant="H2_Bold">{toTitleCase(meData.grade)}</Text>
                  <SuspenseQuery {...gradePointQueryOptions()}>
                    {({ data: gradePointData }) => {
                      const nextGradeMinPoint = getNextGradeMinPoint(gradePointData.gradePointList, meData.point);
                      return (
                        <>
                          <ProgressBar value={meData.point / nextGradeMinPoint} size="xs" />

                          <Flex justifyContent="space-between">
                            <Box textAlign="left">
                              <Text variant="C1_Bold">현재 포인트</Text>
                              <Text variant="C2_Regular" color="neutral.03_gray">
                                {meData.point}p
                              </Text>
                            </Box>
                            <Box textAlign="right">
                              <Text variant="C1_Bold">다음 등급까지</Text>

                              <Text variant="C2_Regular" color="neutral.03_gray">
                                {nextGradeMinPoint - meData.point}p
                              </Text>
                            </Box>
                          </Flex>
                        </>
                      );
                    }}
                  </SuspenseQuery>
                </Flex>
              </Box>
            )}
          </SuspenseQuery>
        </ErrorBoundary>
      </styled.section>

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

      <ProductListSection />
    </>
  );
}

const toTitleCase = (title: string) => {
  const firstChar = title.charAt(0);
  const rest = title.slice(1);
  return firstChar.toUpperCase() + rest.toLowerCase();
};

const ascendingByMinPoint = (a: GradePoint, b: GradePoint) => a.minPoint - b.minPoint;

const getNextGradeMinPoint = (gradePointList: GradePoint[], myPoint: number) => {
  const sortedGradePointList = gradePointList.sort(ascendingByMinPoint);
  const nextGrade = sortedGradePointList.find(({ minPoint }) => minPoint > myPoint);

  return nextGrade?.minPoint ?? 0;
};

const reducePriceById = (recentProducts: RecentProduct[]) => {
  const productsById = Object.values(groupBy(recentProducts, product => product.id));
  return productsById.map(products => ({
    ...products[0],
    price: products.reduce((acc, item) => acc + item.price, 0),
  }));
};

export default HomePage;
