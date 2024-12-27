import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
function UpdateSubCategory({ initialRows, categoryId, onUpdate }) {
  const [subcategory, setSubcategory] = useState({
    id: categoryId || null,
    Category: "",
    text: "",
    mainCategory: "",
  });

  const [error, setError] = useState("");
  // Open dialog by default

  useEffect(() => {
    const existingSubcategory = initialRows.find((row) => row.id === categoryId);
    if (existingSubcategory) {
      setSubcategory(existingSubcategory); // Update state with existing subcategory data
    } else {
      console.error(`Subcategory with ID ${categoryId} not found`);
    }
  }, [initialRows, categoryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubcategory((prevSubcategory) => ({
      ...prevSubcategory,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!subcategory.Category || !subcategory.text || !subcategory.mainCategory) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setError("");
    onUpdate(subcategory); // Call the update function passed as a prop
  };

  return (
    <MDBox p={3}>
      {/* 🔶 عنوان النموذج */}
      <MDTypography variant="h5" mb={2}>
        تحديث الفئة
      </MDTypography>

      {/* 📝 نموذج التعديل */}
      <form onSubmit={handleSubmit}>
        {/* 🆔 حقل: رقم الفئة */}
        <MDBox mb={2}>
          <MDInput label="الرقم التعريفي" value={subcategory.id} disabled fullWidth />
        </MDBox>

        {/* 📝 حقل: اسم الفئة */}
        <MDBox mb={2}>
          <MDInput
            label="اسم الفئة"
            name="Category"
            value={subcategory.Category}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>

        {/* 📋 حقل: الوصف */}
        <MDBox mb={2}>
          <MDInput
            label="الوصف"
            name="text"
            value={subcategory.text}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
          />
        </MDBox>
        <MDBox mb={2}>
          <FormControl fullWidth>
            <InputLabel>اختر الفئة الأساسية</InputLabel>
            <Select
              name="mainCategory"
              value={subcategory.mainCategory}
              onChange={handleInputChange}
              sx={{ height: "40px" }}
            >
              <MenuItem value="منتجات غذائية">منتجات غذائية</MenuItem>
              <MenuItem value="ملابس وإكسسوارات">ملابس وإكسسوارات</MenuItem>
              <MenuItem value="حرف يدوية">حرف يدوية</MenuItem>
              <MenuItem value="كتب ومطبوعات">كتب ومطبوعات</MenuItem>
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
            onClick={() => onUpdate(categoryId ? subcategory : null)} // Ensure categoryId is valid
          >
            إلغاء
          </MDButton>
        </MDBox>
      </form>
    </MDBox>
  );
}

UpdateSubCategory.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      mainCategory: PropTypes.string.isRequired,
    })
  ).isRequired,
  categoryId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired, // Function to call when updating
};

export default UpdateSubCategory;
