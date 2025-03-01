import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSubCategories,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "./subCategoryAction";

const initialState = {
  subCategories: [],
  loading: false,
  error: null,
};

const subCategoriesSlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "فشل جلب الفئات";
        console.error("Error fetching categories:", action.error.message);
      });

    builder
      .addCase(addSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = [...state.subCategories, action.payload]; // Ensuring immutability
      })

      .addCase(addSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "فشل إضافة الفئة";
        console.error("Error adding category:", action.error.message);
      });

    builder
      .addCase(updateSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        const updateSubCategory = action.payload;
        if (Array.isArray(state.subCategories)) {
          state.subCategories = state.subCategories.map((subCategory) =>
            subCategory.id === action.payload.id ? action.payload : subCategory
          );
        }
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "فشل تحديث الفئة";
        console.error("Error updating category:", action.error.message);
      });

    builder
      .addCase(deleteSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.subCategories)) {
          state.subCategories = [];
        }
        state.subCategories = state.subCategories.filter(
          (subCategory) => subCategory.id !== action.payload
        );
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "فشل حذف الفئة";
        console.error("Error deleting category:", action.error.message);
      });
  },
});

export default subCategoriesSlice.reducer;
