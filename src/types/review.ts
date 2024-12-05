import { IProduct } from "./product";
import { IShop } from "./shop";
import { TUser } from "./user";

interface IReviewResponse {
  shopId: string;
  shopInfo: IShop;
  description: string;
}

export interface IReview {
  id: string;
  image: string;
  description: string;
  rating: number;
  userId: string;
  orderId: string;
  productId: string;
  productInfo?: IProduct;
  reviewResponse?: IReviewResponse;
  userInfo?: TUser;
  createdAt: string;
  updatedAt: string;
  hasReply: boolean;
}
