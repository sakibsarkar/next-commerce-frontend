import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ShopSkeleton = () => {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="border-b p-0">
        <Skeleton className="aspect-[4/3] w-full" />
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopSkeleton;
