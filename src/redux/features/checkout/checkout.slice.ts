import { ICheckout } from "@/types/checkout";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICheckoutReducerType {
  items: ICheckout[];
}

const initialState: ICheckoutReducerType = {
  items: [],
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addItemsToCheckout: (state, action: PayloadAction<ICheckout[]>) => {
      state.items = action.payload;
    },
    clearCheckoutSession: (state) => {
      state.items = [];
    },
  },
});

export const { clearCheckoutSession, addItemsToCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
