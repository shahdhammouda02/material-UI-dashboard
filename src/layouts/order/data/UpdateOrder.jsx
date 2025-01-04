import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Chip from "@mui/material/Chip"; // Import Chip for badge-like appearance

function UpdateOrder({ initialRows, orderId, onUpdate }) {
  // 🟢 الحالة (State) الخاصة ببيانات النموذج
  const [order, setOrder] = useState({
    orderId: orderId || -1, // default to -1 or another placeholder if orderId is null
    customerName: "",
    product: "",
    productNumber: "",
    quantity: 0,
    totalAmount: "",
    status: "",
  });

  const [error, setError] = useState("");

  // 🔄 تحميل بيانات الطلب بناءً على orderId
  useEffect(() => {
    if (!orderId) {
      console.error("Invalid orderId");
      return; // Avoid proceeding if orderId is invalid
    }

    const existingOrder = initialRows.find((row) => row.orderId === orderId);
    if (existingOrder) {
      setOrder(existingOrder); // نسخ البيانات إلى النموذج
    } else {
      console.error(`Order with ID ${orderId} not found`);
    }
  }, [initialRows, orderId]);

  // ✍️ تابع لمعالجة المدخلات
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  // ✅ تابع لحفظ التغييرات
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (
      !order.customerName ||
      !order.product ||
      !order.quantity ||
      !order.totalAmount ||
      !order.status
    ) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setError("");
    onUpdate(order); // Call onUpdate with the updated order
  };

  return (
    <MDBox p={3}>
      {/* 🔶 عنوان النموذج */}
      <MDTypography variant="h5" mb={2}>
        تحديث الطلب
      </MDTypography>

      {/* 📝 نموذج التعديل */}
      <form onSubmit={handleSubmit}>
        {/* 🆔 حقل: رقم الطلب */}
        <MDBox mb={2}>
          <MDInput label="رقم الطلب" name="orderId" value={order.orderId} disabled fullWidth />
        </MDBox>

        {/* 👤 حقل: اسم العميل */}
        <MDBox mb={2}>
          <MDInput
            label="اسم العميل"
            name="customerName"
            value={order.customerName}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>

        {/* 🛒 حقل: المنتج */}
        <MDBox mb={2}>
          <MDInput
            label="المنتج"
            name="product"
            value={order.product}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>

        {/* 🚚 حقل: رقم المنتج */}
        <MDBox mb={2}>
          <MDInput
            label="رقم المنتج"
            name="productNumber"
            value={order.productNumber}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>

        {/* 💰 حقل: الكمية */}
        <MDBox mb={2}>
          <MDInput
            label="الكمية"
            name="quantity"
            value={order.quantity}
            onChange={handleInputChange}
            type="number"
            fullWidth
          />
        </MDBox>

        {/* 🏠 حقل: المبلغ الإجمالي */}
        <MDBox mb={2}>
          <MDInput
            label="المبلغ الإجمالي"
            name="totalAmount"
            value={order.totalAmount}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>

        {/* 🏠 حقل: الحالة (القائمة المنسدلة) */}
        <MDBox mb={2}>
          <FormControl fullWidth>
            <InputLabel>الحالة</InputLabel>
            <Select
              label="الحالة"
              name="status"
              value={order.status}
              onChange={handleInputChange}
              sx={{ height: "40px" }}
              renderValue={(selected) => (
                <Chip
                  label={selected}
                  color={
                    selected === "قيد المعالجة"
                      ? "warning"
                      : selected === "تم التنفيذ"
                      ? "success"
                      : "error"
                  }
                  variant="filled"
                  size="small"
                  sx={{ fontWeight: "bold" }}
                />
              )}
            >
              <MenuItem value="قيد المعالجة">
                <Chip
                  label="قيد المعالجة"
                  color="warning"
                  variant="filled"
                  size="small"
                  sx={{ fontWeight: "bold" }}
                />
              </MenuItem>
              <MenuItem value="تم التنفيذ">
                <Chip
                  label="تم التنفيذ"
                  color="success"
                  variant="filled"
                  size="small"
                  sx={{ fontWeight: "bold" }}
                />
              </MenuItem>
              <MenuItem value="ملغى">
                <Chip
                  label="ملغى"
                  color="error"
                  variant="filled"
                  size="small"
                  sx={{ fontWeight: "bold" }}
                />
              </MenuItem>
            </Select>
          </FormControl>
        </MDBox>

        {/* 🛑 عرض الخطأ */}
        {error && (
          <MDBox mb={2}>
            <MDTypography color="error">{error}</MDTypography>
          </MDBox>
        )}

        {/* 🔘 أزرار التحكم */}
        <MDBox display="flex" justifyContent="space-between">
          {/* ✅ زر الحفظ */}
          <MDButton variant="gradient" color="success" type="submit">
            حفظ التعديلات
          </MDButton>

          {/* ❌ زر الإلغاء */}
          <MDButton
            variant="gradient"
            color="error"
            onClick={() => onUpdate(orderId ? order : null)} // Ensure orderId is valid
          >
            إلغاء
          </MDButton>
        </MDBox>
      </form>
    </MDBox>
  );
}

// ⚙️ إعدادات PropTypes لضمان سلامة المدخلات
UpdateOrder.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      orderId: PropTypes.number.isRequired,
      customerName: PropTypes.string.isRequired,
      product: PropTypes.string.isRequired,
      productNumber: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      totalAmount: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  orderId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired, // Function to call when updating
};

export default UpdateOrder;
