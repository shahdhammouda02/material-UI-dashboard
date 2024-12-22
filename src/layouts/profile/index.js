// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";

// @mui icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Overview() {
  // Sample profile data in Arabic
  const profileData = {
    الاسم_الكامل: "ريتشارد ديفيس",
    الجوال: "(44) 123 1234 123",
    الجنس: "ذكر",
    البريد_الإلكتروني: "richarddavis@mail.com",
    تاريخ_الميلاد: "25 مايو 1980",
    حول: "مرحبًا، أنا ريتشارد ديفيس. القرارات: إذا لم تتمكن من اتخاذ قرار، الإجابة هي لا. إذا كانت هناك مسارات متساوية الصعوبة، اختر الأكثر إيلامًا قصير الأمد (تجنب الألم يخلق وهم المساواة).",
  };

  // Render profile info items
  const renderProfileInfo = Object.keys(profileData).map((key) => {
    if (key !== "حول") {
      return (
        <MDBox key={key} display="flex" alignItems="center" py={1}>
          <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
            {key.replace(/_/g, " ")}: &nbsp;
          </MDTypography>
          <MDTypography variant="button" fontWeight="regular" color="text">
            {profileData[key]}
          </MDTypography>
        </MDBox>
      );
    }
    return null;
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox display="flex" justifyContent="center" alignItems="center" mt={5} mb={3}>
        <Card sx={{ width: "80%", maxWidth: "800px", p: 3, boxShadow: 3 }}>
          <Grid container spacing={3}>
            {/* Left Section: Profile Picture and Name */}
            <Grid item xs={12} md={4}>
              <MDBox display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Avatar
                  src="https://via.placeholder.com/150"
                  alt="صورة الملف الشخصي"
                  sx={{ width: 150, height: 150 }}
                />
                <MDTypography variant="h6" fontWeight="medium" textAlign="center">
                  {profileData.الاسم_الكامل}
                </MDTypography>
              </MDBox>
            </Grid>

            {/* Right Section: Actions */}
            <Grid item xs={12} md={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <MDBox display="flex" flexDirection="row" gap={2}>
                <Tooltip title="تعديل الملف الشخصي" placement="top">
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="حذف الملف الشخصي" placement="top">
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="إضافة ملف شخصي جديد" placement="top">
                  <IconButton color="success">
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </MDBox>
            </Grid>

            {/* Personal Information Section */}
            <Grid item xs={12} md={6}>
              <MDBox p={2}>
                <MDBox mb={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    معلومات شخصية
                  </MDTypography>
                </MDBox>
                {renderProfileInfo}
              </MDBox>
            </Grid>

            {/* Vertical Divider */}
            <Grid item xs={12} md={0.5}>
              <Divider orientation="vertical" sx={{ height: "100%" }} />
            </Grid>

            {/* About Section */}
            <Grid item xs={12} md={5.5}>
              <MDBox p={2}>
                <MDBox mb={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    حول
                  </MDTypography>
                </MDBox>
                <MDTypography variant="body2" color="text">
                  {profileData.حول}
                </MDTypography>
              </MDBox>
            </Grid>
          </Grid>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
