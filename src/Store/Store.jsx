import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/loginSlice/LoginSlice";
import signupReducer from "./Slices/signupSlice/signupSlices";
import logoutReducer from "./Slices/logoutSlice/logoutSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer, // ✅ تأكد من عدم وجود تعليقات داخل الكائن
    signup: signupReducer,
    logout: logoutReducer,
  },
});

export default store;
