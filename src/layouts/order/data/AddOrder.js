import React, { useState } from "react";
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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function AddOrder() {
  const [newOrder, setNewOrder] = useState({
    orderId: "",
    customerName: "",
    product: "",
    productNumber: "",
    quantity: "",
    totalAmount: "",
    status: "",
  });

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const generateUniqueOrderID = () => {
    const timestamp = Date.now().toString();
    const randomPart = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `order-${timestamp}-${randomPart}`;
  };

  const handleSubmit = () => {
    if (
      !newOrder.customerName ||
      !newOrder.product ||
      !newOrder.productNumber ||
      !newOrder.quantity ||
      !newOrder.totalAmount ||
      !newOrder.status
    ) {
      setError("Please fill in all fields correctly.");
      return;
    }

    const newOrderWithID = {
      orderId: generateUniqueOrderID(), // Generate Order ID
      ...newOrder,
    };

    setError("");
    console.log("Order added successfully:", newOrderWithID);
    setIsDialogOpen(false);
    setNewOrder({
      customerName: "",
      product: "",
      productNumber: "",
      quantity: "",
      totalAmount: "",
      status: "",
    });
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setNewOrder({
      orderId: "",
      customerName: "",
      product: "",
      productNumber: "",
      quantity: "",
      totalAmount: "",
      status: "",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eaeaea",
        borderTop: "2px solid rgb(240 242 243)",
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
        color="#000"
      >
        <Button
          variant="contained"
          onClick={handleDialogOpen}
          sx={{ mb: 3, color: "#ffffff", fontSize: "1rem" }}
        >
          اضافة طلب جديد
          <AddIcon />
        </Button>

        {/* Dialog for order input */}
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>اضافة طلب جديد</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField disabled label="الرقم التعريفي" value={newOrder.orderId} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="اسم العميل"
                  name="customerName"
                  value={newOrder.customerName}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="اسم المنتج"
                  name="product"
                  value={newOrder.product}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="رقم المنتج"
                  name="productNumber"
                  value={newOrder.productNumber}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الكمية"
                  name="quantity"
                  value={newOrder.quantity}
                  onChange={handleInputChange}
                  fullWidth
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="المبلغ الإجمالي"
                  name="totalAmount"
                  value={newOrder.totalAmount}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Select
                    name="status"
                    value={newOrder.status}
                    onChange={handleInputChange}
                    fullWidth
                    displayEmpty
                    sx={{ minWidth: 200 }}
                  >
                    <MenuItem value="" disabled>
                      اختر الحالة
                    </MenuItem>
                    <MenuItem value="pending">قيد الانتظار</MenuItem>
                    <MenuItem value="completed">مكتمل</MenuItem>
                    <MenuItem value="shipped">تم الشحن</MenuItem>
                    <MenuItem value="canceled">ملغى</MenuItem>
                  </Select>
                </FormControl>
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
              إضافة
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

export default AddOrder;
