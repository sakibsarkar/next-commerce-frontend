import Banner from "@/components/Home/Banner";
import ContactUs from "@/components/Home/ContactUs";
import FollowedShopProduct from "@/components/Home/FollowedShopProduct";
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
      <ContactUs />
      <Tool />
    </div>
  );
};

export default HomeView;
