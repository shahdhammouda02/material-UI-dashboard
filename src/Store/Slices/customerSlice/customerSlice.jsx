import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  fetchCustomerProducts,
} from "./customerAction";

// ✅ Initial State
const initialState = {
  customers: [],
  loading: false,
  error: null,
};

// 🔹 Create slice
const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Customers
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Customer Products (Details)
      // ✅ Fetch Customer Products (Details)
      .addCase(fetchCustomerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.customerProducts = action.payload; // تخزين المنتجات هنا مباشرة
      })
      .addCase(fetchCustomerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Add Customer
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.push(action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update Customer
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.customers.findIndex((customer) => customer.id === action.payload.id);
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Delete Customer
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.filter((customer) => customer.id !== action.payload);
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = customerSlice.actions;
export default customerSlice.reducer;
