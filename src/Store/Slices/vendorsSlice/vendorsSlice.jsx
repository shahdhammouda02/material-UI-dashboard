import { createSlice } from "@reduxjs/toolkit";
import { updateVendor, deleteVendor, fetchVendors } from "./vendorsAction"; // Import actions

const initialState = {
  vendors: [],
  loading: false,
  error: null,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handling fetch vendors action
    builder.addCase(fetchVendors.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchVendors.fulfilled, (state, action) => {
      state.loading = false;
      state.vendors = action.payload;
    });
    builder.addCase(fetchVendors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handling update vendor action
    builder.addCase(updateVendor.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateVendor.fulfilled, (state, action) => {
      state.loading = false;
      const updatedVendor = action.payload;
      state.vendors = state.vendors.map((vendor) =>
        vendor.id === updatedVendor.id ? updatedVendor : vendor
      );
    });
    builder.addCase(updateVendor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handling delete vendor action
    builder.addCase(deleteVendor.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteVendor.fulfilled, (state, action) => {
      state.loading = false;
      state.vendors = state.vendors.filter((vendor) => vendor.id !== action.payload);
    });
    builder.addCase(deleteVendor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default vendorSlice.reducer;
