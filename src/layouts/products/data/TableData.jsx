import React, { useState, useMemo, useEffect } from "react";
import MDBox from "components/MDBox";
import MDIconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import food from "assets/images/food.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
} from "../../../Store/Slices/productsSlice/productsAction";

const TableData = ({ handleEdit }) => {
  const dispatch = useDispatch();
  const { products: productList, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleUpdateProduct = (updatedProduct) => {
    dispatch(updateProduct({ id: updatedProduct.id, updatedData: updatedProduct }));
  };

  const [columns] = useState([
    { Header: "الرقم التعريفي", accessor: "id", align: "center" },
    { Header: "الاسم", accessor: "name", align: "center" },
    { Header: "الفئة", accessor: "category_name", align: "center" },
    { Header: "الفئة الفرعية", accessor: "subcategory_name", align: "center" },
    { Header: "الصورة", accessor: "image", align: "center" },
    { Header: "السعر", accessor: "price", align: "center" },
    { Header: "الخصم", accessor: "discount", align: "center" },
    { Header: "الوصف", accessor: "description", align: "center" },
    { Header: "الإجراءات", accessor: "actions", align: "center" },
  ]);

  const rows = useMemo(() => {
    return productList.map((row) => ({
      id: row.id,
      name: row.name,
      category_name: row.category_name,
      subcategory_name: row.subcategory_name,
      image: (
        <MDBox ml={-1}>
          <img
            src={row.image || food} // Use row.image if available, otherwise default to food
            alt={row.name}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
          />
        </MDBox>
      ),
      price: row.price,
      discount: row.discount,
      description: row.description,
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="success" onClick={() => handleEdit(row.id)}>
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error" onClick={() => handleDeleteClick(row.id)}>
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    }));
  }, [productList, handleEdit]);

  return { columns, rows, products: productList, handleUpdateProduct };
};

export default TableData;
