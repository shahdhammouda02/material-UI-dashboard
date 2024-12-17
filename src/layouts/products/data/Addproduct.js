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

function Addproduct({ initialRows }) {
  const [newproduct, setNewproduct] = useState({
    id: "", // Start with null to indicate no ID is set
    productName: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Set the initial ID based on existing data
    const highestExistingId =
      initialRows.length > 0 ? Math.max(...initialRows.map((row) => row.id)) : 0;
    setNewproduct((prevproduct) => ({
      ...prevproduct,
      id: highestExistingId + 1, // Set ID to highest existing ID + 1
    }));
  }, [initialRows]); // Update ID when initialRows changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewproduct((prevproduct) => ({
      ...prevproduct,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!newproduct.productName || !newproduct.description) {
      setError("Please fill in all fields correctly.");
      return;
    }

    const newproductWithID = {
      id: newproduct.id, // Use the incremented ID
      productName: newproduct.productName,
      description: newproduct.description,
    };

    setError("");
    console.log("product added successfully:", newproductWithID);
    setIsDialogOpen(false);

    // Reset the form for the next entry
    setNewproduct((prevproduct) => ({
      id: prevproduct.id + 1, // Increment ID for next entry
      productName: "",
      description: "",
    }));
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setNewproduct({ id: null, productName: "", description: "" }); // Reset ID to null
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
          اضافة فئة جديدة
          <AddIcon />
        </Button>

        {/* Dialog for product input */}
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>اضافة فئة جديدة</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  disabled
                  label="الرقم التعريفي"
                  value={newproduct.id} // Display existing or generated ID
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="اسم الصنف"
                  name="productName"
                  value={newproduct.productName}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الوصف"
                  name="description"
                  value={newproduct.description}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
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

Addproduct.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // ... other properties of your row object
    })
  ),
};

Addproduct.defaultProps = {
  initialRows: [],
};

export default Addproduct;
