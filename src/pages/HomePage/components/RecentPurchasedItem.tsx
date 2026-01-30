import type { RecentProduct } from '@/api/queryOptions';
import PriceDisplay from '@/components/PriceDisplay';
import { Text } from '@/ui-lib';
import { Flex, styled } from 'styled-system/jsx';

export default function RecentPurchasedItem({ item }: { item: RecentProduct }) {
  return (
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
  );
}
