import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const ShippingAddressCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 flex items-start space-x-4">
        <div className="bg-gray-100 rounded-full p-3">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <div className="flex-1 space-y-2">
          {/* City name skeleton */}
          <div className="h-5 bg-gray-200 rounded-md animate-pulse w-24" />

          {/* Address skeleton */}
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4" />

          {/* Phone number skeleton */}
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-32 mt-1" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingAddressCardSkeleton;
