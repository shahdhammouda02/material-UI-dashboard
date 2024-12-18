import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate for navigation

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [storedEmail, setStoredEmail] = useState("");
  const navigate = useNavigate(); // Utilize useNavigate for programmatic navigation

  // Define the allowed email address
  const allowedEmail = "shahd2@gmail.com"; // Replace with your desired email
  const allowedPassword = "123456";
  useEffect(() => {
    const retrievedEmail = localStorage.getItem("userEmail"); // Simulate retrieving email
    setStoredEmail(retrievedEmail);
  }, []); // Run only on component mount

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSignIn = async (event) => {
    event.preventDefault();

    // Check if the provided credentials match the allowed ones
    if (email === allowedEmail && password === allowedPassword) {
      // Simulate successful authentication
      const token = "your_generated_token"; // Replace with your actual token generation logic
      localStorage.setItem("token", token);

      if (rememberMe) {
        localStorage.setItem("userEmail", email);
      } else {
        localStorage.removeItem("userEmail");
      }

      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card sx={{ width: "300px", bgcolor: "#333338" }}>
        <MDBox bgColor="info" borderRadius="lg" mx={2} mt={-3} p={2} mb={1} textAlign="center">
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            تسجيل دخول
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSignIn}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="البريد الإلكتروني"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  color: "white",
                  input: { color: "white !important" },
                  label: { color: "white !important" },
                }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="كلمة المرور"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  color: "white",
                  input: { color: "white !important" },
                  label: { color: "white !important" },
                }}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1, color: "white !important" }}
              >
                &nbsp;&nbsp;تذكرني
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton color="info" fullWidth type="submit">
                تسجيل دخول
              </MDButton>
            </MDBox>
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
                  إنشاء حساب جديد
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
