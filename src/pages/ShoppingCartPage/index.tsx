import AsyncBoundary from '@/components/AsyncBoundary';
import { useCart } from '@/providers/CartProvider';
import { Button, Spacing, Text } from '@/ui-lib';
import { DeliveryIcon, RocketIcon } from '@/ui-lib/components/icons';
import { Box, Divider, Flex, Stack, styled } from 'styled-system/jsx';
import { DeliveryOptionProvider, DeliveryOptionSelector } from './components/DeliveryOptionProvider';
import EmptyCartGuard from './components/EmptyGuard';
import GetTotalPrice from './components/GetTotalPrice';
import PaymentButton from './components/PaymentButton';
import { DeliveryFeeDisplay, OrderPriceDisplay, TotalPriceDisplay } from './components/PriceDisplay';
import ShoppingCartListItem from './components/ShoppingCartListItem';

function ShoppingCartPage() {
  const { cart, emptyCart } = useCart();

  return (
    <AsyncBoundary>
      <EmptyCartGuard>
        <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
          <Flex justify="space-between">
            <Text variant="H2_Bold">장바구니</Text>
            <Button color={'neutral'} size="sm" onClick={emptyCart}>
              전체삭제
            </Button>
          </Flex>
          <Spacing size={4} />
          <Stack gap={5} css={BOX_STYLE}>
            {cart.map(product => (
              <>
                <ShoppingCartListItem product={product} />
                <Divider color="border.01_gray" css={{ _last: { display: 'none' } }} />
              </>
            ))}
          </Stack>
        </styled.section>

        <DeliveryOptionProvider>
          <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
            <Text variant="H2_Bold">배송 방식</Text>
            <Spacing size={4} />
            <GetTotalPrice>
              {({ expressDeliveryFee, premiumDeliveryFee }) => (
                <DeliveryOptionSelector
                  options={[
                    {
                      value: 'EXPRESS',
                      label: 'Express',
                      description: '2-3일 후 도착 예정',
                      icon: <DeliveryIcon size={28} />,
                      price: expressDeliveryFee,
                    },
                    {
                      value: 'PREMIUM',
                      label: 'Premium',
                      description: '당일 배송',
                      icon: <RocketIcon size={28} />,
                      price: premiumDeliveryFee,
                    },
                  ]}
                />
              )}
            </GetTotalPrice>
          </styled.section>

          <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
            <Text variant="H2_Bold">결제금액</Text>
            <Spacing size={4} />
            <Stack gap={6} css={BOX_STYLE}>
              <Stack gap={5}>
                <Box gap={3}>
                  <OrderPriceDisplay label="주문금액" />
                  <Spacing size={3} />
                  <DeliveryFeeDisplay label="배송비" />
                </Box>
                <Divider color="border.01_gray" />
                <TotalPriceDisplay label="총 금액" />
              </Stack>
              <PaymentButton />

              <Text variant="C2_Regular" color="neutral.03_gray">
                {`우리는 신용카드, 은행 송금, 모바일 결제, 현금을 받아들입니다\n안전한 체크아웃\n귀하의 결제 정보는 암호화되어 안전합니다.`}
              </Text>
            </Stack>
          </styled.section>
        </DeliveryOptionProvider>
      </EmptyCartGuard>
    </AsyncBoundary>
  );
}

export default ShoppingCartPage;

const BOX_STYLE = {
  p: 5,
  border: '1px solid',
  borderColor: 'border.01_gray',
  rounded: '2xl',
};
