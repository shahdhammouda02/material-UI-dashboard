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

function UpdateCategory({ initialRows, categoryId, onUpdate }) {
  const [category, setCategory] = useState({
    id: categoryId,
    categoryName: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(true); // Open dialog by default

  useEffect(() => {
    const existingCategory = initialRows.find((row) => row.id === categoryId);
    if (existingCategory) {
      setCategory(existingCategory); // Update state with existing category data
    } else {
      console.error(`Category with ID ${categoryId} not found`);
    }
  }, [initialRows, categoryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!category.categoryName || !category.description) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setError("");
    onUpdate(category); // Call the update function passed as a prop
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
          <DialogTitle>تحديث الفئة</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  disabled
                  label="الرقم التعريفي"
                  value={category.id} // Display existing ID
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="اسم الصنف"
                  name="categoryName"
                  value={category.categoryName} // Set existing category name
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الوصف"
                  name="description"
                  value={category.description} // Set existing description
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
              حفظ <SaveIcon />
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

UpdateCategory.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      categoryName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  categoryId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired, // Function to call when updating
};

export default UpdateCategory;
