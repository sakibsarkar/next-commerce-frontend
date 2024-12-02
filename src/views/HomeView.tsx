import Banner from "@/components/Home/Banner";
import Products from "@/components/Home/Products";
import Tool from "@/components/Home/Tool";

const HomeView = () => {
  return (
    <div className="w-full py-[50px]">
      <Banner />
      <Products />
      <Tool />
    </div>
  );
};

export default HomeView;
