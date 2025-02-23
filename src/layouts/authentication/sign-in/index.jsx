import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Switch } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgLogin from "assets/images/bg-sign-in-basic.jpeg";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useSelector, useDispatch } from "react-redux";
import { loginVendor } from "../../../Store/Slices/loginSlice/LoginAction";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.login.error);
  const loading = useSelector((state) => state.login.loading);
  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("🔹 Submitting login request");

    if (!email || !password) {
      alert("يرجى ملء جميع الحقول.");
      return;
    }

    dispatch(loginVendor({ email, password }))
      .then((res) => {
        console.log("🔹 API Response:", res);
        console.log("🔹 Payload:", res.payload);

        // ✅ تحقق من وجود التوكن بدلاً من `success`
        if (res.payload && res.payload.token) {
          console.log("✅ Token Received:", res.payload.token);
          navigate("/dashboard");
        } else {
          alert("تسجيل الدخول غير ناجح. حاول مرة أخرى.");
        }
      })
      .catch((error) => {
        console.error("❌ Login error:", error);
        alert("حدث خطأ أثناء محاولة تسجيل الدخول.");
      });
  };

  return (
    <BasicLayout image={bgLogin}>
      <Card
        sx={{
          width: "90%",
          maxWidth: "450px",
          bgcolor: "white",
          borderRadius: "20px",
          boxShadow: 3,
        }}
      >
        <MDBox p={3} sx={{ maxWidth: "400px", margin: "0 auto" }}>
          <MDTypography variant="h4" color="green" textAlign="center" fontWeight="bold" mb={3}>
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
            sx={{ mb: 2 }}
          />

          <MDInput
            type="password"
            label="كلمة المرور"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <MDBox display="flex" alignItems="center" mb={3}>
            <Switch checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
            <MDTypography variant="button" color="green">
              تذكرني
            </MDTypography>
          </MDBox>

          <MDButton fullWidth color="success" onClick={handleSignIn} disabled={loading}>
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </MDButton>

          <MDTypography variant="body2" color="textSecondary" textAlign="center" my={2}>
            أو
          </MDTypography>

          <MDBox display="flex" justifyContent="center" gap={2} mb={3}>
            <MDButton
              variant="outlined"
              color="success"
              startIcon={<GoogleIcon />}
              onClick={() => alert("Sign in with Google")}
            >
              Google
            </MDButton>
            <MDButton
              variant="outlined"
              color="success"
              startIcon={<FacebookIcon />}
              onClick={() => alert("Sign in with Facebook")}
            >
              Facebook
            </MDButton>
          </MDBox>

          <MDTypography variant="body2" color="textSecondary" textAlign="center">
            ليس لديك حساب؟{" "}
            <Link to="/authentication/sign-up" style={{ color: "green", textDecoration: "none" }}>
              إنشاء حساب
            </Link>
          </MDTypography>
        </MDBox>
      </Card>
    </BasicLayout>
  );
};

export default SignIn;
