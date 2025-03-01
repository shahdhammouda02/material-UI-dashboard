import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useDispatch, useSelector } from "react-redux";
import axiosFetching from "../../../../API/axiosFetching"; // تأكد من استيراد axiosFetching بشكل صحيح
import { useNavigate } from "react-router-dom";

const AddSubCategory = ({ onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [localError, setLocalError] = useState(""); // تخزين الأخطاء المحلية

  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.subCategories || {});
  const navigate = useNavigate();

  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    setLocalError(null);

    // التحقق من البيانات المدخلة
    if (!name.trim()) {
      setLocalError("الرجاء إدخال اسم التصنيف الفرعي.");
      return;
    }
    if (!categoryId || isNaN(categoryId) || Number(categoryId) <= 0) {
      setLocalError("يرجى اختيار فئة رئيسية صالحة.");
      return;
    }

    const data = {
      name,
      description,
      category_id: Number(categoryId), // التأكد من أن القيمة رقمية
    };

    try {
      console.log("📌 إرسال البيانات:", data);
      await axiosFetching.post("/subcategories", data);
      // إعادة تعيين الحقول بعد الإضافة الناجحة
      setName("");
      setDescription("");
      setCategoryId("");
      navigate("/categories/sub-category"); // التوجيه إلى صفحة التصنيفات الفرعية بعد الإضافة الناجحة
    } catch (error) {
      console.error("خطأ في إضافة التصنيف الفرعي:", error);
      if (error.response) {
        setLocalError(error.response.data.message || "حدث خطأ أثناء الإضافة. حاول مرة أخرى.");
      } else {
        setLocalError("حدث خطأ أثناء الإضافة. حاول مرة أخرى.");
      }
    }
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setCategoryId("");
    setLocalError(""); // إعادة تعيين الخطأ
    if (onCancel) onCancel();
  };

  return (
    <MDBox p={3}>
      <MDTypography variant="h5" mb={2}>
        إضافة فئة فرعية جديدة
      </MDTypography>
      <form onSubmit={handleAddSubCategory}>
        <MDBox mb={2}>
          <MDInput
            label="اسم الفئة الفرعية"
            name="subcategoryName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="الوصف"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <FormControl fullWidth>
            <InputLabel>اختر الفئة الرئيسية</InputLabel>
            <Select
              name="mainCategory"
              value={categoryId}
              onChange={(e) => {
                const selectedValue = e.target.value;
                console.log("✅ Selected category_id:", selectedValue);
                setCategoryId(selectedValue);
              }}
              sx={{ height: "40px" }}
            >
              {Array.isArray(categories?.data) && categories.data.length > 0 ? (
                categories.data.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>لا توجد فئات متاحة</MenuItem>
              )}
            </Select>
          </FormControl>
        </MDBox>

        {localError && (
          <MDTypography color="error" mb={2}>
            {localError}
          </MDTypography>
        )}

        {error && (
          <MDTypography color="error" mb={2}>
            {error}
          </MDTypography>
        )}

        <MDBox display="flex" justifyContent="space-between">
          <MDButton variant="gradient" color="success" type="submit">
            حفظ
          </MDButton>
          <MDButton variant="gradient" color="error" onClick={handleCancel}>
            إلغاء
          </MDButton>
        </MDBox>
      </form>
    </MDBox>
  );
};

AddSubCategory.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default AddSubCategory;
