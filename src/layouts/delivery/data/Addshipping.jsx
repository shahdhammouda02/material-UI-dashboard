import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDIconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

function AddShipping({ initialRows, onAdd, onCancel, onDelete }) {
  const [formData, setFormData] = useState({
    id: "",
    userid: "",
    proid: "",
    shipping: "",
    price: "",
    adress: "",
  });

  // Automatically generate the next shipping ID
  useEffect(() => {
    const highestExistingId =
      initialRows.length > 0 ? Math.max(...initialRows.map((row) => row.id)) : 0;
    setFormData((prevData) => ({
      ...prevData,
      id: highestExistingId + 1,
    }));
  }, [initialRows]);

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = (id) => {
    console.log(`Editing product with ID: ${id}`);
    // Add your editing logic here
  };

  const handleDeleteClick = (id) => {
    if (onDelete) {
      onDelete(id); // Pass the ID to the parent for deletion
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.userid ||
      !formData.proid ||
      !formData.shipping ||
      !formData.price ||
      !formData.adress
    ) {
      setError("من فضلك قم بملء جميع الحقول بشكل صحيح.");
      return;
    }

    setError("");

    const newShipping = {
      ...formData,
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="success" onClick={() => handleEditClick(formData.id)}>
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error" onClick={() => handleDeleteClick(formData.id)}>
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    };

    onAdd(newShipping); // Add the new shipping entry
    setFormData((prevData) => ({
      ...prevData,
      userid: "",
      proid: "",
      shipping: "",
      price: "",
      adress: "",
    }));
  };

  return (
    <MDBox p={3}>
      <MDTypography variant="h5" mb={2}>
        اضافة شحنة
      </MDTypography>
      <form onSubmit={handleSubmit}>
        <MDBox mb={2}>
          <MDInput label="رقم الشحنة" name="id" value={formData.id} fullWidth disabled />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="رقم المستخدم"
            name="userid"
            value={formData.userid}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="رقم المنتج"
            name="proid"
            value={formData.proid}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <FormControl fullWidth>
            <InputLabel>نوع الشحن</InputLabel>
            <Select
              label="نوع الشحن"
              name="shipping"
              value={formData.shipping}
              onChange={handleInputChange}
              sx={{ height: "40px" }}
            >
              <MenuItem value="مجاني">مجاني</MenuItem>
              <MenuItem value="عادي">عادي</MenuItem>
              <MenuItem value="سريع">سريع</MenuItem>
            </Select>
          </FormControl>
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="السعر"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="العنوان"
            name="adress"
            value={formData.adress}
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
          <MDButton variant="gradient" color="error" onClick={onCancel}>
            إلغاء
          </MDButton>
        </MDBox>
      </form>
    </MDBox>
  );
}

AddShipping.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userid: PropTypes.string,
      proid: PropTypes.string,
      shipping: PropTypes.string,
      price: PropTypes.string,
      adress: PropTypes.string,
    })
  ),
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func, // Function to handle deletion
};

AddShipping.defaultProps = {
  initialRows: [],
  onDelete: null,
};

export default AddShipping;
