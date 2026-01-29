export const formatPrice = (price: number, currency: string, exchangeRate: number) => {
  if (currency === 'USD') {
    return `$${price.toLocaleString('en-US')}`;
  }

  const roundedPrice = Math.round(price * exchangeRate);
  return `${roundedPrice.toLocaleString('ko-KR')}원`;
};
