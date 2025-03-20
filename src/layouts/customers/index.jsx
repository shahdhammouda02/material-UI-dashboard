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
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

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
    console.log("Navigating to product ID:", id);
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    setCustomerRows(rows);
  }, [rows]);

  // Debugging: Make sure selectedProducts is populated
  useEffect(() => {
    console.log("Selected Products:", selectedProducts); // Log selectedProducts to the console
  }, [selectedProducts]);

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
                            {row.phone}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center" style={{ fontSize: "12px" }}>
                            {row.email}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center" style={{ fontSize: "12px" }}>
                            {row.birthdate}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center" style={{ fontSize: "12px" }}>
                            {row.orders_count}
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

      <Dialog
        open={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <MDTypography variant="h5" color="primary" fontWeight="bold">
            تفاصيل المنتجات
          </MDTypography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {selectedProducts && selectedProducts.length > 0 ? (
              selectedProducts.map((product) => (
                <Grid item xs={12} key={product.id}>
                  <Card sx={{ p: 1 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={6}>
                        <MDTypography variant="body2" fontWeight="bold" color="primary">
                          الرقم التعريفي:
                        </MDTypography>
                        <MDTypography variant="body2">{product.id}</MDTypography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <MDTypography variant="body2" fontWeight="bold" color="primary">
                          اسم المنتج:
                        </MDTypography>
                        <MDTypography variant="body2">{product.name}</MDTypography>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleViewProductDetails(product.id)}
                        >
                          عرض المنتج
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))
            ) : (
              <MDTypography variant="body2" color="textSecondary">
                لا توجد تفاصيل للمنتجات
              </MDTypography>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsProductModalOpen(false)} color="primary">
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </DashboardLayout>
  );
};

export default Customers;
