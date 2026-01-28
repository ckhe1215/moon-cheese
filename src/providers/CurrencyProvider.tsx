import { exchangeRateQueryOptions } from '@/api/queryOptions';
import type { CurrencyType } from '@/ui-lib';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';

interface CurrencyContextProps {
  currency: CurrencyType;
  exchangeRate: number;
  currencyToggle: () => void;
}

const CurrencyContext = createContext<CurrencyContextProps | null>(null);

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState<CurrencyType>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(1000);

  // FIXME: 여기서 불러오는게 옳은지 생각좀 해보자
  const { data } = useSuspenseQuery(exchangeRateQueryOptions());

  const currencyToggle = () => {
    setCurrency(currency === 'USD' ? 'KRW' : 'USD');
    setExchangeRate(currency === 'USD' ? data.exchangeRate.KRW : data.exchangeRate.USD);
  };

  return (
    <CurrencyContext.Provider value={{ currency, exchangeRate, currencyToggle }}>{children}</CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
