import Banner from "@/components/Home/Banner";
import Category from "@/components/Home/Category";
import Features from "@/components/Home/Features";
import FollowedShopProduct from "@/components/Home/FollowedShopProduct";
import Guarantee from "@/components/Home/Guarantee";
import HelpNSupport from "@/components/Home/HelpNSupport";
import NewsletterSection from "@/components/Home/NewsLatter";
import Products from "@/components/Home/Products";
import RecentrlyViewProducts from "@/components/Home/RecentrlyViewProducts";
import Tool from "@/components/Home/Tool";
import TrustBadge from "@/components/Home/TrustBadge";

const HomeView = () => {
  return (
    <div className="w-full py-[50px]">
      <Banner />
      <Category />
      <Products />
      <FollowedShopProduct />
      <RecentrlyViewProducts />
      <NewsletterSection />
      <div className="bg-white p-[15px]">
        <Features />
        <Guarantee />
      </div>
      <TrustBadge />
      <HelpNSupport />
      <Tool />
    </div>
  );
};

export default HomeView;
