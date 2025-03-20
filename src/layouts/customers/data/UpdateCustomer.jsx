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
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer, fetchCustomers } from "../../../Store/Slices/customerSlice/customerAction";

function UpdateCustomer({ initialRows, customerId, onUpdate, onClose }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.customers);
  const [customer, setCustomer] = useState({
    id: customerId || null,
    name: "",
    gender: "",
    phone: "",
    email: "",
    birthdate: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!customerId) {
      setErrorMessage("Invalid customerId");
      return;
    }

    // البحث عن العميل المحدد
    const existingCustomer = initialRows.find((row) => row.id === customerId);
    if (existingCustomer) {
      setCustomer({
        id: existingCustomer.id,
        name: existingCustomer.name || "",
        gender: existingCustomer.gender || "",
        phone: existingCustomer.phone || "",
        email: existingCustomer.email || "",
        birthdate: existingCustomer.birthdate || "",
      });
    } else {
      setErrorMessage(`Customer with ID ${customerId} not found`);
    }
  }, [initialRows, customerId]);

  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    onClose(); // استدعاء دالة الإغلاق القادمة من props
  };

  // التعامل مع تغييرات المدخلات
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  // التعامل مع إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !customer.name ||
      !customer.gender ||
      !customer.phone ||
      !customer.email ||
      !customer.birthdate
    ) {
      return;
    }

    dispatch(updateCustomer({ id: customer.id, updatedData: customer })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        onUpdate(customer); // تحديث البيانات في واجهة المستخدم
        dispatch(fetchCustomers()); // إعادة تحميل البيانات بعد التحديث
        handleDialogClose(); // إغلاق النافذة
      }
    });
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle>تحديث العميل</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              disabled
              label="الرقم التعريفي"
              value={customer.id || ""}
              fullWidth
              aria-label="الرقم التعريفي"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="اسم العميل"
              name="name"
              value={customer.name}
              onChange={handleInputChange}
              fullWidth
              aria-label="اسم العميل"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="الجنس"
              name="gender"
              value={customer.gender}
              onChange={handleInputChange}
              fullWidth
              aria-label="الجنس"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="رقم الجوال"
              name="phone"
              value={customer.phone}
              onChange={handleInputChange}
              fullWidth
              aria-label="رقم الجوال"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="البريد الإلكتروني"
              name="email"
              value={customer.email}
              onChange={handleInputChange}
              fullWidth
              aria-label="البريد الإلكتروني"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="تاريخ الميلاد"
              name="birthdate"
              type="date"
              value={customer.birthdate}
              onChange={handleInputChange}
              fullWidth
              aria-label="تاريخ الميلاد"
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* عرض رسالة الخطأ */}
          {errorMessage && (
            <Grid item xs={12}>
              <Typography color="error" align="center">
                {errorMessage}
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} aria-label="الغاء">
          الغاء
        </Button>
        <Button
          variant="contained"
          sx={{ color: "#ffffff" }}
          onClick={handleSubmit}
          disabled={loading}
          startIcon={<SaveIcon />}
        >
          حفظ
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UpdateCustomer.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      birthdate: PropTypes.string.isRequired,
    })
  ).isRequired,
  customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateCustomer;
