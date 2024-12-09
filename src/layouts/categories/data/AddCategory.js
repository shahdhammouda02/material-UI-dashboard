import React, { useState, useMemo } from "react";
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

function AddCategory() {
  const [newCategory, setNewCategory] = useState({
    id: "",
    categoryName: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };
  const generateUniqueID = () => {
    const timestamp = Date.now().toString();
    const randomPart = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `cat-${timestamp}-${randomPart}`;
  };

  const handleSubmit = () => {
    if (!newCategory.categoryName || !newCategory.description) {
      setError("Please fill in all fields correctly.");
      return;
    }

    const newCategoryWithID = {
      id: generateUniqueID(), // Generate ID here
      ...newCategory,
    };

    setError("");
    console.log("Category added successfully:", newCategoryWithID);
    setIsDialogOpen(false);
    setNewCategory({ categoryName: "", description: "" });
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setNewCategory({ id: "", categoryName: "", description: "" });
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
          // startIcon={<AddIcon />}
          onClick={handleDialogOpen}
          sx={{ mb: 3, color: "#ffffff", fontSize: "1rem" }}
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
                <TextField disabled label="الرقم التعريفي" value={newCategory.id} fullWidth />
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

export default AddCategory;
