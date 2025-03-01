// subCategoryAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

// ✅ **جلب جميع الفئات الفرعية**
export const fetchSubCategories = createAsyncThunk(
  "subCategories/fetchSubCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get("/subcategories");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل جلب الفئات الفرعية");
    }
  }
);

// ✅ **إضافة فئة فرعية جديدة**
export const addSubCategory = createAsyncThunk(
  "subCategories/addSubCategory",
  async ({ name, categoryId, description }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.post("/subcategories", {
        name,
        categoryId,
        description,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل إضافة الفئة الفرعية");
    }
  }
);

// ✅ **تحديث فئة فرعية**
export const updateSubCategory = createAsyncThunk(
  "subCategories/updateSubCategory",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.put(`/subcategories/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل تحديث الفئة الفرعية");
    }
  }
);

// ✅ **حذف فئة فرعية**
export const deleteSubCategory = createAsyncThunk(
  "subCategories/deleteSubCategory",
  async (id, { rejectWithValue }) => {
    try {
      await axiosFetching.delete(`/subcategories/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل حذف الفئة الفرعية");
    }
  }
);
