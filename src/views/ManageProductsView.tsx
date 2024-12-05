"use client";
import ProductTable from "@/components/ManageProducts/ProductTable";
import DashboardHeading from "@/components/uiElements/DashboardHeading";
import { NextPagination } from "@/components/uiElements/NextPagination";
import { useGetUsersShopProdcutsQuery } from "@/redux/features/product/product.api";
import { useState } from "react";
const ManageProductsView = () => {
  const [page, setPage] = useState(1);

  const { data } = useGetUsersShopProdcutsQuery({ page, limit: 10 });

  return (
    <div>
      <DashboardHeading
        title="Manage Products"
        description="Create a new product and add it to your store"
        className="mb-[20px]"
      />
      <ProductTable products={data?.data || []} />
      <NextPagination
        totalDocs={data?.meta.totalDoc || 0}
        limit={10}
        onPageChange={setPage}
        showText
      />
    </div>
  );
};

export default ManageProductsView;
