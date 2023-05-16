import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getOrdersFromUser } from "../services/orders";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ userId }, thunkAPI) => {
    try {
      const orders = await getOrdersFromUser(userId);
      // const sortedOrders = orders.sort((a, b) => new Date(b.date) - new Date(a.date))
      return orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async ({ order }, thunkAPI) => {
    try {
      await createOrder(order);
      return order;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      }),
      builder.addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),
      builder.addCase(addOrder.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      });
  },
});

export default ordersSlice.reducer;
