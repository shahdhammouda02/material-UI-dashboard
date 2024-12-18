import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import SaveIcon from "@mui/icons-material/Save";
import Typography from "@mui/material/Typography";

function UpdateShipping({ initialRows, ShippingId, onUpdate }) {
  const [Shipping, setShipping] = useState({
    id: ShippingId,
    userid: "",
    proid: "",
    shipping: "",
    price: "",
    adress: "",
  });

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  useEffect(() => {
    const existingShipping = initialRows.find((row) => row.id === ShippingId);
    if (existingShipping) {
      setShipping(existingShipping);
    } else {
      console.error(`Shipping with ID ${ShippingId} not found`);
    }
  }, [initialRows, ShippingId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShipping((prevShipping) => ({
      ...prevShipping,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !Shipping.userid.trim() ||
      !Shipping.proid.trim() ||
      !Shipping.shipping.trim() ||
      !Shipping.price.trim() ||
      !Shipping.adress.trim()
    ) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setError("");
    onUpdate(Shipping);
    setIsDialogOpen(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
      <DialogTitle>تحديث الشحنة</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField disabled label="الرقم التعريفي" value={Shipping.id} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="رقم الزبون"
              name="userid"
              value={Shipping.userid}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="رقم المنتج"
              name="proid"
              value={Shipping.proid}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="نوع الشحن"
              name="shipping"
              value={Shipping.shipping}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="السعر"
              name="price"
              value={Shipping.price}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="العنوان"
              name="adress"
              value={Shipping.adress}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>الغاء</Button>
        <Button
          variant="contained"
          sx={{ color: "#ffffff" }}
          onClick={handleSubmit}
          startIcon={<SaveIcon />}
        >
          حفظ
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UpdateShipping.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      userid: PropTypes.string.isRequired,
      proid: PropTypes.string.isRequired,
      shipping: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      adress: PropTypes.string.isRequired,
    })
  ).isRequired,
  ShippingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateShipping;
