import { queryOptions } from '@tanstack/react-query';

export const exchangeRateQueryOptions = () =>
  queryOptions({
    queryKey: ['exchange-rate'],
    queryFn: () => fetch('/api/exchange-rate').then(res => res.json()),
  });
