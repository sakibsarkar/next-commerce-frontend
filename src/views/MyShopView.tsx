"use client";

import MyShopCard from "@/components/MyShop/MyShopCard";
import ShopForm from "@/components/MyShop/ShopForm";
import MyShopCardSkeleton from "@/components/skeleton/MyShopCardSkeleton";
import { useGetOwnerShopQuery } from "@/redux/features/shop/shop.api";

const MyShopView = () => {
  const { data, isFetching } = useGetOwnerShopQuery(undefined);
  return (
    <div>
      {isFetching ? (
        <MyShopCardSkeleton />
      ) : data?.data ? (
        <MyShopCard shop={data?.data! || {}} />
      ) : (
        <ShopForm />
      )}
    </div>
  );
};

export default MyShopView;
