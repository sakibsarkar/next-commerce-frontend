"use client";
import OrderStatusSelection from "@/components/ManageOrder/OrderStatusSelection";
import OrderTable from "@/components/ManageOrder/OrderTable";
import DashboardHeading from "@/components/uiElements/DashboardHeading";
import { NextPagination } from "@/components/uiElements/NextPagination";
import { useGetVendorsOrdersQuery } from "@/redux/features/order/order.api";
import { useState } from "react";

const ManageOrdersView = () => {
  const [query, setQuery] = useState({
    page: 1,
    status: "",
    limit: 10,
  });

  const { data, isLoading } = useGetVendorsOrdersQuery(query);
  return (
    <div>
      <DashboardHeading
        title="Manage Orders"
        description="View and manage your orders"
        className="mb-4"
      />

      <OrderStatusSelection
        onStatusChange={(status) => setQuery({ ...query, status })}
      />
      <OrderTable isLoading={isLoading} orders={data?.data || []} />

      <NextPagination
        onPageChange={(page) => setQuery({ ...query, page })}
        totalDocs={data?.meta.totalDoc || 0}
        limit={10}
        showText
      />
    </div>
  );
};

export default ManageOrdersView;
