import React from "react";
import { useParams } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import TableData from "./TableData"; // Import the TableData function
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

const ProductDetails = () => {
  const { id } = useParams(); // Get the `id` parameter from the URL

  // Pass dummy functions to TableData
  const { products } = TableData({
    handleEdit: () => {},
    handleDelete: () => {},
  });

  // Find the product by `id`
  const product = products.find((p) => p.id === parseInt(id));

  console.log("Product found:", product); // Debugging
  console.log("Product ID from URL:", id); // Debugging

  if (!product) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox p={3}>
          <MDTypography variant="h3" gutterBottom>
            المنتج غير موجود
          </MDTypography>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <MDBox p={3}>
        <MDTypography variant="h3" gutterBottom textAlign="center">
          تفاصيل المنتج
        </MDTypography>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Card
              sx={{
                borderRadius: "16px",
                boxShadow: 3,
                overflow: "hidden",
              }}
            >
              <CardContent>
                <MDBox p={3}>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" fontWeight="bold" color="primary">
                      الرقم التعريفي:
                    </MDTypography>
                    <MDTypography variant="body1">{product.id}</MDTypography>
                  </MDBox>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" fontWeight="bold" color="primary">
                      الاسم:
                    </MDTypography>
                    <MDTypography variant="body1">{product.author}</MDTypography>
                  </MDBox>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" fontWeight="bold" color="primary">
                      الفئة:
                    </MDTypography>
                    <MDTypography variant="body1">{product.Category}</MDTypography>
                  </MDBox>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" fontWeight="bold" color="primary">
                      الفئة الفرعية:
                    </MDTypography>
                    <MDTypography variant="body1">{product.subcategory}</MDTypography>
                  </MDBox>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" fontWeight="bold" color="primary">
                      الصورة:
                    </MDTypography>
                    <MDBox mt={1}>{product.images}</MDBox>
                  </MDBox>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" fontWeight="bold" color="primary">
                      السعر:
                    </MDTypography>
                    <MDTypography variant="body1">{product.price}</MDTypography>
                  </MDBox>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" fontWeight="bold" color="primary">
                      الخصم:
                    </MDTypography>
                    <MDTypography variant="body1">{product.discount}</MDTypography>
                  </MDBox>
                  <MDBox mb={3}>
                    <MDTypography variant="h6" fontWeight="bold" color="primary">
                      الوصف:
                    </MDTypography>
                    <MDTypography variant="body1">{product.description}</MDTypography>
                  </MDBox>
                </MDBox>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
};

export default ProductDetails;
