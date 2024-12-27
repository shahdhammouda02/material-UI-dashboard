import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDIconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function AddCategory({ initialRows, onAdd, onCancel, onDelete }) {
  const [newCategory, setNewCategory] = useState({
    id: "",
    categoryName: "",
    description: "",
  });

  const [error, setError] = useState("");

  // Automatically generate the next ID based on existing rows
  useEffect(() => {
    const highestExistingId =
      initialRows.length > 0 ? Math.max(...initialRows.map((row) => row.id)) : 0;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      id: highestExistingId + 1,
    }));
  }, [initialRows]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleEditClick = (id) => {
    console.log(`Editing category with ID: ${id}`);
    // Add your editing logic here
  };

  const handleDeleteClick = (id) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!newCategory.categoryName || !newCategory.description) {
      setError("من فضلك قم بملء جميع الحقول بشكل صحيح.");
      return;
    }

    setError(""); // Clear error message if all fields are valid

    const newCategoryData = {
      ...newCategory,
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="success" onClick={() => handleEditClick(newCategory.id)}>
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error" onClick={() => handleDeleteClick(newCategory.id)}>
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    };

    onAdd(newCategoryData);
    setNewCategory({
      id: "",
      categoryName: "",
      description: "",
    });
  };

  const handleCancel = () => {
    setNewCategory({
      id: "",
      categoryName: "",
      description: "",
    });
    setError("");
    onCancel();
  };

  return (
    <MDBox p={3}>
      <MDTypography variant="h5" mb={2}>
        اضافة فئة جديدة
      </MDTypography>
      <form onSubmit={handleSubmit}>
        <MDBox mb={2}>
          <MDInput label="الرقم التعريفي" name="id" value={newCategory.id} fullWidth disabled />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="اسم الصنف"
            name="categoryName"
            value={newCategory.categoryName}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="الوصف"
            name="description"
            value={newCategory.description}
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
          <MDButton variant="gradient" color="error" onClick={handleCancel}>
            إلغاء
          </MDButton>
        </MDBox>
      </form>
    </MDBox>
  );
}

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
  onDelete: PropTypes.func,
};

AddCategory.defaultProps = {
  initialRows: [],
  onDelete: null,
};

export default AddCategory;
