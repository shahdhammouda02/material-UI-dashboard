import React, { useState, useMemo } from "react";
import MDBox from "components/MDBox";
import MDIconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import food from "assets/images/food.jpg";
import clothes from "assets/images/clothes.jpg";
import handcraft from "assets/images/handcraft.jpg";

export default function TableData({ handleEdit, handleDelete }) {
  // Edit button handler
  const handleEditClick = (id) => {
    console.log(`Editing product with ID: ${id}`);
    handleEdit(id); // Call the passed handleEdit function
  };

  const handleDeleteClick = (id) => {
    handleDelete(id); // Call the passed handleDelete function
  };

  const [columns] = useState([
    { Header: "الرقم التعريفي", accessor: "id", align: "center" },
    { Header: "الاسم", accessor: "author", align: "center" },
    { Header: "الفئة", accessor: "category", align: "center" },
    { Header: "الفئة الفرعية", accessor: "subcategory", align: "center" },
    { Header: "الصورة", accessor: "image", align: "center" },
    { Header: "السعر", accessor: "price", align: "center" },
    { Header: "الخصم", accessor: "discount", align: "center" },
    { Header: "الوصف", accessor: "description", align: "center" },
    { Header: "الإجراءات", accessor: "actions", align: "center" },
  ]);

  const [initialRows, setInitialRows] = useState([
    {
      author: "سارة خالد",
      Category: "المنتجات الغذائية",
      subcategory: "الاكل الفلسطيني",
      images: (
        <MDBox ml={-1}>
          <img
            src={food}
            alt="image description"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
          />
        </MDBox>
      ),
      price: "$50",
      discount: "10%",
      description: "الاكل الفلسطيني له طعم مميز",
    },
    {
      author: "مرح علي",
      Category: "الملابس والاكسسوارات",
      subcategory: "الملابس",
      images: (
        <MDBox ml={-1}>
          <img
            src={clothes}
            alt="image description"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
          />
        </MDBox>
      ),
      price: "$50",
      discount: "10%",
      description: "الملابس الفلسطينية لها طابع تراثي اصيل",
    },
    {
      author: "احمد علي",
      Category: "الحرف اليدوية",
      subcategory: "التراث",
      images: (
        <MDBox ml={-1}>
          <img
            src={handcraft}
            alt="image description"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
          />
        </MDBox>
      ),
      price: "$50",
      discount: "10%",
      description: "الحرف اليدوية تمثل التاريخ الفلسطيني القديم المميز",
    },
  ]);

  const rows = useMemo(() => {
    return initialRows.map((row, index) => ({
      id: index + 1,
      ...row,
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="success" onClick={() => handleEditClick(index + 1)}>
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error" onClick={() => handleDeleteClick(index + 1)}>
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    }));
  }, [initialRows]);

  return { columns, rows, products: initialRows };
}
