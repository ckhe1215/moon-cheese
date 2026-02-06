import PriceDisplay from '@/components/PriceDisplay';
import { useCart } from '@/providers/CartProvider';
import { Text } from '@/ui-lib';
import { Flex, HStack } from 'styled-system/jsx';
import GetTotalPrice from './GetTotalPrice';

export function OrderPriceDisplay({ label }: { label: string }) {
  const { cart } = useCart();

  return (
    <GetTotalPrice>
      {({ orderPrice }) => (
        <Flex justify="space-between">
          <Text variant="B2_Regular">
            {label}({cart.length}개)
          </Text>
          <Text variant="B2_Bold">
            <PriceDisplay price={orderPrice} />
          </Text>
        </Flex>
      )}
    </GetTotalPrice>
  );
}

export function DeliveryFeeDisplay({ label }: { label: string }) {
  return (
    <GetTotalPrice>
      {({ deliveryFee }) => (
        <Flex justify="space-between">
          <Text variant="B2_Regular">{label}</Text>
          <Text variant="B2_Bold">
            {deliveryFee === 0 ? (
              <Text variant="B2_Bold" color="state.green">
                무료배송
              </Text>
            ) : (
              <PriceDisplay price={deliveryFee} />
            )}
          </Text>
        </Flex>
      )}
    </GetTotalPrice>
  );
}

export function TotalPriceDisplay({ label }: { label: string }) {
  return (
    <GetTotalPrice>
      {({ totalPrice }) => (
        <HStack justify="space-between">
          <Text variant="H2_Bold">{label}</Text>
          <Text variant="H2_Bold">
            <PriceDisplay price={totalPrice} />
          </Text>
        </HStack>
      )}
    </GetTotalPrice>
  );
}
