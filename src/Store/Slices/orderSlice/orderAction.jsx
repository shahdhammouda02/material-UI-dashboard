import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

// ✅ جلب الطلبات (حسب userId)
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get(`/users/${userId}/orders`);
      console.log(" الطلبات التي تم جلبها:", response.data); // ✅ طباعة البيانات في الـ console
      return response.data;
    } catch (error) {
      console.error("❌ خطأ في جلب الطلبات:", error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || "فشل جلب الطلبات");
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
