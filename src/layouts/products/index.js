import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Addproduct from "./data/Addproduct";
import TableData from "./data/TableData";
import UpdateProduct from "./data/UpdateProduct"; // Import UpdateProduct
import DataproductBodyCell from "../../examples/products/Dataproduct/DataproductBodyCell";
import DataproductHeadCell from "../../examples/products/Dataproduct/DataproductHeadCell";
function Products() {
  const [editingId, setEditingId] = useState(null); // State to track the editing ID
  const [productRows, setproductRows] = useState([]);

  const handleEdit = (id) => {
    setEditingId(id); // Set the ID to edit
  };

  const handleUpdate = (updatedProduct) => {
    setproductRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedProduct.id ? updatedProduct : row))
    );
    setEditingId(null); // Close the edit dialog
  };

  const { columns, rows } = TableData(handleEdit); // Pass the handleEdit function

  // Update productRows with the rows from TableData
  useEffect(() => {
    setproductRows(rows); // Set initial rows from TableData
  }, [rows]);

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
                // coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  جدول المنتجات
                </MDTypography>
                <Addproduct initialRows={productRows} />
              </MDBox>
              <MDBox pt={3}>
                {editingId ? (
                  <UpdateProduct
                    initialRows={productRows}
                    productId={editingId}
                    onUpdate={handleUpdate}
                  />
                ) : (
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        {columns.map((column, index) => (
                          <DataproductHeadCell key={index} align={column.align}>
                            {column.Header}
                          </DataproductHeadCell>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {productRows.map((row, index) => (
                        <tr key={index}>
                          <DataproductBodyCell align="center">{row.id}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.author}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.Category}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.images}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.price}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.Discount}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.text}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.actions}</DataproductBodyCell>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Products;
