import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import loaderSlice from "./loaderSlice";
import alertSlice from "./alertSlice";
import orderSlice from "./orderSlice";
import cartSlice from "./cartSlice";
import { fetchCartProducts } from "./cartThunk"; // Import the thunk action

export const store = configureStore({
  reducer: {
    users: userSlice,
    alert: alertSlice,
    loader: loaderSlice,
    order: orderSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

// Add the thunk action to the slice reducer
cartSlice.reducers = {
  ...cartSlice.reducers,
  fetchCartProducts: fetchCartProducts,
};
