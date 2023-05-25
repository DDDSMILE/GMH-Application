import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData, storeData, deleteData } from "../utils/asyncStorage";
import { login as loginService } from "../services/auth";

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
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      }),
      builder.addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),
      builder.addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ name, password }, thunkAPI) => {
    try {
      const { data } = await loginService({ name, password });
      storeData("user", data);
      return { data };
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
