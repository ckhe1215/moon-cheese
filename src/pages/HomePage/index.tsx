import BannerSection from './components/BannerSection';
import CurrentLevelSection from './components/CurrentLevelSection';
import RecentPurchasedProductList from './components/RecentPurchasedProductList';
import SellingProductList from './components/SellingProductList';

function HomePage() {
  return (
    <>
      <BannerSection />
      <CurrentLevelSection />
      <RecentPurchasedProductList />
      <SellingProductList />
    </>
  );
}

export default HomePage;
