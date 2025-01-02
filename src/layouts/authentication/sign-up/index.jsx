import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Checkbox } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignUp from "assets/images/bg-sign-in-basic.jpeg"; // Replace with your image path

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
    <CoverLayout
      image={bgSignUp}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        sx={{
          width: "90%", // Match the width of the Sign In form
          maxWidth: "450px", // Match the maxWidth of the Sign In form
          bgcolor: "white",
          borderRadius: "20px", // Match the borderRadius of the Sign In form
          boxShadow: 3,
          padding: "20px", // Add padding to the card
        }}
      >
        <MDBox sx={{ maxWidth: "400px", margin: "0 auto" }}>
          <MDBox
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Center the text and line horizontally
              mb: 3,
            }}
          >
            <MDTypography
              variant="h4"
              color="green"
              textAlign="center"
              fontWeight="bold"
              sx={{
                position: "relative", // Required for the pseudo-element
                paddingBottom: "8px", // Add spacing between text and line
                "&::after": {
                  content: '""', // Required for the pseudo-element
                  position: "absolute",
                  left: "0", // Start the line from the left
                  bottom: "0", // Position the line at the bottom of the text
                  width: "100%", // Make the line span the full width of the text
                  height: "2px", // Set the thickness of the line
                  backgroundColor: "green", // Set the color of the line
                },
              }}
            >
              إنشاء حساب
            </MDTypography>
          </MDBox>

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
            sx={{ mb: 2 }}
          />

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
            <Checkbox checked={agree} onChange={() => setAgree(!agree)} />
            <MDTypography variant="button" color="green">
              أوافق على الشروط والأحكام
            </MDTypography>
          </MDBox>

          <MDButton fullWidth color="success" onClick={handleSignUp} disabled={loading}>
            {loading ? "جاري التسجيل..." : "إنشاء حساب"}
          </MDButton>

          <MDTypography variant="body2" color="textSecondary" textAlign="center" mt={3}>
            لديك حساب بالفعل؟{" "}
            <Link to="/authentication/sign-in" style={{ color: "green", textDecoration: "none" }}>
              تسجيل الدخول
            </Link>
          </MDTypography>
        </MDBox>
      </Card>
    </CoverLayout>
  );
};

export default SignUp;
