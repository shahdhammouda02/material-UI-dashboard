import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosFetching from "../../../API/axiosFetching";
import Cookies from "js-cookie";

export const loginVendor = createAsyncThunk(
  "login/loginVendor",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosFetching.post("/vendor/login", { email, password });

      console.log("🔹 API Response:", response);
      console.log("🔹 Response Data:", response.data);

      // ✅ تحقق من وجود التوكن في الاستجابة بدلاً من `user`
      if (response.status === 200 && response.data.token) {
        Cookies.set("token", response.data.token, { expires: 7 });
        return { success: true, token: response.data.token }; // ✅ تأكد من إرجاع كائن يتضمن success
      } else {
        return rejectWithValue("Invalid login response"); // 🚨 رسالة واضحة للخطأ
      }
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Invalid email or password");
    }
  }
);
