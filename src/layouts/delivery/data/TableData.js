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
    { Header: "كود الشحنة", accessor: "id", align: "center" },
    { Header: "رقم الزبون", accessor: "userid", align: "center" },
    { Header: "رقم المنتج", accessor: "proid", align: "center" },
    { Header: "نوع الشحن", accessor: "shipping", align: "center" },
    { Header: "التكلفة", accessor: "price", align: "center" },
    { Header: "العنوان", accessor: "adress", align: "center" },
    { Header: "الإجراءات", accessor: "actions", align: "center" },
  ]);

  const [initialRows] = useState([
    {
      userid: "4",
      proid: "10",
      shipping: "عادي",
      price: "$50",
      adress: "مصر/مدينة نصر/شارع عباس العقاد",
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
      userid: "4",
      proid: "10",
      shipping: "عادي",
      price: "$50",
      adress: "مصر/مدينة نصر/شارع عباس العقاد",
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
      userid: "4",
      proid: "10",
      shipping: "عادي",
      price: "$50",
      adress: "مصر/مدينة نصر/شارع عباس العقاد",
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
