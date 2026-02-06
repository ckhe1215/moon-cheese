import { purchaseMutationOptions } from '@/api/mutationOptions';
import { useCart } from '@/providers/CartProvider';
import { Button } from '@/ui-lib';
import { toast } from '@/ui-lib/components/toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useDeliveryOption } from './DeliveryOptionProvider';
import GetTotalPrice from './GetTotalPrice';

export default function PaymentButton() {
  const { cart, emptyCart } = useCart();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    ...purchaseMutationOptions(),
    onSuccess: () => {
      toast.success('결제가 완료되었습니다.');
      navigate('/');
      emptyCart();
    },
  });
  const { deliveryOption } = useDeliveryOption();

  const handleClickPurchase = (totalPrice: number) => {
    mutate({
      totalPrice,
      deliveryType: deliveryOption,
      items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
    });
  };

  return (
    <GetTotalPrice>
      {({ totalPrice }) => (
        <Button fullWidth size="lg" loading={isPending} onClick={() => handleClickPurchase(totalPrice)}>
          {isPending ? '결제 중...' : '결제 진행'}
        </Button>
      )}
    </GetTotalPrice>
  );
}
