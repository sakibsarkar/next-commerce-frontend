"use client";
import { useGetFollowedShopProductsQuery } from "@/redux/features/product/product.api";
import { useAppSelector } from "@/redux/hook";
import ProductCard from "../card/ProductCard";
import { Separator } from "../ui/separator";
const FollowedShopProduct = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data } = useGetFollowedShopProductsQuery(10, {
    skip: !user,
    refetchOnMountOrArgChange: true,
  });

  if (!user) {
    return <></>;
  }

  if (data?.data?.length === 0) {
    <></>;
  }

  return (
    <div className="w-full mt-[50px]">
      <h4 className="text-[25px] font-[700] text-mainTxt">
        Product From Shop You Follow
      </h4>
      <Separator className="my-[25px]" />
      <div className="gridResponsive gap-[15px]">
        {data?.data?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default FollowedShopProduct;
