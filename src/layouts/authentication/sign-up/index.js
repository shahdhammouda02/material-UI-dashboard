// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Cover() {
  return (
    <CoverLayout image={bgImage}>
      <Card sx={{ bgcolor: "#333338" }}>
        <MDBox bgColor="info" borderRadius="lg" mx={2} mt={-3} p={3} mb={1} textAlign="center">
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            انضم إلينا اليوم
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            أدخل البريد الإلكتروني وكلمة المرور للتسجيل
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="الاسم"
                variant="standard"
                fullWidth
                sx={{
                  color: "white",
                  input: { color: "white !important" },
                  label: { color: "white !important" },
                }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="البريد الإلكتروني"
                variant="standard"
                fullWidth
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
                variant="standard"
                fullWidth
                sx={{
                  color: "white",
                  input: { color: "white !important" },
                  label: { color: "white !important" },
                }}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                sx={{
                  cursor: "pointer",
                  userSelect: "none",
                  ml: -1,
                  color: "white !important",
                }}
              >
                &nbsp;&nbsp;أوافق على&nbsp;
              </MDTypography>
              <MDTypography component="a" href="#" variant="button" fontWeight="bold" color="info">
                الشروط والأحكام
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton color="info" fullWidth>
                تسجيل الدخول
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" sx={{ color: "white !important" }}>
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
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
