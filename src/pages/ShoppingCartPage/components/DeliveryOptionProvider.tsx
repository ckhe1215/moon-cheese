import { type DeliveryType } from '@/api/mutationOptions';
import { createContext, useContext, useState } from 'react';
import { Stack } from 'styled-system/jsx';
import { DeliveryItem } from './DeliveryItem';

const DeliveryOptionContext = createContext<{
  deliveryOption: DeliveryType;
  setDeliveryOption: React.Dispatch<React.SetStateAction<DeliveryType>>;
} | null>(null);

export const DeliveryOptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [deliveryOption, setDeliveryOption] = useState<DeliveryType>('EXPRESS');

  return (
    <DeliveryOptionContext.Provider value={{ deliveryOption, setDeliveryOption }}>
      {children}
    </DeliveryOptionContext.Provider>
  );
};

export const useDeliveryOption = () => {
  const context = useContext(DeliveryOptionContext);
  if (!context) {
    throw new Error('useDeliveryOption must be used within a DeliveryOptionProvider');
  }
  return context;
};

export const DeliveryOptionSelector = ({
  options,
}: {
  options: { value: DeliveryType; label: string; description: string; icon: React.ReactNode; price: number }[];
}) => {
  const { deliveryOption, setDeliveryOption } = useDeliveryOption();

  return (
    <Stack gap={4}>
      {options.map(option => (
        <DeliveryItem
          key={option.value}
          title={option.label}
          description={option.description}
          icon={option.icon}
          price={option.price}
          isSelected={deliveryOption === option.value}
          onClick={() => setDeliveryOption(option.value)}
        />
      ))}
    </Stack>
  );
};
