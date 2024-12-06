"use client";
import ShopsTable from "@/components/MangeShops/ShopsTable";
import ShopStatusSelection from "@/components/MangeShops/ShopStatusSelection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NextSearchBox from "@/components/uiElements/NextSearchBox";
import { useGetShopListQuery } from "@/redux/features/admin/admin.api";
import { useState } from "react";

const MangeShopView = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    isBlackListed: "",
    searchTerm: "",
  });

  const { data } = useGetShopListQuery(query);

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Shop Management</CardTitle>
      </CardHeader>
      <CardContent>
        <NextSearchBox
          className="mb-4"
          placeholder="Search by shop name"
          onValueChange={(searchTerm) => {
            setQuery({ ...query, searchTerm });
          }}
        />

        <ShopStatusSelection
          onChange={(val) => {
            const list = val === " " ? "" : val;
            setQuery({ ...query, isBlackListed: list });
          }}
        />
        <ShopsTable shops={data?.data || []} />
      </CardContent>
    </Card>
  );
};

export default MangeShopView;
