import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Switch } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgLogin from "assets/images/000743.jpg";
import { auth, googleProvider, facebookProvider } from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { FaFacebook } from "react-icons";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const mainVendor = {
      name: "البائع الرئيسي",
      email: "shahd2@gmail.com",
      password: "123456",
    };
    const registeredVendors = JSON.parse(localStorage.getItem("registeredVendors")) || [];
    if (!registeredVendors.some((v) => v.email === mainVendor.email)) {
      registeredVendors.push(mainVendor);
      localStorage.setItem("registeredVendors", JSON.stringify(registeredVendors));
    }
  }, []);

  const handleSignIn = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      if (!email || !password) {
        setError("يرجى ملء جميع الحقول.");
        setLoading(false);
        return;
      }

      const registeredVendors = JSON.parse(localStorage.getItem("registeredVendors")) || [];
      const vendor = registeredVendors.find((v) => v.email.toLowerCase() === email.toLowerCase());

      if (!vendor || vendor.password !== password) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", "your_generated_token");
      if (rememberMe) localStorage.setItem("userEmail", email);
      else localStorage.removeItem("userEmail");

      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    },
    [email, password, rememberMe, navigate]
  );

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("userEmail", user.email);
      navigate("/dashboard");
    } catch (error) {
      setError("فشل تسجيل الدخول باستخدام Gmail: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("userEmail", user.email);
      navigate("/dashboard");
    } catch (error) {
      setError("فشل تسجيل الدخول باستخدام Facebook: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BasicLayout image={bgLogin}>
      <Card sx={{ width: "300px", bgcolor: "#333338", height: "450px" }}>
        <MDBox p={3}>
          <MDTypography variant="h4" color="white" textAlign="center" sx={{ mb: 2 }}>
            تسجيل الدخول
          </MDTypography>
          {error && (
            <MDTypography variant="body2" color="error" textAlign="center" sx={{ mb: 2 }}>
              {error}
            </MDTypography>
          )}
          <MDInput
            type="email"
            label="البريد الإلكتروني"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2, "& input": { color: "white !important" } }}
          />
          <MDInput
            type="password"
            label="كلمة المرور"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2, "& input": { color: "white !important" } }}
          />
          <MDButton fullWidth color="info" onClick={handleSignIn} disabled={loading} sx={{ mb: 2 }}>
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </MDButton>
          <MDButton
            fullWidth
            color="info"
            onClick={handleGoogleSignIn}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            تسجيل الدخول عن طريق Gmail
          </MDButton>
          <MDButton
            fullWidth
            color="info"
            onClick={handleFacebookSignIn}
            disabled={loading}
            startIcon={<FaFacebook />} // إضافة الأيقونة قبل النص
          >
            تسجيل الدخول عن طريق Facebook
          </MDButton>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="white">
              ليس لديك حساب؟{" "}
              <MDTypography
                component={Link}
                to="/authentication/sign-up"
                variant="button"
                color="info"
                fontWeight="medium"
              >
                إنشاء حساب
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
};

export default SignIn;
