import React from "react";
import { useParams } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import TableData from "./TableData"; // Import the TableData function
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

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
        <MDTypography
          variant="h3"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          color="primary"
        >
          تفاصيل المنتج
        </MDTypography>

        {/* Simple Table */}
        <TableContainer
          component={Paper}
          sx={{
            width: "100%", // Make the table span the entire page width
            margin: "0 auto",
            boxShadow: 3,
          }}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <MDTypography variant="h6" fontWeight="bold" color="primary">
                    الرقم التعريفي:
                  </MDTypography>
                </TableCell>
                <TableCell>
                  <MDTypography variant="body1">{product.id}</MDTypography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <MDTypography variant="h6" fontWeight="bold" color="primary">
                    الاسم:
                  </MDTypography>
                </TableCell>
                <TableCell>
                  <MDTypography variant="body1">{product.author}</MDTypography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <MDTypography variant="h6" fontWeight="bold" color="primary">
                    الفئة:
                  </MDTypography>
                </TableCell>
                <TableCell>
                  <MDTypography variant="body1">{product.Category}</MDTypography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <MDTypography variant="h6" fontWeight="bold" color="primary">
                    الفئة الفرعية:
                  </MDTypography>
                </TableCell>
                <TableCell>
                  <MDTypography variant="body1">{product.subcategory}</MDTypography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <MDTypography variant="h6" fontWeight="bold" color="primary">
                    الصورة:
                  </MDTypography>
                </TableCell>
                <TableCell>
                  <MDBox mt={1}>{product.images}</MDBox>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <MDTypography variant="h6" fontWeight="bold" color="primary">
                    السعر:
                  </MDTypography>
                </TableCell>
                <TableCell>
                  <MDTypography variant="body1">{product.price}</MDTypography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <MDTypography variant="h6" fontWeight="bold" color="primary">
                    الخصم:
                  </MDTypography>
                </TableCell>
                <TableCell>
                  <MDTypography variant="body1">{product.discount}</MDTypography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <MDTypography variant="h6" fontWeight="bold" color="primary">
                    الوصف:
                  </MDTypography>
                </TableCell>
                <TableCell>
                  <MDTypography variant="body1">{product.description}</MDTypography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
};

export default ProductDetails;
