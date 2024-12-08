import React, { useState } from "react";
import CategoryForm from "./AddCategory"; // Assuming you have a form for adding categories
import MDBox from "components/MDBox"; // Correct path for custom component
import MDIconButton from "@mui/material/IconButton"; // Material UI IconButton
import EditIcon from "@mui/icons-material/Edit"; // Material UI EditIcon
import DeleteIcon from "@mui/icons-material/Delete"; // Material UI DeleteIcon
import { Select, MenuItem } from "@mui/material";

import test from "../../../assets/images/bg-profile.jpeg"; // Sample image

export default function TableData() {
  const [columns, setColumns] = useState([
    { Header: "الفئة الاساسية", accessor: "categoryName", align: "left" },
    { Header: "الصنف", accessor: "description", align: "center" },
    { Header: "الفئة الفرعية", accessor: "subCategory", align: "center" },
    { Header: "الاجراءات", accessor: "actions", align: "center" },
  ]);

  const [rows, setRows] = useState([
    {
      categoryName: "المنتجات الغذائية",
      description: "Foods and beverages",
      subCategory: (
        <Select defaultValue="Food-Drinks" displayEmpty variant="outlined" sx={{ minWidth: 120 }}>
          <MenuItem value="Foods">المأكولات</MenuItem>
          <MenuItem value="Drinks">المشروبات</MenuItem>
        </Select>
      ),
      actions: (
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
      categoryName: " الملابس والاكسسوارات",
      description: "Clothing and Accessories",
      actions: (
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
      categoryName: "الحرف اليدوية",
      description: "Handicrafts",
      actions: (
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
      categoryName: "الكتب والمطبوعات",
      description: "Books",
      actions: (
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
    // Add more categories as needed...
  ]);

  return {
    columns, // Ensure columns is correctly set here
    rows,
    // Ensure rows is correctly set here
    // other states and functions
  };
}
