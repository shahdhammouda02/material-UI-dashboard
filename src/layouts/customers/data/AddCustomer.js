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
import AddIcon from "@mui/icons-material/Add";

function AddCustomer({ initialRows, onAddCustomer }) {
  const [newCustomer, setNewCustomer] = useState({
    id: null,
    name: "",
    email: "",
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
    const { name, email } = newCustomer;
    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields correctly.");
      return;
    }

    // Pass the new customer data to the parent component
    onAddCustomer(newCustomer);

    // Reset form
    setNewCustomer((prev) => ({
      id: prev.id + 1, // Auto-increment ID for the next customer
      name: "",
      email: "",
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
      email: "",
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
                  label="البريد الإلكتروني"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleInputChange}
                  fullWidth
                  required
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
