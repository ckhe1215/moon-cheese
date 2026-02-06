import PriceDisplay from '@/components/PriceDisplay';
import { Text } from '@/ui-lib';
import { Flex } from 'styled-system/jsx';

export function DeliveryItem({
  title,
  description,
  icon,
  price,
  isSelected,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  price: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Flex
      gap={3}
      css={{
        alignItems: 'center',
        p: 5,
        py: 4,
        bgColor: isSelected ? 'primary.01_primary' : 'background.02_light-gray',
        transition: 'background-color 0.3s ease',
        rounded: '2xl',
        color: isSelected ? 'neutral.05_white' : 'neutral.01_black',
        cursor: 'pointer',
      }}
      role="button"
      onClick={onClick}
    >
      {icon}

      <Flex flexDir="column" gap={1} flex={1}>
        <Text variant="B2_Regular" fontWeight={'semibold'} color={isSelected ? 'neutral.05_white' : 'neutral.01_black'}>
          {title}
        </Text>
        <Text variant="C2_Medium" color={isSelected ? 'neutral.05_white' : 'neutral.02_gray'}>
          {description}
        </Text>
      </Flex>
      <Text variant="B2_Medium" fontWeight={'semibold'} color={isSelected ? 'neutral.05_white' : 'neutral.01_black'}>
        {price ? <PriceDisplay price={price} /> : '무료'}
      </Text>
    </Flex>
  );
}
