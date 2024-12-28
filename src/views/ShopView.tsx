"use client";
import ShopCard from "@/components/card/ShopCard";
import ShopSkeleton from "@/components/skeleton/ShopSkeleton";
import { NextPagination } from "@/components/uiElements/NextPagination";
import NextSearchBox from "@/components/uiElements/NextSearchBox";
import { useGetAllShopsQuery } from "@/redux/features/shop/shop.api";
import { Store } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
const ShopView = () => {
  const [query, setQuery] = useState({ page: 1, searchTerm: "" });
  const { data, isFetching } = useGetAllShopsQuery(query);

  return (
    <div className="py-6">
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">World wide shops</h2>
        <p className="text-muted-foreground">
          Discover unique products from our verified sellers
        </p>
      </div>
      <NextSearchBox
        onValueChange={(value) => setQuery({ ...query, searchTerm: value })}
        className="mb-6"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isFetching &&
          Array.from({ length: 8 }).map((_, i) => <ShopSkeleton key={i} />)}
        {data?.data?.map((shop) => (
          <Link key={shop.id} href={`/shop/${shop.id}`}>
            <ShopCard shop={shop} />
          </Link>
        ))}
      </div>
      {!data?.data?.length && !isFetching ? (
        <div className="flex flex-col items-center justify-center py-12 text-center w-full h-full bg-white rounded-md">
          <Store className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-1">No Shops Found</h3>
          <p className="text-sm text-muted-foreground">
            There are no shops available at the moment.
          </p>
        </div>
      ) : (
        ""
      )}

      <NextPagination
        totalDocs={data?.meta.totalDoc || 0}
        limit={12}
        onPageChange={(page) => setQuery({ ...query, page })}
        showText
      />
    </div>
  );
};

export default ShopView;
