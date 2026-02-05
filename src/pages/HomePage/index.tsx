import { productListQueryOptions, recentProductListQueryOptions } from '@/api/queryOptions';
import AsyncBoundary from '@/components/AsyncBoundary';
import ErrorSection from '@/components/ErrorSection';
import { Text } from '@/ui-lib';
import { SuspenseQuery } from '@suspensive/react-query';
import { Box, Grid, styled } from 'styled-system/jsx';
import BannerSection from './components/BannerSection';
import CategorySelector from './components/CategorySelector';
import CurrentLevelSection from './components/CurrentLevelSection';
import GetFilteredProducts from './components/GetFilteredProducts';
import GetPointInfo from './components/GetPointInfo';
import RecentPurchasedProductList from './components/RecentPurchasedProductList';
import { CheeseItem, CrackerItem, TeaItem } from './components/SellingProductItem';

function HomePage() {
  return (
    <>
      <BannerSection />
      <AsyncBoundary fallback={<ErrorSection />}>
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

      <AsyncBoundary fallback={<ErrorSection />}>
        <SuspenseQuery {...recentProductListQueryOptions()}>
          {({ data }) => <RecentPurchasedProductList items={data.recentProducts} />}
        </SuspenseQuery>
      </AsyncBoundary>

      <AsyncBoundary fallback={<ErrorSection />}>
        <SuspenseQuery {...productListQueryOptions()}>
          {({ data: { products } }) => (
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
                  <GetFilteredProducts products={products} currentTab={currentTab}>
                    {filteredProducts => (
                      <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={9} columnGap={4} p={5}>
                        {filteredProducts.map(product => {
                          switch (product.category) {
                            case 'CHEESE':
                              return <CheeseItem key={product.id} product={product} />;
                            case 'CRACKER':
                              return <CrackerItem key={product.id} product={product} />;
                            case 'TEA':
                              return <TeaItem key={product.id} product={product} />;
                          }
                        })}
                      </Grid>
                    )}
                  </GetFilteredProducts>
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
