import { createSlice } from "@reduxjs/toolkit";
import { loginVendor } from "./LoginAction";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ غير متوقع";
      });
  },
});

export default LoginSlice.reducer;
