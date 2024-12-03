import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { api } from "../api/appSlice";
import authReducer from "../features/auth/auth.slice";
import cartReducer from "../features/cart/cart.slice";
import checkoutReducer from "../features/checkout/checkout.slice";
import productComparisonReducer from "../features/product/productComparison.slice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};
const persistAuthReducer = persistReducer(
  { ...persistConfig, key: "auth" },
  authReducer
);
const persistCartReducer = persistReducer(
  { ...persistConfig, key: "cart" },
  cartReducer
);

// Configure store
const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
    checkout: checkoutReducer,
    cart: persistCartReducer,
    productComparison: productComparisonReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

// Configure persistor
const persistor = persistStore(store);

// Export types and store/persistor
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { persistor, store };
