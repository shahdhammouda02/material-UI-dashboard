import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useDropzone } from "react-dropzone";

const UpdateProduct = ({ initialRows, productId, onUpdate }) => {
  const [product, setProduct] = useState({
    id: productId,
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
    const existingProduct = initialRows.find((row) => row.id === productId);
    if (existingProduct) {
      setProduct(existingProduct); // Corrected: Update product state
    } else {
      console.error(`Product with ID ${productId} not found`);
    }
  }, [initialRows, productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: URL.createObjectURL(file), // Update with the file URL
      }));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*", // Allow only image files
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !product.author ||
      !product.Category ||
      !product.subcategory || // Added subcategory validation
      !product.image ||
      !product.price ||
      !product.discount ||
      !product.description
    ) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setError("");
    onUpdate(product); // Call the update function passed as a prop
  };

  return (
    <MDBox p={3}>
      <MDTypography variant="h5" mb={2}>
        تحديث المنتج
      </MDTypography>
      <form onSubmit={handleSubmit}>
        <MDBox mb={2}>
          <MDInput disabled label="الرقم التعريفي" value={product.id} fullWidth />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="اسم المنتج"
            name="author"
            value={product.author}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="الفئة"
            name="Category"
            value={product.Category}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="الفئة الفرعية" // Added subcategory field
            name="subcategory"
            value={product.subcategory}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox
          mb={2}
          border="2px dashed #ccc"
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
          <p>اسحب وأفلت صورة هنا أو انقر لاختيار صورة</p>
          {product.image && (
            <img
              src={product.image}
              alt="Product"
              style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
            />
          )}
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="السعر"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="الخصم"
            name="discount"
            value={product.discount}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="الوصف"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        {error && (
          <MDBox mb={2}>
            <MDTypography color="error">{error}</MDTypography>
          </MDBox>
        )}
        <MDBox display="flex" justifyContent="space-between">
          <MDButton variant="gradient" color="success" type="submit">
            حفظ التعديلات
          </MDButton>
          <MDButton
            variant="gradient"
            color="error"
            onClick={() => onUpdate(productId ? product : null)} // Ensure to handle cancellation
          >
            إلغاء
          </MDButton>
        </MDBox>
      </form>
    </MDBox>
  );
};

UpdateProduct.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      author: PropTypes.string.isRequired,
      Category: PropTypes.string.isRequired,
      subcategory: PropTypes.string.isRequired, // Added subcategory
      image: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateProduct;
