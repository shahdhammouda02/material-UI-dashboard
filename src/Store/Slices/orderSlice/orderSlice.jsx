// orderSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders, addOrder, updateOrder, deleteOrder } from "./orderAction";

// ✅ تعريف الحالة الابتدائية
const initialState = {
  orders: [],
  loading: false,
  error: null,
};

// 🔹 إنشاء `slice`
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    reset: () => initialState, // إعادة الحالة إلى حالتها الأولية
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Add Order
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })

      // ✅ Update Order
      .addCase(updateOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        );
      })

      // ✅ Delete Order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
