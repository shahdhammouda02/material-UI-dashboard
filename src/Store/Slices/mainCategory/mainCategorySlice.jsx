import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, addCategory, updateCategory, deleteCategory } from "./mainCategoryAction"; // Import actions

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {}, // No local reducers needed, all handled via extraReducers
  extraReducers: (builder) => {
    // 📌 Fetch Categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "فشل جلب الفئات";
        console.error("Error fetching categories:", action.error.message);
      });

    // ➕ Add Category
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = [...state.categories, action.payload]; // Ensuring immutability
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "فشل إضافة الفئة";
        console.error("Error adding category:", action.error.message);
      });

    // ✏️ Update Category
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCategory = action.payload;
        // تأكد أن categories مصفوفة
        if (Array.isArray(state.categories)) {
          state.categories = state.categories.map((category) =>
            category.id === updatedCategory.id ? updatedCategory : category
          );
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "فشل تحديث الفئة";
        console.error("Error updating category:", action.error.message);
      });

    // ❌ Delete Category
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.categories)) {
          state.categories = []; // إعادة تعيين كمصفوفة فارغة في حالة الخطأ
        }
        state.categories = state.categories.filter((category) => category.id !== action.payload);
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "فشل حذف الفئة";
        console.error("Error deleting category:", action.error.message);
      });
  },
});

export default categoriesSlice.reducer;
