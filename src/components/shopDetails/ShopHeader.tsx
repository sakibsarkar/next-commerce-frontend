import { useGetShopInfoByIdQuery } from "@/redux/features/shop/shop.api";
import { getFallbackText } from "@/utils/trimText";
import ShopHeaderSkeleton from "../skeleton/ShopHeaderSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import ShopFollowerButton from "./ShopFollowerButton";

interface IProps {
  shopId: string;
}

const ShopHeader: React.FC<IProps> = ({ shopId }) => {
  const { data, isLoading } = useGetShopInfoByIdQuery(shopId);
  return (
    <>
      {isLoading ? (
        <ShopHeaderSkeleton />
      ) : (
        <Card className="border-main border-2">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <Avatar>
                  <AvatarImage src={data?.data?.logo} alt={data?.data.name} />
                  <AvatarFallback>
                    {getFallbackText(data?.data.name || "NC", 2)}{" "}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h1 className="text-lg font-semibold">{data?.data.name}</h1>
                <div className="text-sm text-muted-foreground">
                  <p>{data?.data?.followerCount} Followers</p>
                  <p>{data?.data?.totalProduct} Product</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ShopFollowerButton
                following={data?.data?.isFollowing || false}
                totalFollower={data?.data?.followerCount || 0}
                shopId={shopId}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ShopHeader;
