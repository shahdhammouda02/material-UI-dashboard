// @mui material components
import Grid from "@mui/material/Grid";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

const Dashboard = () => {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="person_add"
                title="عدد المستخدمين"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "من الأسبوع الماضي",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="مجموع المنتجات"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "من الشهر الماضي",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="مجموع الطلبات"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "من الامس",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<DeliveryDiningIcon />}
                title="التوصيل"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "تم الان",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Dashboard;
