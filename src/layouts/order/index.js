// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import AddOrder from "./data/AddOrder"; // استبدال AddCategory بـ AddOrder
import OrdersTable from "./data/orderTabel"; // يجب التأكد من صحة الاستيراد

function Order() {
  const { columns, rows } = OrdersTable(); // جلب الأعمدة والصفوف

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  جدول الطلبات
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      {columns.map((column, index) => (
                        <th key={index} style={{ textAlign: column.align, padding: "10px" }}>
                          {column.Header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={index}>
                        <td style={{ textAlign: "center", padding: "10px" }}>{row.orderId}</td>
                        <td style={{ textAlign: "center", padding: "10px" }}>{row.customerName}</td>
                        <td style={{ textAlign: "center", padding: "10px" }}>{row.product}</td>
                        <td style={{ textAlign: "center", padding: "10px" }}>
                          {row.productNumber}
                        </td>
                        <td style={{ textAlign: "center", padding: "10px" }}>{row.quantity}</td>
                        <td style={{ textAlign: "center", padding: "10px" }}>{row.totalAmount}</td>
                        <td style={{ textAlign: "center", padding: "10px" }}>{row.status}</td>
                        <td style={{ textAlign: "center", padding: "10px" }}>{row.actions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </MDBox>
              <AddOrder /> {/* تغيير AddCategory إلى AddOrder */}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Order;
