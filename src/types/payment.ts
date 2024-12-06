import { IShop } from "./shop";
import { TUser } from "./user";
type PaymentStatus = "SUCCESS" | "FAILED";
export interface IPayment {
  id: string;
  amount: number;
  transactionId: string;
  userId: string;
  userInfo?: TUser;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  Shop?: IShop;
  shopId?: string | null;
}
