"use client";
import ProductCard from "@/components/card/ProductCard";
import { Separator } from "@/components/ui/separator";
import useGetRecentProducts from "@/hooks/useGetRecentProducts";
const RecentProductsView = () => {
  const { products, isLoading } = useGetRecentProducts();

  return (
    <div className="min-h-screen py-[20px]">
      <h4 className="text-[25px] font-[700] text-mainTxt">
        Recently viewed Products
      </h4>
      <Separator className="my-[25px]" />
      <div className="gridResponsive gap-[15px]">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default RecentProductsView;
