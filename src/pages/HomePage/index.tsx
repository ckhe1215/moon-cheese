import { productListQueryOptions, recentProductListQueryOptions } from '@/api/queryOptions';
import AsyncBoundary from '@/components/AsyncBoundary';
import ErrorSection from '@/components/ErrorSection';
import { SuspenseQuery } from '@suspensive/react-query';
import BannerSection from './components/BannerSection';
import CurrentLevelSection from './components/CurrentLevelSection';
import GetPointInfo from './components/GetPointInfo';
import RecentPurchasedProductList from './components/RecentPurchasedProductList';
import SellingProductList from './components/SellingProductList';

function HomePage() {
  return (
    <>
      <BannerSection />
      <AsyncBoundary fallback={<ErrorSection />}>
        <GetPointInfo>
          {({ currentGrade, currentPoint, leftPointToNextGrade, progress }) => (
            <CurrentLevelSection
              currentGrade={currentGrade}
              currentPoint={currentPoint}
              leftPointToNextGrade={leftPointToNextGrade}
              progress={progress}
            />
          )}
        </GetPointInfo>
      </AsyncBoundary>

      <AsyncBoundary fallback={<ErrorSection />}>
        <SuspenseQuery {...recentProductListQueryOptions()}>
          {({ data }) => <RecentPurchasedProductList items={data.recentProducts} />}
        </SuspenseQuery>
      </AsyncBoundary>

      <AsyncBoundary fallback={<ErrorSection />}>
        <SuspenseQuery {...productListQueryOptions()}>
          {({ data }) => <SellingProductList items={data.products} />}
        </SuspenseQuery>
      </AsyncBoundary>
    </>
  );
}

export default HomePage;
