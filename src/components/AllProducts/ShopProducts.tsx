"use client";

import { baseUrl } from "@/redux/api/appSlice";
import { IProduct } from "@/types/product";
import { useEffect, useState } from "react";
import ProductCard from "../card/ProductCard";
import ProductSkeleton from "../skeleton/ProductSkeleton";
import NotProductFound from "./NotProductFound";

const ShopProducts = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{
    searchTerm: string;
    category: string;
  } | null>(null);

  // Resolve `searchParams` only once
  useEffect(() => {
    const resolveParams = async () => {
      const search = await searchParams;
      const searchTerm = (search.searchTerm as string) || "";
      const category = (search.category as string) || "";
      setResolvedParams({ searchTerm, category });
      setPage(1);
      setProducts([]);
    };
    resolveParams();
  }, [searchParams]);

  const loadProducts = async () => {
    if (!resolvedParams) return;

    try {
      setIsLoading(true);
      const { searchTerm, category } = resolvedParams;

      const res = await fetch(
        `${baseUrl}/product/get?page=${page}&searchTerm=${searchTerm}&limit=12&categories=${category}`
      );

      const data = (await res.json()) as {
        data: IProduct[];
        meta: {
          totalDoc: number;
        };
      };

      if (data.data?.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...data.data]);
        const totalPages = Math.ceil(data.meta.totalDoc / 12);
        if (page >= totalPages) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (!isLoading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    if (resolvedParams) {
      loadProducts();
    }
    // Cleanup: Remove scroll event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, resolvedParams]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, hasMore]);

  if (!isLoading && products.length === 0) {
    return <NotProductFound />;
  }

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="gridResponsive w-full gap-[10px] sm:gap-[20px] justify-center">
        {products.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
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

export default ShopProducts;
