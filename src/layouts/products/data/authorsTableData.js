import React, { useState } from "react";
import ProductForm from "./adding";
import MDBox from "components/MDBox"; // Correct path for custom component
import MDIconButton from "@mui/material/IconButton"; // Material UI IconButton
import EditIcon from "@mui/icons-material/Edit"; // Material UI EditIcon
import DeleteIcon from "@mui/icons-material/Delete"; // Material UI DeleteIcon
import AddIcon from "@mui/icons-material/Add"; // Material UI AddIcon
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import test from "../../../assets/images/bg-profile.jpeg";

// Your code here...

export default function data() {
  const [columns, setColumns] = useState([
    { Header: "الاسم", accessor: "author", align: "left" },
    { Header: "الفئة", accessor: "Category", align: "center" },
    { Header: "الصورة", accessor: "images", align: "center" },
    { Header: "السعر", accessor: "price", align: "center" },
    { Header: "الخصم", accessor: "Discount", align: "center" },
    { Header: "الإجراءات", accessor: "Actions", align: "center" },
  ]);

  const [rows, setRows] = useState([
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
  return {
    columns,
    rows,
  };
}
