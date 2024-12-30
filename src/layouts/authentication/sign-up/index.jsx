import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Checkbox } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignUp from "assets/images/bg-sign-up-cover.jpeg"; // Replace with your image path

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!agree) {
      alert("يجب الموافقة على الشروط والأحكام.");
      return;
    }

    // Save the new vendor with plain text password
    const newVendor = { name, email, password };
    const registeredVendors = JSON.parse(localStorage.getItem("registeredVendors")) || [];
    registeredVendors.push(newVendor);
    localStorage.setItem("registeredVendors", JSON.stringify(registeredVendors));

    // Show a success message
    alert("تم التسجيل بنجاح!");

    // Navigate to the dashboard
    navigate("/dashboard");
  };

  return (
    <CoverLayout image={bgSignUp}>
      <Card sx={{ width: "300px", bgcolor: "#333338" }}>
        <MDBox p={3}>
          <MDTypography variant="h4" color="white" textAlign="center">
            إنشاء حساب
          </MDTypography>

          {error && (
            <MDTypography variant="body2" color="error" textAlign="center" sx={{ mb: 2 }}>
              {error}
            </MDTypography>
          )}

          <MDInput
            type="text"
            label="الاسم"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2, color: "white" }}
          />

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
            <Checkbox checked={agree} onChange={() => setAgree(!agree)} />
            <MDTypography variant="button" color="white">
              أوافق على الشروط والأحكام
            </MDTypography>
          </MDBox>

          <MDButton fullWidth color="info" onClick={handleSignUp} disabled={loading}>
            {loading ? "جاري التسجيل..." : "إنشاء حساب"}
          </MDButton>

          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="white">
              لديك حساب بالفعل؟{" "}
              <MDTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                color="info"
                fontWeight="medium"
              >
                تسجيل الدخول
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
};

export default SignUp;
