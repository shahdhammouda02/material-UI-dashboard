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
    { Header: "Name", accessor: "author", align: "left" },
    { Header: "Category", accessor: "Category", align: "center" },
    { Header: "photo", accessor: "images", align: "center" },
    { Header: "price", accessor: "price", align: "center" },
    { Header: "Discount", accessor: "Discount", align: "center" },
    { Header: "Description", accessor: "text", align: "center" },
    { Header: "Actions", accessor: "Actions", align: "center" },
  ]);

  const [rows, setRows] = useState([
    {
      author: "John Michael",
      Category: "man",
      images: (
        <MDBox ml={-1}>
          <img src={test} alt="image description" style={{ width: "100px", height: "100px" }} />
        </MDBox>
      ),
      price: "$50",
      Discount: "10%",
      text: "Girls pink blouse for girls",
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
      Category: "man",
      images: (
        <MDBox ml={-1}>
          <img src={test} alt="image description" style={{ width: "100px", height: "100px" }} />
        </MDBox>
      ),
      price: "$50",
      Discount: "10%",
      text: "Girls pink blouse for girls",
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
      Category: "man",
      images: (
        <MDBox ml={-1}>
          <img src={test} alt="image description" style={{ width: "100px", height: "100px" }} />
        </MDBox>
      ),
      price: "$50",
      Discount: "10%",
      text: "Girls pink blouse for girls",
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
    // Add other products here...
  ]);
  return {
    columns, // Ensure columns is correctly set here
    rows,
    // Ensure rows is correctly set here
    // other states and functions
  };
}
