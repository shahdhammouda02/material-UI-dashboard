import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CustomerTable from "./data/CustomersTable";
import UpdateCustomer from "./data/UpdateCustomer";
import AddCustomer from "./data/AddCustomer";
import DataproductBodyCell from "../../examples/products/Dataproduct/DataproductBodyCell";
import DataproductHeadCell from "../../examples/products/Dataproduct/DataproductHeadCell";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

function Customers() {
  const [editingId, setEditingId] = useState(null); // State to track the editing ID
  const [customerRows, setCustomerRows] = useState([]);
  const navigate = useNavigate(); // For navigation

  // Function to handle editing a customer
  const handleEdit = (id) => {
    setEditingId(id); // Set the ID to edit
  };

  // Function to handle viewing product details
  const handleViewProductDetails = (id) => {
    console.log("Navigating to product with ID:", id);
    navigate(`/products/${id}`);
  };

  // Function to highlight the clicked row
  const handleHighlightRow = (rowIndex) => {
    setCustomerRows((prevRows) =>
      prevRows.map((row, index) => (index === rowIndex ? { ...row, isHighlighted: true } : row))
    );
  };

  // Function to remove highlight from all rows
  const removeHighlight = () => {
    setCustomerRows((prevRows) => prevRows.map((row) => ({ ...row, isHighlighted: false })));
  };

  // Get columns, rows, and modal state from the CustomerTable component
  const { columns, rows, selectedProducts, isProductModalOpen, setIsProductModalOpen } =
    CustomerTable({
      handleEdit,
      handleViewProductDetails,
      handleHighlightRow,
      removeHighlight,
    });

  // Function to handle updating a customer
  const handleUpdate = (updatedCustomer) => {
    setCustomerRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedCustomer.id ? updatedCustomer : row))
    );
    setEditingId(null); // Close the edit dialog
  };

  // Function to handle adding a new customer
  const handleAddCustomer = (newCustomer) => {
    setCustomerRows((prevRows) => [
      ...prevRows,
      {
        ...newCustomer,
        id: prevRows.length + 1, // Assign a new ID to the customer
      },
    ]);
  };

  // Update customerRows with the rows from CustomerTable
  useEffect(() => {
    setCustomerRows(rows); // Set initial rows from CustomerTable
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
                  جدول العملاء
                </MDTypography>
                <AddCustomer initialRows={customerRows} onAddCustomer={handleAddCustomer} />
              </MDBox>
              <MDBox pt={3}>
                {editingId ? (
                  <UpdateCustomer
                    initialRows={customerRows}
                    customerId={editingId}
                    onUpdate={handleUpdate}
                  />
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {columns.map((column, index) => {
                          if (column.subColumns) {
                            return (
                              <th
                                key={index}
                                colSpan={column.subColumns.length}
                                align="center"
                                style={{ fontSize: "12px" }}
                              >
                                {column.Header}
                              </th>
                            );
                          } else {
                            return (
                              <th key={index} align="center" style={{ fontSize: "12px" }}>
                                {column.Header}
                              </th>
                            );
                          }
                        })}
                      </tr>
                      <tr>
                        {columns.map((column, index) => {
                          if (column.subColumns) {
                            return column.subColumns.map((subColumn, subIndex) => (
                              <th
                                key={`${index}-${subIndex}`}
                                align="center"
                                style={{ fontSize: "12px" }}
                              >
                                {subColumn.Header}
                              </th>
                            ));
                          } else {
                            return <th key={index}></th>;
                          }
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {customerRows.map((row, index) => (
                        <tr
                          key={index}
                          style={row.isHighlighted ? { background: "lightgreen" } : {}}
                        >
                          <DataproductBodyCell align="center" style={{ fontSize: "12px" }}>
                            {row.id}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center" style={{ fontSize: "12px" }}>
                            {row.name}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center" style={{ fontSize: "12px" }}>
                            {row.gender}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center" style={{ fontSize: "12px" }}>
                            {row.mobile}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center" style={{ fontSize: "12px" }}>
                            {row.email}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center" style={{ fontSize: "12px" }}>
                            {row.dateOfBirth}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center" style={{ fontSize: "12px" }}>
                            {row.products.productCount}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center" style={{ fontSize: "12px" }}>
                            {row.products.viewProducts}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center" style={{ fontSize: "12px" }}>
                            {row.actions}
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

      {/* Modal for displaying product details */}
      <Dialog open={isProductModalOpen} onClose={() => setIsProductModalOpen(false)}>
        <DialogTitle>تفاصيل المنتجات</DialogTitle>
        <DialogContent>
          {selectedProducts.map((product) => (
            <Box key={product.id} mb={2}>
              <Typography>
                <strong>ID:</strong> {product.id}
              </Typography>
              <Typography>
                <strong>اسم المنتج:</strong> {product.name}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleViewProductDetails(product.id)}
              >
                عرض التفاصيل
              </Button>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsProductModalOpen(false)}>إغلاق</Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </DashboardLayout>
  );
}

export default Customers;
