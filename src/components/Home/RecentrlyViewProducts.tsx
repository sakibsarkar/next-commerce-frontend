import useGetRecentProducts from "@/hooks/useGetRecentProducts";
import ProductCard from "../card/ProductCard";
import ProductSkeleton from "../skeleton/ProductSkeleton";
import { Separator } from "../ui/separator";

const RecentrlyViewProducts = () => {
  const { products, isLoading } = useGetRecentProducts();

  if (!isLoading && !products?.length) {
    return <></>;
  }
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

        {isLoading ? (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default RecentrlyViewProducts;
