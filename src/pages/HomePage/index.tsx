import {
  productListQueryOptions,
  recentProductListQueryOptions,
  type Product,
  type RecentProduct,
} from '@/api/queryOptions';
import AsyncBoundary from '@/components/AsyncBoundary';
import { Spacing, Text } from '@/ui-lib';
import { SuspenseQuery } from '@suspensive/react-query';
import { groupBy } from 'es-toolkit';
import { Box, Flex, Grid, styled } from 'styled-system/jsx';
import BannerSection from './components/BannerSection';
import CategorySelector, { type TabType } from './components/CategorySelector';
import CurrentLevelSection from './components/CurrentLevelSection';
import RecentPurchasedProductItem from './components/RecentPurchasedProductItem';
import { CheeseItem, CrackerItem, TeaItem } from './components/SellingProductItem';

function HomePage() {
  return (
    <>
      <BannerSection />
      <CurrentLevelSection />

      <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
        <Text variant="H1_Bold">최근 구매한 상품</Text>
        <Spacing size={4} />
        <Flex css={BACKGROUND_STYLE} direction={'column'}>
          <AsyncBoundary>
            <SuspenseQuery {...recentProductListQueryOptions()}>
              {({ data }) =>
                reducePriceById(data.recentProducts).map((product: RecentProduct) => (
                  <RecentPurchasedProductItem key={product.id} product={product} />
                ))
              }
            </SuspenseQuery>
          </AsyncBoundary>
        </Flex>
      </styled.section>

      <AsyncBoundary>
        <SuspenseQuery {...productListQueryOptions()}>
          {({ data }) => (
            <styled.section bg="background.01_white">
              <Box css={{ px: 5, pt: 5, pb: 4 }}>
                <Text variant="H1_Bold">판매중인 상품</Text>
              </Box>
              <CategorySelector
                options={[
                  { value: 'ALL', label: '전체' },
                  { value: 'CHEESE', label: '치즈' },
                  { value: 'CRACKER', label: '크래커' },
                  { value: 'TEA', label: '티' },
                ]}
              >
                {currentTab => (
                  <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={9} columnGap={4} p={5}>
                    {data.products
                      .filter(product => matchesCategory(product.category, currentTab))
                      .map(product => {
                        switch (product.category) {
                          case 'CHEESE':
                            return <CheeseItem key={product.id} product={product} />;
                          case 'CRACKER':
                            return <CrackerItem key={product.id} product={product} />;
                          case 'TEA':
                            return <TeaItem key={product.id} product={product} />;
                          default:
                            product.category satisfies never;
                            return null;
                        }
                      })}
                  </Grid>
                )}
              </CategorySelector>
            </styled.section>
          )}
        </SuspenseQuery>
      </AsyncBoundary>
    </>
  );
}

export default HomePage;

const matchesCategory = (category: Product['category'], currentTab: TabType) =>
  currentTab === 'ALL' || category === currentTab;

const reducePriceById = (recentProducts: RecentProduct[]) => {
  const productsById = Object.values(groupBy(recentProducts, product => product.id));
  return productsById.map(products => ({
    ...products[0],
    price: products.reduce((acc, item) => acc + item.price, 0),
  }));
};

const BACKGROUND_STYLE = {
  bg: 'background.01_white',
  px: 5,
  py: 4,
  gap: 4,
  rounded: '2xl',
};
