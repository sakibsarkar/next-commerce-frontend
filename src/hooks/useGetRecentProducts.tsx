"use client";
import { baseUrl } from "@/redux/api/appSlice";
import { IProduct } from "@/types/product";
import { useEffect, useState } from "react";

interface UseGetRecentProductsResult {
  products: IProduct[];
  isLoading: boolean;
  error: string | null;
}

const useGetRecentProducts = (): UseGetRecentProductsResult => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get recent product IDs from localStorage
        const recentProductIds: string[] = JSON.parse(
          localStorage.getItem("recentProducts") || "[]"
        );

        if (recentProductIds.length === 0) {
          setProducts([]);
          setIsLoading(false);
          return;
        }

        // Fetch product details from the backend
        const response = await fetch(`${baseUrl}/product/get-by-ids`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: recentProductIds }),
        });

        if (!response.ok) {
          setError("Failed to fetch recent products");
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        const products = data?.data || [];
        setProducts(products);
        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        console.error("Error fetching recent products:", err);
        setError(err.message || "Failed to fetch recent products");
      }
    };

    fetchRecentProducts();
  }, []);

  return { products, isLoading, error };
};

export default useGetRecentProducts;
