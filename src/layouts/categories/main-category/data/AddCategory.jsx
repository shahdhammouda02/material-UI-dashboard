import React, { useState } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../../../Store/Slices/mainCategory/mainCategoryAction";

const AddCategory = ({ initialRows, onAdd, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // الحصول على الخطأ من الـ Redux Store
  const { error } = useSelector((state) => state.categories || {});

  const handleAddCategory = async (e) => {
    e.preventDefault(); // لمنع إعادة تحميل الصفحة عند تقديم النموذج

    if (!name || !description) {
      alert("جميع الحقول مطلوبة.");
      return;
    }

    try {
      const res = await dispatch(addCategory({ name, description })).unwrap(); // تفكيك الـ Promise

      console.log("🔹 API Response:", res);

      if (res?.success) {
        alert(res?.message || "تم إضافة الفئة بنجاح!");
        setTimeout(() => {
          window.location.reload(); // إعادة تحميل الصفحة بعد نجاح الإضافة
        }, 500); // تأخير نصف ثانية لضمان اكتمال العملية
      } else {
        alert("حدث خطأ أثناء إضافة الفئة.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      // alert("حدث خطأ غير متوقع.");
    }
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    if (onCancel) onCancel();
  };

  return (
    <MDBox p={3}>
      <MDTypography variant="h5" mb={2}>
        اضافة فئة جديدة
      </MDTypography>
      <form onSubmit={handleAddCategory}>
        <MDBox mb={2}>
          <MDInput
            label="اسم الصنف"
            name="categoryName"
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

AddCategory.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      categoryName: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

AddCategory.defaultProps = {
  initialRows: [],
};

export default AddCategory;
