import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import {
  TextField,
  Button,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function AddSubCategory({ initialRows }) {
  const [newSubcategory, setNewSubcategory] = useState({
    id: "", // Start with null to indicate no ID is set
    categoryName: "",
    description: "",
    mainCategory: "", // الفئة الأساسية
  });

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Set the initial ID based on existing data
    const highestExistingId =
      initialRows.length > 0 ? Math.max(...initialRows.map((row) => row.id)) : 0;
    setNewSubcategory((prevSubcategory) => ({
      ...prevSubcategory,
      id: highestExistingId + 1, // Set ID to highest existing ID + 1
    }));
  }, [initialRows]); // Update ID when initialRows changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubcategory((prevSubcategory) => ({
      ...prevSubcategory,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate input fields
    if (
      !newSubcategory.categoryName ||
      !newSubcategory.description ||
      !newSubcategory.mainCategory
    ) {
      setError("Please fill in all fields correctly.");
      return;
    }

    const newSubcategoryWithID = {
      id: newSubcategory.id, // Use the incremented ID
      categoryName: newSubcategory.categoryName,
      description: newSubcategory.description,
      mainCategory: newSubcategory.mainCategory,
    };

    setError("");
    console.log("Subcategory added successfully:", newSubcategoryWithID);
    setIsDialogOpen(false);

    // Reset the form for the next entry
    setNewSubcategory((prevSubcategory) => ({
      id: prevSubcategory.id + 1, // Increment ID for next entry
      categoryName: "",
      description: "",
      mainCategory: "",
    }));
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setNewSubcategory({ id: "", categoryName: "", description: "", mainCategory: "" }); // Reset form
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        flexDirection="column"
        // width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        // p={3}
        // bgcolor="#fbfbfb"
        // color="#000"
      >
        <Button
          onClick={handleDialogOpen}
          sx={{
            bgcolor: "#ffffff",
            "&:hover": {
              bgcolor: "#000000",
              color: "#ffffff", // لون أغمق عند التمرير
            },
            transition: "all 0.3s ease-in-out",
          }}
        >
          اضافة صنف جديد
          <AddIcon />
        </Button>

        {/* Dialog for subcategory input */}
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>اضافة صنف جديد</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  disabled
                  label="الرقم التعريفي"
                  value={newSubcategory.id} // Display existing or generated ID
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="اسم الصنف"
                  name="categoryName"
                  value={newSubcategory.categoryName}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الوصف"
                  name="description"
                  value={newSubcategory.description}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                {/* Dropdown to select the main category */}
                <Select
                  name="mainCategory"
                  value={newSubcategory.mainCategory}
                  onChange={handleInputChange}
                  fullWidth
                  displayEmpty
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value="" disabled>
                    اختر الفئة الأساسية
                  </MenuItem>
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
              حفظ
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

// PropTypes Validation
AddSubCategory.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // Add other properties of your row object as needed
    })
  ).isRequired, // Mark as required
};

export default AddSubCategory;
