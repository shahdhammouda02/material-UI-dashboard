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

function AddCategory({ initialRows }) {
  const [newCategory, setNewCategory] = useState({
    id: "", // Start with null to indicate no ID is set
    categoryName: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Set the initial ID based on existing data
    const highestExistingId =
      initialRows.length > 0 ? Math.max(...initialRows.map((row) => row.id)) : 0;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      id: highestExistingId + 1, // Set ID to highest existing ID + 1
    }));
  }, [initialRows]); // Update ID when initialRows changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!newCategory.categoryName || !newCategory.description) {
      setError("Please fill in all fields correctly.");
      return;
    }

    const newCategoryWithID = {
      id: newCategory.id, // Use the incremented ID
      categoryName: newCategory.categoryName,
      description: newCategory.description,
    };

    setError("");
    console.log("Category added successfully:", newCategoryWithID);
    setIsDialogOpen(false);

    // Reset the form for the next entry
    setNewCategory((prevCategory) => ({
      id: prevCategory.id + 1, // Increment ID for next entry
      categoryName: "",
      description: "",
    }));
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setNewCategory({ id: null, categoryName: "", description: "" }); // Reset ID to null
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#eaeaea",
        // borderTop: "2px solid rgb(240 242 243)",
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
        // color="#00000"
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
          اضافة فئة جديدة
          <AddIcon />
        </Button>

        {/* Dialog for category input */}
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>اضافة فئة جديدة</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  disabled
                  label="الرقم التعريفي"
                  value={newCategory.id} // Display existing or generated ID
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="اسم الصنف"
                  name="categoryName"
                  value={newCategory.categoryName}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الوصف"
                  name="description"
                  value={newCategory.description}
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

AddCategory.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // ... other properties of your row object
    })
  ),
};

AddCategory.defaultProps = {
  initialRows: [],
};

export default AddCategory;
