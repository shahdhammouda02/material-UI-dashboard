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
import AddCategory from "./data/AddCategory"; // Import the NewCategory component
import TablesubData from "./data/TablesubData"; // Import the TablesubData function
import CategoryBodyCell from "examples/Categories/CategoriesData/CategoryBodyCell"; // Import CategoryBodyCell
import CategoryHeadCell from "examples/Categories/CategoriesData/CategoryHeadCell"; // Import CategoryHeadCell

function SubCategories() {
  const { columns, rows } = TablesubData(); // Fetch category data

  return (
    <div>
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
                    جدول الفئات
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        {columns.map((column, index) => (
                          <CategoryHeadCell key={index} align={column.align}>
                            {column.Header}
                          </CategoryHeadCell>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => (
                        <tr key={index}>
                          <CategoryBodyCell align="left">{row.author}</CategoryBodyCell>
                          <CategoryBodyCell align="center">{row.Category}</CategoryBodyCell>
                          <CategoryBodyCell align="center">{row.text}</CategoryBodyCell>
                          <CategoryBodyCell align="center">{row.mainCategory}</CategoryBodyCell>
                          <CategoryBodyCell align="center">{row.Actions}</CategoryBodyCell>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </MDBox>
                <AddCategory />
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </div>
  );
}

export default SubCategories;
