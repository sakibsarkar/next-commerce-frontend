import { TUser } from "./user";

export interface IReview {
  id: string;
  images: string;
  description: string;
  rating: number;
  userId: string;
  orderId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  hasReply: boolean;
  userInfo: TUser;
}
