import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const productPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  author: PropTypes.string.isRequired,
  Category: PropTypes.string.isRequired,
  images: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  Discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string,
  actions: PropTypes.node,
});

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

function UpdateProduct({ initialRows, productId, onUpdate }) {
  const [product, setProduct] = useState({
    id: productId,
    author: "",
    Category: "",
    images: "",
    price: "",
    Discount: "",
    text: "",
  });

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  useEffect(() => {
    const existingProduct = initialRows.find((row) => row.id === productId);
    if (existingProduct) {
      setProduct(existingProduct); // Corrected: Update product state
    } else {
      console.error(`Product with ID ${productId} not found`);
    }
  }, [initialRows, productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !product.author ||
      !product.Category ||
      !product.images ||
      !product.price ||
      !product.Discount ||
      !product.text
    ) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setError("");
    onUpdate(product); // Call the update function passed as a prop
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
          <DialogTitle>تحديث المنتج</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  disabled
                  label="الرقم التعريفي"
                  value={product.id} // Display existing ID
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="اسم المنتج"
                  name="author" // Corrected: match the state key
                  value={product.author} // Set existing author
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الفئة"
                  name="Category" // Corrected: match the state key
                  value={product.Category} // Set existing category
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الصورة"
                  name="images" // Corrected: match the state key
                  value={product.images} // Set existing images
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="السعر"
                  name="price" // Corrected: match the state key
                  value={product.price} // Set existing price
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الخصم"
                  name="Discount" // Corrected: match the state key
                  value={product.Discount} // Set existing discount
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="الوصف"
                  name="text" // Corrected: match the state key
                  value={product.text} // Set existing text
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

UpdateProduct.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      author: PropTypes.string.isRequired,
      Category: PropTypes.string.isRequired,
      images: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      Discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateProduct;
