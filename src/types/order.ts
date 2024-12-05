import { IShippingAddress } from "./ShippingAdress";
import { IShop } from "./shop";

export type TOrderStatus = "PENDING" | "ON_SHIPMENT" | "SHIPPED";

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
  status: TOrderStatus;
  createdAt: string;
  updatedAt: string;
  productInfo: {
    id: string;
    price: number;
    name: string;
    images: string[];
  };
}
