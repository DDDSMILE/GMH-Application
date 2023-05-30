import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import orderReducer from "./order.slice";
import ordersReducer from "./orders.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  orders: ordersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
