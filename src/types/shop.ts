import { TUser } from "./user";

export interface IShop {
  id: string;
  name: string;
  logo: string;
  description: any;
  ownerId: string;
  ownerInfo: TUser;
  createdAt: string;
  updatedAt: string;
}
