import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

// ✅ جلب التوصيلات
export const fetchDeliveries = createAsyncThunk(
  "deliveries/fetchDeliveries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get("/deliveries");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل جلب التوصيلات");
    }
  }
);

// ✅ إضافة توصيل
export const addDelivery = createAsyncThunk(
  "deliveries/addDelivery",
  async (newDelivery, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.post("/deliveries", newDelivery);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل إضافة التوصيل");
    }
  }
);

// ✅ تحديث توصيل
export const updateDelivery = createAsyncThunk(
  "deliveries/updateDelivery",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.put(`/deliveries/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل تحديث التوصيل");
    }
  }
);

// ✅ حذف توصيل
export const deleteDelivery = createAsyncThunk(
  "deliveries/deleteDelivery",
  async (id, { rejectWithValue }) => {
    try {
      await axiosFetching.delete(`/deliveries/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل حذف التوصيل");
    }
  }
);
