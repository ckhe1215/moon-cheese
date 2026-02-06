import type { Product } from '@/api/queryOptions';
import CartCounter from '@/components/CartCounter';
import PriceDisplay from '@/components/PriceDisplay';
import { isTagType } from '@/pages/ProductDetailPage/components/ProductInfoSection';
import { useCart } from '@/providers/CartProvider';
import type { TagType } from '@/ui-lib';
import ShoppingCartItem from './ShoppingCartItem';

export default function ShoppingCartListItem({ product }: { product: Product }) {
  const { removeAllFromCart } = useCart();
  const { name, category, images, description, price } = product;

  return (
    <ShoppingCartItem.Root>
      <ShoppingCartItem.Image src={images[0]} alt={name} />
      <ShoppingCartItem.Content>
        <ShoppingCartItem.Info
          type={getSafeCategory(category)}
          title={name}
          description={description}
          onDelete={() => {
            removeAllFromCart(product);
          }}
        />
        <ShoppingCartItem.Footer>
          <ShoppingCartItem.Price>
            <PriceDisplay price={price} />
          </ShoppingCartItem.Price>
          <CartCounter product={product} min={1} />
        </ShoppingCartItem.Footer>
      </ShoppingCartItem.Content>
    </ShoppingCartItem.Root>
  );
}

const getSafeCategory = (category: string): TagType => {
  const lowerCaseCategory = category.toLowerCase();
  if (isTagType(lowerCaseCategory)) {
    return lowerCaseCategory;
  }
  return 'cheese';
};
