import ErrorSection from '@/components/ErrorSection';
import { ErrorBoundary } from '@suspensive/react';
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

      <RecentPurchasedProductList />
      <SellingProductList />
    </>
  );
}

export default HomePage;
