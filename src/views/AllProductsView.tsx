import ProductQuery from "@/components/AllProducts/query/ProductQuery";
import ShopProducts from "@/components/AllProducts/ShopProducts";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton";
import { Suspense } from "react";

const AllProductsView = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="flex items-center md:items-start justify-start flex-col md:flex-row gap-[23px] py-[50px]">
      <ProductQuery />
      <Suspense
        fallback={
          <div className="w-full flex flex-col gap-[15px]">
            <div className="gridResponsive w-full gap-[10px] sm:gap-[20px] justify-center">
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </div>
          </div>
        }
      >
        <ShopProducts searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default AllProductsView;
