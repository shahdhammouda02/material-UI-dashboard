import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const logoutVendor = createAsyncThunk("vendor/logout", async (_, { fulfillWithValue }) => {
  try {
    // 🔹 إزالة التوكن والبيانات المخزنة
    Cookies.remove("token");
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedIn");

    console.log("✅ Logout successful");

    return fulfillWithValue("تم تسجيل الخروج بنجاح");
  } catch (error) {
    console.error("❌ Logout Error:", error);
    throw new Error("حدث خطأ أثناء تسجيل الخروج");
  }
});
