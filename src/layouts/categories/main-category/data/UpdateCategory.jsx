import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../../../Store/Slices/mainCategory/mainCategoryAction";

function UpdateCategory({ initialRows, categoryId, onUpdate }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.categories);
  const [category, setCategory] = useState({
    id: categoryId || null,
    name: "",
    description: "",
  });

  useEffect(() => {
    if (!categoryId) {
      console.error("Invalid categoryId");
      return;
    }

    // البحث عن الفئة المطلوبة
    const existingCategory = initialRows.find((row) => row.id === categoryId);
    console.log("Existing category:", existingCategory);

    if (existingCategory) {
      setCategory({
        id: existingCategory.id,
        name: existingCategory.name || "", // تغيير من categoryName إلى name
        description: existingCategory.description || "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category.name || !category.description) {
      return;
    }

    console.log("Submitting category data:", category);

    dispatch(updateCategory({ id: category.id, updatedData: category })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        onUpdate(category);
      }
    });
  };

  return (
    <MDBox p={3}>
      <MDTypography variant="h5" mb={2}>
        تحديث الفئة
      </MDTypography>
      <form onSubmit={handleSubmit}>
        <MDBox mb={2}>
          <MDInput label="رقم الفئة" name="id" value={category.id} disabled fullWidth />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="اسم الفئة"
            name="name"
            value={category.name} // تأكد من استخدام name بدلاً من categoryName
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
        {error && (
          <MDBox mb={2}>
            <MDTypography color="error">{error}</MDTypography>
          </MDBox>
        )}
        <MDBox display="flex" justifyContent="space-between">
          <MDButton variant="gradient" color="success" type="submit" disabled={loading}>
            {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
          </MDButton>
          <MDButton variant="gradient" color="error" onClick={() => onUpdate(null)}>
            إلغاء
          </MDButton>
        </MDBox>
      </form>
    </MDBox>
  );
}

UpdateCategory.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired, // تغيير من categoryName إلى name
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  categoryId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateCategory;
