"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardHeading from "@/components/uiElements/DashboardHeading";
import { NextPagination } from "@/components/uiElements/NextPagination";
import NextSearchBox from "@/components/uiElements/NextSearchBox";
import TableDataFetching from "@/components/uiElements/TableDataFetching";
import TableDataLoading from "@/components/uiElements/TableDataLoading";
import { useGetCouponListQuery } from "@/redux/features/coupon/coupon.api";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
const ViewCoupons = () => {
  const [query, setQuery] = useState({ page: 1, limit: 10, searchTerm: "" });
  const { data, isFetching, isLoading } = useGetCouponListQuery(query);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.message("Copied to clipboard");
  };

  return (
    <div>
      <DashboardHeading
        title="View Coupons"
        description="view couponse that are provided by different vendors on different products on this site"
      />
      <Card className="mt-4">
        <CardHeader>
          <NextSearchBox
            className="mb-4"
            placeholder="Seach by coupon code/id"
            onValueChange={(searchTerm) => {
              setQuery({ ...query, searchTerm });
            }}
          />
        </CardHeader>

        <CardContent className="relative">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coupon Id</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Shop</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? <TableDataLoading cell={6} row={10} /> : ""}
              {data?.data.map((coupon) => {
                return (
                  <TableRow key={coupon.id}>
                    <TableCell className="font-medium">
                      <p
                        className="hover:underline cursor-pointer"
                        onClick={() => handleCopy(coupon.code)}
                      >
                        #{coupon.id}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p
                        className="hover:underline cursor-pointer"
                        onClick={() => handleCopy(coupon.code)}
                      >
                        {coupon.code}
                      </p>
                    </TableCell>
                    <TableCell>{coupon.discount}%</TableCell>
                    <TableCell>
                      <div className="flex items-start justify-start gap-[5px]">
                        <div className="w-[50px] h-[50px] center bg-[#e6e6e6]">
                          <Image
                            src={coupon.productInfo?.images[0] || ""}
                            alt={coupon.productInfo?.name || ""}
                            width={100}
                            height={100}
                            className="w-full h-full object-contain rounded-md"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h5>
                            {coupon.productInfo?.name.slice(0, 15) || "N/A"}
                          </h5>
                          <p className="text-[12px]">
                            ${coupon.productInfo?.price}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start justify-start gap-[5px]">
                        <div className="w-[35px] h-[35px] center bg-[#e6e6e6] rounded-full overflow-hidden">
                          <Image
                            src={coupon.productInfo?.shopInfo?.logo || ""}
                            alt={coupon.productInfo?.shopInfo?.name || ""}
                            width={35}
                            height={35}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <h5>{coupon.productInfo?.shopInfo?.name || "N/A"}</h5>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(coupon.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {isFetching && !isLoading ? <TableDataFetching /> : ""}
        </CardContent>
        <CardFooter>
          <NextPagination
            limit={query.limit}
            totalDocs={data?.meta?.totalDoc || 0}
            onPageChange={(page) => setQuery({ ...query, page })}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewCoupons;
