import { meQueryOptions, type Me } from '@/api/queryOptions';
import { useCart, type CartItem } from '@/providers/CartProvider';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useDeliveryOption } from './DeliveryOptionProvider';

interface ChildrenProps {
  orderPrice: number;
  expressDeliveryFee: number;
  premiumDeliveryFee: number;
  deliveryFee: number;
  totalPrice: number;
}

export default function GetTotalPrice({ children }: { children: (props: ChildrenProps) => React.ReactNode }) {
  const { cart } = useCart();
  const { data } = useSuspenseQuery(meQueryOptions());
  const { deliveryOption } = useDeliveryOption();

  const orderPrice = sumCartPrice(cart);
  const expressDeliveryFee = EXPRESS_DELIVERY_FEE;
  const premiumDeliveryFee = orderPrice > FREE_DELIVERY_THRESHOLD ? 0 : getDeliveryFee(data.grade);
  const deliveryFee = deliveryOption === 'EXPRESS' ? expressDeliveryFee : premiumDeliveryFee;

  return children({
    orderPrice,
    expressDeliveryFee,
    premiumDeliveryFee,
    deliveryFee,
    totalPrice: orderPrice + deliveryFee,
  });
}

const sumCartPrice = (cart: CartItem[]) => cart.reduce((total, product) => total + product.price * product.quantity, 0);

const getDeliveryFee = (grade: Me['grade']) => {
  switch (grade) {
    case 'EXPLORER':
      return 2;
    case 'PILOT':
      return 1;
    case 'COMMANDER':
      return 0;
    default:
      grade satisfies never;
      return 2;
  }
};

const EXPRESS_DELIVERY_FEE = 0;
const FREE_DELIVERY_THRESHOLD = 30;
