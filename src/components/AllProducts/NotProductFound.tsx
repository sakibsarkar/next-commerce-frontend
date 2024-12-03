"use client";
import useSetSearchParams from "@/hooks/useSetParams";
import { PackageX } from "lucide-react";
import { Button } from "../ui/button";
const NotProductFound = () => {
  const { clearSearchParams } = useSetSearchParams();
  const handleClearFilter = () => {
    clearSearchParams();
  };
  return (
    <div className="center flex-col w-full h-[100vh] md:h-[40vh] gap-[15px]">
      <PackageX className="h-12 w-12 text-muted-foreground" />
      <h2 className="text-2xl font-bold tracking-tight">No products found</h2>
      <p className="text-muted-foreground">
        We couldn&apos;t find any products matching your criteria. Try adjusting
        your filters or search terms.
      </p>
      <div className="flex space-x-4">
        <Button variant="outline" onClick={handleClearFilter}>
          Clear filters
        </Button>
        <Button>View cart</Button>
      </div>
    </div>
  );
};

export default NotProductFound;
