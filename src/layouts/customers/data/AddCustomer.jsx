import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer } from "../../../Store/Slices/customerSlice/customerAction";
import {
  TextField,
  Button,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function AddCustomer({ onCancel }) {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customers);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone: "",
    email: "",
    birthdate: "",
    password: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => !value)) {
      setError("من فضلك قم بملء جميع الحقول بشكل صحيح.");
      return;
    }
    setError("");

    try {
      const highestExistingId =
        customers.length > 0 ? Math.max(...customers.map((row) => row.id)) : 0;
      const newCustomer = { ...formData, id: highestExistingId + 1 };

      // محاولة إرسال الطلب
      const res = await dispatch(addCustomer(newCustomer)).unwrap();
      console.log("Response from API: ", res); // سجل استجابة الـ API
      if (res?.message === "Delivery created successfully") {
        alert("تم إضافة العميل بنجاح!");
        setIsDialogOpen(false);
      } else {
        alert("تم إضافة العميل بنجاح!");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      if (error.response) {
        // إذا كان الخطأ من الخادم
        alert(`خطأ من الخادم: ${error.response.data.message || "حدث خطأ غير متوقع."}`);
      } else if (error.request) {
        // إذا كان لا يوجد رد من الخادم
        alert("لم يتم الحصول على رد من الخادم. يرجى المحاولة لاحقًا.");
      } else {
        // في حالة الخطأ غير المتوقع (مثل مشاكل في الشبكة)
        alert("حدث خطأ في الاتصال بالشبكة. يرجى المحاولة لاحقًا.");
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button
        onClick={() => setIsDialogOpen(true)}
        sx={{
          bgcolor: "#ffffff",
          color: "#1e8234",
          "&:hover": { bgcolor: "#000000", color: "#ffffff" },
        }}
      >
        اضافة عميل جديد <AddIcon />
      </Button>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>اضافة عميل جديد</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <TextField
                label="اسم العميل"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="الجنس"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="كلمة السر"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="رقم الجوال"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="البريد الإلكتروني"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="تاريخ الميلاد"
                name="birthdate"
                type="date"
                value={formData.birthdate}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Box color="error.main" textAlign="center">
                  {error}
                </Box>
              </Grid>
            )}
            <DialogActions>
              <Button variant="contained" color="success" type="submit">
                حفظ
              </Button>
              <Button variant="contained" color="error" onClick={() => setIsDialogOpen(false)}>
                إلغاء
              </Button>
            </DialogActions>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

AddCustomer.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default AddCustomer;
