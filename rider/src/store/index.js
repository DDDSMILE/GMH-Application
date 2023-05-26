import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import ordersReducer from "./orders.slice";

export const store = configureStore({
  reducer: { auth: authReducer, orders: ordersReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
