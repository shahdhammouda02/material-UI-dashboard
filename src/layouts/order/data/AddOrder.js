<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
=======
import React, { useState } from "react";
>>>>>>> 3f912fd042bc052f7a9c72e8b8a4022a7d245608
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
<<<<<<< HEAD
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function AddOrder({ initialRows }) {
  const [newOrder, setNewOrder] = useState({
    id: "", // Start with null to indicate no ID is set
=======
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function AddOrder() {
  const [newOrder, setNewOrder] = useState({
    orderId: "",
>>>>>>> 3f912fd042bc052f7a9c72e8b8a4022a7d245608
    customerName: "",
    product: "",
    productNumber: "",
    quantity: "",
    totalAmount: "",
    status: "",
  });

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

<<<<<<< HEAD
  useEffect(() => {
    // Set the initial ID based on existing data
    const highestExistingId =
      initialRows.length > 0 ? Math.max(...initialRows.map((row) => row.id)) : 0;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      id: highestExistingId + 1, // Set ID to highest existing ID + 1
    }));
  }, [initialRows]); // Update ID when initialRows changes

=======
>>>>>>> 3f912fd042bc052f7a9c72e8b8a4022a7d245608
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

<<<<<<< HEAD
=======
  const generateUniqueOrderID = () => {
    const timestamp = Date.now().toString();
    const randomPart = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `order-${timestamp}-${randomPart}`;
  };

>>>>>>> 3f912fd042bc052f7a9c72e8b8a4022a7d245608
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
<<<<<<< HEAD
      id: newOrder.id, // Use the incremented ID
      customerName: newOrder.customerName,
      product: newOrder.product,
      productNumber: newOrder.productNumber,
      quantity: newOrder.quantity,
      totalAmount: newOrder.totalAmount,
      status: newOrder.status,
=======
      orderId: generateUniqueOrderID(), // Generate Order ID
      ...newOrder,
>>>>>>> 3f912fd042bc052f7a9c72e8b8a4022a7d245608
    };

    setError("");
    console.log("Order added successfully:", newOrderWithID);
    setIsDialogOpen(false);
<<<<<<< HEAD

    // Reset the form for the next entry
    setNewOrder((prevOrder) => ({
      id: prevOrder.id + 1, // Increment ID for next entry
=======
    setNewOrder({
>>>>>>> 3f912fd042bc052f7a9c72e8b8a4022a7d245608
      customerName: "",
      product: "",
      productNumber: "",
      quantity: "",
      totalAmount: "",
      status: "",
<<<<<<< HEAD
    }));
=======
    });
>>>>>>> 3f912fd042bc052f7a9c72e8b8a4022a7d245608
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setNewOrder({
<<<<<<< HEAD
      id: null,
=======
      orderId: "",
>>>>>>> 3f912fd042bc052f7a9c72e8b8a4022a7d245608
      customerName: "",
      product: "",
      productNumber: "",
      quantity: "",
      totalAmount: "",
      status: "",
<<<<<<< HEAD
    }); // Reset ID to null
=======
    });
>>>>>>> 3f912fd042bc052f7a9c72e8b8a4022a7d245608
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
<<<<<<< HEAD
                <TextField
                  disabled
                  label="الرقم التعريفي"
                  value={newOrder.id} // Display existing or generated ID
                  fullWidth
                />
=======
                <TextField disabled label="الرقم التعريفي" value={newOrder.orderId} fullWidth />
>>>>>>> 3f912fd042bc052f7a9c72e8b8a4022a7d245608
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
<<<<<<< HEAD
                <TextField
                  label="الحالة"
                  name="status"
                  value={newOrder.status}
                  onChange={handleInputChange}
                  fullWidth
                />
=======
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
>>>>>>> 3f912fd042bc052f7a9c72e8b8a4022a7d245608
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

<<<<<<< HEAD
AddOrder.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // ... other properties of your row object
    })
  ),
};

AddOrder.defaultProps = {
  initialRows: [],
};

=======
>>>>>>> 3f912fd042bc052f7a9c72e8b8a4022a7d245608
export default AddOrder;
