import { queryOptions } from '@tanstack/react-query';

export interface ExchangeRate {
  exchangeRate: {
    KRW: number;
    USD: number;
  };
}

export interface RecentProduct {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
}

export interface Me {
  point: number;
  grade: 'EXPLORER' | 'PILOT' | 'COMMANDER';
}

export interface GradePoint {
  type: 'EXPLORER' | 'PILOT' | 'COMMANDER';
  minPoint: number;
}

export const exchangeRateQueryOptions = () =>
  queryOptions({
    queryKey: ['exchange-rate'],
    queryFn: async (): Promise<ExchangeRate> => {
      const response = await fetch('/api/exchange-rate');
      return response.json();
    },
  });

export const recentProductListQueryOptions = () =>
  queryOptions({
    queryKey: ['recent-product-list'],
    queryFn: async (): Promise<{ recentProducts: RecentProduct[] }> => {
      const response = await fetch('/api/recent/product/list');
      return response.json();
    },
  });

export const meQueryOptions = () =>
  queryOptions({
    queryKey: ['me'],
    queryFn: async (): Promise<Me> => {
      const response = await fetch('/api/me');
      return response.json();
    },
  });

export const gradePointQueryOptions = () =>
  queryOptions({
    queryKey: ['grade-point'],
    queryFn: async (): Promise<{ gradePointList: GradePoint[] }> => {
      const response = await fetch('/api/grade/point');
      return response.json();
    },
  });
