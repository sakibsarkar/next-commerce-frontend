"use client";

import MyShopCard from "@/components/MyShop/MyShopCard";
import { useGetOwnerShopQuery } from "@/redux/features/shop/shop.api";

const MyShopView = () => {
  const { data, isFetching } = useGetOwnerShopQuery(undefined);
  return <div>{isFetching ? "" : <MyShopCard shop={data?.data! || {}} />}</div>;
};

export default MyShopView;
