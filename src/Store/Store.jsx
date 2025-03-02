import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/loginSlice/LoginSlice";
import signupReducer from "./Slices/signupSlice/signupSlices";
import logoutReducer from "./Slices/logoutSlice/logoutSlice";
import vendorReducer from "./Slices/vendorsSlice/vendorsSlice";
import categoriesReducer from "./Slices/mainCategory/mainCategorySlice";
import subCategoriesReducer from "./Slices/subCategory/subCategorySlice";
import productReducer from "./Slices/productsSlice/productsSlice"; // ✅ تأكد من استيراد المنتج بشكل صحيح
import customersReducer from "./Slices/customerSlice/customerSlice";
import deliveryReducer from "./Slices/deliverySlice/deliverySlice";
export const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    logout: logoutReducer,
    vendor: vendorReducer,
    categories: categoriesReducer,
    subCategories: subCategoriesReducer,
    products: productReducer, // ✅ إضافة مفقودة
    customers: customersReducer,
    deliveries: deliveryReducer,
  },
});

export default store;
