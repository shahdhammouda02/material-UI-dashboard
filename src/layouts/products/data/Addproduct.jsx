import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useDispatch, useSelector } from "react-redux";
import axiosFetching from "../../../API/axiosFetching";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../../Store/Slices/mainCategory/mainCategoryAction";
import { fetchSubCategories } from "../../../Store/Slices/subCategory/subCategoryAction";

const AddProduct = ({ onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [localError, setLocalError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const { subCategories } = useSelector((state) => state.subCategories);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!name.trim() || !price.trim() || !categoryId || !image) {
      setLocalError("الرجاء ملء جميع الحقول المطلوبة.");
      return;
    }

    // توليد slug فريد باستخدام الوقت الحالي
    const slug = `${name.trim().toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("image", image);
    formData.append("category_id", categoryId);
    formData.append("subcategory_id", subcategoryId);
    formData.append("slug", slug); // إضافة slug الفريد

    try {
      await axiosFetching.post("/products", formData);
      navigate("/products");
    } catch (error) {
      console.log("Server Error:", error.response?.data);
      setLocalError(error.response?.data?.message || "حدث خطأ أثناء الإضافة.");
    }
  };

  const filteredSubcategories = useMemo(() => {
    return categoryId
      ? subCategories?.data?.filter((sub) => sub.category_id === categoryId) || []
      : [];
  }, [categoryId, subCategories]);

  return (
    <MDBox p={3}>
      <MDTypography variant="h5" mb={2}>
        إضافة منتج جديد
      </MDTypography>
      <form onSubmit={handleAddProduct}>
        <MDBox mb={2}>
          <MDInput
            label="اسم المنتج"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="الوصف"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="السعر"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="الخصم"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            fullWidth
          />
        </MDBox>

        <MDBox mb={2}>
          <FormControl fullWidth>
            <InputLabel>اختر الفئة</InputLabel>
            <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              {categories?.data?.length > 0 ? (
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

        <MDBox mb={2}>
          <FormControl fullWidth>
            <InputLabel>اختر الفئة الفرعية</InputLabel>
            <Select value={subcategoryId} onChange={(e) => setSubcategoryId(e.target.value)}>
              {filteredSubcategories.length > 0 ? (
                filteredSubcategories.map((subcategory) => (
                  <MenuItem key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>لا توجد فئات فرعية متاحة</MenuItem>
              )}
            </Select>
          </FormControl>
        </MDBox>

        <MDBox mb={2}>
          <MDInput type="file" onChange={handleImageChange} fullWidth />
        </MDBox>
        {localError && (
          <MDTypography color="error" mb={2}>
            {localError}
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
};

AddProduct.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default AddProduct;
