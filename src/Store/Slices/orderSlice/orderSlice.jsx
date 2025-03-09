import { createSlice } from "@reduxjs/toolkit";
import { fetchAllOrders, fetchOrderDetails } from "./orderAction"; // حذف fetchOrders

// ✅ تعريف الحالة الابتدائية
const initialState = {
  orders: [],
  orderDetails: null,
  loading: false,
  error: null,
};

// 🔹 إنشاء slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    reset: () => initialState, // إعادة الحالة إلى حالتها الأولية
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch All Orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Order Details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload; // تخزين تفاصيل الطلب هنا
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
