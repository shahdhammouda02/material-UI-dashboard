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

function UpdateCustomer({ initialRows, customerId, onUpdate }) {
  const [customer, setCustomer] = useState({
    id: customerId,
    name: "",
    email: "",
    products: [], // Assuming products are part of the customer object
  });

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  useEffect(() => {
    const existingCustomer = initialRows.find((row) => row.id === customerId);
    if (existingCustomer) {
      setCustomer(existingCustomer); // Load the existing customer data
    } else {
      console.error(`Customer with ID ${customerId} not found`);
    }
  }, [initialRows, customerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!customer.name || !customer.email) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setError("");
    onUpdate(customer); // Call the update function passed as a prop
    setIsDialogOpen(false); // Close the dialog
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
          <DialogTitle>تحديث العميل</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  disabled
                  label="الرقم التعريفي"
                  value={customer.id} // Display existing ID
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="اسم العميل"
                  name="name"
                  value={customer.name} // Set existing name
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="البريد الإلكتروني"
                  name="email"
                  value={customer.email} // Set existing email
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>

              {/* Products Section */}
              {customer.products && customer.products.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6">المنتجات</Typography>
                  {customer.products.map((product, index) => (
                    <Box key={index} display="flex" alignItems="center" mb={1}>
                      <Typography>
                        {product.number} - {product.name}
                      </Typography>
                    </Box>
                  ))}
                </Grid>
              )}

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

UpdateCustomer.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
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
};

export default UpdateCustomer;
