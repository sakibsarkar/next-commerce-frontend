"use client";
import MyOrdersTable from "@/components/MyOrders/MyOrdersTable";
import { NextPagination } from "@/components/uiElements/NextPagination";
import { useGetUserOrdersQuery } from "@/redux/features/order/order.api";
import { useState } from "react";

const MyOrderView = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetUserOrdersQuery({ page });

  return (
    <div className="w-full ">
      <h2 className="text-2xl font-bold mb-[28px]">You orders</h2>
      <div className="max-h-[50vh] overflow-auto smoothBar w-full">
        <MyOrdersTable orders={data?.data || []} isLoading={isFetching} />
      </div>

      <NextPagination
        totalDocs={data?.meta.totalDoc || 0}
        limit={10}
        onPageChange={setPage}
        showText
      />
    </div>
  );
};

export default MyOrderView;
