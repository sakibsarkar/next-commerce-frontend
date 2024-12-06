"use client";
import ProductCard from "@/components/card/ProductCard";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useGetRecentProducts from "@/hooks/useGetRecentProducts";
import Link from "next/link";

const RecentProductsView = () => {
  const { products, isLoading } = useGetRecentProducts();

  if (!isLoading && !products?.length) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center py-[15px]">
        <Card className="w-full mx-auto h-[600px] center flex-col">
          <CardHeader>
            <CardTitle className="text-center">
              No Recently Viewed Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center">
              It looks like you haven&apos;t viewed any products recently. Why
              not explore our collection and discover something new?
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/product" passHref>
              <Button variant="outline" className="w-full">
                Explore Products
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-[20px]">
      <h4 className="text-[25px] font-[700] text-mainTxt">
        Recently viewed Products
      </h4>
      <Separator className="my-[25px]" />
      <div className="gridResponsive gap-[15px]">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}

        {isLoading ? (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default RecentProductsView;
