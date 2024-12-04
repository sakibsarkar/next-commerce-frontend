import { useToggleShopFollowingMutation } from "@/redux/features/shop/shop.api";
import { User } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface IProps {
  following: boolean;
  totalFollower: number;
  shopId: string;
}

const ShopFollowerButton: React.FC<IProps> = ({
  following,
  totalFollower,
  shopId,
}) => {
  const [isFollowing, setIsFollowing] = useState(following);
  const [toggleStatus, { isLoading }] =
    useToggleShopFollowingMutation(undefined);

  const handleToggleFollowing = async () => {
    try {
      await toggleStatus(shopId).unwrap();
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={handleToggleFollowing}
      variant={isFollowing ? "default" : "outline"}
      className={`${
        isFollowing ? "bg-main hover:bg-main/80" : "border-main text-main"
      }`}
    >
      <User className="w-4 h-4" /> {totalFollower}{" "}
      {isLoading
        ? isFollowing
          ? "Unfollowing..."
          : "Following..."
        : isFollowing
        ? "Unfollow"
        : "Follow"}
    </Button>
  );
};

export default ShopFollowerButton;
