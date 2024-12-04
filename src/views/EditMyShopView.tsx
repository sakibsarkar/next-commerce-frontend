"use client";

import ShopForm from "@/components/MyShop/ShopForm";
import Loader from "@/components/shared/Loader";
import { useGetOwnerShopQuery } from "@/redux/features/shop/shop.api";
const EditMyShopView = () => {
  const { data, isFetching } = useGetOwnerShopQuery(undefined);

  if (isFetching) {
    return <Loader />;
  }

  return <ShopForm initialValues={data?.data} />;
};

export default EditMyShopView;
