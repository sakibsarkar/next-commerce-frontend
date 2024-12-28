import Banner from "@/components/Home/Banner";
import Category from "@/components/Home/Category";
import FollowedShopProduct from "@/components/Home/FollowedShopProduct";
import HelpNSupport from "@/components/Home/HelpNSupport";
import NewsletterSection from "@/components/Home/NewsLatter";
import Products from "@/components/Home/Products";
import RecentrlyViewProducts from "@/components/Home/RecentrlyViewProducts";
import Tool from "@/components/Home/Tool";

const HomeView = () => {
  return (
    <div className="w-full py-[50px]">
      <Banner />
      <Category />
      <Products />
      <FollowedShopProduct />
      <RecentrlyViewProducts />
      <NewsletterSection />
      <HelpNSupport />
      <Tool />
    </div>
  );
};

export default HomeView;
