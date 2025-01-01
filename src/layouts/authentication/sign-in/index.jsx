import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Switch } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgLogin from "assets/images/bg-sign-in-basic.jpeg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Add the main vendor to localStorage if it doesn't exist
  useEffect(() => {
    const mainVendor = {
      name: "البائع الرئيسي",
      email: "shahd2@gmail.com",
      password: "123456", // Store the password as plain text
    };

    const registeredVendors = JSON.parse(localStorage.getItem("registeredVendors")) || [];

    // Check if the main vendor already exists
    const isMainVendorExists = registeredVendors.some((v) => v.email === mainVendor.email);

    if (!isMainVendorExists) {
      // Add the main vendor to the list
      registeredVendors.push(mainVendor);
      localStorage.setItem("registeredVendors", JSON.stringify(registeredVendors));
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate inputs
      if (!email || !password) {
        setError("يرجى ملء جميع الحقول.");
        return;
      }

      // Retrieve registered vendors from localStorage
      const registeredVendors = JSON.parse(localStorage.getItem("registeredVendors")) || [];

      // Debugging: Log registered vendors
      console.log("Registered Vendors:", registeredVendors);

      // Find the vendor by email (case-insensitive)
      const vendor = registeredVendors.find((v) => v.email.toLowerCase() === email.toLowerCase());

      // Debugging: Log the found vendor
      console.log("Found Vendor:", vendor);

      if (!vendor) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        return;
      }

      // Compare the entered password with the stored plain text password
      if (password !== vendor.password) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        return;
      }

      // Save token to localStorage (simulate authentication)
      const token = "your_generated_token";
      localStorage.setItem("token", token);

      // Save email to localStorage if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("userEmail", email);
      } else {
        localStorage.removeItem("userEmail");
      }

      // Set isLoggedIn to true
      localStorage.setItem("isLoggedIn", "true");

      // Save the logged-in vendor to the vendors list in localStorage
      const vendors = JSON.parse(localStorage.getItem("vendors")) || [];
      const isVendorExists = vendors.some((v) => v.email === vendor.email);
      if (!isVendorExists) {
        vendors.push(vendor);
        localStorage.setItem("vendors", JSON.stringify(vendors));
      }

      // Set a flag in localStorage to indicate if the logged-in vendor is the main vendor
      if (email === "shahd2@gmail.com") {
        localStorage.setItem("isMainVendor", "true");
      } else {
        localStorage.setItem("isMainVendor", "false");
      }

      // Show a success message
      alert("تم تسجيل الدخول بنجاح!");

      // Navigate to the dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("حدث خطأ. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BasicLayout image={bgLogin}>
      <Card sx={{ width: "300px", bgcolor: "#333338" }}>
        <MDBox p={3}>
          <MDTypography variant="h4" color="white" textAlign="center">
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
            sx={{ mb: 2, color: "white" }}
          />

          <MDInput
            type="password"
            label="كلمة المرور"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2, color: "white" }}
          />

          <MDBox display="flex" alignItems="center">
            <Switch checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
            <MDTypography variant="button" color="white">
              تذكرني
            </MDTypography>
          </MDBox>

          <MDButton fullWidth color="info" onClick={handleSignIn} disabled={loading}>
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
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
