import { mutationOptions } from '@tanstack/react-query';

export type DeliveryType = 'EXPRESS' | 'PREMIUM';

export const purchaseMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: {
      totalPrice: number;
      deliveryType: DeliveryType;
      items: Array<{ id: number; quantity: number }>;
    }) => {
      await fetch('/api/product/purchase', {
        method: 'POST',
        body: JSON.stringify(params),
      });
    },
  });
