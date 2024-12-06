"use client";
import { useGetFlashSaleProductsQuery } from "@/redux/features/product/product.api";
import { IProduct } from "@/types/product";
import { useEffect, useState } from "react";
import ProductCard from "../card/ProductCard";
import ProductSkeleton from "../skeleton/ProductSkeleton";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const FlashSaleProducts = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { data, isFetching } = useGetFlashSaleProductsQuery({
    limit: 10,
    page,
  });

  // Update products when data changes
  useEffect(() => {
    if (data) {
      setProducts((prevProducts) => [...prevProducts, ...data.data]);
      setHasMore(products.length + data.data.length < data.meta.totalDoc);
    }
  }, [data]);

  const handleViewMore = () => {
    if (!isFetching && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="py-[20px]">
      <h4 className="text-[25px] font-[700] text-mainTxt">
        Flash Sale Products
      </h4>
      <Separator className="my-[25px]" />
      <div className="gridResponsive gap-[15px]">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}

        {isFetching && (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        )}
      </div>
      {hasMore && !isFetching && (
        <div className="w-full flex items-center justify-center mt-[25px]">
          <Button onClick={handleViewMore} variant={"outline"}>
            View More
          </Button>
        </div>
      )}
    </div>
  );
};

export default FlashSaleProducts;
