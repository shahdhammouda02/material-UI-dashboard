import { createSlice } from "@reduxjs/toolkit";
import { fetchDeliveries, addDelivery, updateDelivery, deleteDelivery } from "./deliveryAction";

// ✅ تعريف الحالة الابتدائية
const initialState = {
  deliveries: [],
  loading: false,
  error: null,
};

// 🔹 إنشاء `slice`
const deliverySlice = createSlice({
  name: "deliveries",
  initialState,
  reducers: {
    reset: () => initialState, // إعادة الحالة إلى حالتها الأولية
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Deliveries
      .addCase(fetchDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveries.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveries = action.payload;
      })
      .addCase(fetchDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Add Delivery
      .addCase(addDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDelivery.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveries.push(action.payload);
      })
      .addCase(addDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ✅ Update Delivery
    builder
      .addCase(updateDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDelivery.fulfilled, (state, action) => {
        state.loading = false;
        const updatedDelivery = action.payload;
        if (Array.isArray(state.deliveries)) {
          state.deliveries = state.deliveries.map((Delivery) =>
            Delivery.id === updatedDelivery.id ? updatedDelivery : Delivery
          );
        }
      });

    // ✅ Delete Delivery
    builder
      .addCase(deleteDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDelivery.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveries = state.deliveries.filter((delivery) => delivery.id !== action.payload);
      })
      .addCase(deleteDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = deliverySlice.actions;
export default deliverySlice.reducer;
