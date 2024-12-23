// @mui material components
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";

// @mui icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Footer from "examples/Footer";

// Images
import clothes from "assets/images/clothes.jpg";
import handcraft from "assets/images/handcraft.jpg";
import food from "assets/images/food.jpg";

function Overview() {
  // Sample profile data in Arabic
  const profileData = {
    الاسم_الكامل: "سارة خالد",
    الجوال: "(44) 123 1234 123",
    الموقع: "مصر",
    الجنس: "انثى",
    البريد_الإلكتروني: "sara@mail.com",
    تاريخ_الميلاد: "25 مايو 1990",
    حول: "مرحبًا، أنا سارة خالد. أحب التصميم والفنون الجميلة. أعتقد أن الحياة كلها تجربة، والتجربة تعلمنا الكثير. أتطلع دائمًا إلى تعلم شيء جديد وتطوير مهاراتي.",
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

      {/* Add User Button on the Left */}
      <MDBox display="flex" justifyContent="flex-start" mt={2}>
        <Button
          onClick={() => {
            // Add your handleDialogOpen function here
            console.log("إضافة مستخدم جديد");
          }}
          sx={{
            bgcolor: "#ffffff",
            color: "#1e8234",
            "&:hover": {
              bgcolor: "green",
              color: "#ffffff", // لون أغمق عند التمرير
            },
            transition: "all 0.3s ease-in-out",
          }}
        >
          إضافة مستخدم جديد
          <AddIcon />
        </Button>
      </MDBox>

      {/* Main Card Container */}
      <Card sx={{ p: 3, boxShadow: 3, maxWidth: "600px", margin: "0 auto", mt: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          {/* Profile Section */}
          <Grid item xs={12}>
            <MDBox display="flex" flexDirection="column" alignItems="center" gap={2}>
              {/* Profile Picture and Name */}
              <Avatar
                src="https://via.placeholder.com/150"
                alt="صورة الملف الشخصي"
                sx={{ width: 100, height: 100 }}
              />
              <MDTypography variant="h6" fontWeight="medium" textAlign="center">
                {profileData.الاسم_الكامل}
              </MDTypography>

              {/* Actions */}
              <MDBox display="flex" flexDirection="row" gap={2}>
                <Tooltip title="تعديل الملف الشخصي" placement="top">
                  <IconButton color="success">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="حذف الملف الشخصي" placement="top">
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </MDBox>
            </MDBox>

            {/* Personal Information */}
            <MDBox mt={3} p={2}>
              <MDTypography variant="h6" fontWeight="medium">
                معلومات شخصية
              </MDTypography>
              {renderProfileInfo}
            </MDBox>

            {/* About Section */}
            <MDBox p={2}>
              <MDTypography variant="h6" fontWeight="medium">
                حول
              </MDTypography>
              <MDTypography variant="body2" color="text">
                {profileData.حول}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </Card>

      {/* Products Section (Bottom) */}
      <MDBox mt={3} mb={3}>
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <MDTypography variant="h6" fontWeight="medium" mb={3}>
            المنتجات
          </MDTypography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <DefaultProjectCard
                image={clothes}
                label="المنتج #1"
                title="ثوب فلاحي"
                description="ملابس تراثية اصيلة."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "عرض المنتج",
                }}
                imageSx={{ width: "100%", height: "200px", objectFit: "cover" }} // Adjusted image size
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DefaultProjectCard
                image={handcraft}
                label="المنتج #2"
                title="فخار"
                description="أعمال يدوية فريدة من نوعها."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "عرض المنتج",
                }}
                imageSx={{ width: "100%", height: "200px", objectFit: "cover" }} // Adjusted image size
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DefaultProjectCard
                image={food}
                label="المنتج #3"
                title="زيت زيتون"
                description="أطعمة لذيذة وصحية."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "عرض المنتج",
                }}
                imageSx={{ width: "100%", height: "200px", objectFit: "cover" }} // Adjusted image size
              />
            </Grid>
          </Grid>
        </Card>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
