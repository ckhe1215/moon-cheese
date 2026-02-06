import { meQueryOptions } from '@/api/queryOptions';
import AsyncBoundary from '@/components/AsyncBoundary';
import { useCart } from '@/providers/CartProvider';
import { Spacing, Text } from '@/ui-lib';
import { DeliveryIcon, RocketIcon } from '@/ui-lib/components/icons';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Stack, styled } from 'styled-system/jsx';
import CheckoutSection from './components/CheckoutSection';
import { DeliveryItem } from './components/DeliveryItem';
import EmptyCartSection from './components/EmptyCartSection';
import ShoppingCartSection from './components/ShoppingCartSection';

function ShoppingCartPage() {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<'EXPRESS' | 'PREMIUM'>('EXPRESS');
  const { data } = useSuspenseQuery(meQueryOptions());
  const { cart } = useCart();
  const gradeDeliveryFee = data.grade === 'EXPLORER' ? 2 : data.grade === 'PILOT' ? 1 : 0;
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  const totalDeliveryFee = totalPrice > 30 ? 0 : gradeDeliveryFee;

  return (
    <AsyncBoundary>
      <EmptyCartGuard>
        <ShoppingCartSection />
        <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
          <Text variant="H2_Bold">배송 방식</Text>
          <Spacing size={4} />
          <Stack gap={4}>
            <DeliveryItem
              title="Express"
              description="2-3일 후 도착 예정"
              icon={<DeliveryIcon size={28} />}
              price={0}
              isSelected={selectedDeliveryMethod === 'EXPRESS'}
              onClick={() => setSelectedDeliveryMethod('EXPRESS')}
            />
            <DeliveryItem
              title="Premium"
              description="당일 배송"
              icon={<RocketIcon size={28} />}
              price={totalDeliveryFee}
              isSelected={selectedDeliveryMethod === 'PREMIUM'}
              onClick={() => setSelectedDeliveryMethod('PREMIUM')}
            />
          </Stack>
        </styled.section>
        <CheckoutSection
          totalPrice={totalPrice}
          totalDeliveryFee={totalDeliveryFee}
          selectedDeliveryMethod={selectedDeliveryMethod}
        />
      </EmptyCartGuard>
    </AsyncBoundary>
  );
}

function EmptyCartGuard({ children }: { children: React.ReactNode }) {
  const { cart } = useCart();
  const isEmpty = Object.keys(cart).length === 0;

  return isEmpty ? <EmptyCartSection /> : children;
}

export default ShoppingCartPage;
