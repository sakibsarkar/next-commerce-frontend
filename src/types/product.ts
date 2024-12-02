import { ICategorie } from "./category";
import { IShop } from "./shop";

export interface ISize {
  id: string;
  size: string;
  quantity: number;
  colorId: string;
}
export interface IColor {
  id: string;
  color: string;
  productId: string;
  sizes: ISize[];
}

export interface IProduct {
  id: string;
  name: string;
  avgRating: number;
  description: string;
  images: string[];
  price: number;
  stock: number;
  discount: number;
  tag: string;
  categoryId: string;
  categoryInfo: ICategorie;
  isSale: boolean;
  shopId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  shopInfo: IShop;
  colors: IColor[];
}
