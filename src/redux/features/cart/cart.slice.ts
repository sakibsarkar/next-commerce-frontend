import { ICart } from "@/types/cart";
import { getDiscountPrice } from "@/utils/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { v4 } from "uuid";

interface ICartReducerType {
  items: ICart[];
  total: number;
}

const initialState: ICartReducerType = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        payload: Omit<ICart, "cartId" | "isOutOfStock">;
        replace?: boolean;
      }>
    ) => {
      const payload = action.payload.payload;
      const isFromSameShop = state.items.find(
        (item) => item.shopId === payload.shopId
      );

      const discountPrice = payload.discount
        ? getDiscountPrice(payload.price, payload.discount)
        : payload.price;

      if (action.payload.replace) {
        state.items = [
          {
            ...payload,
            isOutOfStock: false,
            cartId: v4(),
          },
        ];
        state.total = discountPrice * payload.quantity;
        return;
      }

      if (state.items.length > 0 && !isFromSameShop) {
        toast.error("You can't add products from different shops to cart");
        return;
      }

      const isExist = state.items.find(
        (item) =>
          item.productId === payload.productId &&
          item.colorId === payload.colorId &&
          item.sizeId === payload.sizeId
      );

      if (isExist) {
        isExist.quantity += payload.quantity;
        state.total += discountPrice * payload.quantity;
      } else {
        state.items.push({
          ...payload,
          isOutOfStock: false,
          cartId: v4(),
        });

        state.total += discountPrice * payload.quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.cartId === action.payload);
      if (item) {
        state.items = state.items.filter(
          (item) => item.cartId !== action.payload
        );
        state.total -=
          getDiscountPrice(item.price, item.discount) * item.quantity;
      }
    },

    updateCart: (
      state,
      action: PayloadAction<{
        cartId: string;
        payload: Partial<Pick<ICart, "quantity" | "isOutOfStock">>;
      }>
    ) => {
      const item = state.items.find(
        (item) => item.cartId === action.payload.cartId
      );
      const payload = action.payload.payload;
      if (!item) return;

      if (payload.quantity) {
        item.quantity = payload.quantity;
        state.total = state.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      }

      if (payload.isOutOfStock) {
        item.isOutOfStock = payload.isOutOfStock;
        state.total -= item.price * item.quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCart } =
  cartSlice.actions;
export default cartSlice.reducer;
