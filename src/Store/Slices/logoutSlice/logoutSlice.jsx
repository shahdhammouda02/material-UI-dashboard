import { createSlice } from "@reduxjs/toolkit";
import { logoutVendor } from "./logoutAction";

const initialState = {
  loading: false,
  error: null,
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutVendor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(logoutVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ أثناء تسجيل الخروج";
      });
  },
});

export default logoutSlice.reducer;
