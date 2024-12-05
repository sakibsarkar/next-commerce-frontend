import { IShopInfo } from "@/types/shop";
import { getFallbackText } from "@/utils/trimText";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface Props {
  shop: Omit<IShopInfo, "totalProduct" | "isFollowing">;
}

const MyShopCard: React.FC<Props> = ({ shop }) => {
  return (
    <div className="w-full bg-white">
      <div className="relative h-[200px] bg-gradient-to-r from-yellow-300 to-orange-500 rounded-lg">
        <div className="absolute -bottom-12 left-6 flex items-center gap-4 z-[10]">
          <Avatar className="w-[150px] h-[150px]">
            <AvatarImage src={shop?.logo} />
            <AvatarFallback className="text-[70px]">
              {getFallbackText(shop?.name, 2)}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-semibold">{shop?.name}</h1>
        </div>
      </div>
      <div className="pt-16 px-6 pb-4 flex items-center justify-between">
        <Link href={"vendor/update-shop"}>
          <Button
            variant="outline"
            className="text-yellow-600 hover:text-yellow-700"
          >
            Edit Shop
          </Button>
        </Link>
        <div className="bg-white border rounded-full px-4 py-1.5 text-sm">
          {shop?.followerCount} Followers
        </div>
      </div>
    </div>
  );
};

export default MyShopCard;
