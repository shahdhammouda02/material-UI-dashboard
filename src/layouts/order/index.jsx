import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrders,
  fetchOrderDetails,
} from "../../../src/Store/Slices/orderSlice/orderAction";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataproductBodyCell from "../../examples/products/Dataproduct/DataproductBodyCell";
import DataproductHeadCell from "../../examples/products/Dataproduct/DataproductHeadCell";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";

const Order = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, orderDetails, loadingOrderDetails } = useSelector(
    (state) => state.orders
  );
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);

  const ordersList = Array.isArray(orders?.orders) ? orders.orders : [];

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleOpenDetails = async (order) => {
    setSelectedOrder(order);
    setOpen(true);

    const orderId = order?.order_id;
    console.log("Fetching details for order ID:", orderId);

    if (orderId) {
      dispatch(fetchOrderDetails({ orderId }))
        .then((res) => {
          console.log("Fetched order details:", res.payload);
        })
        .catch((err) => console.error("Error fetching order details:", err));
    } else {
      console.error("🚨 Error: Missing order_id");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
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
                  جدول الطلبات
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <MDTypography variant="h6" align="center">
                    جاري تحميل البيانات...
                  </MDTypography>
                ) : error ? (
                  <MDTypography variant="h6" color="error" align="center">
                    {error}
                  </MDTypography>
                ) : ordersList.length === 0 ? (
                  <MDTypography variant="h6" align="center">
                    لا توجد طلبات متاحة.
                  </MDTypography>
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <DataproductHeadCell align="center">رقم الطلب</DataproductHeadCell>
                        <DataproductHeadCell align="center">اسم العميل</DataproductHeadCell>
                        <DataproductHeadCell align="center">المبلغ الإجمالي</DataproductHeadCell>
                        <DataproductHeadCell align="center">الحالة</DataproductHeadCell>
                        <DataproductHeadCell align="center">المنتجات</DataproductHeadCell>
                        <DataproductHeadCell align="center">التفاصيل</DataproductHeadCell>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersList.map((order, index) => (
                        <tr key={index}>
                          <DataproductBodyCell align="center">
                            {order.order_id || "N/A"}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center">
                            {order.user_name || "N/A"}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center">
                            {order.total_price || "N/A"}$
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center">
                            {order.status || "N/A"}
                          </DataproductBodyCell>
                          <DataproductBodyCell align="center">
                            {order.products.length > 0
                              ? order.products.map((product, i) => (
                                  <span key={i}>
                                    {product}
                                    {i < order.products.length - 1 ? ", " : ""}
                                  </span>
                                ))
                              : "لا يوجد منتجات"}
                          </DataproductBodyCell>

                          <DataproductBodyCell align="center">
                            <IconButton color="primary" onClick={() => handleOpenDetails(order)}>
                              <VisibilityIcon />
                            </IconButton>
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

      {/* مربع حوار عرض تفاصيل الطلب */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle style={{ textAlign: "center", color: "darkred" }}>تفاصيل المنتجات</DialogTitle>
        <DialogContent>
          {loadingOrderDetails ? (
            <MDTypography variant="h6" align="center">
              جاري تحميل تفاصيل الطلب...
            </MDTypography>
          ) : orderDetails?.order?.products?.length > 0 ? (
            <>
              {console.log("Order Details Inside Dialog:", orderDetails)}
              {orderDetails.order.products.map((product, i) => (
                <Card key={i} sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 3 }}>
                  <MDTypography variant="h6" color="success">
                    المنتج: {product.product_name}
                  </MDTypography>
                  <MDTypography variant="body1">
                    <strong>رقم المنتج:</strong> {product.product_id}
                  </MDTypography>
                  <MDTypography variant="body1">
                    <strong>السعر:</strong> {product.price_per_item}$
                  </MDTypography>
                  <MDTypography variant="body1">
                    <strong>الكمية:</strong> {product.quantity}
                  </MDTypography>
                  <MDTypography variant="h6" color="primary">
                    <strong>السعر الإجمالي:</strong> {product.total_price}$
                  </MDTypography>
                </Card>
              ))}
              <MDTypography variant="h5" color="green" align="center" sx={{ mt: 2 }}>
                المبلغ الإجمالي: {orderDetails.order.total_price}$
              </MDTypography>
            </>
          ) : (
            <MDTypography variant="h6" color="error" align="center">
              لا توجد تفاصيل متاحة أو المنتجات فارغة.
            </MDTypography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default Order;
