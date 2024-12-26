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
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function Addproduct({ initialRows }) {
  const [newproduct, setNewproduct] = useState({
    id: null,
    name: "",
    Category: "",
    subCategory: "",
    images: "",
    price: "",
    Discount: "",
    text: "",
  });

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const highestExistingId =
      initialRows.length > 0 ? Math.max(...initialRows.map((row) => row.id)) : 0;
    setNewproduct((prev) => ({
      ...prev,
      id: highestExistingId + 1,
    }));
  }, [initialRows]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewproduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { name, Category, subCategory, images, price, Discount, text } = newproduct;
    if (
      !name.trim() ||
      !Category.trim() ||
      !subCategory.trim() ||
      !images.trim() ||
      !price.trim() ||
      !Discount.trim() ||
      !text.trim()
    ) {
      setError("Please fill in all fields correctly.");
      return;
    }

    console.log("Product added successfully:", newproduct);

    // Reset form
    setNewproduct((prev) => ({
      id: prev.id + 1,
      name: "",
      Category: "",
      subCategory: "",
      images: "",
      price: "",
      Discount: "",
      text: "",
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
    setNewproduct((prev) => ({
      id: prev.id,
      name: "",
      Category: "",
      subCategory: "",
      images: "",
      price: "",
      Discount: "",
      text: "",
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
              color: "#ffffff", // لون أغمق عند التمرير
            },
            transition: "all 0.3s ease-in-out",
          }}
        >
          اضافة منتج جديد
          <AddIcon />
        </Button>

        {/* Dialog for product input */}
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>اضافة فئة جديدة</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField disabled label="الرقم التعريفي" value={newproduct.id || ""} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="اسم المنتج"
                  name="name"
                  value={newproduct.author}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الفئة"
                  name="Category"
                  value={newproduct.Category}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الفئة الفرعية"
                  name="subCategoty"
                  value={newproduct.subCategory}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الصورة (الرابط)"
                  name="images"
                  value={newproduct.images}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="السعر"
                  name="price"
                  type="number"
                  value={newproduct.price}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="الخصم"
                  name="Discount"
                  type="number"
                  value={newproduct.Discount}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الوصف"
                  name="text"
                  value={newproduct.text}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
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

Addproduct.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};

Addproduct.defaultProps = {
  initialRows: [],
};

export default Addproduct;
