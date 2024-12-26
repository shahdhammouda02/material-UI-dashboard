import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import AddOrder from "./data/AddOrder";
import OrdersTable from "./data/orderTable";
import UpdateOrder from "./data/UpdateOrder";
import DataproductBodyCell from "../../examples/products/Dataproduct/DataproductBodyCell";
import DataproductHeadCell from "../../examples/products/Dataproduct/DataproductHeadCell";

function Order() {
  const [editingId, setEditingId] = useState(null); // State to track the editing order ID
  const [orderRows, setOrderRows] = useState([]); // State to hold order rows

  const handleEdit = (id) => {
    setEditingId(id); // Set the ID to edit
  };

  const handleUpdate = (updatedOrder) => {
    setOrderRows((prevRows) =>
      prevRows.map((row) => (row.orderId === updatedOrder.orderId ? updatedOrder : row))
    );
    setEditingId(null);
  };

  const { columns, rows } = OrdersTable(handleEdit); // Pass handleEdit to get column and row data

  // Update orderRows with the rows from OrdersTable
  useEffect(() => {
    setOrderRows(rows); // Set initial rows from OrdersTable
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
                  جدول الطلبات
                </MDTypography>
                {/* <AddOrder initialRows={rows} /> */}
              </MDBox>
              <MDBox pt={3}>
                {editingId ? (
                  <UpdateOrder
                    initialRows={orderRows}
                    orderId={editingId}
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
                      {orderRows.map((row, index) => (
                        <tr key={index}>
                          <DataproductBodyCell align="center">{row.orderId}</DataproductBodyCell>
                          <DataproductBodyCell align="center">
                            {row.customerName}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.product}</DataproductBodyCell>
                          <DataproductBodyCell align="center">
                            {row.productNumber}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.quantity}</DataproductBodyCell>
                          <DataproductBodyCell align="center">
                            {row.totalAmount}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.status}</DataproductBodyCell>
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

export default Order;
