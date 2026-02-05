import { productIdQueryOptions } from '@/api/queryOptions';
import { useCart } from '@/providers/CartProvider';
import { Button, Spacing, Text } from '@/ui-lib';
import { SuspenseQuery } from '@suspensive/react-query';
import { Divider, Flex, Stack, styled } from 'styled-system/jsx';
import ShoppingCartListItem from './ShoppingCartListItem';

export default function ShoppingCartSection() {
  const { cart, emptyCart } = useCart();

  return (
    <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
      <Flex justify="space-between">
        <Text variant="H2_Bold">장바구니</Text>
        <Button color={'neutral'} size="sm" onClick={emptyCart}>
          전체삭제
        </Button>
      </Flex>
      <Spacing size={4} />
      <Stack gap={5} css={BOX_STYLE}>
        {Object.keys(cart).map(productId => (
          <>
            <SuspenseQuery key={productId} {...productIdQueryOptions(Number(productId))}>
              {({ data }) => <ShoppingCartListItem product={data} />}
            </SuspenseQuery>
            <Divider color="border.01_gray" css={{ _last: { display: 'none' } }} />
          </>
        ))}
      </Stack>
    </styled.section>
  );
}

const BOX_STYLE = {
  p: 5,
  border: '1px solid',
  borderColor: 'border.01_gray',
  rounded: '2xl',
};
