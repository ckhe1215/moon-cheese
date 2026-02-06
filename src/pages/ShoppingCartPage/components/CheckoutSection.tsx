import { purchaseMutationOptions } from '@/api/mutationOptions';
import PriceDisplay from '@/components/PriceDisplay';
import { useCart } from '@/providers/CartProvider';
import { Button, Spacing, Text } from '@/ui-lib';
import { toast } from '@/ui-lib/components/toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { Box, Divider, Flex, HStack, Stack, styled } from 'styled-system/jsx';

function CheckoutSection({
  totalPrice,
  totalDeliveryFee,
  selectedDeliveryMethod,
}: {
  totalPrice: number;
  totalDeliveryFee: number;
  selectedDeliveryMethod: 'EXPRESS' | 'PREMIUM';
}) {
  const navigate = useNavigate();
  const { mutate, isSuccess, isPending } = useMutation(purchaseMutationOptions());
  const { cart, emptyCart } = useCart();

  const handleClickPurchase = () => {
    mutate({
      totalPrice,
      deliveryType: selectedDeliveryMethod,
      items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
    });
    if (isSuccess) {
      toast.success('결제가 완료되었습니다.');
      navigate('/');
      emptyCart();
    }
  };

  return (
    <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
      <Text variant="H2_Bold">결제금액</Text>
      <Spacing size={4} />
      <Stack
        gap={6}
        css={{
          p: 5,
          border: '1px solid',
          borderColor: 'border.01_gray',
          rounded: '2xl',
        }}
      >
        <Stack gap={5}>
          <Box gap={3}>
            <Flex justify="space-between">
              <Text variant="B2_Regular">주문금액({cart.length}개)</Text>
              <Text variant="B2_Bold">
                <PriceDisplay price={totalPrice} />
              </Text>
            </Flex>
            <Spacing size={3} />
            <Flex justify="space-between">
              <Text variant="B2_Regular">배송비</Text>
              <Text variant="B2_Bold">
                {totalDeliveryFee === 0 ? (
                  <Text variant="B2_Bold" color="state.green">
                    무료배송
                  </Text>
                ) : (
                  <PriceDisplay price={totalDeliveryFee} />
                )}
              </Text>
            </Flex>
          </Box>

          <Divider color="border.01_gray" />

          <HStack justify="space-between">
            <Text variant="H2_Bold">총 금액</Text>
            <Text variant="H2_Bold">
              <PriceDisplay price={totalPrice + totalDeliveryFee} />
            </Text>
          </HStack>
        </Stack>

        <Button fullWidth size="lg" loading={isPending} onClick={handleClickPurchase}>
          {isPending ? '결제 중...' : '결제 진행'}
        </Button>

        <Text variant="C2_Regular" color="neutral.03_gray">
          {`우리는 신용카드, 은행 송금, 모바일 결제, 현금을 받아들입니다\n안전한 체크아웃\n귀하의 결제 정보는 암호화되어 안전합니다.`}
        </Text>
      </Stack>
    </styled.section>
  );
}

export default CheckoutSection;
