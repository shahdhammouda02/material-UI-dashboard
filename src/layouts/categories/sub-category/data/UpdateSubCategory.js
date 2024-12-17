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
  Select,
  MenuItem,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

function UpdateSubCategory({ initialRows, categoryId, onUpdate }) {
  const [subcategory, setSubcategory] = useState({
    author: categoryId,
    Category: "",
    text: "",
    mainCategory: "",
  });

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(true); // Open dialog by default

  useEffect(() => {
    const existingSubcategory = initialRows.find((row) => row.id === categoryId);
    if (existingSubcategory) {
      setSubcategory(existingSubcategory); // Update state with existing subcategory data
    } else {
      console.error(`Subcategory with ID ${categoryId} not found`);
    }
  }, [initialRows, categoryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubcategory((prevSubcategory) => ({
      ...prevSubcategory,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!subcategory.Category || !subcategory.text || !subcategory.mainCategory) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setError("");
    onUpdate(subcategory); // Call the update function passed as a prop
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
          <DialogTitle>تحديث الفئة الفرعية</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  disabled
                  label="الرقم التعريفي"
                  value={subcategory.id} // Display existing ID
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="اسم الفئة"
                  name="Category"
                  value={subcategory.Category} // Set existing category name
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الوصف"
                  name="text"
                  value={subcategory.text} // Set existing description
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                {/* قائمة منسدلة لاختيار الفئة الأساسية */}
                <Select
                  name="mainCategory"
                  value={subcategory.mainCategory} // Set existing main category
                  onChange={handleInputChange}
                  fullWidth
                  displayEmpty
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value={subcategory.mainCategory}>{subcategory.mainCategory}</MenuItem>
                  <MenuItem value="food-products">منتجات غذائية</MenuItem>
                  <MenuItem value="men-clothes">ملابس وإكسسوارات</MenuItem>
                  <MenuItem value="handicrafts">حرف يدوية</MenuItem>
                  <MenuItem value="books">كتب ومطبوعات</MenuItem>
                </Select>
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

UpdateSubCategory.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.number.isRequired,
      Category: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      mainCategory: PropTypes.string.isRequired,
    })
  ).isRequired,
  categoryId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired, // Function to call when updating
};

export default UpdateSubCategory;
