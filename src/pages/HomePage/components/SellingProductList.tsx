import { productListQueryOptions, type Product } from '@/api/queryOptions';
import ErrorSection from '@/components/ErrorSection';
import { Text } from '@/ui-lib';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { Box, Grid, styled } from 'styled-system/jsx';
import CartCounter from './CartCounter';
import CategorySelector from './CategorySelector';
import SellingProductItem from './SellingProductItem';

export default function SellingProductList() {
  return (
    <styled.section bg="background.01_white">
      <Box css={{ px: 5, pt: 5, pb: 4 }}>
        <Text variant="H1_Bold">판매중인 상품</Text>
      </Box>
      <CategorySelector
        options={[
          { value: 'all', label: '전체' },
          { value: 'cheese', label: '치즈' },
          { value: 'cracker', label: '크래커' },
          { value: 'tea', label: '티' },
        ]}
      >
        {currentTab => (
          <>
            <ErrorBoundary fallback={<ErrorSection />}>
              <Suspense fallback={<>Loading...</>}>
                <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={9} columnGap={4} p={5}>
                  <SuspenseQuery {...productListQueryOptions()}>
                    {({ data }) => {
                      const filteredProducts = getFilteredProductsByCategory(data.products, currentTab);
                      return (
                        <>
                          {filteredProducts.map(product => (
                            <SellingProductItem
                              key={product.id}
                              item={product}
                              counter={<CartCounter product={product} />}
                            />
                          ))}
                        </>
                      );
                    }}
                  </SuspenseQuery>
                </Grid>
              </Suspense>
            </ErrorBoundary>
          </>
        )}
      </CategorySelector>
    </styled.section>
  );
}

const filterByCategory = (category: string, currentTab: string) => {
  if (currentTab === 'all') return true;
  return category === currentTab.toUpperCase();
};

const getFilteredProductsByCategory = (products: Product[], currentTab: string) => {
  return products.filter(product => filterByCategory(product.category, currentTab));
};
