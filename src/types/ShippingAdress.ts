import { TUser } from "./user";

export interface IShippingAddress {
  id: string;
  city: string;
  zip_code: string;
  detailed_address: string;
  phone: string;
  userId: string;
  userInfo: TUser;
}
