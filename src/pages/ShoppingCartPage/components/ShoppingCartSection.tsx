import { productIdQueryOptions } from '@/api/queryOptions';
import PriceDisplay from '@/components/PriceDisplay';
import { isTagType } from '@/pages/ProductDetailPage/components/ProductInfoSection';
import { useCart } from '@/providers/CartProvider';
import { Button, Counter, Spacing, Text, type TagType } from '@/ui-lib';
import { SuspenseQuery } from '@suspensive/react-query';
import { Divider, Flex, Stack, styled } from 'styled-system/jsx';
import ShoppingCartItem from './ShoppingCartItem';

function ShoppingCartSection() {
  const { cart, addToCart, removeFromCart, removeAllFromCart, emptyCart } = useCart();

  return (
    <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
      <Flex justify="space-between">
        <Text variant="H2_Bold">장바구니</Text>
        <Button color={'neutral'} size="sm" onClick={emptyCart}>
          전체삭제
        </Button>
      </Flex>
      <Spacing size={4} />
      <Stack
        gap={5}
        css={{
          p: 5,
          border: '1px solid',
          borderColor: 'border.01_gray',
          rounded: '2xl',
        }}
      >
        {Object.entries(cart).map(([productId, count], index) => {
          return (
            <SuspenseQuery {...productIdQueryOptions(Number(productId))}>
              {({ data }) => {
                const category = data.category.toLowerCase();
                const safeCategory: TagType = isTagType(category) ? category : 'cheese';

                return (
                  <>
                    <ShoppingCartItem.Root>
                      <ShoppingCartItem.Image src={data.images[0]} alt={data.name} />
                      <ShoppingCartItem.Content>
                        <ShoppingCartItem.Info
                          type={safeCategory}
                          title={data.name}
                          description={data.description}
                          onDelete={() => {
                            removeAllFromCart(Number(productId));
                          }}
                        />
                        <ShoppingCartItem.Footer>
                          <ShoppingCartItem.Price>
                            <PriceDisplay price={data.price} />
                          </ShoppingCartItem.Price>
                          <Counter.Root>
                            <Counter.Minus
                              onClick={() => {
                                removeFromCart(Number(productId));
                              }}
                              disabled={count === 1}
                            />
                            <Counter.Display value={count} />
                            <Counter.Plus
                              onClick={() => {
                                addToCart(Number(productId));
                              }}
                              disabled={count === data.stock}
                            />
                          </Counter.Root>
                        </ShoppingCartItem.Footer>
                      </ShoppingCartItem.Content>
                    </ShoppingCartItem.Root>
                    {index !== Object.keys(cart).length - 1 && <Divider color="border.01_gray" />}
                  </>
                );
              }}
            </SuspenseQuery>
          );
        })}
      </Stack>
    </styled.section>
  );
}

export default ShoppingCartSection;
