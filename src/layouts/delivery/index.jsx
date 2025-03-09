import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Addshipping from "./data/Addshipping";
import UpdateShipping from "./data/UpdateShipping";
import {
  fetchDeliveries,
  addDelivery,
  updateDelivery,
  deleteDelivery,
} from "../../Store/Slices/deliverySlice/deliveryAction";
import DataproductBodyCell from "../../examples/products/Dataproduct/DataproductBodyCell";
import DataproductHeadCell from "../../examples/products/Dataproduct/DataproductHeadCell";
import MDButton from "components/MDButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Delivery() {
  const dispatch = useDispatch();
  const { deliveries, loading } = useSelector((state) => state.deliveries);
  const [editingId, setEditingId] = useState(null);
  const [isAddShippingOpen, setIsAddShippingOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleUpdate = (updatedShipping) => {
    dispatch(updateDelivery(updatedShipping));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteDelivery(id));
  };

  const handleAddShippingOpen = () => {
    setIsAddShippingOpen(true);
  };

  const handleAddShippingClose = () => {
    setIsAddShippingOpen(false);
  };

  const handleAddShipping = (newShipping) => {
    dispatch(addDelivery(newShipping));
    setIsAddShippingOpen(false);
  };

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
                  <Addshipping onAdd={handleAddShipping} onCancel={handleAddShippingClose} />
                ) : editingId ? (
                  <UpdateShipping
                    initialRows={deliveries} // تم استبدال DeliveryRows بـ deliveries
                    ShippingId={editingId}
                    onUpdate={handleUpdate}
                    onCancel={handleAddShippingClose}
                  />
                ) : (
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <DataproductHeadCell>كود الشحنة</DataproductHeadCell>
                        <DataproductHeadCell>رقم الزبون</DataproductHeadCell>
                        <DataproductHeadCell>رقم المنتج</DataproductHeadCell>
                        <DataproductHeadCell>نوع الشحن</DataproductHeadCell>
                        <DataproductHeadCell>التكلفة</DataproductHeadCell>
                        <DataproductHeadCell>العنوان</DataproductHeadCell>
                        <DataproductHeadCell>الإجراءات</DataproductHeadCell>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="7">جار التحميل...</td>
                        </tr>
                      ) : (
                        deliveries.map((row) => (
                          <tr key={row.id}>
                            <DataproductBodyCell align="center">{row.id}</DataproductBodyCell>
                            <DataproductBodyCell align="center">{row.user_id}</DataproductBodyCell>
                            <DataproductBodyCell align="center">
                              {row.product_id}
                            </DataproductBodyCell>
                            <DataproductBodyCell align="center">
                              {row.shipping_type}
                            </DataproductBodyCell>
                            <DataproductBodyCell align="center">{row.cost}</DataproductBodyCell>
                            <DataproductBodyCell align="center">{row.address}</DataproductBodyCell>
                            <DataproductBodyCell align="center">
                              <MDButton
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ padding: "0 !important" }}
                                onClick={() => handleEdit(row.id)}
                              >
                                <EditIcon
                                  color="success"
                                  sx={{
                                    height: "1.5rem !important",
                                    width: "1.5rem !important",
                                    padding: "0 !important",
                                  }}
                                />
                              </MDButton>
                              <MDButton onClick={() => handleDelete(row.id)}>
                                <DeleteIcon
                                  color="error"
                                  sx={{
                                    height: "1.5rem !important",
                                    width: "1.5rem !important",
                                    padding: "0 !important",
                                  }}
                                />
                              </MDButton>
                            </DataproductBodyCell>
                          </tr>
                        ))
                      )}
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
