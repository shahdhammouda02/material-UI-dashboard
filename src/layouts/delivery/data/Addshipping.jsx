import React, { useState } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addDelivery } from "../../../Store/Slices/deliverySlice/deliveryAction";

const AddShipping = ({ onCancel }) => {
  const dispatch = useDispatch();
  const { deliveries } = useSelector((state) => state.deliveries);

  // الحالة الأولية مع الأسماء الصحيحة للحقول
  const [formData, setFormData] = useState({
    user_id: "",
    product_id: "",
    shipping_type: "",
    cost: "",
    address: "",
  });

  const [error, setError] = useState("");

  // التحقق من الحقول المطلوبة واستدعاء الـ API
  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من أن جميع الحقول ليست فارغة
    if (
      !formData.user_id ||
      !formData.product_id ||
      !formData.shipping_type ||
      !formData.cost ||
      !formData.address
    ) {
      setError("من فضلك قم بملء جميع الحقول بشكل صحيح.");
      return;
    }

    setError("");

    try {
      const highestExistingId =
        deliveries.length > 0 ? Math.max(...deliveries.map((row) => row.id)) : 0;

      const newShipping = {
        ...formData,
        id: highestExistingId + 1,
      };

      const res = await dispatch(addDelivery(newShipping)).unwrap();

      console.log("🔹 API Response:", res);

      if (res?.message === "Delivery created successfully") {
        alert(res?.message || "تم إضافة الشحنة بنجاح!");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        alert("حدث خطأ أثناء إضافة الشحنة.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("حدث خطأ غير متوقع.");
    }
  };

  // تحديث بيانات النموذج عند تغيير المدخلات
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <MDBox p={3}>
      <MDTypography variant="h5" mb={2}>
        إضافة شحنة جديدة
      </MDTypography>
      <form onSubmit={handleSubmit}>
        <MDBox mb={2}>
          <MDInput
            label="رقم المستخدم"
            name="user_id"
            value={formData.user_id}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="رقم المنتج"
            name="product_id"
            value={formData.product_id}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <FormControl fullWidth>
            <InputLabel>نوع الشحن</InputLabel>
            <Select
              label="نوع الشحن"
              name="shipping_type"
              value={formData.shipping_type}
              onChange={handleInputChange}
              sx={{ height: "40px" }}
            >
              <MenuItem value="Free">مجاني</MenuItem>
              <MenuItem value="Standard">عادي</MenuItem>
              <MenuItem value="Express">سريع</MenuItem>
            </Select>
          </FormControl>
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="السعر"
            name="cost"
            value={formData.cost}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="العنوان"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>

        {error && (
          <MDTypography color="error" mb={2}>
            {error}
          </MDTypography>
        )}

        <MDBox display="flex" justifyContent="space-between">
          <MDButton variant="gradient" color="success" type="submit">
            حفظ
          </MDButton>
          <MDButton variant="gradient" color="error" onClick={onCancel}>
            إلغاء
          </MDButton>
        </MDBox>
      </form>
    </MDBox>
  );
};

AddShipping.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default AddShipping;
