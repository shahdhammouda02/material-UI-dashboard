import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8000/api/orders/${orderId}`);
      if (!response.ok) {
        throw new Error("Order not found");
      }
      return response.json(); // Return the order details
    } catch (error) {
      return rejectWithValue(error.message); // Reject with error message if something goes wrong
    }
  }
);

// ✅ جلب جميع الطلبات
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get("/orders");
      console.log(" جميع الطلبات التي تم جلبها:", response.data); // ✅ طباعة البيانات في الـ console
      return response.data;
    } catch (error) {
      console.error("❌ خطأ في جلب جميع الطلبات:", error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || "فشل جلب جميع الطلبات");
    }
  }
);
