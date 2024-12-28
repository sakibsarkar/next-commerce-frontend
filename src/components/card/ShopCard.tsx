import { Package, Store, Users } from "lucide-react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IShop } from "@/types/shop";

interface IProps {
  shop: IShop & { followerCount?: number; totalProduct?: number };
}

const ShopCard: React.FC<IProps> = ({ shop }) => {
  return (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="border-b p-0">
        <div className="aspect-[4/3] relative">
          {shop.logo ? (
            <Image
              src={shop.logo}
              alt={`${shop.name} logo`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <Store className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-base line-clamp-1 mb-1">
          {shop.name}
        </CardTitle>
        <CardDescription className="text-xs line-clamp-2 mb-3">
          {shop.description}
        </CardDescription>
        <div className="flex justify-start flex-col items-start text-sm gap-[8px]">
          {shop.totalProduct && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Package className="h-3 w-3" />
              <span>Products:</span>
              <span>{shop.totalProduct}</span>
            </div>
          )}{" "}
          {shop.followerCount && (
            <div className="flex items-center gap-1 text-main font-[700] bg-main/20 rounded-[4px] px-2 py-1">
              <Users className="h-3 w-3" />
              <span>Followers:</span>
              <span>{shop.followerCount}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopCard;
