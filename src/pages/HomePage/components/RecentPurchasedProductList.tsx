import { type RecentProduct } from '@/api/queryOptions';
import PriceDisplay from '@/components/PriceDisplay';
import { Spacing, Text } from '@/ui-lib';
import { groupBy } from 'es-toolkit';
import { Flex, styled } from 'styled-system/jsx';

export default function RecentPurchasedProductList({ items }: { items: RecentProduct[] }) {
  const result = reducePriceById(items);

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
                <PriceDisplay price={item.price} />
              </Text>
            </Flex>
          </Flex>
        ))}
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
