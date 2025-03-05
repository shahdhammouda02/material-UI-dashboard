import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";
import axios from "axios"; // Import axios

// ✅ جلب المنتجات
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get("/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل جلب المنتجات");
    }
  }
);

// ✅ إضافة منتج
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.post("/products", newProduct);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل إضافة المنتج");
    }
  }
);

// ✅ تحديث منتج
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.post(`/products/${id}`, updatedData); // Use axiosFetching.put
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل تحديث المنتج");
    }
  }
);

// ✅ حذف منتج
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axiosFetching.delete(`/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل حذف المنتج");
    }
  }
);
