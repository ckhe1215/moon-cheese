import { productListQueryOptions, recentProductListQueryOptions, type Product } from '@/api/queryOptions';
import AsyncBoundary from '@/components/AsyncBoundary';
import { Text } from '@/ui-lib';
import { SuspenseQuery } from '@suspensive/react-query';
import { Box, Grid, styled } from 'styled-system/jsx';
import BannerSection from './components/BannerSection';
import CategorySelector, { type TabType } from './components/CategorySelector';
import CurrentLevelSection from './components/CurrentLevelSection';
import GetPointInfo from './components/GetPointInfo';
import RecentPurchasedProductList from './components/RecentPurchasedProductList';
import { CheeseItem, CrackerItem, TeaItem } from './components/SellingProductItem';

function HomePage() {
  return (
    <>
      <BannerSection />
      <AsyncBoundary>
        <GetPointInfo>
          {({ currentGrade, currentPoint, leftPointToNextGrade, progress }) => (
            <CurrentLevelSection
              currentGrade={currentGrade}
              currentPoint={currentPoint}
              leftPointToNextGrade={leftPointToNextGrade}
              progress={progress}
            />
          )}
        </GetPointInfo>
      </AsyncBoundary>

      <AsyncBoundary>
        <SuspenseQuery {...recentProductListQueryOptions()}>
          {({ data }) => <RecentPurchasedProductList items={data.recentProducts} />}
        </SuspenseQuery>
      </AsyncBoundary>

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
