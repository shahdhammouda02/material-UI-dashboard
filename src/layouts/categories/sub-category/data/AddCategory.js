import React, { useState } from "react";
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

function AddCategory() {
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    description: "",
    mainCategory: "", // الفئة الأساسية
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

  const handleSubmit = () => {
    // التحقق من وجود جميع البيانات
    if (!newCategory.categoryName || !newCategory.description || !newCategory.mainCategory) {
      setError("Please fill in all fields correctly.");
      return;
    }
    setError("");
    console.log("Category added successfully:", newCategory);
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
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
          startIcon={<AddIcon />}
          onClick={handleDialogOpen}
          sx={{ mb: 3, color: "#ffffff", fontSize: "1rem" }}
        >
          اضافة فئة جديدة
        </Button>

        {/* Dialog for category input */}
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>اضافة فئة جديدة</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
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
              <Grid item xs={12}>
                {/* قائمة منسدلة لاختيار الفئة الأساسية */}
                <Select
                  name="mainCategory"
                  value={newCategory.mainCategory}
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

export default AddCategory;
