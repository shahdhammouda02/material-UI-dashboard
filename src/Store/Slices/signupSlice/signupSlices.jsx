import { createSlice } from "@reduxjs/toolkit";
import { signupVendor } from "./signupAction";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signupVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ غير متوقع";
      });
  },
});

export default signupSlice.reducer;
