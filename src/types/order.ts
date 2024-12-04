import { IShippingAddress } from "./ShippingAdress";
import { IShop } from "./shop";

export interface IOrder {
  id: string;
  productId: string;
  quantity: number;
  size: string;
  color: string;
  total: number;
  userId: string;
  shopId: string;
  shopInfo?: IShop;
  shippingId: string;
  shippingInfo?: IShippingAddress;
  hasReviewGiven: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  productInfo: {
    id: string;
    price: number;
    name: string;
    images: string[];
  };
}
