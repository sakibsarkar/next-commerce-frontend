import { Skeleton } from "@/components/ui/skeleton";
const MyShopCardSkeleton = () => {
  return (
    <div className="w-full bg-white">
      <div className="relative h-[200px] bg-gradient-to-r from-yellow-300 to-orange-500 rounded-lg animate-pulse">
        <div className="absolute -bottom-12 left-6 flex items-center gap-4">
          <Skeleton className="w-20 h-20 rounded-full" />
          <Skeleton className="h-8 w-40" />
        </div>
      </div>
      <div className="pt-16 px-6 pb-4 flex items-center justify-between">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-8 w-32 rounded-full" />
      </div>
    </div>
  );
};

export default MyShopCardSkeleton;
