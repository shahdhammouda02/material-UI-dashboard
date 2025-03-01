import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/loginSlice/LoginSlice";
import signupReducer from "./Slices/signupSlice/signupSlices";
import logoutReducer from "./Slices/logoutSlice/logoutSlice";
import vendorReducer from "./Slices/vendorsSlice/vendorsSlice";
import categoriesReducer from "./Slices/mainCategory/mainCategorySlice";
import subCategoriesReducer from "./Slices/subCategory/subCategorySlice";
export const store = configureStore({
  reducer: {
    login: loginReducer, // ✅ تأكد من عدم وجود تعليقات داخل الكائن
    signup: signupReducer,
    logout: logoutReducer,
    vendor: vendorReducer,
    categories: categoriesReducer,
    subCategories: subCategoriesReducer,
  },
});

export default store;
