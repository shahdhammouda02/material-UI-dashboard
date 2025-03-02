import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";

// ✅ الحالة الابتدائية
const initialState = {
  shippings: [], // تأكد من أن المفتاح shippings موجود
  loading: false,
  error: null,
};

// ✅ جلب جميع الشحنات
export const fetchDeliveries = createAsyncThunk(
  "shippings/fetchDeliveries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.get("/shippings");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل جلب الشحنات");
    }
  }
);

// ✅ تحديث الشحنة
export const updateDelivery = createAsyncThunk(
  "shippings/updateDelivery",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.put(`/shippings/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل تحديث الشحنة");
    }
  }
);

// ✅ إنشاء `slice`
const deliverySlice = createSlice({
  name: "shippings",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveries.fulfilled, (state, action) => {
        state.loading = false;
        state.shippings = action.payload;
      })
      .addCase(fetchDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDelivery.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.shippings.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.shippings[index] = action.payload;
      })
      .addCase(updateDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = deliverySlice.actions;
export default deliverySlice.reducer;
