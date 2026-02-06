import { useCurrency } from '@/providers/CurrencyProvider';

export default function PriceDisplay({ price }: { price: number }) {
  const { currency, exchangeRate } = useCurrency();

  const formatPrice = (price: number) => {
    if (currency === 'USD') {
      return `$${price.toLocaleString('en-US')}`;
    }

    const roundedPrice = Math.round(price * exchangeRate);
    return `${roundedPrice.toLocaleString('ko-KR')}원`;
  };

  return formatPrice(price);
}
