import React, { useState, useEffect } from "react";
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
    const isMainVendorExists = registeredVendors.some((v) => v.email === mainVendor.email);

    if (!isMainVendorExists) {
      registeredVendors.push(mainVendor);
      localStorage.setItem("registeredVendors", JSON.stringify(registeredVendors));
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!email || !password) {
        setError("يرجى ملء جميع الحقول.");
        return;
      }

      const registeredVendors = JSON.parse(localStorage.getItem("registeredVendors")) || [];
      const vendor = registeredVendors.find((v) => v.email.toLowerCase() === email.toLowerCase());

      if (!vendor || password !== vendor.password) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        return;
      }

      const token = "your_generated_token";
      localStorage.setItem("token", token);

      if (rememberMe) {
        localStorage.setItem("userEmail", email);
      } else {
        localStorage.removeItem("userEmail");
      }

      localStorage.setItem("isLoggedIn", "true");

      const vendors = JSON.parse(localStorage.getItem("vendors")) || [];
      const isVendorExists = vendors.some((v) => v.email === vendor.email);
      if (!isVendorExists) {
        vendors.push(vendor);
        localStorage.setItem("vendors", JSON.stringify(vendors));
      }

      if (email === "shahd2@gmail.com") {
        localStorage.setItem("isMainVendor", "true");
      } else {
        localStorage.setItem("isMainVendor", "false");
      }

      alert("تم تسجيل الدخول بنجاح!");
      navigate("/dashboard");
    } catch (err) {
      setError("حدث خطأ. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BasicLayout image={bgLogin}>
      <Card sx={{ width: "350px", bgcolor: "white", borderRadius: "12px", boxShadow: 3 }}>
        <MDBox p={3}>
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

          {/* <MDTypography variant="body2" color="textSecondary" textAlign="center">
            ليس لديك حساب؟{" "}
            <Link to="/authentication/sign-up" style={{ color: "green", textDecoration: "none" }}>
              إنشاء حساب
            </Link>
          </MDTypography> */}
        </MDBox>
      </Card>
    </BasicLayout>
  );
};

export default SignIn;
