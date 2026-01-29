import { SubGNB } from '@/ui-lib';
import { useState } from 'react';

export default function CategorySelector({
  options,
  children,
}: {
  options: { value: string; label: string }[];
  children: (currentTab: string) => React.ReactNode;
}) {
  const [currentTab, setCurrentTab] = useState('all');

  return (
    <>
      <SubGNB.Root value={currentTab} onValueChange={details => setCurrentTab(details.value)}>
        <SubGNB.List>
          {options.map(option => (
            <SubGNB.Trigger key={option.value} value={option.value}>
              {option.label}
            </SubGNB.Trigger>
          ))}
        </SubGNB.List>
      </SubGNB.Root>
      {children(currentTab)}
    </>
  );
}
