import { ICart } from "@/types/cart";
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
        payload: Omit<ICart, "cartId">;
        replace?: boolean;
      }>
    ) => {
      const payload = action.payload.payload;
      const isFromSameShop = state.items.find(
        (item) => item.shopId === payload.shopId
      );

      if (action.payload.replace) {
        state.items = [
          {
            ...payload,
            cartId: v4(),
          },
        ];
        state.total = payload.price * payload.quantity;
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
        state.total += payload.price * payload.quantity;
      } else {
        state.items.push({
          ...payload,
          cartId: v4(),
        });

        state.total += payload.price * payload.quantity;
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
