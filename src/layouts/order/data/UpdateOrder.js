import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

function UpdateOrder({ initialRows, orderId, onUpdate }) {
  const [order, setOrder] = useState({
    orderId: orderId,
    customerName: "",
    product: "",
    productNumber: "",
    quantity: 0,
    totalAmount: "",
    status: "",
  });

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  useEffect(() => {
    const existingOrder = initialRows.find((row) => row.orderId === orderId);
    if (existingOrder) {
      setOrder(existingOrder); // Update state with existing order data
    } else {
      console.error(`Order with ID ${orderId} not found`);
    }
  }, [initialRows, orderId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !order.customerName ||
      !order.product ||
      !order.quantity ||
      !order.totalAmount ||
      !order.status
    ) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setError("");
    onUpdate(order);
    setIsDialogOpen(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eaeaea",
      }}
    >
      <Box
        flexDirection="column"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={3}
        bgcolor="#fbfbfb"
      >
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>تحديث الطلب</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  disabled
                  label="رقم الطلب"
                  value={order.orderId} // Display existing ID
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="اسم العميل"
                  name="customerName"
                  value={order.customerName}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="المنتج"
                  name="product"
                  value={order.product}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="رقم المنتج"
                  name="productNumber"
                  value={order.productNumber}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الكمية"
                  name="quantity"
                  type="number"
                  value={order.quantity}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="المبلغ الإجمالي"
                  name="totalAmount"
                  value={order.totalAmount}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الحالة"
                  name="status"
                  value={order.status}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Typography color="error">{error}</Typography>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>الغاء</Button>
            <Button variant="contained" sx={{ color: "#ffffff" }} onClick={handleSubmit}>
              حفظ <SaveIcon />
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

UpdateOrder.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      orderId: PropTypes.number.isRequired,
      customerName: PropTypes.string.isRequired,
      product: PropTypes.string.isRequired,
      productNumber: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      totalAmount: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  orderId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired, // Function to call when updating
};

export default UpdateOrder;
