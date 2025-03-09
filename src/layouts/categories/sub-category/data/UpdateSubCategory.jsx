import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateSubCategory } from "../../../../Store/Slices/subCategory/subCategoryAction";

function UpdateSubCategory({ initialRows, categoryId, onUpdate, categories, onCancel }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.categories);
  const [category, setCategory] = useState({
    id: categoryId || null,
    name: "",
    description: "",
    category_id: "", // ✅ تأكد من أن category_id يكون فارغًا أو رقمًا
  });

  useEffect(() => {
    if (!categoryId) {
      console.error("Invalid categoryId");
      return;
    }

    const existingCategory = initialRows.find((row) => row.id === categoryId);
    console.log("Existing category:", existingCategory);

    if (existingCategory) {
      setCategory({
        id: existingCategory.id,
        name: existingCategory.name || "",
        description: existingCategory.description || "",
        category_id: existingCategory.category_id || "", // لا تحويل إلى نص هنا، يجب أن يبقى العدد كما هو
      });
    } else {
      console.error(`Category with ID ${categoryId} not found`);
    }
  }, [initialRows, categoryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };
  const handleCancelClick = (e) => {
    e.preventDefault();
    if (onCancel) onCancel();
  };
  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    console.log("✅ Selected category_id:", selectedValue); // تسجيل القيمة
    setCategory((prevCategory) => ({
      ...prevCategory,
      category_id: selectedValue, // تحديث category_id
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category.name || !category.description || !category.category_id) {
      console.error("Please fill all required fields.");
      alert("يرجى ملء جميع الحقول المطلوبة.");
      return;
    }

    // تأكد من أن category_id يتم إرساله كعدد
    console.log("Submitting category with category_id:", category.category_id);

    const updatedCategory = {
      ...category,
      category_id: Number(category.category_id), // تأكد من تحويلها إلى رقم هنا عند الإرسال
    };

    console.log("Submitting category data:", updatedCategory);

    dispatch(updateSubCategory({ id: category.id, updatedData: updatedCategory })).then(
      (result) => {
        console.log("🔍 API Response:", result);
        if (result.meta.requestStatus === "fulfilled") {
          onUpdate(updatedCategory);
        } else {
          console.error("❌ تحديث الفئة الفرعية فشل:", result);
        }
      }
    );
  };

  return (
    <MDBox p={3}>
      <MDTypography variant="h5" mb={2}>
        تحديث الفئة الفرعية
      </MDTypography>
      <form onSubmit={handleSubmit}>
        <MDBox mb={2}>
          <MDInput label="رقم الفئة" name="id" value={category.id} disabled fullWidth />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="اسم الفئة"
            name="name"
            value={category.name}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
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
        <MDBox mb={2}>
          <FormControl fullWidth>
            <InputLabel>اختر الفئة الرئيسية</InputLabel>
            <Select
              name="category_id"
              value={category.category_id || ""}
              onChange={handleCategoryChange}
              sx={{ height: "40px" }}
            >
              {Array.isArray(categories?.data) && categories.data.length > 0 ? (
                categories.data.map((mainCat) => (
                  <MenuItem key={mainCat.id} value={String(mainCat.id)}>
                    {mainCat.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>لا توجد فئات متاحة</MenuItem>
              )}
            </Select>
          </FormControl>
        </MDBox>
        {error && (
          <MDBox mb={2}>
            <MDTypography color="error">{error}</MDTypography>
          </MDBox>
        )}
        <MDBox display="flex" justifyContent="space-between">
          <MDButton variant="gradient" color="success" type="submit" disabled={loading}>
            {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
          </MDButton>
          <MDButton variant="gradient" color="error" onClick={handleCancelClick}>
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
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  categoryId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired, // Add this line for onCancel
  categories: PropTypes.object.isRequired,
};

export default UpdateSubCategory;
