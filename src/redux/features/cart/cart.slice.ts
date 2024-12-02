import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  _id: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  name: string;
}

export interface ICart {
  items: ICartItem[];
  total: number;
}

const initialState: ICart = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<ICartItem>) => {
      const product = action.payload;
      const quantity = product.quantity || 1;
      const isExistProduct = state.items.find(
        (item) =>
          item._id === product._id &&
          item.color === product.color &&
          item.size === product.size
      );

      if (!isExistProduct) {
        state.items.push(product);
      } else {
        // increase quantity
        isExistProduct.quantity += quantity;
      }
      state.total += product.price * quantity;
    },

    updatePrice: (
      state,
      action: PayloadAction<{
        _id: string;
        price: number;
        color: string;
        size: string;
      }>
    ) => {
      const { _id, price, color, size } = action.payload;

      const product = state.items.find(
        (item) => item._id === _id && item.color === color && item.size === size
      );

      if (product) {
        product.price = price;
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        _id: string;
        quantity: number;
        color: string;
        size: string;
      }>
    ) => {
      const { _id, quantity, size, color } = action.payload;

      const product = state.items.find(
        (item) => item._id === _id && item.color === color && item.size === size
      );

      if (product) {
        product.quantity = quantity;
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{
        _id: string;
        color: string;
        size: string;
      }>
    ) => {
      const { _id, color, size } = action.payload;

      const newProducts = state.items.filter(
        (item) =>
          !(item._id === _id && item.color === color && item.size === size)
      );

      state.items = newProducts;
      state.total = newProducts.reduce(
        (sum, item) => sum + item.price * item.quantity!,
        0
      );
    },

    increaseQuantity: (
      state,
      action: PayloadAction<{
        _id: string;
        quantity?: number;
        color: string;
        size: string;
      }>
    ) => {
      const { _id, quantity = 1, color, size } = action.payload;
      const product = state.items.find(
        (item) => item._id === _id && item.color === color && item.size === size
      );
      if (product) {
        const willQuantity = product.quantity + quantity;

        product.quantity = willQuantity;
      }

      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity!,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const {
  addItemToCart,
  removeFromCart,
  clearCart,
  updatePrice,
  increaseQuantity,
  updateQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
