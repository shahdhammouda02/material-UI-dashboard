import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

function UpdateCategory({ initialRows, categoryId, onUpdate }) {
  // 🟢 الحالة (State) الخاصة ببيانات النموذج
  const [category, setCategory] = useState({
    id: categoryId || null, // Default to -1 if categoryId is null
    categoryName: "",
    description: "",
  });

  const [error, setError] = useState("");

  // 🔄 تحميل بيانات الفئة بناءً على categoryId
  useEffect(() => {
    if (!categoryId) {
      console.error("Invalid categoryId");
      return; // Avoid proceeding if categoryId is invalid
    }

    const existingCategory = initialRows.find((row) => row.id === categoryId);
    if (existingCategory) {
      setCategory(existingCategory); // نسخ البيانات إلى النموذج
    } else {
      console.error(`Category with ID ${categoryId} not found`);
    }
  }, [initialRows, categoryId]);

  // ✍️ تابع لمعالجة المدخلات
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  // ✅ تابع لحفظ التغييرات
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (!category.categoryName || !category.description) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setError("");
    onUpdate(category); // Call onUpdate with the updated category
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
          <MDInput label="رقم الفئة" name="id" value={category.id} disabled fullWidth />
        </MDBox>

        {/* 📝 حقل: اسم الفئة */}
        <MDBox mb={2}>
          <MDInput
            label="اسم الفئة"
            name="categoryName"
            value={category.categoryName}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>

        {/* 📋 حقل: الوصف */}
        <MDBox mb={2}>
          <MDInput
            label="الوصف"
            name="description"
            value={category.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
          />
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
            onClick={() => onUpdate(categoryId ? category : null)} // Ensure categoryId is valid
          >
            إلغاء
          </MDButton>
        </MDBox>
      </form>
    </MDBox>
  );
}

// ⚙️ إعدادات PropTypes لضمان سلامة المدخلات
UpdateCategory.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      categoryName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  categoryId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired, // Function to call when updating
};

export default UpdateCategory;
