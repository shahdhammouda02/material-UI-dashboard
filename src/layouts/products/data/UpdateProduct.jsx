import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../../Store/Slices/productsSlice/productsAction";
import { fetchCategories } from "../../../Store/Slices/mainCategory/mainCategoryAction";
import { fetchSubCategories } from "../../../Store/Slices/subCategory/subCategoryAction";

function UpdateProduct({ initialRows, productId, onUpdate }) {
  const dispatch = useDispatch();
  const { categories = { data: [] } } = useSelector((state) => state.categories);
  const { subCategories = { data: [] } } = useSelector((state) => state.subCategories);
  const { loading, error } = useSelector((state) => state.products);

  const [product, setProduct] = useState({
    id: productId || null,
    name: "",
    description: "",
    price: "",
    discount: "",
    image: "",
    category_id: "",
    subcategory_id: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!productId) {
      console.error("❌ خطأ: رقم المنتج غير صالح.");
      return;
    }

    const existingProduct = initialRows.find((row) => row.id === productId);
    if (existingProduct) {
      setProduct({
        id: existingProduct.id,
        name: existingProduct.name || "",
        description: existingProduct.description || "",
        price: existingProduct.price || "",
        discount: existingProduct.discount || "",
        image: existingProduct.image || "",
        category_id: existingProduct.category_id || "",
        subcategory_id: existingProduct.subcategory_id || "",
      });
    } else {
      console.error(`❌ المنتج برقم ${productId} غير موجود.`);
    }
  }, [initialRows, productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prevProduct) => ({
          ...prevProduct,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      category_id: selectedCategoryId,
      subcategory_id: "",
    }));
  };

  const handleSubCategoryChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      subcategory_id: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name || !product.description || !product.price || !product.category_id) {
      alert("❌ يرجى ملء جميع الحقول المطلوبة.");
      return;
    }

    const updatedProduct = {
      ...product,
      price: Number(product.price),
      discount: Number(product.discount) || 0,
      category_id: Number(product.category_id),
      subcategory_id: product.subcategory_id ? Number(product.subcategory_id) : null,
    };

    dispatch(updateProduct({ id: product.id, updatedData: updatedProduct })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        onUpdate(updatedProduct);
      } else {
        console.error("❌ تحديث المنتج فشل:", result.error?.message || result);
      }
    });
  };

  const filteredSubcategories = useMemo(() => {
    return product.category_id
      ? subCategories?.data?.filter(
          (sub) => String(sub.category_id) === String(product.category_id)
        ) || []
      : [];
  }, [product.category_id, subCategories]);

  if (!categories?.data || !subCategories?.data) {
    return <MDTypography color="textSecondary">تحميل البيانات...</MDTypography>;
  }

  return (
    <MDBox p={3}>
      <MDTypography variant="h5" mb={2}>
        تحديث المنتج
      </MDTypography>
      <form onSubmit={handleSubmit}>
        <MDBox mb={2}>
          <MDInput label="رقم المنتج" name="id" value={product.id} disabled fullWidth />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="اسم المنتج"
            name="name"
            value={product.name}
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
            multiline
            rows={4}
          />
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
          <FormControl fullWidth>
            <InputLabel>اختر الفئة</InputLabel>
            <Select
              name="category_id"
              value={product.category_id || ""}
              onChange={handleCategoryChange}
            >
              {categories?.data?.length > 0 ? (
                categories.data.map((category) => (
                  <MenuItem key={category.id} value={String(category.id)}>
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
            <Select
              name="subcategory_id"
              value={product.subcategory_id || ""}
              onChange={handleSubCategoryChange}
              disabled={!product.category_id}
            >
              {filteredSubcategories.length > 0 ? (
                filteredSubcategories.map((subcategory) => (
                  <MenuItem key={subcategory.id} value={String(subcategory.id)}>
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
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {product.image && (
            <MDBox mt={1}>
              <img src={product.image} alt="معاينة الصورة" width="100" height="100" />
            </MDBox>
          )}
        </MDBox>

        {error && <MDTypography color="error">{error}</MDTypography>}

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

UpdateProduct.propTypes = {
  initialRows: PropTypes.array.isRequired,
  productId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateProduct;
