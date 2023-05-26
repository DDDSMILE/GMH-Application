import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOrder } from "../services/orders";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchAllOrder = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await getAllOrder();
      return data;
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
    builder.addCase(fetchAllOrder.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchAllOrder.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      }),
      builder.addCase(fetchAllOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default ordersSlice.reducer;
