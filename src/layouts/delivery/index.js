import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Addshipping from "./data/Addshipping";
import TableData from "./data/TableData";
import UpdateShipping from "./data/UpdateShipping"; // Import UpdateShipping component
import DataproductBodyCell from "../../examples/products/Dataproduct/DataproductBodyCell";
import DataproductHeadCell from "../../examples/products/Dataproduct/DataproductHeadCell";

function Delivery() {
  const [editingId, setEditingId] = useState(null); // State to track the editing ID
  const [DeliveryRows, setDeliveryRows] = useState([]); // State to hold delivery rows

  // Function to handle the edit action
  const handleEdit = (id) => {
    setEditingId(id); // Set the ID to edit
  };

  // Function to handle the update action
  const handleUpdate = (updatedShipping) => {
    setDeliveryRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedShipping.id ? updatedShipping : row))
    );
    setEditingId(null); // Close the edit dialog
  };

  const { columns, rows } = TableData(handleEdit); // Pass the handleEdit function

  // Update DeliveryRows with the rows from TableData
  useEffect(() => {
    setDeliveryRows(rows); // ✅ Correct function name to setDeliveryRows
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
                  جدول التوصيل
                </MDTypography>
                <Addshipping initialRows={DeliveryRows} />
              </MDBox>
              <MDBox pt={3}>
                {editingId ? (
                  <UpdateShipping
                    initialRows={DeliveryRows} // Pass the correct rows here
                    ShippingId={editingId}
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
                      {DeliveryRows.map((row, index) => (
                        <tr key={index}>
                          <DataproductBodyCell align="center">{row.id}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.userid}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.proid}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.shipping}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.price}</DataproductBodyCell>
                          <DataproductBodyCell align="center">{row.adress}</DataproductBodyCell>
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

export default Delivery;
