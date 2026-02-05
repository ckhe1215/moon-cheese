import type { Product } from '@/api/queryOptions';

export default function GetFilteredProducts({
  products,
  currentTab,
  children,
}: {
  products: Product[];
  currentTab: string;
  children: (filteredProducts: Product[]) => React.ReactNode;
}) {
  const filteredProducts = getFilteredProducts(products, currentTab);
  return children(filteredProducts);
}

const filterByCategory = (category: string, currentTab: string) => {
  if (currentTab === 'ALL') return true;
  return category === currentTab;
};

const getFilteredProducts = (products: Product[], currentTab: string) => {
  return products.filter(product => filterByCategory(product.category, currentTab));
};
