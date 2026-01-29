import type { RecentProduct } from '@/api/queryOptions';
import { useCurrency } from '@/providers/CurrencyProvider';
import { Text } from '@/ui-lib';
import { formatPrice } from '@/utils/formatPrice';
import { Flex, styled } from 'styled-system/jsx';

export default function RecentPurchasedItem({ item }: { item: RecentProduct }) {
  const { currency, exchangeRate } = useCurrency();

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
        <Text variant="H1_Bold">{formatPrice(item.price, currency, exchangeRate)}</Text>
      </Flex>
    </Flex>
  );
}
