import { TUser } from "./user";

export interface IShop {
  id: string;
  name: string;
  logo: string;
  description: any;
  isBlackListed: boolean;
  ownerId: string;
  ownerInfo: TUser;
  createdAt: string;
  updatedAt: string;
}

export interface IShopInfo extends IShop {
  isFollowing: boolean;
  followerCount: number;
  totalProduct: number;
}
