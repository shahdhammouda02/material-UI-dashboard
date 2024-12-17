import React, { useState, useMemo } from "react";
import MDBox from "components/MDBox";
import MDIconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import test from "../../../assets/images/bg-profile.jpeg";
export default function TableData(handleEdit) {
  const navigate = useNavigate();

  // Edit button handler
  const handleEditClick = (id) => {
    console.log(`Editing product with ID: ${id}`);
    handleEdit(id); // Call the passed handleEdit function
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

  const [initialRows] = useState([
    {
      author: "John Michael",
      Category: "المنتجات الغذائية",
      images: (
        <MDBox ml={-1}>
          <img src={test} alt="image description" style={{ width: "100px", height: "100px" }} />
        </MDBox>
      ),
      price: "$50",
      Discount: "10%",
      text: "Foods and beverages",
      Actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="primary">
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error">
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    },
    {
      author: "John Michael",
      Category: "الملابس والاكسسوارات",
      images: (
        <MDBox ml={-1}>
          <img src={test} alt="image description" style={{ width: "100px", height: "100px" }} />
        </MDBox>
      ),
      price: "$50",
      Discount: "10%",
      text: "Clothing items and Accessories",
      Actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="primary">
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error">
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    },
    {
      author: "John Michael",
      Category: "الحرف اليدوية",
      images: (
        <MDBox ml={-1}>
          <img src={test} alt="image description" style={{ width: "100px", height: "100px" }} />
        </MDBox>
      ),
      price: "$50",
      Discount: "10%",
      text: "Handicrafts",
      Actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="primary">
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error">
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    },
  ]);

  const rows = useMemo(() => {
    return initialRows.map((row, index) => ({
      id: index + 1,
      ...row,
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="primary" onClick={() => handleEditClick(index + 1)}>
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error">
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    }));
  }, [initialRows]);

  return { columns, rows };
}
