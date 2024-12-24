import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CustomerTable from "./data/CustomersTable";
import UpdateCustomer from "./data/UpdateCustomer"; // Assuming you have an UpdateCustomer component
import AddCustomer from "./data/AddCustomer"; // Import the AddCustomer component
import DataproductBodyCell from "../../examples/products/Dataproduct/DataproductBodyCell";
import DataproductHeadCell from "../../examples/products/Dataproduct/DataproductHeadCell";

function Customers() {
  const [editingId, setEditingId] = useState(null); // State to track the editing ID
  const [customerRows, setCustomerRows] = useState([]);

  // Function to handle editing a customer
  const handleEdit = (id) => {
    setEditingId(id); // Set the ID to edit
  };

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
      },
    ]);
  };

  // Get columns and rows from the CustomerTable component
  const { columns, rows } = CustomerTable(handleEdit); // Pass the handleEdit function

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
                <MDTypography variant="h6" color="white">
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
                      {customerRows.map((row, index) => (
                        <tr key={index}>
                          <DataproductBodyCell align="center">{row.id}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.name}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.email}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.products}</DataproductBodyCell>
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

export default Customers;
