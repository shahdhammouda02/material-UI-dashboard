import React, { useState } from "react";
import CategoryForm from "./AddCategory"; // Assuming you have a form for adding categories
import MDBox from "components/MDBox"; // Correct path for custom component
import MDIconButton from "@mui/material/IconButton"; // Material UI IconButton
import EditIcon from "@mui/icons-material/Edit"; // Material UI EditIcon
import DeleteIcon from "@mui/icons-material/Delete"; // Material UI DeleteIcon

import test from "../../../assets/images/bg-profile.jpeg"; // Sample image

export default function TableData() {
  const [columns, setColumns] = useState([
    { Header: "اسم الفئة", accessor: "categoryName", align: "left" },
    { Header: "الصنف", accessor: "description", align: "center" },
    { Header: "الاجراءات", accessor: "actions", align: "center" },
  ]);

  const [rows, setRows] = useState([
    {
      categoryName: "المنتجات الغذائية",
      description: "Foods and beverages",
      image: (
        <MDBox ml={-1}>
          <img src={test} alt="المنتجات الغذائية" style={{ width: "100px", height: "100px" }} />
        </MDBox>
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
      categoryName: "الملابس",
      description: "Clothing items",
      image: (
        <MDBox ml={-1}>
          <img src={test} alt="الملابس" style={{ width: "100px", height: "100px" }} />
        </MDBox>
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
      categoryName: "الاكسسوارات",
      description: "Accessories",
      image: (
        <MDBox ml={-1}>
          <img src={test} alt="الاكسسوارات" style={{ width: "100px", height: "100px" }} />
        </MDBox>
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
      categoryName: "الحرف اليدوية",
      description: "Handicrafts",
      image: (
        <MDBox ml={-1}>
          <img src={test} alt="الحرف اليدوية" style={{ width: "100px", height: "100px" }} />
        </MDBox>
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
      categoryName: "الكتب",
      description: "Books",
      image: (
        <MDBox ml={-1}>
          <img src={test} alt="الكتب" style={{ width: "100px", height: "100px" }} />
        </MDBox>
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
    // Add more categories as needed...
  ]);

  return {
    columns, // Ensure columns is correctly set here
    rows,
    // Ensure rows is correctly set here
    // other states and functions
  };
}
