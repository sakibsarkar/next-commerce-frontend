import Banner from "@/components/Home/Banner";
import FollowedShopProduct from "@/components/Home/FollowedShopProduct";
import HelpNSupport from "@/components/Home/HelpNSupport";
import Products from "@/components/Home/Products";
import RecentrlyViewProducts from "@/components/Home/RecentrlyViewProducts";
import Tool from "@/components/Home/Tool";

const HomeView = () => {
  return (
    <div className="w-full py-[50px]">
      <Banner />
      <Products />
      <FollowedShopProduct />
      <RecentrlyViewProducts />
      <HelpNSupport />
      <Tool />
    </div>
  );
};

export default HomeView;
