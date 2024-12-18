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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function Addshipping({ initialRows }) {
  const [shipping, setshipping] = useState({
    id: "", // Start with an empty ID
    userid: "",
    proid: "",
    shipping: "",
    price: "",
    adress: "",
  });

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Set the initial ID based on existing data
    const highestExistingId =
      initialRows.length > 0 ? Math.max(...initialRows.map((row) => row.id)) : 0;
    setshipping((prevshipping) => ({
      ...prevshipping,
      id: highestExistingId + 1, // Set ID to highest existing ID + 1
    }));
  }, [initialRows]); // Update ID when initialRows changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setshipping((prevshipping) => ({
      ...prevshipping,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !shipping.userid ||
      !shipping.proid ||
      !shipping.shipping ||
      !shipping.price ||
      !shipping.adress
    ) {
      setError("من فضلك قم بملء جميع الحقول بشكل صحيح.");
      return;
    }

    const shippingWithID = {
      id: shipping.id, // Use the incremented ID
      userid: shipping.userid,
      proid: shipping.proid,
      shipping: shipping.shipping,
      price: shipping.price,
      adress: shipping.adress,
    };

    setError("");
    console.log("تم إضافة الشحنة بنجاح:", shippingWithID);
    setIsDialogOpen(false);

    // Reset the form for the next entry, keeping the id increment logic
    setshipping({
      id: shipping.id + 1, // Increment ID for next entry
      userid: "",
      proid: "",
      shipping: "",
      price: "",
      adress: "",
    });
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setshipping({
      id: "", // Reset ID to empty on close
      userid: "",
      proid: "",
      shipping: "",
      price: "",
      adress: "",
    });
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
          اضافة شحنة جديدة
          <AddIcon />
        </Button>

        {/* Dialog for shipping input */}
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>اضافة شحنة جديدة</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  disabled
                  label="رقم الشحنة"
                  value={shipping.id} // Display existing or generated ID
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="رقم الزبون"
                  name="userid"
                  value={shipping.userid}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="رقم المنتج"
                  name="proid"
                  value={shipping.proid}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                {/* قائمة منسدلة لاختيار الفئة الأساسية */}
                <FormControl fullWidth>
                  <InputLabel>نوع الشحن</InputLabel>
                  <Select
                    label="نوع الشحن"
                    name="shipping"
                    value={shipping.shipping}
                    onChange={handleInputChange}
                    fullWidth
                    displayEmpty
                    sx={{ minWidth: 200, height: 40 }}
                  >
                    <MenuItem value="fast">سريع</MenuItem>
                    <MenuItem value="normal">عادي</MenuItem>
                    <MenuItem value="free">مجاني</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="السعر"
                  name="price"
                  value={shipping.price}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="العنوان"
                  name="adress"
                  value={shipping.adress}
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

Addshipping.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // other properties of your row object
    })
  ),
};

Addshipping.defaultProps = {
  initialRows: [],
};

export default Addshipping;
