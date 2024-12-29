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
import UpdateProduct from "./data/UpdateProduct";
import DataproductBodyCell from "../../examples/products/Dataproduct/DataproductBodyCell";
import DataproductHeadCell from "../../examples/products/Dataproduct/DataproductHeadCell";
import MDButton from "components/MDButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Products() {
  const [editingId, setEditingId] = useState(null);
  const [productRows, setProductRows] = useState([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleUpdate = (updatedProduct) => {
    setProductRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedProduct.id ? updatedProduct : row))
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setProductRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleAddProductOpen = () => {
    setIsAddProductOpen(true);
  };

  const handleAddProductClose = () => {
    setIsAddProductOpen(false);
  };

  const handleAddProduct = (newProduct) => {
    setProductRows((prevRows) => [...prevRows, newProduct]);
    setIsAddProductOpen(false);
  };

  const { columns, rows } = TableData({ handleEdit, handleDelete }); // Pass handleDelete

  useEffect(() => {
    setProductRows(rows);
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
              >
                <MDTypography variant="h5" color="white">
                  جدول المنتجات
                </MDTypography>
                <MDButton variant="gradient" color="success" onClick={handleAddProductOpen}>
                  اضافة منتج
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                {isAddProductOpen ? (
                  <Addproduct
                    initialRows={rows}
                    onAdd={handleAddProduct}
                    onCancel={handleAddProductClose}
                  />
                ) : editingId ? (
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
                          <DataproductBodyCell align="center">
                            {row.subcategory}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.images}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.price}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.discount}</DataproductBodyCell>
                          <DataproductBodyCell align="center">
                            {row.description}
                          </DataproductBodyCell>
                          <DataproductBodyCell>
                            <MDBox
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              sx={{ padding: "0 !important" }}
                            >
                              <MDButton
                                variant="text"
                                color="success"
                                onClick={() => handleEdit(row.id)}
                                sx={{ padding: "0 !important" }}
                              >
                                <EditIcon sx={{ height: "1.5rem", width: "1.5rem" }} />
                              </MDButton>
                              <MDButton
                                mx={1}
                                variant="text"
                                color="success"
                                onClick={() => handleDelete(row.id)}
                                sx={{ padding: "0 !important" }}
                              >
                                <DeleteIcon sx={{ height: "1.5rem", width: "1.5rem" }} />
                              </MDButton>
                            </MDBox>
                          </DataproductBodyCell>
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
