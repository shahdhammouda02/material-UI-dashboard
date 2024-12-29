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
import UpdateShipping from "./data/UpdateShipping";
import DataproductBodyCell from "../../examples/products/Dataproduct/DataproductBodyCell";
import DataproductHeadCell from "../../examples/products/Dataproduct/DataproductHeadCell";
import MDButton from "components/MDButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
function Delivery() {
  const [editingId, setEditingId] = useState(null); // حالة لتتبع الـ ID للتعديل
  const [DeliveryRows, setDeliveryRows] = useState([]); // حالة لحفظ بيانات الشحنات
  const [isAddShippingOpen, setIsAddShippingOpen] = useState(false); // حالة لفتح/إغلاق نافذة إضافة الشحنة

  const handleEdit = (id) => {
    setEditingId(id); // تعيين الـ ID للتعديل
  };

  const handleUpdate = (updatedShipping) => {
    setDeliveryRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedShipping.id ? updatedShipping : row))
    );
    setEditingId(null); // إغلاق نافذة التعديل
  };

  const handleDelete = (id) => {
    setDeliveryRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleAddShippingOpen = () => {
    setIsAddShippingOpen(true); // فتح نافذة إضافة الشحنة
  };

  const handleAddShippingClose = () => {
    setIsAddShippingOpen(false); // إغلاق نافذة إضافة الشحنة
  };

  const handleAddShipping = (newShipping) => {
    setDeliveryRows((prevRows) => [...prevRows, newShipping]); // إضافة الشحنة الجديدة
    setIsAddShippingOpen(false); // إغلاق نافذة إضافة الشحنة
  };

  const { columns, rows } = TableData(handleEdit); // تمرير دالة handleEdit

  useEffect(() => {
    setDeliveryRows(rows); // ✅ تحديث DeliveryRows
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
                  جدول التوصيل
                </MDTypography>
                <MDButton variant="gradient" color="success" onClick={handleAddShippingOpen}>
                  إضافة شحنة جديدة
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                {isAddShippingOpen ? (
                  <Addshipping
                    initialRows={rows}
                    onAdd={handleAddShipping}
                    onCancel={handleAddShippingClose}
                  />
                ) : editingId ? (
                  <UpdateShipping
                    initialRows={DeliveryRows}
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
                          <DataproductBodyCell align="center">
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
                                flex-inline
                              >
                                <EditIcon
                                  sx={{
                                    height: "1.5rem !important",
                                    width: "1.5rem !important",
                                    padding: "0 !important",
                                  }}
                                />
                              </MDButton>
                              <MDButton
                                mx={1}
                                variant="text"
                                color="success"
                                onClick={() => handleDelete(row.id)}
                                sx={{ padding: "0 !important" }}
                              >
                                <DeleteIcon
                                  sx={{
                                    height: "1.5rem !important",
                                    width: "1.5rem !important",
                                    padding: "0 !important",
                                  }}
                                />
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

export default Delivery;
