import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

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
      const response = await axios.post(`http://localhost:8000/api/products/${id}`, updatedData);
      return response.data; // تأكد من إعادة الاستجابة الصحيحة
    } catch (error) {
      return rejectWithValue(error.response.data);
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
