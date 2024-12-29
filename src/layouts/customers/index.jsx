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
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

const Customers = () => {
  const [editingId, setEditingId] = useState(null);
  const [customerRows, setCustomerRows] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const { columns, rows, selectedProducts, isProductModalOpen, setIsProductModalOpen } =
    CustomerTable({
      handleEdit,
    });

  const handleUpdate = (updatedCustomer) => {
    setCustomerRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedCustomer.id ? updatedCustomer : row))
    );
    setEditingId(null);
  };

  const handleAddCustomer = (newCustomer) => {
    setCustomerRows((prevRows) => [
      ...prevRows,
      {
        ...newCustomer,
        id: prevRows.length + 1,
      },
    ]);
  };

  const handleViewProductDetails = (id) => {
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    setCustomerRows(rows);
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
};

export default Customers;
