import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import AddOrder from "./data/AddOrder";
import OrdersTable from "./data/orderTable";
import UpdateOrder from "./data/UpdateOrder";

function Order() {
  const [editingId, setEditingId] = useState(null); // State to track the editing order ID
  const [orderRows, setOrderRows] = useState([]);

  const handleEdit = (id) => {
    setEditingId(id); // Set the ID to edit
  };

  const handleUpdate = (updatedOrder) => {
    setOrderRows((prevRows) =>
      prevRows.map((row) => (row.orderId === updatedOrder.orderId ? updatedOrder : row))
    );
    setEditingId(null);
  };

  const { columns, rows } = OrdersTable(handleEdit);

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
              <MDBox mx={2} mt={-3} py={3} px={2} bgColor="info" borderRadius="lg">
                <MDTypography variant="h6" color="white">
                  جدول الطلبات
                </MDTypography>
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
                          <th key={index} style={{ textAlign: column.align, padding: "10px" }}>
                            {column.Header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {orderRows.map((row, index) => (
                        <tr key={index}>
                          <td style={{ textAlign: "center", padding: "10px" }}>{row.orderId}</td>
                          <td style={{ textAlign: "center", padding: "10px" }}>
                            {row.customerName}
                          </td>
                          <td style={{ textAlign: "center", padding: "10px" }}>{row.product}</td>
                          <td style={{ textAlign: "center", padding: "10px" }}>
                            {row.productNumber}
                          </td>
                          <td style={{ textAlign: "center", padding: "10px" }}>{row.quantity}</td>
                          <td style={{ textAlign: "center", padding: "10px" }}>
                            {row.totalAmount}
                          </td>
                          <td style={{ textAlign: "center", padding: "10px" }}>{row.status}</td>
                          <td style={{ textAlign: "center", padding: "10px" }}>{row.actions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </MDBox>
              <AddOrder initialRows={rows} />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Order;
