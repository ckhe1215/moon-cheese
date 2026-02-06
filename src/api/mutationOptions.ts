import { mutationOptions } from '@tanstack/react-query';

export const purchaseMutationOptions = () =>
  mutationOptions({
    mutationFn: async (params: {
      totalPrice: number;
      deliveryType: 'EXPRESS' | 'PREMIUM';
      items: Array<{ id: number; quantity: number }>;
    }) => {
      await fetch('/api/product/purchase', {
        method: 'POST',
        body: JSON.stringify(params),
      });
    },
  });
