import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

// ✅ جلب الطلبات (حسب userId)
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get(`/users/${userId}/orders`);
      console.log("🚀 الطلبات التي تم جلبها:", response.data); // ✅ طباعة البيانات في الـ console
      return response.data;
    } catch (error) {
      console.error("❌ خطأ في جلب الطلبات:", error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || "فشل جلب الطلبات");
    }
  }
);

// ✅ إضافة طلب (حسب userId)
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async ({ userId, newOrder }, { rejectWithValue }) => {
    // 🔄 استقبل userId و newOrder كمعاملات
    try {
      const response = await axiosFetching.post(`/users/${userId}/orders`, newOrder); // 🔄 استخدم userId في الرابط
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل إضافة الطلب");
    }
  }
);

// ✅ تحديث طلب (حسب userId)
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ userId, id, updatedData }, { rejectWithValue }) => {
    // 🔄 استقبل userId, id, updatedData كمعاملات
    try {
      const response = await axiosFetching.put(`/users/${userId}/orders/${id}`, updatedData); // 🔄 استخدم userId في الرابط
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل تحديث الطلب");
    }
  }
);

// ✅ حذف طلب (حسب userId)
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async ({ userId, id }, { rejectWithValue }) => {
    // 🔄 استقبل userId و id كمعاملات
    try {
      await axiosFetching.delete(`/users/${userId}/orders/${id}`); // 🔄 استخدم userId في الرابط
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل حذف الطلب");
    }
  }
);
