import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../../../Store/Slices/mainCategory/mainCategoryAction";

function UpdateCategory({ initialRows, categoryId, onUpdate, onCancel }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.categories);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (!categoryId || typeof categoryId !== "number") {
      console.error("❌ categoryId غير صالح:", categoryId);
      return;
    }

    const existingCategory = initialRows?.find((row) => row.id === categoryId);

    if (!existingCategory) {
      console.error(`❌ لم يتم العثور على فئة بالمعرف: ${categoryId}`);
      setCategory(null);
      return;
    }

    setCategory({
      id: existingCategory.id,
      name: existingCategory.name || "",
      description: existingCategory.description || "",
    });
  }, [initialRows, categoryId]);

  const handleInputChange = (e) => {
    if (!category) return;
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category || !category.id) {
      console.error("❌ لا يمكن التحديث: الفئة غير موجودة");
      return;
    }

    if (!category.name || !category.description) {
      console.error("❌ الحقول لا يمكن أن تكون فارغة");
      return;
    }

    console.log("✅ إرسال بيانات التحديث:", category);

    dispatch(updateCategory({ id: category.id, updatedData: category })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        onUpdate(category);
      }
    });
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    if (onCancel) onCancel();
  };

  return (
    <MDBox p={3}>
      <MDTypography variant="h5" mb={2}>
        تحديث الفئة
      </MDTypography>
      {!category ? (
        <MDTypography color="error">❌ لا يمكن تحميل الفئة المطلوبة.</MDTypography>
      ) : (
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
      )}
    </MDBox>
  );
}

UpdateCategory.propTypes = {
  initialRows: PropTypes.array.isRequired,
  categoryId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func, // إضافة onCancel هنا
};

export default UpdateCategory;
