import { queryOptions } from '@tanstack/react-query';

export interface RecentProduct {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
}

export const exchangeRateQueryOptions = () =>
  queryOptions({
    queryKey: ['exchange-rate'],
    queryFn: () => fetch('/api/exchange-rate').then(res => res.json()),
  });

export const recentProductListQueryOptions = () =>
  queryOptions({
    queryKey: ['recent-product-list'],
    queryFn: () =>
      fetch('/api/recent/product/list')
        .then(res => res.json())
        .then(data => data as { recentProducts: RecentProduct[] }),
  });

export const meQueryOptions = () =>
  queryOptions({
    queryKey: ['me'],
    queryFn: () => fetch('/api/me').then(res => res.json()),
  });

export const gradePointQueryOptions = () =>
  queryOptions({
    queryKey: ['grade-point'],
    queryFn: () => fetch('/api/grade/point').then(res => res.json()),
  });
