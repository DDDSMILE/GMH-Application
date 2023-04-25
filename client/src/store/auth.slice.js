import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteData, getData, storeData } from "../utils/asyncStorage";
import { getUser, login as loginService } from "../services/auth";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;

      deleteData("user");
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ name, password }, thunkAPI) => {
    try {
      const user = await loginService({ name, password });
      storeData("user", user);
      return { user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const user = await getData("user");
      return { user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const { logout, resetError } = authSlice.actions;

export default authSlice.reducer;
