"use client";

import { baseUrl } from "@/redux/api/appSlice";
import { IProduct } from "@/types/product";
import { useEffect, useState } from "react";
import ProductCard from "../card/ProductCard";
import ProductSkeleton from "../skeleton/ProductSkeleton";
import { NextPagination } from "../uiElements/NextPagination";
import NotProductFound from "./NotProductFound";

const ShopProducts = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const [totalDoc, setTotalDoc] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{
    searchTerm: string;
    category: string;
    min_price: string;
    max_price: string;
  } | null>(null);

  // Resolve `searchParams` only once
  useEffect(() => {
    const resolveParams = async () => {
      const search = await searchParams;
      const searchTerm = (search.searchTerm as string) || "";
      const category = (search.category as string) || "";
      const min_price = (search.min_price as string) || "0";
      const max_price = (search.max_price as string) || "";

      setResolvedParams({ searchTerm, category, min_price, max_price });
      setPage(1);
    };
    resolveParams();
  }, [searchParams]);

  const loadProducts = async () => {
    if (!resolvedParams) return;

    try {
      setIsLoading(true);
      const { searchTerm, category, min_price, max_price } = resolvedParams;

      const res = await fetch(
        `${baseUrl}/product/get?page=${page}&searchTerm=${searchTerm}&limit=12&categories=${category}&maxPrice=${max_price}&minPrice=${min_price}`
      );

      const data = (await res.json()) as {
        data: IProduct[];
        meta: {
          totalDoc: number;
        };
      };

      if (data.data?.length > 0) {
        setProducts(data.data);
        setTotalDoc(data?.meta?.totalDoc || 0);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (resolvedParams) {
      loadProducts();
    }
  }, [page, resolvedParams]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalDoc) {
      setPage(newPage);
    }
  };

  if (!isLoading && products.length === 0) {
    return <NotProductFound />;
  }

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="gridResponsive w-full gap-[10px] sm:gap-[20px] justify-center">
        {isLoading ? (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        ) : (
          products.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      <NextPagination totalDocs={totalDoc} onPageChange={setPage} showText />
    </div>
  );
};

export default ShopProducts;
