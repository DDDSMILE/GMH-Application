import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import orderReducer from "./order.slice";
import ordersReducer from "./orders.slice";

export const store = configureStore({
  reducer: { auth: authReducer, order: orderReducer, orders: ordersReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
