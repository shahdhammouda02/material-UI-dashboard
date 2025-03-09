import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

// ✅ Fetch Customers
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get("/customers");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل جلب العملاء");
    }
  }
);

// ✅ Fetch Customer Products (Details)
export const fetchCustomerProducts = createAsyncThunk(
  "customers/fetchCustomerProducts",
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get(`/customers/${customerId}`);
      return response.data; // بيانات المنتجات الخاصة بالعميل
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل جلب تفاصيل المنتجات");
    }
  }
);

// ✅ Add Customer
export const addCustomer = createAsyncThunk(
  "customers/addCustomer",
  async (newCustomer, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.post("/customers", newCustomer);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل إضافة العميل");
    }
  }
);

// ✅ Update Customer
export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.put(`/customers/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل تحديث العميل");
    }
  }
);

// ✅ Delete Customer
export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (id, { rejectWithValue }) => {
    try {
      await axiosFetching.delete(`/customers/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل حذف العميل");
    }
  }
);
