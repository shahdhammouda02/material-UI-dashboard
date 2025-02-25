import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/loginSlice/LoginSlice";
import signupReducer from "./Slices/signupSlice/signupSlices";
import logoutReducer from "./Slices/logoutSlice/logoutSlice";
import vendorReducer from "./Slices/vendorsSlice/vendorsSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer, // ✅ تأكد من عدم وجود تعليقات داخل الكائن
    signup: signupReducer,
    logout: logoutReducer,
    vendor: vendorReducer,
  },
});

export default store;
