import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  items: [],
  addresses: [],
};

const isItemInOrder = (items, item) =>
  items.some((orderItem) => orderItem.item.name === item.name);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (isItemInOrder(state.items, action.payload.item)) {
        state.items = state.items.map((orderItem) => {
          if (orderItem.item.name === action.payload.item.name) {
            orderItem.qty = orderItem.qty + 1;
          }
          return orderItem;
        });
      } else {
        state.items.push({ item: action.payload.item, qty: 1 });
      }
      state.total = state.total + action.payload.item.price;
    },
    removeItem: (state, action) => {
      const itemToRemove = state.items.find(
        (item) => item.item.name === action.payload.item.name
      );

      state.items = state.items.filter(
        (item) => item.item.name !== action.payload.item.name
      );

      state.total = state.total - itemToRemove.item.price * itemToRemove.qty;
    },
    decreaseItem: (state, action) => {
      const itemToDecrease = state.items.find(
        (item) => item.item.name === action.payload.item.name
      );

      if (itemToDecrease.qty > 1) {
        state.items = state.items.map((item) => {
          if (item.item.name === action.payload.item.name) {
            item.qty = item.qty - 1;
          }
          return item;
        });
      } else {
        state.items = state.items.filter(
          (item) => item.item.name !== itemToDecrease.item.name
        );
      }

      state.total = state.total - itemToDecrease.item.price;
    },
    increaseItem: (state, action) => {
      const itemToIncrease = state.items.find(
        (item) => item.item.name === action.payload.item.name
      );

      state.items = state.items.map((item) => {
        if (item.item.name === action.payload.item.name) {
          item.qty = item.qty + 1;
        }
        return item;
      });

      state.total = state.total + itemToIncrease.item.price;
    },
    clearOrder: (state) => {
      state.items = [];
      state.total = 0;
      state.addresses = [];
    },
  },
});

export const { addItem, removeItem, decreaseItem, increaseItem, clearOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
