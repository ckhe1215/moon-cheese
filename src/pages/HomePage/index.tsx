import { recentProductListQueryOptions } from '@/api/queryOptions';
import ErrorSection from '@/components/ErrorSection';
import { ErrorBoundary } from '@suspensive/react';
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
      <ErrorBoundary fallback={({ reset }) => <ErrorSection onRetry={reset} />}>
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
      </ErrorBoundary>

      <ErrorBoundary fallback={<ErrorSection />}>
        <SuspenseQuery {...recentProductListQueryOptions()}>
          {({ data }) => <RecentPurchasedProductList items={data.recentProducts} />}
        </SuspenseQuery>
      </ErrorBoundary>

      <SellingProductList />
    </>
  );
}

export default HomePage;
