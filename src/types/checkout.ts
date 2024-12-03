export interface ICheckout {
  productId: string;
  quantity: number;
  colorId: string;
  sizeId: string;
  colorName: string;
  sizeName: string;
  price: number;
  image: string;
  name: string;
  shopId: string;
  shopName: string;
  discount?: number;
}
