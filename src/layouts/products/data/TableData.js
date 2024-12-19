import React, { useState, useMemo } from "react";
import MDBox from "components/MDBox";
import MDIconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import test from "../../../assets/images/bg-profile.jpeg";
export default function TableData(handleEdit) {
  // Edit button handler
  const handleEditClick = (id) => {
    console.log(`Editing product with ID: ${id}`);
    handleEdit(id); // Call the passed handleEdit function
  };

  const handleDeleteClick = (id) => {
    setInitialRows((prevRows) => prevRows.filter((_, index) => index + 1 !== id));
  };

  const [columns] = useState([
    { Header: "الرقم التعريفي", accessor: "id", align: "center" },
    { Header: "الاسم", accessor: "author", align: "center" },
    { Header: "الفئة", accessor: "Category", align: "center" },
    { Header: "الصورة", accessor: "images", align: "center" },
    { Header: "السعر", accessor: "price", align: "center" },
    { Header: "الخصم", accessor: "Discount", align: "center" },
    { Header: "الوصف", accessor: "text", align: "center" },
    { Header: "الإجراءات", accessor: "actions", align: "center" },
  ]);

  const [initialRows, setInitialRows] = useState([
    {
      author: "سارة خالد",
      Category: "المنتجات الغذائية",
      images: (
        <MDBox ml={-1}>
          <img
            src={test}
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
      Discount: "10%",
      text: "الاكل الفلسطيني له طعم مميز",
    },
    {
      author: "مرح علي",
      Category: "الملابس والاكسسوارات",
      images: (
        <MDBox ml={-1}>
          <img
            src={test}
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
      Discount: "10%",
      text: "الملابس الفلسطينية لها طابع تراثي اصيل",
    },
    {
      author: "احمد علي",
      Category: "الحرف اليدوية",
      images: (
        <MDBox ml={-1}>
          <img
            src={test}
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
      Discount: "10%",
      text: "الحرف اليدوية تمثل التاريخ الفلسطيني القديم المميز",
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
          <MDIconButton color="success" onClick={() => handleDeleteClick(index + 1)}>
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    }));
  }, [initialRows]);

  return { columns, rows };
}
