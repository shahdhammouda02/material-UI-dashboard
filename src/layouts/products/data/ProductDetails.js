import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { useParams, useNavigate, useOutletContext } from "react-router-dom"; // Import useOutletContext
import Grid from "@mui/material/Grid"; // Import Grid component
import Card from "@mui/material/Card"; // Import Card component
import Button from "@mui/material/Button"; // Import Button component
import MDBox from "components/MDBox"; // Import MDBox component
import MDTypography from "components/MDTypography"; // Import MDTypography component
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"; // Import DashboardLayout
import DashboardNavbar from "examples/Navbars/DashboardNavbar"; // Import DashboardNavbar
import Footer from "examples/Footer"; // Import Footer component

function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // For navigation
  const productRows = useOutletContext(); // Access productRows from context

  // Find the product by ID from the productRows array
  const product = productRows.find((row) => row.id === parseInt(id));

  // If the product is not found, display a message
  if (!product) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <MDTypography variant="h6" align="center">
            المنتج غير موجود
          </MDTypography>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

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
                bgColor="info"
                borderRadius="lg"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  تفاصيل المنتج
                </MDTypography>
                <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
                  العودة
                </Button>
              </MDBox>
              <MDBox pt={3} px={2}>
                <MDTypography variant="h4" gutterBottom>
                  {product.name}
                </MDTypography>
                <MDTypography variant="body1" gutterBottom>
                  {product.text}
                </MDTypography>
                <MDTypography variant="body2" gutterBottom>
                  السعر: {product.price}
                </MDTypography>
                <MDTypography variant="body2" gutterBottom>
                  الفئة: {product.Category}
                </MDTypography>
                <MDTypography variant="body2" gutterBottom>
                  الخصم: {product.Discount}
                </MDTypography>
                <MDBox mt={2}>{product.images}</MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProductDetails;
