import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

// ✅ **جلب جميع الفئات**
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get("/categories");
      return response.data; // إرجاع جميع الفئات
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل جلب الفئات");
    }
  }
);

// ✅ **إضافة فئة جديدة**
// ✅ **إضافة فئة جديدة**
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async ({ name, description }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.post("/categories", { name, description });
      return response.data; // إرجاع البيانات المستلمة من الـ API
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "حدث خطأ غير متوقع. حاول مرة أخرى.");
    }
  }
);

// ✅ **تحديث فئة**
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.put(`/categories/${id}`, updatedData);
      return response.data; // إرجاع البيانات المحدثة
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل تحديث الفئة");
    }
  }
);

// ✅ **حذف فئة**
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await axiosFetching.delete(`/categories/${id}`);
      return id; // إرجاع ID الفئة المحذوفة
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل حذف الفئة");
    }
  }
);
