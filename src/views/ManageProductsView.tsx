"use client";
import ProductTable from "@/components/ManageProducts/ProductTable";
import DashboardHeading from "@/components/uiElements/DashboardHeading";
import { NextPagination } from "@/components/uiElements/NextPagination";
import NextSearchBox from "@/components/uiElements/NextSearchBox";
import { useGetUsersShopProdcutsQuery } from "@/redux/features/product/product.api";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
const ManageProductsView = () => {
  const [query, setQuery] = useState({ page: 1, limit: 10, searchTerm: "" });

  const { data, isFetching, isLoading } = useGetUsersShopProdcutsQuery(query);

  return (
    <div>
      <DashboardHeading
        title="Manage Products"
        description="Create a new product and add it to your store"
        className="mb-[20px]"
      />
      <div className="w-full h-full flex items-center justify-between gap-[5px] mb-[23px]">
        <NextSearchBox
          onValueChange={(value) => setQuery({ ...query, searchTerm: value })}
          placeholder="search by product name"
        />

        <Link
          href="/dashboard/vendor/create-product"
          className="inline-block bg-main text-white font-semibold px-4 py-2 rounded-md hover:bg-mainHover transition-colors duration-300"
        >
          Create Product <Plus className="inline-block ml-2" />
        </Link>
      </div>
      <ProductTable
        products={data?.data || []}
        isLoading={isLoading}
        isFetching={isFetching}
      />
      <NextPagination
        totalDocs={data?.meta.totalDoc || 0}
        limit={10}
        onPageChange={(page) => setQuery({ ...query, page })}
        showText
      />
    </div>
  );
};

export default ManageProductsView;
