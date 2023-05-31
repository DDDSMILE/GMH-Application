import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getOrdersFromUser } from "../services/orders";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchOrders.fulfilled, (state, action) => {
        console.log(action.payload);
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

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ userId }, thunkAPI) => {
    try {
      const { data } = await getOrdersFromUser(userId);
      console.log(data);
      return data;
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

export default ordersSlice.reducer;
