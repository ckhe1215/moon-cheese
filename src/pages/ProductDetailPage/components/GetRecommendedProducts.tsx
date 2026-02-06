import { productIdQueryOptions, productRecommendIdQueryOptions, type Product } from '@/api/queryOptions';
import { SuspenseQuery, useSuspenseQuery } from '@suspensive/react-query';

export default function GetRecommendedProducts({
  productId,
  children,
}: {
  productId: number;
  children: (product: Product) => React.ReactNode;
}) {
  const { data: recommendedProducts } = useSuspenseQuery(productRecommendIdQueryOptions(productId));
  const { recommendProductIds } = recommendedProducts;

  return recommendProductIds.map(id => (
    <SuspenseQuery {...productIdQueryOptions(id)}>
      {({ data: product }) => {
        return children(product);
      }}
    </SuspenseQuery>
  ));
}
