import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

function UpdateShipping({ initialRows, ShippingId, onUpdate }) {
  // 🟢 الحالة (State) الخاصة ببيانات النموذج
  const [formData, setFormData] = useState({
    id: "",
    userid: "",
    proid: "",
    shipping: "",
    price: "",
    address: "",
  });

  // 🔄 تحميل بيانات الشحنة بناءً على ShippingId
  useEffect(() => {
    const selectedRow = initialRows.find((row) => row.id === ShippingId);
    if (selectedRow) {
      setFormData(selectedRow); // نسخ البيانات إلى النموذج
    } else {
      console.warn(`No row found with ID: ${ShippingId}`);
    }
  }, [ShippingId, initialRows]);

  // ✍️ تابع لمعالجة المدخلات
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ✅ تابع لحفظ التغييرات
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(formData); // استدعاء الدالة لتحديث البيانات في المكون الرئيسي
    }
  };

  // ❌ تابع لإلغاء التعديلات
  const handleCancel = () => {
    if (onUpdate) {
      onUpdate(formData); // إرسال null لإغلاق النموذج
    }
  };

  return (
    <MDBox p={3}>
      {/* 🔶 عنوان النموذج */}
      <MDTypography variant="h5" mb={2}>
        تعديل معلومات التوصيل
      </MDTypography>

      {/* 📝 نموذج التعديل */}
      <form onSubmit={handleSubmit}>
        {/* 🆔 حقل: رقم الشحنة (عرض فقط) */}
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="رقم الشحنة"
            name="id"
            value={formData.id}
            onChange={handleChange}
            disabled
            fullWidth
          />
        </MDBox>

        {/* 👤 حقل: رقم المستخدم */}
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="رقم المستخدم"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
            fullWidth
          />
        </MDBox>

        {/* 🛒 حقل: رقم المنتج */}
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="رقم المنتج"
            name="proid"
            value={formData.proid}
            onChange={handleChange}
            fullWidth
          />
        </MDBox>

        {/* 🚚 حقل: طريقة الشحن (قائمة منسدلة) */}
        <MDBox mb={2}>
          <FormControl fullWidth>
            <InputLabel>طريقة الشحن</InputLabel>
            <Select
              label="طريقة الشحن"
              name="shipping"
              value={formData.shipping}
              onChange={handleChange}
              sx={{ height: "40px" }}
            >
              <MenuItem value="عادي">عادي</MenuItem>
              <MenuItem value="سريع">سريع</MenuItem>
              <MenuItem value="مجاني">مجاني</MenuItem>
            </Select>
          </FormControl>
        </MDBox>

        {/* 💰 حقل: السعر */}
        <MDBox mb={2}>
          <MDInput
            label="السعر"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />
        </MDBox>

        {/* 🏠 حقل: العنوان */}
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="العنوان"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
          />
        </MDBox>

        {/* 🔘 أزرار التحكم */}
        <MDBox display="flex" justifyContent="space-between">
          {/* ✅ زر الحفظ */}
          <MDButton variant="gradient" color="success" type="submit">
            حفظ التعديلات
          </MDButton>

          {/* ❌ زر الإلغاء */}
          <MDButton variant="gradient" color="error" onClick={handleCancel}>
            إلغاء
          </MDButton>
        </MDBox>
      </form>
    </MDBox>
  );
}

// ⚙️ إعدادات PropTypes لضمان سلامة المدخلات
UpdateShipping.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userid: PropTypes.string.isRequired,
      proid: PropTypes.string.isRequired,
      shipping: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired,
  ShippingId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateShipping;
