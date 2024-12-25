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
  IconButton,
  MenuItem,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";

function UpdateCustomer({ initialRows, customerId, onUpdate, onClose }) {
  const [customer, setCustomer] = useState({
    id: customerId,
    name: "",
    gender: "",
    mobile: "",
    email: "",
    dateOfBirth: "",
    products: [], // Assuming products are part of the customer object
  });

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  // Load existing customer data when the component mounts
  useEffect(() => {
    const existingCustomer = initialRows.find((row) => row.id === customerId);
    if (existingCustomer) {
      setCustomer(existingCustomer); // Load the existing customer data
    } else {
      console.error(`Customer with ID ${customerId} not found`);
      setError("Customer not found.");
    }
  }, [initialRows, customerId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = () => {
    const { name, gender, mobile, email, dateOfBirth } = customer;

    // Validate required fields
    if (!name.trim() || !gender.trim() || !mobile.trim() || !email.trim() || !dateOfBirth.trim()) {
      setError("Please fill in all fields correctly.");
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    onUpdate(customer); // Call the update function passed as a prop
    setIsDialogOpen(false); // Close the dialog
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    onClose(); // Call the onClose function passed as a prop
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle>تحديث العميل</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              disabled
              label="الرقم التعريفي"
              value={customer.id || ""}
              fullWidth
              aria-label="الرقم التعريفي"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="اسم العميل"
              name="name"
              value={customer.name}
              onChange={handleInputChange}
              fullWidth
              aria-label="اسم العميل"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="الجنس"
              name="gender"
              value={customer.gender}
              onChange={handleInputChange}
              fullWidth
              aria-label="الجنس"
              required
              select
            >
              <MenuItem value="ذكر">ذكر</MenuItem>
              <MenuItem value="أنثى">أنثى</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="رقم الجوال"
              name="mobile"
              value={customer.mobile}
              onChange={handleInputChange}
              fullWidth
              aria-label="رقم الجوال"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="البريد الإلكتروني"
              name="email"
              value={customer.email}
              onChange={handleInputChange}
              fullWidth
              aria-label="البريد الإلكتروني"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="تاريخ الميلاد"
              name="dateOfBirth"
              type="date"
              value={customer.dateOfBirth}
              onChange={handleInputChange}
              fullWidth
              aria-label="تاريخ الميلاد"
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Products Section */}
          <Grid item xs={12}>
            <Typography variant="h6">المنتجات</Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography>
                عدد المنتجات: {customer.products ? customer.products.length : 0}
              </Typography>
              <IconButton
                color="primary"
                onClick={() => {
                  // Handle view products action
                  console.log("View Products:", customer.products);
                }}
                title="عرض المنتجات"
                disabled={!customer.products || customer.products.length === 0}
              >
                <VisibilityIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Error Message */}
          {error && (
            <Grid item xs={12}>
              <Typography color="error" align="center">
                {error}
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} aria-label="الغاء">
          الغاء
        </Button>
        <Button
          variant="contained"
          sx={{ color: "#ffffff" }}
          onClick={handleSubmit}
          aria-label="حفظ"
          startIcon={<SaveIcon />}
        >
          حفظ
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UpdateCustomer.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      mobile: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      dateOfBirth: PropTypes.string.isRequired,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateCustomer;
