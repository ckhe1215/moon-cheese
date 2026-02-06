import { type Product } from '@/api/queryOptions';
import { SubGNB } from '@/ui-lib';
import { useState } from 'react';

export type TabType = 'ALL' | Product['category'];

export default function CategorySelector({
  options,
  children,
}: {
  options: { value: TabType; label: string }[];
  children: (currentTab: TabType) => React.ReactNode;
}) {
  const [currentTab, setCurrentTab] = useState<TabType>('ALL');

  return (
    <>
      <SubGNB.Root value={currentTab} onValueChange={options => setCurrentTab(options.value as TabType)}>
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
