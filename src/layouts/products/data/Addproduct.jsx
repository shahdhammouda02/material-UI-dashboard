import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDIconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropzone } from "react-dropzone";

const AddProduct = ({ initialRows, onAdd, onCancel, onDelete }) => {
  const [newProduct, setNewProduct] = useState({
    id: "",
    author: "",
    Category: "",
    subcategory: "", // Added subcategory
    image: "",
    price: "",
    discount: "",
    description: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const highestExistingId =
      initialRows.length > 0 ? Math.max(...initialRows.map((row) => row.id)) : 0;
    setNewProduct((prev) => ({
      ...prev,
      id: highestExistingId + 1,
    }));
  }, [initialRows]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
    multiple: false,
  });

  const validateForm = () => {
    return Object.values(newProduct).every((value) => {
      return String(value).trim() !== "";
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("من فضلك قم بملء جميع الحقول بشكل صحيح.");
      return;
    }

    setError("");
    const newProductData = {
      ...newProduct,
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton
            color="success"
            onClick={() => console.log(`Editing product with ID: ${newProduct.id}`)}
          >
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error" onClick={() => onDelete && onDelete(newProduct.id)}>
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    };

    onAdd(newProductData);
    resetForm();
  };

  const resetForm = () => {
    setNewProduct({
      id: "",
      author: "",
      Category: "",
      subcategory: "", // Reset subcategory
      image: "",
      price: "",
      discount: "",
      description: "",
    });
    setError("");
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  return (
    <MDBox p={3}>
      <MDTypography variant="h5" mb={2}>
        إضافة منتج جديد
      </MDTypography>
      <form onSubmit={handleSubmit}>
        <MDBox mb={2}>
          <MDInput label="الرقم التعريفي" name="id" value={newProduct.id} fullWidth disabled />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="الاسم"
            name="author"
            value={newProduct.author}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="الفئة"
            name="Category"
            value={newProduct.Category}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="الفئة الفرعية" // Added subcategory field
            name="subcategory"
            value={newProduct.subcategory}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox
          mb={2}
          border="1px dashed #ccc"
          p={2}
          textAlign="center"
          onClick={getRootProps().onClick}
          onDragOver={getRootProps().onDragOver}
          onDragEnter={getRootProps().onDragEnter}
          onDragLeave={getRootProps().onDragLeave}
          onDrop={getRootProps().onDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={getInputProps().onChange}
            style={{ display: "none" }}
          />
          {isDragActive ? (
            <MDTypography>أسقط الصورة هنا...</MDTypography>
          ) : (
            <MDTypography>اسحب وأسقط الصورة هنا، أو انقر لاختيار صورة</MDTypography>
          )}
        </MDBox>
        <MDBox mb={2}>
          {newProduct.image && (
            <img
              src={newProduct.image}
              alt="Preview"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
          )}
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="السعر"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="الخصم"
            name="discount"
            type="number"
            value={newProduct.discount}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="الوصف"
            name="description"
            value={newProduct.description}
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
};

AddProduct.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

AddProduct.defaultProps = {
  initialRows: [],
  onDelete: null,
};

export default AddProduct;
