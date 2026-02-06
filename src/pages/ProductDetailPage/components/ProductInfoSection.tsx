import type { Product } from '@/api/queryOptions';
import PriceDisplay from '@/components/PriceDisplay';
import { RatingGroup, Spacing, Text } from '@/ui-lib';
import Tag, { type TagType } from '@/ui-lib/components/tag';
import { Box, Divider, Flex, Stack, styled } from 'styled-system/jsx';

type ProductInfoSectionProps = {
  product: Product;
  counter: React.ReactNode;
  addToCartButton: React.ReactNode;
};

export const TAG_TYPES: TagType[] = ['cheese', 'cracker', 'tea'];

export const isTagType = (type: string): type is TagType => {
  return TAG_TYPES.includes(type as TagType);
};

function ProductInfoSection({ product, counter, addToCartButton }: ProductInfoSectionProps) {
  const category = product.category.toLowerCase();
  const safeCategory: TagType = isTagType(category) ? category : 'cheese';

  return (
    <styled.section css={{ bg: 'background.01_white', p: 5 }}>
      <Box>
        <Stack gap={2}>
          <Tag type={safeCategory} />
          <Text variant="B1_Bold">{product.name}</Text>
          <RatingGroup value={product.rating} readOnly label={`${product.rating.toFixed(1)}`} />
        </Stack>
        <Spacing size={4} />
        <Text variant="H1_Bold">
          <PriceDisplay price={product.price} />
        </Text>
      </Box>

      <Spacing size={5} />

      <Flex justify="space-between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <Text variant="C1_Medium">재고</Text>
          <Divider orientation="vertical" color="border.01_gray" h={4} />
          <Text variant="C1_Medium" color="secondary.02_orange">
            {product.stock}EA
          </Text>
        </Flex>
        {counter}
      </Flex>

      <Spacing size={5} />
      {addToCartButton}
    </styled.section>
  );
}

export default ProductInfoSection;
