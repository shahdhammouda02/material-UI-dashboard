import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

// ✅ Update an existing vendor
export const updateVendor = createAsyncThunk(
  "vendor/updateVendor",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.put(`/vendors/${id}`, updatedData);
      return response.data; // Return updated vendor
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل تحديث بيانات البائع");
    }
  }
);

// ✅ Delete a vendor
export const deleteVendor = createAsyncThunk(
  "vendor/deleteVendor",
  async (id, { rejectWithValue }) => {
    try {
      await axiosFetching.delete(`/vendors/${id}`);
      return id; // Return deleted vendor's ID
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل حذف البائع");
    }
  }
);

// ✅ Fetch all vendors
export const fetchVendors = createAsyncThunk(
  "vendor/fetchVendors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get("/vendors");
      return response.data; // Return all vendors
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل جلب البائعين");
    }
  }
);
