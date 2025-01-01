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
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function AddCustomer({ initialRows, onAddCustomer }) {
  const [newCustomer, setNewCustomer] = useState({
    id: null,
    name: "",
    gender: "",
    mobile: "",
    email: "",
    dateOfBirth: "",
    products: [], // Initialize products as an empty array
  });

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Auto-increment the ID based on the highest existing ID
  useEffect(() => {
    if (initialRows.length > 0) {
      const highestExistingId = Math.max(...initialRows.map((row) => row.id));
      setNewCustomer((prev) => ({
        ...prev,
        id: highestExistingId + 1,
      }));
    } else {
      // If no rows exist, start with ID 1
      setNewCustomer((prev) => ({
        ...prev,
        id: 1,
      }));
    }
  }, [initialRows]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { name, gender, mobile, email, dateOfBirth } = newCustomer;

    // Validate required fields
    if (!name.trim() || !gender.trim() || !mobile.trim() || !email.trim() || !dateOfBirth.trim()) {
      setError("Please fill in all fields correctly.");
      return;
    }

    // Add actions and viewProducts button automatically
    const customerWithActions = {
      ...newCustomer,
      products: {
        productCount: newCustomer.products.length, // Number of products
        viewProducts: (
          <IconButton color="primary" title="عرض المنتجات">
            <VisibilityIcon />
          </IconButton>
        ),
      },
      actions: (
        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton color="success" title="تعديل">
            <EditIcon />
          </IconButton>
          <Box mx={1} />
          <IconButton color="error" title="حذف">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    };

    // Pass the new customer data to the parent component
    onAddCustomer(customerWithActions);

    // Reset form
    setNewCustomer((prev) => ({
      id: prev.id + 1, // Auto-increment ID for the next customer
      name: "",
      gender: "",
      mobile: "",
      email: "",
      dateOfBirth: "",
      products: [],
    }));

    setError("");
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setError("");
    setNewCustomer((prev) => ({
      id: prev.id,
      name: "",
      gender: "",
      mobile: "",
      email: "",
      dateOfBirth: "",
      products: [],
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box flexDirection="column" display="flex" justifyContent="center" alignItems="center">
        <Button
          onClick={handleDialogOpen}
          sx={{
            bgcolor: "#ffffff",
            color: "#1e8234",
            "&:hover": {
              bgcolor: "#000000",
              color: "#ffffff", // Darker color on hover
            },
            transition: "all 0.3s ease-in-out",
          }}
        >
          اضافة عميل جديد
          <AddIcon />
        </Button>

        {/* Dialog for customer input */}
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>اضافة عميل جديد</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField disabled label="الرقم التعريفي" value={newCustomer.id || ""} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="اسم العميل"
                  name="name"
                  value={newCustomer.name}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الجنس"
                  name="gender"
                  value={newCustomer.gender}
                  onChange={handleInputChange}
                  fullWidth
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
                  value={newCustomer.mobile}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="البريد الإلكتروني"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="تاريخ الميلاد"
                  name="dateOfBirth"
                  type="date"
                  value={newCustomer.dateOfBirth}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
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
              إضافة
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

AddCustomer.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onAddCustomer: PropTypes.func.isRequired,
};

export default AddCustomer;
