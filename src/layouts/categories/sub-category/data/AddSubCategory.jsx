import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

function AddSubCategory({ initialRows, onAdd, onCancel }) {
  const [newSubcategory, setNewSubcategory] = useState({
    id: "",
    Category: "",
    text: "",
    mainCategory: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const highestExistingId =
      initialRows.length > 0 ? Math.max(...initialRows.map((row) => row.id)) : 0;
    setNewSubcategory((prevCategory) => ({
      ...prevCategory,
      id: highestExistingId + 1,
    }));
  }, [initialRows]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubcategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newSubcategory.Category || !newSubcategory.text || !newSubcategory.mainCategory) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setError("");
    onAdd(newSubcategory);
    setNewSubcategory({
      id: "",
      Category: "",
      text: "",
      mainCategory: "",
    });
  };

  const handleCancel = () => {
    setNewSubcategory({
      id: "",
      Category: "",
      text: "",
      mainCategory: "",
    });
    setError("");
    onCancel();
  };

  return (
    <MDBox p={3}>
      <MDTypography variant="h5" mb={2}>
        إضافة فئة جديدة
      </MDTypography>
      <form onSubmit={handleSubmit}>
        <MDBox mb={2}>
          <MDInput label="الرقم التعريفي" name="id" value={newSubcategory.id} fullWidth disabled />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="اسم الفئة"
            name="Category"
            value={newSubcategory.Category}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="الوصف"
            name="text"
            value={newSubcategory.text}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <FormControl fullWidth>
            <InputLabel>اختر الفئة الأساسية</InputLabel>
            <Select
              name="mainCategory"
              value={newSubcategory.mainCategory}
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
}

AddSubCategory.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      Category: PropTypes.string,
      text: PropTypes.string,
      mainCategory: PropTypes.string,
    })
  ),
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AddSubCategory;
